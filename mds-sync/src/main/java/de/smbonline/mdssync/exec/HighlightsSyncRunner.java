package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.HighlightService;
import de.smbonline.mdssync.dto.Highlight;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.SyncCycle;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.parsers.HighlightsParser;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.jaxb.search.request.EndsWithField;
import de.smbonline.mdssync.jaxb.search.request.ObjectFactory;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.request.StartsWithField;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.rest.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.Dates.*;
import static de.smbonline.mdssync.util.MdsConstants.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class HighlightsSyncRunner implements SyncRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(HighlightsSyncRunner.class);

    private final HighlightService highlightService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final SearchIndexerConfig indexerConfig;
    private final MdsApiClientFactory factory;
    private final MdsApiConfig apiConfig;
    private final Data statusInfo;

    private MdsApiClient mdsClient;
    private SearchIndexerClient searchIndexerClient;

    private final List<Long> oldHighlightObjIds = new ArrayList<>();
    private final List<Long> newHighlightObjIds = new ArrayList<>();

    @Autowired
    public HighlightsSyncRunner(
            final MdsApiConfig apiConfig,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerConfig indexerConfig,
            final HighlightService highlightService,
            final DataQueue<WrapperDTO> dataQueue) {
        this.apiConfig = apiConfig;
        this.indexerConfig = indexerConfig;
        this.factory = clientFactory;
        this.mdsClient = clientFactory.getApiClient(MODULE_OBJECT_GROUPS);
        this.highlightService = highlightService;
        this.dataQueue = dataQueue;
        this.statusInfo = new Data()
                .setAttribute("instance", "HSR" + System.currentTimeMillis())
                .setAttribute(ATTR_STATUS, "not running");
    }

    /*
     * Lazy-init API client. Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected SearchIndexerClient searchIndexerClient() {
        if (this.searchIndexerClient == null) {
            this.searchIndexerClient = new SearchIndexerClient(this.indexerConfig);
        }
        return this.searchIndexerClient;
    }

    /*
     * Lazy-init API client. Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected MdsApiClient mdsClient() {
        if (this.mdsClient == null) {
            this.mdsClient = this.factory.getApiClient(MODULE_OBJECT_GROUPS);
        }
        return this.mdsClient;
    }

    private void updateResult(final @Nullable SyncResult result) {
        synchronized (this.statusInfo) {
            this.statusInfo.setAttribute(ATTR_RESULT, result == null ? null : result.toJson())
                    .setAttribute(ATTR_STATUS, result == null ? "aborted" : "done");
        }
    }

    private void updateStatus(final String value) {
        synchronized (this.statusInfo) {
            this.statusInfo.setAttribute(ATTR_STATUS, value);
        }
    }

    @Override
    public Data getStatusInfo() {
        synchronized (this.statusInfo) {
            return this.statusInfo;
        }
    }

    @Override
    public SyncResult sync() {

        SyncResult result = null;
        LocalDateTime start = LocalDateTime.now();
        updateStatus("running");

        List<String> toBeDeletedOrgUnits = new ArrayList<>(this.highlightService.getAllHighlightOrgUnits());
        Collections.sort(toBeDeletedOrgUnits);

        if (!toBeDeletedOrgUnits.isEmpty()) {
            if (LOGGER.isDebugEnabled()) {
                String orgUnits = String.join(", ", toBeDeletedOrgUnits);
                LOGGER.debug("Highlights exist for the following org-units: {}", orgUnits);
            }

            // collect old highlights, maybe we have to reindex them later if they are no highlights anymore
            toBeDeletedOrgUnits.forEach(orgUnit -> {
                List<Long> objIds = this.highlightService.getHighlightObjectIds(orgUnit);
                this.oldHighlightObjIds.addAll(objIds);
            });
        }

        try {

            Search search = buildHighlightsPayload();
            Module module = mdsClient().search(search, null);
            HighlightsParser parser = newHighlightsParser();

            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("Updating highlights for {} org-units...", module.getModuleItem().size());
            }

            for (ModuleItem item : module.getModuleItem()) {
                Highlight highlight = parser.parseModuleItem(item);
                if (highlight != null) {
                    toBeDeletedOrgUnits.remove(highlight.getOrgUnitName());
                    WrapperDTO wrapper = newUpsertWrapper(highlight);
                    this.dataQueue.add(wrapper);
                }
            }

            if (!toBeDeletedOrgUnits.isEmpty()) {
                if (LOGGER.isDebugEnabled()) {
                    String orgUnits = String.join(", ", toBeDeletedOrgUnits);
                    LOGGER.debug("Removing unused highlight org-units: {}", orgUnits);
                }

                // delete what can be deleted
                toBeDeletedOrgUnits.stream().map(orgUnit -> {
                    Highlight highlight = new Highlight();
                    highlight.setOrgUnitName(orgUnit);
                    return newDeleteWrapper(highlight);
                }).forEach(this.dataQueue::add);
            }

            if (this.indexerConfig.isShouldUpdate()) {
                updateSearchIndex();
            }

            LocalDateTime end = LocalDateTime.now();
            SyncResult.Status status = toBeDeletedOrgUnits.isEmpty() && module.getModuleItem().isEmpty()
                    ? SyncResult.Status.NOOP : SyncResult.Status.SUCCESS;
            result = new SyncResult(status, Duration.between(start, end));
            saveSyncCycleSuccess(result, start);
            SYNC_LOGGER.info("Highlights sync finished:{}{}", System.lineSeparator(), result);
            return result;

        } catch (MdsApiConnectionException exc) {
            ErrorHandling.capture(exc, "Highlights sync failed.");
            return (result = new SyncResult(SyncResult.Status.ERROR, Duration.between(start, LocalDateTime.now())));
        } finally {
            updateResult(result);
            System.gc();
        }
    }

    private void updateSearchIndex() {
        Set<Long> highlightObjIds = new HashSet<>();
        // add all old highlights
        highlightObjIds.addAll(this.oldHighlightObjIds);
        // add all new highlights
        highlightObjIds.addAll(this.newHighlightObjIds);
        for (Long id : highlightObjIds) {
            // skip all highlights that existed before and still exist - no need to reindex those
            if (this.oldHighlightObjIds.contains(id) && this.newHighlightObjIds.contains(id)) {
                continue;
            }
            try {
                LOGGER.debug("Updating search index for MDS object {}", id);
                searchIndexerClient().notifyUpdated(id, "highlight");
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Exception updating search-index for MDS object {}", id);
            }
        }
    }

    protected HighlightsParser newHighlightsParser() {
        HighlightsParser parser = new HighlightsParser();
        parser.getConfig().setOrgUnitFieldName(FIELD_ORG_UNIT);
        return parser;
    }

    protected WrapperDTO newUpsertWrapper(final Highlight highlight) {
        WrapperDTO wrapper = new WrapperDTO(highlight);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.getBeforeExecuteCommand().add(() -> {
            LOGGER.debug("Updating MDS highlights for {}...", highlight.getOrgUnitName());
            return null;
        });
        wrapper.getAfterExecuteCommand().add(() -> {
            LOGGER.info("{} MDS objects for {} marked as highlights.",
                    highlight.getObjectIds().length, highlight.getOrgUnitName());
            this.newHighlightObjIds.addAll(Arrays.asList(highlight.getObjectIds()));
            return null;
        });
        wrapper.getOnError().add(exc -> {
            ErrorHandling.capture(exc, "Highlights sync failed for {}.", highlight.getOrgUnitName());
            return null;
        });
        return wrapper;
    }

    protected WrapperDTO newDeleteWrapper(final Highlight highlight) {
        WrapperDTO wrapper = new WrapperDTO(highlight);
        wrapper.setOperation(Operation.DELETE);
        wrapper.getBeforeExecuteCommand().add(() -> {
            LOGGER.debug("Deleting MDS highlights for {}...", highlight.getOrgUnitName());
            return null;
        });
        wrapper.getAfterExecuteCommand().add(() -> {
            LOGGER.info("Highlights for org-unit {} deleted.", highlight.getOrgUnitName());
            return null;
        });
        wrapper.getOnError().add(exc -> {
            ErrorHandling.capture(exc, "Highlights deletion failed for {}.", highlight.getOrgUnitName());
            return null;
        });
        return wrapper;
    }

    private Search buildHighlightsPayload() {

        Search search = new SearchRequestHelper(this.apiConfig, MODULE_OBJECT_GROUPS)
                .buildSearchPayload(0, Integer.MAX_VALUE, null, null, FIELD_ID);

        ObjectFactory factory = new ObjectFactory();
        StartsWithField smbField = factory.createStartsWithField();
        smbField.setFieldPath(FIELD_OBJECT_GROUP_NAME);
        smbField.setOperand("smb-digital-");
        EndsWithField highlightField = factory.createEndsWithField();
        highlightField.setFieldPath(FIELD_OBJECT_GROUP_NAME);
        highlightField.setOperand("highlights");

        search.getExpert().getAnd().getAndOrOrOrNot().add(smbField);
        search.getExpert().getAnd().getAndOrOrOrNot().add(highlightField);

        return search;
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param result    the result
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncResult result, final LocalDateTime timestamp) {
        SyncCycle sync = new SyncCycle();
        sync.setType(SyncCycleType.HIGHLIGHTS);
        sync.setModule(MODULE_OBJECT_GROUPS);
        sync.setTimestamp(toOffsetDateTime(timestamp));
        sync.setDebugInformation(result.toString());

        WrapperDTO wrapper = new WrapperDTO(sync);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.getOnError().add(exc -> {
            ErrorHandling.capture(exc, "Error updating sync timestamp");
            return null;
        });
        this.dataQueue.add(wrapper);
    }
}
