package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.IgnorableKeyService;
import de.smbonline.mdssync.dataprocessor.service.LanguageService;
import de.smbonline.mdssync.dataprocessor.service.ObjectService;
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService;
import de.smbonline.mdssync.dto.AttributeDTO;
import de.smbonline.mdssync.dto.ObjectDTO;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.SyncCycleDTO;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.parser.ModuleItemParser;
import de.smbonline.mdssync.exec.parser.ModuleItemParserFactory;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.jaxb.search.request.Not;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.log.ErrorLogging;
import de.smbonline.mdssync.ruleset.ExhibitionSpaceRule;
import de.smbonline.mdssync.util.ValueExtractor;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DurationFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static de.smbonline.mdssync.exec.parser.ParserUtils.*;
import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Validations.*;

/**
 * Executes a sync cycle. Note this class must not be reused for multiple syncs.
 * In other words you should never invoke {@code sync} methods of the same instance more than once.
 */
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class SyncExecuter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SyncExecuter.class);

    // spring beans

    private final ObjectService objectService;
    private final LanguageService langService;
    private final SyncCycleService cycleService;
    private final IgnorableKeyService ignorableKeyService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final ObjectProvider<AttachmentsResolver> attachmentsResolverProvider;

    // final members

    private final MdsApiConfig mdsConfig;
    private final SearchIndexerConfig indexerConfig;
    private final MdsApiClientFactory clientFactory;
    private final Config config;
    private final State state;
    private final StopWatch tasksWatch;
    private final StopWatch syncWatch;
    private final SearchRequestHelper requestHelper;

    // lazy initialized members

    private AttachmentsResolver attachmentsResolver;
    private SearchIndexerClient searchIndexerClient;

    @Autowired
    public SyncExecuter(
            final MdsApiConfig mdsConfig,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerConfig indexerConfig,
            final ObjectService objectService,
            final LanguageService langService,
            final SyncCycleService cycleService,
            final IgnorableKeyService ignoreService,
            final DataQueue<WrapperDTO> dataQueue,
            final ObjectProvider<AttachmentsResolver> attachmentsResolverProvider) {
        this.config = new Config();
        this.state = new State();
        this.tasksWatch = new StopWatch("Tasks");
        this.syncWatch = new StopWatch("Sync");
        this.requestHelper = new SearchRequestHelper(mdsConfig, MODULE_OBJECTS);

        this.mdsConfig = mdsConfig;
        this.indexerConfig = indexerConfig;
        this.clientFactory = clientFactory;
        this.objectService = objectService;
        this.langService = langService;
        this.cycleService = cycleService;
        this.ignorableKeyService = ignoreService;
        this.dataQueue = dataQueue;
        this.attachmentsResolverProvider = attachmentsResolverProvider;
    }

    /*
     * Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected MdsApiClient mdsClient() {
        return this.clientFactory.getApiClient(MODULE_OBJECTS);
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
     * Lazy-init AttachmentsResolver. Method is protected to allow overriding in test cases.
     * @return AttachmentsResolver
     */
    protected AttachmentsResolver attachmentsResolver() {
        if (this.attachmentsResolver == null) {
            this.attachmentsResolver = this.attachmentsResolverProvider.getObject();
        }
        return this.attachmentsResolver;
    }

    /**
     * @throws IllegalStateException if instance was already used
     */
    private void ensureSingleUsage() {
        synchronized (this.state) {
            if (this.state.phase != State.Phase.NOT_STARTED) {
                throw new IllegalStateException("sync has already been started by this instance");
            }
            this.state.phase = State.Phase.RUNNING;
        }
    }

    /**
     * We know the sync can be memory-sensitive so we try to free as much memory as possible before each sync.
     */
    private void ensureEnoughMemory() {
        System.gc();
    }

    /**
     * Returns keys to be ignored when attributes are synced. Main purpose is for debugging and testing.
     *
     * @return ignored keys
     */
    public String[] getIgnoredKeys() {
        String[] keys = getIgnorableKeys(); // ensure not null
        return Arrays.copyOf(keys, keys.length);
    }

    /**
     * @return sync result
     * @throws IllegalStateException if sync has already been started with this instance
     */
    public synchronized SyncResult syncDeleted() {
        ensureSingleUsage();
        ensureEnoughMemory();

        try {

            // prepare
            this.syncWatch.start();
            LocalDateTime thisSyncStartTime = LocalDateTime.now();
            Search request = this.requestHelper.buildSearchDeletedPayload();
            Module response = mdsClient().search(request, null);

            // run
            Long[] ids = parseAndProcess(response, newObjectParser(getSupportedLanguages()[0]), false, false);
            this.state.processedIds = Set.of(ids);

            // done
            this.syncWatch.stop();
            this.state.finished();
            saveSyncCycleSuccess(SyncCycleDTO.Type.DELETIONS, thisSyncStartTime);
            printStatistics();

        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        return createResultSnapshot();
    }

    public synchronized SyncResult sync(final Long... mdsObjectIds) {
        ensureSingleUsage();
        ensureEnoughMemory();

        SyncResult result = null;
        try {

            this.syncWatch.start();
            LocalDateTime thisSyncStartTime = LocalDateTime.now();
            LOGGER.debug("Starting manually requested sync for {} ids.", mdsObjectIds.length);

            this.state.expectedTotalSize = mdsObjectIds.length;

            String[] languages = getSupportedLanguages();
            // run first round with default language
            Long[] ids = runSync(mdsObjectIds, languages[0], true, true);
            this.state.processedIds = Set.of(ids);
            Long[] successfulIds = this.state.successfulIds.toArray(new Long[0]);
            // update for all other languages
            for (int i = 1; i < languages.length; i++) {
                runSync(successfulIds, languages[i], false, true);
            }

            this.syncWatch.stop();
            this.state.finished();
            LOGGER.debug("Manually requested sync finished.");
            result = createResultSnapshot();

            if (Objects.requireNonNull(result.getSkippedIds()).length != 0) {
                LOGGER.warn("Sync diff - Requested {} ids, only {} were synced.", this.state.expectedTotalSize, ids.length);
                if (LOGGER.isTraceEnabled()) {
                    LOGGER.warn("  Skipped ids: {}", Arrays.toString(result.getSkippedIds()));
                }
            }

            saveSyncCycleSuccess(SyncCycleDTO.Type.MANUAL, thisSyncStartTime);
            printStatistics();
        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        if (result == null) {
            result = createResultSnapshot();
        }
        return result;
    }

    public synchronized SyncResult sync() {
        ensureSingleUsage();
        ensureEnoughMemory();

        try {

            // prepare
            this.syncWatch.start();
            LocalDateTime lastSyncStartTime = getLastSyncDate(SyncCycleDTO.Type.INCREMENTAL);
            LocalDateTime thisSyncStartTime = LocalDateTime.now();

            // run
            runNewSync(lastSyncStartTime, thisSyncStartTime, false);

            // done
            this.syncWatch.stop();
            this.state.finished();
            saveSyncCycleSuccess(SyncCycleDTO.Type.INCREMENTAL, thisSyncStartTime);
            printStatistics();

        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        return createResultSnapshot();
    }

    public synchronized SyncResult sync(final LocalDateTime start, final LocalDateTime end) {
        ensureSingleUsage();
        ensureEnoughMemory();
        ensureStartBeforeEnd(start, end);

        try {

            // prepare
            this.syncWatch.start();
            LocalDateTime thisSyncStartTime = LocalDateTime.now();

            // run
            runNewSync(start, end, false);

            // done
            this.syncWatch.stop();
            this.state.finished();
            saveSyncCycleSuccess(SyncCycleDTO.Type.MANUAL, thisSyncStartTime);
            printStatistics();

        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        return createResultSnapshot();
    }

    private void runNewSync(final LocalDateTime start, final LocalDateTime end, final boolean force)
            throws MdsApiConnectionException {

        String[] languages = getSupportedLanguages();

        // run first round with default language
        Long[] ids = runSync(start, end, languages[0], true, force);
        this.state.processedIds = Set.of(ids);
        Long[] successfulIds = this.state.successfulIds.toArray(Long[]::new);

        // update for all other languages
        for (int i = 1; i < languages.length; i++) {
            runSync(successfulIds, languages[i], false, force);
        }
    }

    private Long[] runSync(
            final LocalDateTime start,
            final LocalDateTime end,
            final String language,
            final boolean includingAttachments,
            final boolean force) throws MdsApiConnectionException {

        // collector for all synced ids
        Set<Long> ids = new LinkedHashSet<>();

        Chunk chunk = runSyncChunked(start, end, language, 0, this.config.getPageSize(), includingAttachments, force);
        ids.addAll(Arrays.asList(chunk.ids));

        // first invocation sets the expected number of search results
        this.state.expectedTotalSize = chunk.total;

        // query subsequent pages in loop
        while (chunk.offset + chunk.limit < chunk.total) {
            chunk = runSyncChunked(start, end, language, chunk.offset + chunk.limit, chunk.limit, includingAttachments, force);
            ids.addAll(Arrays.asList(chunk.ids));
            // in case there were updates in between the first request and this one we need to run an amendment search at the end
            if (chunk.total != this.state.expectedTotalSize) {
                this.state.amendmentSearchRequired = true;
            }
        }

        // we reached the last page, perform amendment search if required
        if (this.state.amendmentSearchRequired) {
            String sort = "+" + FIELD_ID; // means id ASC
            Not excludes = this.requestHelper.buildExcludeFilter(ids.toArray(Long[]::new));
            Search request = this.requestHelper.buildSearchPayload(0, Integer.MAX_VALUE, start, end, sort, excludes);
            Module response = mdsClient().search(request, language);
            Long[] rest = parseAndProcess(response, newObjectParser(language), includingAttachments, force);
            ids.addAll(Arrays.asList(rest));
        }

        return ids.toArray(Long[]::new);
    }

    private Long[] runSync(
            final Long[] mdsObjectIds,
            final String language,
            final boolean includingAttachments,
            final boolean force) throws MdsApiConnectionException {

        Set<Long> processedIds = new LinkedHashSet<>();
        for (int offset = 0, limit = this.config.getPageSize(); offset < mdsObjectIds.length; offset += limit) {
            // execute paginated search
            int chunkSize = Math.min(limit, mdsObjectIds.length - offset);
            Long[] mdsIds = Arrays.copyOfRange(mdsObjectIds, offset, offset + chunkSize);
            Search request = this.requestHelper.buildSearchPayload(mdsIds);
            request.setLoadAttachment(false);
            Module response = mdsClient().search(request, language);
            // process paginated search results
            Long[] ids = parseAndProcess(response, newObjectParser(language), includingAttachments, force);
            // collect all processed ids
            processedIds.addAll(Arrays.asList(ids));
            // all ids, that were requested but are not processed, may reference objects that are no longer published for SMB - so we better remove those
            Long[] diff = ArrayUtils.removeElements(mdsIds, ids);
            if (diff.length != 0) {
                Arrays.stream(diff).forEach(id -> {
                    ObjectDTO obj = new ObjectDTO(id, language);
                    processedIds.add(id);
                    process(obj, Operation.DELETE);
                });
            }
        }
        return processedIds.toArray(Long[]::new);
    }

    private Chunk runSyncChunked(
            final LocalDateTime start,
            final LocalDateTime end,
            final String language,
            final int offset,
            final int limit,
            final boolean includingAttachments,
            final boolean force) throws MdsApiConnectionException {

        // execute paginated search
        String sort = "+" + FIELD_ID; // means id ASC
        Search payload = this.requestHelper.buildSearchPayload(offset, limit, start, end, sort);
        payload.setLoadAttachment(false);
        Module response = mdsClient().search(payload, language);

        // convert JAXB objects to DTOs, then enqueue DTOs for updating
        Long[] ids = parseAndProcess(response, newObjectParser(language), includingAttachments, force);

        // return
        Chunk chunk = new Chunk();
        chunk.ids = ids;
        chunk.offset = offset;
        chunk.limit = limit;
        chunk.total = response.getTotalSize().intValue();
        return chunk;
    }

    private Long[] parseAndProcess(
            final Module module,
            final ModuleItemParser<ObjectDTO> parser,
            final boolean includingAttachments,
            final boolean force) {

        Set<Long> ids = new LinkedHashSet<>();
        for (ModuleItem moduleItem : module.getModuleItem()) {

            // parse object and attributes
            ObjectDTO obj = parser.parseModuleItem(moduleItem);
            Long id = obj.getMdsId();
            ids.add(id);

            // check if we need to delete or upsert the object
            boolean delete = isDeleted(obj);// || !obj.getApproved();

            // don't actually start the processing if there is no need for it
            boolean needsProcessing = force || delete || !isUpToDate(obj);
            if (!needsProcessing) {
                continue;
            }

            if (delete) {
                // clean-up parsed attributes, only keep what is relevant
                obj.getAttributes().clear();
            } else {
                try {
                    // additional attributes calculation and cleanup is necessary
                    resolveAdditionalAttributes(moduleItem, obj, parser.getLanguage());
                } catch (MdsApiConnectionException exc) {
                    flagFailed(id);
                    ErrorLogging.log(exc, "Exception updating module references of MDS object {}", id);
                }
            }

            // do the processing
            if (!hasFailed(id)) {
                process(obj, delete ? Operation.DELETE : Operation.UPSERT);
            }

            // if sync was ok, also sync attachment images if needed
            if (hasSucceeded(id) && includingAttachments && !delete && moduleItem.isHasAttachments()) {
                try {
                    attachmentsResolver().processAttachments(moduleItem);
                } catch (MdsApiConnectionException exc) {
                    flagFailed(id);
                    ErrorLogging.log(exc, "Exception updating attachments of MDS object {}", id);
                }
            }

            // if sync was ok, also update search index if desired
            if (hasSucceeded(id) && this.indexerConfig.isShouldUpdate()) {
                try {
                    LOGGER.debug("Updating search index...");
                    SearchIndexerClient client = searchIndexerClient();
                    if (delete) {
                        client.notifyDeleted(id);
                    } else {
                        client.notifyUpdated(id);
                    }
                } catch (Exception exc) {
                    flagFailed(id);
                    ErrorLogging.log(exc, "Exception updating search-index for MDS object {}", id);
                }
            }
        }
        return ids.toArray(Long[]::new);
    }

    private void process(final ObjectDTO obj, final Operation op) {
        this.dataQueue.add(newWrapper(obj, op));
    }

    private boolean hasSucceeded(final Long objId) {
        synchronized (this.state) {
            return this.state.successfulIds.contains(objId);
        }
    }

    private boolean hasFailed(final Long objId) {
        synchronized (this.state) {
            return this.state.failedIds.contains(objId);
        }
    }

    private void flagSuccessful(final Long objId) {
        synchronized (this.state) {
            this.state.failedIds.remove(objId);
            this.state.successfulIds.add(objId);
        }
    }

    private void flagFailed(final Long objId) {
        synchronized (this.state) {
            this.state.successfulIds.remove(objId);
            this.state.failedIds.add(objId);
        }
    }

    private boolean isDeleted(final ObjectDTO obj) {
        return ORGUNIT_TRASHBIN.equals(extractOrgUnit(obj));
    }

    private boolean isUpToDate(final ObjectDTO obj) {
        AttributeDTO lastUpdatedAttr = findFirst(obj.getAttributes(), a -> FIELD_LAST_MODIFIED.equals(a.getKey()));
        if (lastUpdatedAttr == null || lastUpdatedAttr.getValue() == null) {
            // no info available - we need to assume object is not up-to-date
            return false;
        }
        OffsetDateTime lastSynced = this.objectService.getLastUpdated(obj.getMdsId());
        if (lastSynced == null) {
            // never synced, hence not up-to-date
            return false;
        }

        // compare update and sync dates
        String isoDateString = lastUpdatedAttr.getValue().replace(' ', 'T'); // convert "2021-11-11 09:51:18.661" to "2021-11-11T09:51:18.661"
        OffsetDateTime lastUpdated = LocalDateTime.parse(isoDateString).atZone(ZoneId.systemDefault()).toOffsetDateTime();
        return lastSynced.isAfter(lastUpdated);
    }

    private void resolveAdditionalAttributes(final ModuleItem moduleItem, final ObjectDTO obj, final String language)
            throws MdsApiConnectionException {

        String exhibitionSpace = calculateExhibitionSpace(moduleItem);
        applyExhibitionSpace(obj, exhibitionSpace);

        List<AttributeDTO> literature = resolveModuleReferences(moduleItem, "ObjLiteratureRef", language);
        obj.getAttributes().addAll(literature);

        List<AttributeDTO> exhibitions = resolveModuleReferences(moduleItem, "ObjRegistrarRef", language);
        obj.getAttributes().addAll(exhibitions);

        List<AttributeDTO> provenance = resolveModuleReferences(moduleItem, "ObjOwnership001Ref", language);
        obj.getAttributes().addAll(provenance);
    }

    private List<AttributeDTO> resolveModuleReferences(
            final ModuleItem moduleItem,
            final String moduleRefName,
            final String language) throws MdsApiConnectionException {

        // prepare response
        List<AttributeDTO> attributes = new ArrayList<>();

        // find references
        ModuleReference moduleRef = findFirst(moduleItem.getModuleReference(), ref -> moduleRefName.equals(ref.getName()));
        if (moduleRef == null) {
            return attributes;
        }

        // fetch referenced module items and prepare parser
        List<ModuleItem> moduleItems = fetchReferencedModuleItems(moduleRef, language);
        ModuleItemParser<?> parser = ModuleItemParserFactory.getParser(moduleRef.getTargetModule(), language);

        // parse nested module items
        for (ModuleItem nestedItem : moduleItems) {
            int seqNo = findSequenceNumber(nestedItem.getId(), moduleRef.getModuleReferenceItem());
            List<AttributeDTO> nestedAttributes = parser.parseModuleItem(nestedItem).getAttributes();
            if ("ObjRegistrarRef".equals(moduleRefName)) {
                // "Registrar" has yet another level of reference to "Exhibition"
                nestedAttributes.addAll(resolveModuleReferences(nestedItem, "RegExhibitionRef", language));
            }
            if ("ObjOwnership001Ref".equals(moduleRefName)) {
                // "Ownership" has yet another level of reference to "Person"
                nestedAttributes.addAll(resolveModuleReferences(nestedItem, "OwnPersonMNRef", language));
            }
            // we need to adjust the parsed keys by prepending parent info
            nestedAttributes.forEach(attr -> {
                String nestedFqKey = StringUtils.substringAfter(attr.getFqKey(), "].");
                String fqKey = String.format("[%d].%s.moduleReferenceItem[%s].%s",
                        moduleItem.getId(), moduleRefName, toItemId(nestedItem.getId(), seqNo), nestedFqKey);
                attr.setFqKey(fqKey);
                attr.setKey(toKey(fqKey));
            });
            attributes.addAll(nestedAttributes);
        }

        // done
        return attributes;
    }

    private List<ModuleItem> fetchReferencedModuleItems(final ModuleReference moduleRef, final String language)
            throws MdsApiConnectionException {

        // prepare search in referenced module
        MdsApiClient client = this.clientFactory.getApiClient(moduleRef.getTargetModule());
        Long[] itemIds = moduleRef.getModuleReferenceItem()
                .stream()
                .map(ModuleReferenceItem::getModuleItemId)
                .toArray(Long[]::new);
        SearchRequestHelper helper = new SearchRequestHelper(this.mdsConfig, client.getModuleName());

        // run the search
        Search search = helper.buildSearchPayload(itemIds);
        Module module = client.search(search, language);
        return module.getModuleItem();
    }

    private int findSequenceNumber(final Long itemId, final List<ModuleReferenceItem> refItems) {
        return refItems.stream()
                .filter(item -> item.getModuleItemId().equals(itemId))
                .findFirst()
                .map(ValueExtractor::extractSortInfo)
                .orElse(-1);
    }

    private @Nullable String extractOrgUnit(final ObjectDTO obj) {
        AttributeDTO orgUnit = findOne(obj.getAttributes(), attr -> FIELD_ORG_UNIT.equals(attr.getKey()));
        return orgUnit == null ? null : orgUnit.getValue();
    }

    private @Nullable String calculateExhibitionSpace(final ModuleItem moduleItem) {
        return new ExhibitionSpaceRule().apply(moduleItem);
    }

    private void applyExhibitionSpace(final ObjectDTO obj, final @Nullable String exhibitionSpace) {
        if (exhibitionSpace != null) {
            obj.setExhibitionSpace(exhibitionSpace);
        } else {
            obj.getAttributes().removeIf(attr -> {
                String key = attr.getKey();
                return key.startsWith("ObjNormalLocation") || key.startsWith("ObjCurrentLocation");
            });
        }
    }

    private ModuleItemParser<ObjectDTO> newObjectParser(final String language) {
        ModuleItemParser<ObjectDTO> parser = ModuleItemParserFactory.getParser(MODULE_OBJECTS, language);
        parser.setSkipEmptyValues(this.config.isSkipEmptyValues());
        parser.addIgnorableKeys(getIgnorableKeys());
        return parser;
    }

    private WrapperDTO newWrapper(final ObjectDTO obj, final Operation op) {
        WrapperDTO wrapper = new WrapperDTO(obj);
        wrapper.setOperation(op);
        wrapper.setAfterExecuteCommand(() -> {
            flagSuccessful(obj.getMdsId());
            this.tasksWatch.stop();
            LOGGER.info("MDS object {} {}. (duration={}ms)", obj.getMdsId(), (op == Operation.DELETE ? "deleted" : "updated"), tasksWatch.getLastTaskTimeMillis());
            return null;
        });
        wrapper.setBeforeExecuteCommand(() -> {
            this.tasksWatch.start(String.valueOf(obj.getMdsId()));
            LOGGER.debug("{} MDS object {}...", (op == Operation.DELETE ? "Deleting" : "Updating"), obj.getMdsId());
            return null;
        });
        wrapper.setOnError(exc -> {
            flagFailed(obj.getMdsId());
            this.tasksWatch.stop();
            ErrorLogging.log(exc, "Exception executing {} on MDS object {}", op, obj.getMdsId());
            return null;
        });
        return wrapper;
    }

    private String[] getIgnorableKeys() {
        synchronized (this.state) {
            if (this.state.ignorableKeys == null) {
                // get configured ignorable keys
                List<String> keys = new ArrayList<>(this.ignorableKeyService.getIgnorableKeys());
                // add certain module-references - we are going to resolve them additionally later
                keys.add("ObjLiteratureRef");
                keys.add("ObjRegistrarRef");
                keys.add("ObjOwnership001Ref");
                // store the keys in our sync state
                this.state.ignorableKeys = keys.toArray(String[]::new);
            }
            return this.state.ignorableKeys;
        }
    }

    private LocalDateTime getLastSyncDate(final SyncCycleDTO.Type type) {
        OffsetDateTime lastSync = Optional.ofNullable(this.cycleService.getLastSyncCycle(type))
                .orElse(OffsetDateTime.ofInstant(Instant.EPOCH, ZoneId.systemDefault()));
        return lastSync.toLocalDateTime();
    }

    private String[] getSupportedLanguages() {
        List<String> languages = this.langService.getSupportedLanguages();
        return languages.isEmpty()
                ? new String[]{this.config.getDefaultLanguage()}
                : languages.toArray(String[]::new);
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param type      type of sync
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncCycleDTO.Type type, final LocalDateTime timestamp) {
        SyncCycleDTO sync = new SyncCycleDTO();
        sync.setType(type);
        sync.setTimestamp(OffsetDateTime.from(timestamp.atZone(ZoneId.systemDefault())));
        sync.setDebugInformation(buildExecutionInfoMessage(type));
        WrapperDTO wrapper = new WrapperDTO(sync);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.setOnError(exc -> {
            ErrorLogging.log(exc, "Error updating sync timestamp");
            return null;
        });
        this.dataQueue.add(wrapper);
    }

    private void printStatistics() {
        StringBuilder sb = new StringBuilder(System.lineSeparator());
        sb.append("Sync of ")
                .append(this.tasksWatch.getTaskCount())
                .append(" Objects finished in ")
                .append(String.format("%.2f", this.syncWatch.getTotalTimeSeconds()))
                .append(" seconds. Avg: ")
                .append(String.format("%.2f", (this.syncWatch.getTotalTimeSeconds() / this.tasksWatch.getTaskCount())))
                .append(" sec (avg. processing excl. MDS-API communication: ")
                .append(String.format("%.2f", (this.tasksWatch.getTotalTimeSeconds() / this.tasksWatch.getTaskCount())))
                .append(" sec)");

        StopWatch.TaskInfo[] tasks = this.tasksWatch.getTaskInfo();
        Arrays.sort(tasks, Comparator.comparing(StopWatch.TaskInfo::getTimeMillis).reversed());
        StopWatch.TaskInfo[] longestTasks = ArrayUtils.subarray(tasks, 0, 10);
        if (longestTasks.length > 0) {
            sb.append(System.lineSeparator())
                    .append("Longest processing tasks (excl. MDS-API communication)")
                    .append(System.lineSeparator()).append(StringUtils.rightPad("Object", 11))
                    .append("Duration")
                    .append(System.lineSeparator()).append(StringUtils.repeat('-', 19));
            for (StopWatch.TaskInfo task : longestTasks) {
                sb.append(System.lineSeparator())
                        .append(StringUtils.rightPad(task.getTaskName(), 11))
                        .append(String.format("%8.2f", task.getTimeSeconds()));
            }
        }
        SYNC_LOGGER.info(sb.toString());
    }

    private SyncResult createResultSnapshot() {
        synchronized (this.state) {
            Collection<Long> skippedIds = new ArrayList<>(this.state.processedIds);
            skippedIds.removeAll(this.state.successfulIds);
            skippedIds.removeAll(this.state.failedIds);
            return new SyncResult(
                    this.state.successfulIds.toArray(Long[]::new),
                    this.state.failedIds.toArray(Long[]::new),
                    skippedIds.toArray(Long[]::new),
                    Duration.ofMillis(this.syncWatch.getTotalTimeMillis())
            );
        }
    }

    private String buildExecutionInfoMessage(final SyncCycleDTO.Type type) {
        String lineEnd = "\n";

        StringBuilder sb = new StringBuilder()
                .append("Duration: ")
                .append(DurationFormatUtils.formatDurationHMS(this.syncWatch.getTotalTimeMillis()));

        synchronized (this.state) {
            if (type == SyncCycleDTO.Type.INCREMENTAL || type == SyncCycleDTO.Type.MANUAL) {
                int successful = this.state.successfulIds.size();
                if (successful > 20) {
                    sb.append(lineEnd).append("Synced objects: ").append(successful);
                } else {
                    String ids = this.state.successfulIds.stream().map(String::valueOf).collect(Collectors.joining(","));
                    sb.append(lineEnd).append("Synced ids: [").append(ids).append("]");
                }
                String ids = this.state.failedIds.stream().map(String::valueOf).collect(Collectors.joining(","));
                sb.append(lineEnd).append("Failed ids: [").append(ids).append("]");
            }
            if (type == SyncCycleDTO.Type.DELETIONS) {
                String ids = this.state.successfulIds.stream().map(String::valueOf).collect(Collectors.joining(","));
                sb.append(lineEnd).append("Removed ids: [").append(ids).append("]");
            }
        }

        return sb.toString();
    }

    private void handleException(final Exception exc) {
        ErrorLogging.log(exc, "Sync failed");
        this.state.phase = State.Phase.ERROR;
    }

    private void handleSyncFinished() {
        if (this.syncWatch.isRunning()) {
            this.syncWatch.stop();
        }
        System.gc();
    }

    @Override
    public String toString() {
        synchronized (this.state) {
            StringBuilder sb = new StringBuilder("syncExecuter: { ")
                    .append("state: { ")
                    .append("phase: ").append(this.state.phase)
                    .append(" }");
            if (this.state.phase != State.Phase.NOT_STARTED) {
                sb.append(", ").append(createResultSnapshot());
            }
            sb.append(" }"); // close SyncExecuter
            return sb.toString();
        }
    }

    /**
     * holder object for fleeting attributes
     */
    private static class State {
        private enum Phase {
            NOT_STARTED("not started"),
            RUNNING("running"),
            FINISHED("finished"),
            ERROR("failed");

            private final String string;

            Phase(final String str) {
                this.string = str;
            }

            @Override
            public String toString() {
                return this.string;
            }
        }

        private Phase phase = Phase.NOT_STARTED;
        private Set<Long> processedIds = new LinkedHashSet<>();
        private final Set<Long> successfulIds = new LinkedHashSet<>();
        private final Set<Long> failedIds = new LinkedHashSet<>();
        private int expectedTotalSize;
        private boolean amendmentSearchRequired;
        private String[] ignorableKeys;

        private void finished() {
            this.phase = this.failedIds.isEmpty() ? Phase.FINISHED : Phase.ERROR;
        }
    }

    /**
     * One page of paginated processing
     */
    private static class Chunk {
        private Long[] ids;
        private int offset;
        private int limit;
        private int total;
    }

    public static class Config {

        private int pageSize = 25;
        private String defaultLanguage = "de";
        private boolean skipEmptyValues = true;

        public int getPageSize() {
            return this.pageSize;
        }

        public void setPageSize(final int pageSize) {
            this.pageSize = pageSize;
        }

        public String getDefaultLanguage() {
            return this.defaultLanguage;
        }

        public void setDefaultLanguage(final String lang) {
            this.defaultLanguage = lang;
        }

        public void setSkipEmptyValues(final boolean skip) {
            this.skipEmptyValues = skip;
        }

        public boolean isSkipEmptyValues() {
            return this.skipEmptyValues;
        }
    }
}
