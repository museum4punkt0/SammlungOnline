package de.smbonline.mdssync.rest;

import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.service.ObjectService;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.exec.SyncController;
import de.smbonline.mdssync.exec.SyncResult;
import de.smbonline.mdssync.exec.SyncScheduler;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.jaxb.search.response.Application;
import io.sentry.Sentry;
import kotlin.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.LongStream;

import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.Conversions.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static java.util.Objects.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping(path = "admin")
public class AdminRestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminRestController.class);

    // config keys
    public static final String MDS_SSL_VALIDATION_ENABLED = "mds.ssl.validation.enabled";
    public static final String SCHEDULER_JOBS_ENABLED = "scheduler.jobs.enabled";
    public static final String SYNC_INCREMENTAL_PERMIT_ACQUISITION_TIMEOUT = "sync.incremental.permit.acquisition.timeout";
    public static final String SYNC_DELETE_PERMIT_ACQUISITION_TIMEOUT = "sync.delete.permit.acquisition.timeout";
    public static final String SEARCH_INDEXER_SHOULD_UPDATE = "search.indexer.should.update";
    public static final String APPROVAL_FILTER_ENABLED = "mds.approval.filter.enabled";
    public static final String MDS_TOKEN_LIFETIME = "mds.token.lifetime";
    public static final String HEALTHCHECK_OBJECTID = "mds.healthcheck.objectid";

    // spring beans
    private final MdsApiConfig mdsApiConfig;
    private final SearchIndexerConfig indexerConfig;
    private final SyncScheduler syncScheduler;
    private final SyncController syncController;
    private final ObjectService objectService;

    @Autowired
    public AdminRestController(
            final MdsApiConfig mdsApiConfig,
            final SearchIndexerConfig indexerConfig,
            final SyncScheduler syncScheduler,
            final SyncController syncController,
            final ObjectService objectService) {
        this.mdsApiConfig = mdsApiConfig;
        this.indexerConfig = indexerConfig;
        this.syncScheduler = syncScheduler;
        this.syncController = syncController;
        this.objectService = objectService;
    }

    @GetMapping
    public String check() {
        Sentry.captureMessage("AdminRestController invoked");
        return "Hello from AdminController!";
    }

    @GetMapping(path = "config", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getSupportedConfigurationKeys() {
        Data config = new Data()
                .setAttribute(MDS_SSL_VALIDATION_ENABLED, this.mdsApiConfig.isSslValidationEnabled())
                .setAttribute(HEALTHCHECK_OBJECTID, this.mdsApiConfig.getHealthCheckObjectId())
                .setAttribute(APPROVAL_FILTER_ENABLED, this.mdsApiConfig.isApprovalFilterEnabled())
                .setAttribute(MDS_TOKEN_LIFETIME, this.mdsApiConfig.getTokenLifetime())
                .setAttribute(SCHEDULER_JOBS_ENABLED, this.syncScheduler.isEnabled())
                .setAttribute(SYNC_INCREMENTAL_PERMIT_ACQUISITION_TIMEOUT, this.syncController.getConfig().getIncrementalTimeout().getFirst())
                .setAttribute(SYNC_DELETE_PERMIT_ACQUISITION_TIMEOUT, this.syncController.getConfig().getDeleteTimeout().getFirst())
                .setAttribute(SEARCH_INDEXER_SHOULD_UPDATE, this.indexerConfig.isShouldUpdate());
        return ResponseEntity.ok(config);
    }

    @PostMapping(path = "config", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> configure(final @RequestBody Data config) {

        if (config.hasAttribute(MDS_SSL_VALIDATION_ENABLED)) {
            this.mdsApiConfig.setSslValidationEnabled(toBoolean(config.getAttribute(MDS_SSL_VALIDATION_ENABLED)));
            config.removeAttribute(MDS_SSL_VALIDATION_ENABLED);
        }
        if (config.hasAttribute(HEALTHCHECK_OBJECTID)) {
            this.mdsApiConfig.setHealthCheckObjectId(toInteger(config.getAttribute(HEALTHCHECK_OBJECTID)));
            config.removeAttribute(HEALTHCHECK_OBJECTID);
        }
        if (config.hasAttribute(APPROVAL_FILTER_ENABLED)) {
            this.mdsApiConfig.setApprovalFilterEnabled(toBoolean(config.getAttribute(APPROVAL_FILTER_ENABLED)));
            config.removeAttribute(APPROVAL_FILTER_ENABLED);
        }
        if (config.hasAttribute(MDS_TOKEN_LIFETIME)) {
            this.mdsApiConfig.setTokenLifetime(toInteger(config.getAttribute(MDS_TOKEN_LIFETIME)));
            config.removeAttribute(MDS_TOKEN_LIFETIME);
        }
        if (config.hasAttribute(SCHEDULER_JOBS_ENABLED)) {
            this.syncScheduler.setEnabled(toBoolean(config.getAttribute(SCHEDULER_JOBS_ENABLED)));
            config.removeAttribute(SCHEDULER_JOBS_ENABLED);
        }
        if (config.hasAttribute(SYNC_INCREMENTAL_PERMIT_ACQUISITION_TIMEOUT)) {
            Pair<Integer, TimeUnit> timeout = new Pair<>(
                    toInteger(config.getAttribute(SYNC_INCREMENTAL_PERMIT_ACQUISITION_TIMEOUT)), TimeUnit.SECONDS);
            this.syncController.getConfig().setIncrementalTimeout(timeout);
            config.removeAttribute(SYNC_INCREMENTAL_PERMIT_ACQUISITION_TIMEOUT);
        }
        if (config.hasAttribute(SYNC_DELETE_PERMIT_ACQUISITION_TIMEOUT)) {
            Pair<Integer, TimeUnit> timeout = new Pair<>(
                    toInteger(config.getAttribute(SYNC_DELETE_PERMIT_ACQUISITION_TIMEOUT)), TimeUnit.SECONDS);
            this.syncController.getConfig().setDeleteTimeout(timeout);
            config.removeAttribute(SYNC_DELETE_PERMIT_ACQUISITION_TIMEOUT);
        }
        if (config.hasAttribute(SEARCH_INDEXER_SHOULD_UPDATE)) {
            this.indexerConfig.setShouldUpdate(toBoolean(config.getAttribute(SEARCH_INDEXER_SHOULD_UPDATE)));
            config.removeAttribute(SEARCH_INDEXER_SHOULD_UPDATE);
        }

        Data response = new Data().setAttribute(ATTR_STATUS, HttpStatus.OK);
        if (config.hasAttributes()) {
            response.setAttribute("ignoredConfigurationKeys", config.getAttributes().keySet());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "trigger/recalculate", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> recalculateTrigger(final @RequestBody Data event) {
        LOGGER.info("Recalculate event received: {}", event);

        Long id = extractId(event);
        Data request = new Data().setAttribute(ATTR_IDS, Collections.singletonList(id));
        SyncResult result = runRecalculationByIds(request);
        Data response = toResponse(result);
        return ResponseEntity.status(requireNonNull(response.getTypedAttribute(ATTR_STATUS))).body(response);
    }

    @PostMapping(value = "trigger/sync", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> indexTrigger(final @RequestBody Data event) {
        LOGGER.info("Index event received: {}", event);

        String table = requireNonNull(event.getNestedTypedAttribute("table.name"));

        String module = null;
        Collection<Long> ids = null;
        switch (table) {
            case "collections" -> {
                module = MODULE_OBJECTS;
                ids = collectObjectIdsForCollection(requireNonNull(event.getNestedTypedAttribute("event.data.new.key")), true);
            }
            case "org_unit" -> {
                module = MODULE_OBJECTS;
                ids = collectObjectIdsForCollection(requireNonNull(event.getNestedTypedAttribute("event.data.new.name")), false);
            }
            default -> {
                module = getModuleForTable(table);
                ids = Collections.singletonList(extractId(event));
            }
        }

        Data idRequest = new Data()
                .setAttribute(ATTR_MODULE, module)
                .setAttribute(ATTR_IDS, ids);
        SyncResult result = runManualSyncByIds(idRequest);
        Data response = toResponse(result);
        return ResponseEntity.status(requireNonNull(response.getTypedAttribute(ATTR_STATUS))).body(response);
    }

    private String getModuleForTable(final String dbTable) {
        return switch (dbTable.toLowerCase()) {
            case "assortments" -> MODULE_OBJECT_GROUPS;
            case "attachments" -> MODULE_MULTIMEDIA;
            case "exhibitions" -> MODULE_EXHIBITIONS;
            case "objects" -> MODULE_OBJECTS;
            case "persons" -> MODULE_PERSON;
            case "thesaurus" -> VOCABULARY;
            default -> null;
        };
    }

    private static Long extractId(final Data event) {
        Number id = requireNonNull(event.getNestedTypedAttribute("event.data.new.id"));
        return id.longValue();
    }

    private Collection<Long> collectObjectIdsForCollection(final String collectionKey, final boolean wildcard) {
        return Arrays.asList(objectService.getIdsForCollection(collectionKey, wildcard));
    }

    @GetMapping(path = "sync", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getSyncState() {
        return ResponseEntity.ok(this.syncController.getState());
    }

    @PatchMapping(path = "recalculate", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> executeRecalculation(final @RequestBody Data data) {
        SyncResult result = runRecalculationByIds(data);
        Data response = toResponse(result);
        return ResponseEntity.status(requireNonNull(response.getTypedAttribute(ATTR_STATUS))).body(response);
    }

    @PostMapping(path = "sync", produces = MediaType.APPLICATION_JSON_VALUE, consumes = APPLICATION_XML_VALUE)
    public ResponseEntity<Data> executeSync(final @RequestBody Application xml) {
        // TODO run sync for module in given Application
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    @PatchMapping(path = "sync", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> executeSync(final @RequestBody Data data) {

        SyncCycleType type = data.hasAttribute(ATTR_TYPE)
                ? SyncCycleType.valueOf(data.getTypedAttribute(ATTR_TYPE)) : SyncCycleType.MANUAL;

        Data response = null;
        if (type == SyncCycleType.MANUAL) {
            response = executeManualSync(data);
        } else {
            if (type == SyncCycleType.ASSORTMENTS) {
                SyncResult result = this.syncController.resolveAssortments();
                response = toResponse(result);
            } else if (type == SyncCycleType.DELETIONS) {
                SyncResult result = this.syncController.removeDeleted();
                response = toResponse(result);
            } else if (type == SyncCycleType.HIGHLIGHTS) {
                SyncResult result = this.syncController.resolveHighlights();
                response = toResponse(result);
            } else if (type == SyncCycleType.INCREMENTAL) {
                String module = data.hasAttribute(ATTR_MODULE) ? data.getTypedAttribute(ATTR_MODULE) : MODULE_OBJECTS;
                SyncResult result = runIncrementalSync(requireNonNull(module));
                response = toResponse(result);
            }
        }

        if (response == null) {
            response = new Data()
                    .setAttribute(ATTR_STATUS, HttpStatus.NOT_IMPLEMENTED)
                    .setAttribute(ATTR_INFO, "Unimplemented sync type " + type + ". Please inform the developer.");
        }
        return ResponseEntity.status(requireNonNull(response.getTypedAttribute(ATTR_STATUS))).body(response);
    }

    private Data executeManualSync(final Data data) {
        boolean syncIds = data.hasAttribute(ATTR_IDS);
        boolean syncTimeRange = data.hasAttribute(ATTR_MODIFIED_FROM) || data.hasAttribute(ATTR_MODIFIED_TO);
        boolean syncBoth = syncIds && syncTimeRange;
        if (syncIds != syncTimeRange) {
            if (!data.hasAttribute(ATTR_MODULE)) {
                data.setAttribute(ATTR_MODULE, MODULE_OBJECTS);
            }
            SyncResult result = syncIds ? runManualSyncByIds(data) : runManualSyncByDateRange(data);
            return toResponse(result);
        }
        String message = syncBoth
                ? "Can't handle id-sync and timerange-sync at the same time"
                : "Missing fields, either '" + ATTR_IDS + "' or '" + ATTR_MODIFIED_FROM + "'/'" + ATTR_MODIFIED_TO + "' required. Or did you want to specify a different " + ATTR_TYPE + "?";
        return new Data()
                .setAttribute(ATTR_STATUS, HttpStatus.EXPECTATION_FAILED)
                .setAttribute(ATTR_RESULT, SyncResult.NOOP.toJson())
                .setAttribute(ATTR_INFO, message);
    }

    private @Nullable SyncResult runIncrementalSync(final String module) {
        return switch (module) {
            case MODULE_EXHIBITIONS -> this.syncController.resolveExhibitions();
            case MODULE_MULTIMEDIA -> this.syncController.resolveAttachments();
            case MODULE_OBJECT_GROUPS -> this.syncController.resolveAssortments();
            case MODULE_OBJECTS -> this.syncController.nextIncremental();
            case MODULE_PERSON -> this.syncController.resolvePersons();
            case VOCABULARY -> this.syncController.resolveThesauri();
            default -> null;
        };
    }

    private SyncResult runManualSyncByIds(final Data data) {
        String module = data.getTypedAttribute(ATTR_MODULE);
        Long[] ids = collectIdsAsLongArray(requireNonNull(data.getTypedAttribute(ATTR_IDS)));
        return this.syncController.syncUpdates(module, ids);
    }

    private static Long[] collectIdsAsLongArray(final Collection<?> payloadIds) {
        Set<Long> collected = payloadIds.stream()
                .collect(LinkedHashSet::new, (result, next) -> {
                    // it's either number or string
                    String element = next.toString();
                    if (element.contains("..")) {
                        long start = Long.parseLong(element.substring(0, element.indexOf('.')));
                        long end = Long.parseLong(element.substring(element.lastIndexOf('.') + 1));
                        LongStream.rangeClosed(start, end).forEach(result::add);
                    } else {
                        result.add(Long.parseLong(element));
                    }
                }, LinkedHashSet::addAll);
        return collected.toArray(Long[]::new);
    }

    private SyncResult runManualSyncByDateRange(final Data data) {
        String module = data.getTypedAttribute(ATTR_MODULE);
        OffsetDateTime from = data.hasAttribute(ATTR_MODIFIED_FROM)
                ? OffsetDateTime.parse(requireNonNull(data.getTypedAttribute(ATTR_MODIFIED_FROM)))
                : OffsetDateTime.ofInstant(Instant.EPOCH, MDS_DATE_ZONE);
        OffsetDateTime to = data.hasAttribute(ATTR_MODIFIED_TO)
                ? OffsetDateTime.parse(requireNonNull(data.getTypedAttribute(ATTR_MODIFIED_TO))) : null;
        return this.syncController.syncUpdates(module, from, to);
    }

    private SyncResult runRecalculationByIds(final Data data) {
        Long[] ids = collectIdsAsLongArray(requireNonNull(data.getTypedAttribute(ATTR_IDS)));
        // FIXME implement - fetch objects with attribute translations, then for each recalculate exhibition_space and update the object
        return null;
    }

    private Data toResponse(final @Nullable SyncResult result) {
        if (result == null) {
            return new Data()
                    .setAttribute(ATTR_STATUS, HttpStatus.NOT_IMPLEMENTED)
                    .setAttribute(ATTR_INFO, "Couldn't find a suitable sync runner for input. Do you have a typo in the json?");
        }
        Data response = new Data().setAttribute(ATTR_STATUS, toHttpStatus(result));
        if (result.getStatus() != SyncResult.Status.TBD) {
            response.setAttribute(ATTR_RESULT, result.toJson());
        }
        if (result.getStatus() != SyncResult.Status.NOOP) {
            response.setAttribute(ATTR_INFO, this.syncController.getState());
        }
        return response;
    }

    private HttpStatus toHttpStatus(final SyncResult result) {
        return switch (result.getStatus()) {
            case TBD -> HttpStatus.ACCEPTED;
            case NOOP -> HttpStatus.LOCKED;
            case SUCCESS -> HttpStatus.OK;
            case ERROR -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
    }
}
