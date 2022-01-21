package de.smbonline.mdssync.rest;

import de.smbonline.mdssync.dto.SyncCycleDTO;
import de.smbonline.mdssync.exec.SyncController;
import de.smbonline.mdssync.exec.SyncResult;
import de.smbonline.mdssync.exec.SyncScheduler;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.api.MdsApiConfig;
import kotlin.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.stream.LongStream;

import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.Conversions.*;
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

    // spring beans
    private final MdsApiConfig mdsApiConfig;
    private final SearchIndexerConfig indexerConfig;
    private final SyncScheduler syncScheduler;
    private final SyncController syncController;

    @Autowired
    public AdminRestController(
            final MdsApiConfig mdsApiConfig,
            final SearchIndexerConfig indexerConfig,
            final SyncScheduler syncScheduler,
            final SyncController syncController) {
        this.mdsApiConfig = mdsApiConfig;
        this.indexerConfig = indexerConfig;
        this.syncScheduler = syncScheduler;
        this.syncController = syncController;
    }

    @GetMapping
    public String check() {
        return "Hello from AdminController!";
    }

    @GetMapping(path = "configure", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Any> getSupportedConfigurationKeys() {
        Any config = new Any()
                .setAttribute(MDS_SSL_VALIDATION_ENABLED, this.mdsApiConfig.isSslValidationEnabled())
                .setAttribute(APPROVAL_FILTER_ENABLED, this.mdsApiConfig.isApprovalFilterEnabled())
                .setAttribute(MDS_TOKEN_LIFETIME, this.mdsApiConfig.getTokenLifetime())
                .setAttribute(SCHEDULER_JOBS_ENABLED, this.syncScheduler.isEnabled())
                .setAttribute(SYNC_INCREMENTAL_PERMIT_ACQUISITION_TIMEOUT, this.syncController.getConfig().getIncrementalTimeout().getFirst())
                .setAttribute(SYNC_DELETE_PERMIT_ACQUISITION_TIMEOUT, this.syncController.getConfig().getDeleteTimeout().getFirst())
                .setAttribute(SEARCH_INDEXER_SHOULD_UPDATE, this.indexerConfig.isShouldUpdate());
        return ResponseEntity.ok(config);
    }

    @PostMapping(path = "configure", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Any> configure(final @RequestBody Any config) {

        if (config.hasAttribute(MDS_SSL_VALIDATION_ENABLED)) {
            this.mdsApiConfig.setSslValidationEnabled(toBoolean(config.getAttribute(MDS_SSL_VALIDATION_ENABLED)));
            config.removeAttribute(MDS_SSL_VALIDATION_ENABLED);
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

        Any response = new Any().setAttribute(ATTR_STATUS, HttpStatus.OK);
        if (config.hasAttributes()) {
            response.setAttribute("ignoredConfigurationKeys", config.getAttributes().keySet());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "trigger/sync", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Any> indexTrigger(final @RequestBody Any event) {
        LOGGER.info("Index event received: {}", event);

        Long id = extractId(event);
        Any request = new Any().setAttribute(ATTR_IDS, Collections.singletonList(id.toString()));
        SyncResult result = executeManualSyncByIds(request);
        Any response = toResponse(result);
        return ResponseEntity.status(response.getTypedAttribute(ATTR_STATUS)).body(response);
    }

    private static Long extractId(final Any event) {
        Number id = Objects.requireNonNull(event.getNestedTypedAttribute("event.data.new.id"));
        return id.longValue();
    }

    @GetMapping(path = "sync", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getSyncState() {
        return ResponseEntity.ok(this.syncController.getState());
    }

    @PatchMapping(path = "sync", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Any> executeSync(final @RequestBody Any data) {

        SyncCycleDTO.Type type = data.hasAttribute(ATTR_TYPE)
                ? SyncCycleDTO.Type.valueOf(data.getTypedAttribute(ATTR_TYPE)) : SyncCycleDTO.Type.MANUAL;

        Any response;
        if (type == SyncCycleDTO.Type.MANUAL) {
            response = executeManualSync(data);
        } else {
            SyncResult result = SyncResult.NOOP;
            if (type == SyncCycleDTO.Type.DELETIONS) {
                result = this.syncController.removeDeleted();
            }
            if (type == SyncCycleDTO.Type.HIGHLIGHTS) {
                result = this.syncController.resolveHighlights();
            }
            if (type == SyncCycleDTO.Type.INCREMENTAL) {
                result = this.syncController.nextIncremental();
            }
            response = toResponse(result);
        }
        return ResponseEntity.status(response.getTypedAttribute(ATTR_STATUS)).body(response);
    }

    private Any executeManualSync(final Any data) {
        boolean syncIds = data.hasAttribute(ATTR_IDS);
        boolean syncTimeRange = data.hasAttribute(ATTR_MODIFIED_FROM) || data.hasAttribute(ATTR_MODIFIED_TO);
        boolean syncBoth = syncIds && syncTimeRange;
        if (syncIds != syncTimeRange) {
            SyncResult result = syncIds ? executeManualSyncByIds(data) : executeManualSyncByDateRange(data);
            return toResponse(result);
        }
        String message = syncBoth
                ? "can't handle id-sync and timerange-sync at the same time"
                : "missing fields, either '" + ATTR_IDS + "' or '" + ATTR_MODIFIED_FROM + "'/'" + ATTR_MODIFIED_TO + "' required. Or did you want to specify a different " + ATTR_TYPE + "?";
        return new Any()
                .setAttribute(ATTR_STATUS, HttpStatus.EXPECTATION_FAILED)
                .setAttribute(ATTR_RESULT, SyncResult.NOOP.toJson())
                .setAttribute(ATTR_INFO, message);
    }

    private SyncResult executeManualSyncByIds(final Any data) {
        Long[] ids = collectIdsAsLongArray(data.getTypedAttribute(ATTR_IDS));
        return this.syncController.syncUpdates(ids);
    }

    private static Long[] collectIdsAsLongArray(final Collection<?> payloadIds) {
        Collection<Long> collected = payloadIds.stream()
                .collect(ArrayList::new, (list, str) -> {
                    // it's either number or string
                    String element = str.toString();
                    if (element.contains("..")) {
                        long start = Long.parseLong(element.substring(0, element.indexOf('.')));
                        long end = Long.parseLong(element.substring(element.lastIndexOf('.') + 1));
                        LongStream.rangeClosed(start, end).forEach(list::add);
                    } else {
                        list.add(Long.parseLong(element));
                    }
                }, ArrayList::addAll);
        return collected.toArray(Long[]::new);
    }

    private SyncResult executeManualSyncByDateRange(final Any data) {
        LocalDateTime from = data.hasAttribute(ATTR_MODIFIED_FROM)
                ? LocalDateTime.parse(data.getTypedAttribute(ATTR_MODIFIED_FROM))
                : LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);
        LocalDateTime to = data.hasAttribute(ATTR_MODIFIED_TO)
                ? LocalDateTime.parse(data.getTypedAttribute(ATTR_MODIFIED_TO)) : null;
        return this.syncController.syncUpdates(from, to);
    }

    private Any toResponse(final SyncResult result) {
        Any response = new Any()
                .setAttribute(ATTR_STATUS, toHttpStatus(result))
                .setAttribute(ATTR_RESULT, result.toJson());
        if (result.getStatus() != SyncResult.Status.NOOP) {
            response.setAttribute(ATTR_INFO, this.syncController.getState());
        }
        return response;
    }

    private HttpStatus toHttpStatus(final SyncResult result) {
        switch (result.getStatus()) {
            case NOOP:
                return HttpStatus.LOCKED;
            case ERROR:
                return HttpStatus.INTERNAL_SERVER_ERROR;
            case SUCCESS:
            default:
                return HttpStatus.OK;
        }
    }
}
