package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.HighlightService;
import de.smbonline.mdssync.dto.HighlightDTO;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.SyncCycleDTO;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.log.ErrorLogging;
import de.smbonline.mdssync.search.MdsApiClient;
import de.smbonline.mdssync.search.MdsApiConfig;
import de.smbonline.mdssync.search.SearchRequestHelper;
import de.smbonline.mdssync.search.request.EndsWithField;
import de.smbonline.mdssync.search.request.ExpertSearchExpression;
import de.smbonline.mdssync.search.request.ObjectFactory;
import de.smbonline.mdssync.search.request.Search;
import de.smbonline.mdssync.search.request.Select;
import de.smbonline.mdssync.search.request.SelectField;
import de.smbonline.mdssync.search.request.StartsWithField;
import de.smbonline.mdssync.search.response.Module;
import de.smbonline.mdssync.search.response.ModuleItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static de.smbonline.mdssync.log.Loggers.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class HighlightsResolver {

    private static final Logger LOGGER = LoggerFactory.getLogger(HighlightsResolver.class);

    // final members

    private final HighlightService highlightService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final MdsApiConfig mdsConfig;
    private final SearchIndexerConfig indexerConfig;

    private final List<Long> oldHighlightObjIds = new ArrayList<>();
    private final List<Long> newHighlightObjIds = new ArrayList<>();

    // lazy initialized members

    private MdsApiClient highlightApiClient;
    private SearchIndexerClient searchIndexerClient;

    @Autowired
    public HighlightsResolver(
            final MdsApiConfig mdsConfig,
            final SearchIndexerConfig indexerConfig,
            final HighlightService highlightService,
            final DataQueue<WrapperDTO> dataQueue) {
        this.mdsConfig = mdsConfig;
        this.indexerConfig = indexerConfig;
        this.highlightService = highlightService;
        this.dataQueue = dataQueue;
    }

    /*
     * Lazy-init API client. Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected MdsApiClient mdsClient() {
        if (this.highlightApiClient == null) {
            this.highlightApiClient = new MdsApiClient(this.mdsConfig, "ObjectGroup");
        }
        return this.highlightApiClient;
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

    public SyncResult sync() {

        LocalDateTime start = LocalDateTime.now();

        List<String> toBeDeletedOrgUnits = new ArrayList<>(highlightService.getAllHighlightOrgUnits());
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
                HighlightDTO highlight = parser.parseModuleItem(item);
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
                    HighlightDTO highlight = new HighlightDTO();
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
            SyncResult result = new SyncResult(status, Duration.between(start, end));
            saveSyncCycleSuccess(result, start);
            SYNC_LOGGER.info("Highlights sync finished:{}{}", System.lineSeparator(), result.toString());
            return result;

        } catch (MdsApiConnectionException exc) {
            ErrorLogging.log(exc, "Highlights sync failed.");
            return new SyncResult(SyncResult.Status.ERROR, Duration.between(start, LocalDateTime.now()));
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
                boolean delete = this.oldHighlightObjIds.contains(id);
                SearchIndexerClient client = searchIndexerClient();
                if (delete) {
                    client.notifyDeleted(id);
                } else {
                    client.notifyUpdated(id);
                }
            } catch (Exception exc) {
                ErrorLogging.log(exc, "Exception updating search-index for MDS object {}", id);
            }
        }
    }

    protected HighlightsParser newHighlightsParser() {
        HighlightsParser parser = new HighlightsParser();
        parser.getConfig().setOrgUnitFieldName(this.mdsConfig.getFields().getOrgUnitFieldName());
        return parser;
    }

    protected WrapperDTO newUpsertWrapper(final HighlightDTO highlight) {
        WrapperDTO wrapper = new WrapperDTO(highlight);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.setBeforeExecuteCommand(() -> {
            LOGGER.debug("Updating MDS highlights for {} ...", highlight.getOrgUnitName());
            return null;
        });
        wrapper.setAfterExecuteCommand(() -> {
            LOGGER.info("{} MDS objects for {} marked as highlights.",
                    highlight.getObjectIds().size(), highlight.getOrgUnitName());
            this.newHighlightObjIds.addAll(highlight.getObjectIds());
            return null;
        });
        wrapper.setOnError(exc -> {
            ErrorLogging.log(exc, "Highlights sync failed for {}.", highlight.getOrgUnitName());
            return null;
        });
        return wrapper;
    }

    protected WrapperDTO newDeleteWrapper(final HighlightDTO highlight) {
        WrapperDTO wrapper = new WrapperDTO(highlight);
        wrapper.setOperation(Operation.DELETE);
        wrapper.setBeforeExecuteCommand(() -> {
            LOGGER.debug("Deleting MDS highlights for {} ...", highlight.getOrgUnitName());
            return null;
        });
        wrapper.setAfterExecuteCommand(() -> {
            LOGGER.info("Highlights for org-unit {} deleted.", highlight.getOrgUnitName());
            return null;
        });
        wrapper.setOnError(exc -> {
            ErrorLogging.log(exc, "Highlights deletion failed for {}.", highlight.getOrgUnitName());
            return null;
        });
        return wrapper;
    }

    private Search buildHighlightsPayload() {
        ObjectFactory factory = new ObjectFactory();

        SelectField orgUnitField = factory.createSelectField();
        orgUnitField.setFieldPath(this.mdsConfig.getFields().getOrgUnitFieldName()); // "__orgUnit"
        SelectField ogrNameField = factory.createSelectField();
        ogrNameField.setFieldPath(this.mdsConfig.getFields().getHighlightFieldName()); // "OgrNameTxt"
        SelectField objectRefsField = factory.createSelectField();
        objectRefsField.setFieldPath("OgrObjectRef.moduleReferenceItem");
        Select select = factory.createSelect();
        select.getField().add(orgUnitField);
        select.getField().add(ogrNameField);
        select.getField().add(objectRefsField);

        StartsWithField smbField = factory.createStartsWithField();
        smbField.setFieldPath(this.mdsConfig.getFields().getHighlightFieldName()); // "OgrNameTxt"
        smbField.setOperand("smb-digital-");
        EndsWithField highlightField = factory.createEndsWithField();
        highlightField.setFieldPath(this.mdsConfig.getFields().getHighlightFieldName()); // "OgrNameTxt"
        highlightField.setOperand("highlights");
        ExpertSearchExpression expert = factory.createExpertSearchExpression();
        expert.setAnd(SearchRequestHelper.and(smbField, highlightField));

        Search search = factory.createSearch();
        search.setSelect(select);
        search.setExpert(expert);
        return search;
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param result    the result
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncResult result, final LocalDateTime timestamp) {
        SyncCycleDTO sync = new SyncCycleDTO();
        sync.setType(SyncCycleDTO.Type.HIGHLIGHTS);
        sync.setTimestamp(OffsetDateTime.from(timestamp.atZone(ZoneId.systemDefault())));
        sync.setDebugInformation(result.toString());
        WrapperDTO wrapper = new WrapperDTO(sync);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.setOnError(exc -> {
            ErrorLogging.log(exc, "Error updating sync timestamp");
            return null;
        });
        this.dataQueue.add(wrapper);
    }
}
