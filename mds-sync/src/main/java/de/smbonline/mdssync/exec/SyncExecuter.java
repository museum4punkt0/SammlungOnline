package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.LanguageService;
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.resolvers.ModuleItemResolver;
import de.smbonline.mdssync.exec.resolvers.ResolverContext;
import de.smbonline.mdssync.exec.resolvers.ResolverRegistry;
import de.smbonline.mdssync.exec.resolvers.ResolverResult;
import de.smbonline.mdssync.jaxb.search.request.Not;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.rest.Data;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;
import static de.smbonline.mdssync.util.Validations.*;

/**
 * Executes a sync cycle. Note this class must not be reused for multiple syncs.
 * In other words you should never invoke {@code sync} methods of the same instance more than once.
 */
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class SyncExecuter implements PartialSyncRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(SyncExecuter.class);

    // spring beans

    private final LanguageService langService;
    private final SyncCycleService cycleService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final ResolverRegistry registry;

    // final members

    private final MdsApiConfig mdsConfig;
    private final MdsApiClientFactory clientFactory;
    private final Config config;
    private final State state;
    private final StopWatch tasksWatch;
    private final StopWatch syncWatch;

    // lazy initialized members

    private String moduleName;
    private SearchRequestHelper requestHelper;
    private ModuleItemResolver resolver;

    @Autowired
    public SyncExecuter(
            final MdsApiConfig mdsConfig,
            final MdsApiClientFactory clientFactory,
            final LanguageService langService,
            final SyncCycleService cycleService,
            final DataQueue<WrapperDTO> dataQueue,
            final ResolverRegistry registry) {
        this.config = new Config();
        this.state = new State();
        this.tasksWatch = new StopWatch("Tasks");
        this.syncWatch = new StopWatch("Sync");

        this.mdsConfig = mdsConfig;
        this.clientFactory = clientFactory;
        this.langService = langService;
        this.cycleService = cycleService;
        this.dataQueue = dataQueue;
        this.registry = registry;
    }

    public String getModuleName() {
        return this.moduleName;
    }

    public Config getConfig() {
        return this.config;
    }

    // FIXME remove this and make it a constructor argument
    public void setModuleName(final String module) {
        if (this.moduleName != null && !this.moduleName.equals(module)) {
            throw new IllegalStateException("Module already set to " + this.moduleName);
        }
        this.moduleName = module;
    }

    /*
     * Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected MdsApiClient mdsClient() {
        return this.clientFactory.getApiClient(this.moduleName);
    }

    /*
     * Lazy-init SearchRequestHelper. {@link #setModuleName(String)} must have been called prior to first invocation.
     * @return SearchRequestHelper
     */
    protected SearchRequestHelper searchRequestHelper() {
        if (this.requestHelper == null) {
            this.requestHelper = new SearchRequestHelper(this.mdsConfig, this.moduleName);
        }
        return this.requestHelper;
    }

    protected ModuleItemResolver resolver() {
        if (this.resolver == null) {
            ModuleItemResolver delegate = this.registry.getResolver(this.moduleName);
            delegate.addBeforeExecuteCommandListener(this::beforeExecuteCommand);
            delegate.addAfterExecuteCommandListener(this::afterExecuteCommand);
            delegate.addOnErrorExecuteCommandListener(this::errorExecuteCommand);
            this.resolver = delegate;
        }
        return this.resolver;
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
     * @throws IllegalStateException if module name is not set
     */
    private void ensureInitialized() {
        if (this.moduleName == null) {
            throw new IllegalStateException("setModuleName(String) must be called prior to invoking sync method");
        }
    }

    /**
     * We know the sync can be memory-sensitive so we try to free as much memory as possible before each sync.
     */
    private void ensureEnoughMemory() {
        System.gc();
    }

    @Override
    public Data getStatusInfo() {
        synchronized (this.state) {
            String instancePrefix = StringUtils.defaultString(this.moduleName, "Uninitialized");
            Data data = new Data()
                    .setAttribute("instance", instancePrefix + "SyncExecuter")
                    .setAttribute(ATTR_STATUS, this.state.phase);
            if (this.state.phase == State.Phase.NOT_STARTED) {
                data.setAttribute(ATTR_RESULT, null);
            } else {
                data.setAttribute(ATTR_RESULT, createResultSnapshot().toJson());
            }
            return data;
        }
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{module=" + this.moduleName + "}";
    }

    /**
     * @return sync result
     * @throws IllegalStateException if sync has already been started with this instance
     */
    public synchronized SyncResult syncDeleted() {
        ensureInitialized();
        ensureSingleUsage();
        ensureEnoughMemory();

        try {

            // prepare
            this.syncWatch.start();
            OffsetDateTime thisSyncStartTime = OffsetDateTime.now(MDS_DATE_ZONE);
            ResolverContext ctx = ResolverContext.of(getSupportedLanguages()[0], false);

            // run deletion sync
            runSyncDeleted(ctx);

            // run "not approved anymore" sync
            runSyncNotApproved(ctx);

            // done
            this.syncWatch.stop();
            saveSyncCycleSuccess(SyncCycleType.DELETIONS, thisSyncStartTime);
            printStatistics();

        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        return createResultSnapshot();
    }

    private void runSyncDeleted(final ResolverContext ctx) throws MdsApiConnectionException {
        Search request = searchRequestHelper().buildSearchDeletedPayload();
        for (long offset = 0, limit = this.config.getPageSize() * 10L, total = -1; total == -1 || offset < total; offset += limit) {
            request.setOffset(offset);
            request.setLimit(limit);
            Module response = mdsClient().search(request, null);
            total = response.getTotalSize();
            ResolverResult result = resolver().parseAndProcess(response, ctx);
            updateState(result);
        }
    }

    private void runSyncNotApproved(final ResolverContext ctx) throws MdsApiConnectionException {
        Search request = searchRequestHelper().buildSearchNotApprovedPayload();
        for (long offset = 0, limit = this.config.getPageSize() * 10L, total = -1; total == -1 || offset < total; offset += limit) {
            request.setOffset(offset);
            request.setLimit(limit);
            Module response = mdsClient().search(request, null);
            total = response.getTotalSize();
            // pretend the items are deleted which simplifies removal from datastore
            response = markAsDeleted(response.getModuleItem().stream().map(ModuleItem::getId).toArray(Long[]::new));
            ResolverResult result = resolver().parseAndProcess(response, ctx);
            updateState(result);
        }
    }

    public synchronized SyncResult sync(final Long... entityIds) {
        ensureInitialized();
        ensureSingleUsage();
        ensureEnoughMemory();

        SyncResult result = null;
        try {

            this.syncWatch.start();
            OffsetDateTime thisSyncStartTime = OffsetDateTime.now(MDS_DATE_ZONE);
            LOGGER.debug("Starting manually requested sync for {} ids.", entityIds.length);

            this.state.expectedTotalSize = entityIds.length;

            String[] languages = getSupportedLanguages();
            // run first round with default language
            runSync(entityIds, ResolverContext.of(languages[0], true));
            // update for all the other languages - except Attachments which are single-language
            if (languages.length > 1 && !MODULE_MULTIMEDIA.equals(this.moduleName)) {
                Long[] successfulIds = this.state.successfulIds.toArray(new Long[0]);
                for (int i = 1; i < languages.length; i++) {
                    runSync(successfulIds, ResolverContext.of(languages[i], true));
                }
            }

            this.syncWatch.stop();
            LOGGER.debug("Manually requested sync finished.");
            result = createResultSnapshot();

            if (Objects.requireNonNull(result.getSkippedIds()).length != 0) {
                int sum = this.state.successfulIds.size() + this.state.failedIds.size();
                LOGGER.warn("Sync diff - Requested {} ids, only {} were handled.", this.state.expectedTotalSize, sum);
                if (LOGGER.isTraceEnabled()) {
                    LOGGER.warn("  Skipped ids: {}", Arrays.toString(result.getSkippedIds()));
                }
            }

            saveSyncCycleSuccess(SyncCycleType.MANUAL, thisSyncStartTime);
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
        ensureInitialized();
        ensureSingleUsage();
        ensureEnoughMemory();

        try {

            // prepare
            this.syncWatch.start();
            OffsetDateTime lastSyncStartTime = getLastSyncDate();
            OffsetDateTime thisSyncStartTime = OffsetDateTime.now(MDS_DATE_ZONE);

            // run
            runNewSync(lastSyncStartTime, thisSyncStartTime, false);

            // done
            this.syncWatch.stop();
            saveSyncCycleSuccess(SyncCycleType.INCREMENTAL, thisSyncStartTime);
            printStatistics();

        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        return createResultSnapshot();
    }

    public synchronized SyncResult sync(final OffsetDateTime start, final OffsetDateTime end) {
        ensureInitialized();
        ensureSingleUsage();
        ensureEnoughMemory();
        ensureStartBeforeEnd(start, end);

        try {

            // prepare
            this.syncWatch.start();
            OffsetDateTime thisSyncStartTime = OffsetDateTime.now(MDS_DATE_ZONE);

            // run
            runNewSync(start, end, false);

            // done
            this.syncWatch.stop();
            saveSyncCycleSuccess(SyncCycleType.MANUAL, thisSyncStartTime);
            printStatistics();

        } catch (Exception exc) {
            handleException(exc);
        } finally {
            handleSyncFinished();
        }

        return createResultSnapshot();
    }

    private void runNewSync(final OffsetDateTime start, final OffsetDateTime end, final boolean force)
            throws MdsApiConnectionException {

        if (MODULE_MULTIMEDIA.equals(this.moduleName)) {
            runSync(start, end, ResolverContext.of(null, force, Pair.of("syncStartTime", end)));
        } else {
            // run first round with default language
            String[] languages = getSupportedLanguages();
            runSync(start, end, ResolverContext.of(languages[0], force, Pair.of("syncStartTime", end)));
            // update for all the other languages
            Long[] successfulIds = this.state.successfulIds.toArray(Long[]::new);
            for (int i = 1; i < languages.length; i++) {
                runSync(successfulIds, ResolverContext.of(languages[i], force, Pair.of("syncStartTime", end)));
            }
        }
    }

    private void runSync(
            final OffsetDateTime start,
            final OffsetDateTime end,
            final ResolverContext ctx) throws MdsApiConnectionException {

        Chunk chunk = runSyncChunked(start, end, 0, this.config.getPageSize(), ctx);
        updateState(chunk);

        // first invocation sets the expected number of search results
        this.state.expectedTotalSize = chunk.total;

        // query subsequent pages in loop
        while (chunk.offset + chunk.limit < chunk.total) {
            chunk = runSyncChunked(start, end, chunk.offset + chunk.limit, chunk.limit, ctx);
            updateState(chunk);
            // in case there were updates in between the first request and this one we need to run an amendment search at the end
            if (chunk.total != this.state.expectedTotalSize) {
                this.state.amendmentSearchRequired = true;
            }
        }

        // we reached the last page, perform amendment search if required
        if (this.state.amendmentSearchRequired) {
            SearchRequestHelper helper = searchRequestHelper();
            String sort = "+" + FIELD_ID; // means id ASC
            Not excludes = SearchRequestHelper.buildExcludeFilter(this.state.processedIds.toArray(Long[]::new));
            Search request = helper.buildSearchPayload(0, Integer.MAX_VALUE, start, end, sort, excludes);
            Module response = mdsClient().search(request, ctx.language);
            ResolverResult last = resolver().parseAndProcess(response, ctx);
            updateState(last);
        }
    }

    private void runSync(final Long[] mdsItemIds, final ResolverContext ctx) throws MdsApiConnectionException {

        for (int offset = 0, limit = this.config.getPageSize(); offset < mdsItemIds.length; offset += limit) {
            // execute paginated search
            int chunkSize = Math.min(limit, mdsItemIds.length - offset);
            Long[] requestedIds = Arrays.copyOfRange(mdsItemIds, offset, offset + chunkSize);
            // mark next chunk as processed upfront - resolves to "skipped" later if processing fails
            synchronized (this.state) {
                this.state.processedIds.addAll(Arrays.asList(requestedIds));
            }
            Search request = searchRequestHelper().buildSearchPayload(requestedIds);
            Module response = mdsClient().search(request, ctx.language);
            // process paginated search results
            ResolverResult chunkResult = resolver().parseAndProcess(response, ctx);
            updateState(chunkResult);
            // all ids, that were requested but are not processed, may reference items that are no longer published for SMB - so we better remove those
            Long[] diff = ArrayUtils.removeElements(requestedIds, chunkResult.getProcessedIds().toArray(Long[]::new));
            if (diff.length != 0) {
                Module deletedItems = markAsDeleted(diff);
                chunkResult = resolver().parseAndProcess(deletedItems, ctx);
                updateState(chunkResult);
            }
        }
    }

    private Chunk runSyncChunked(
            final OffsetDateTime start,
            final OffsetDateTime end,
            final int offset,
            final int limit,
            final ResolverContext ctx) throws MdsApiConnectionException {

        // execute paginated search
        String sort = "+" + FIELD_ID; // means id ASC
        Search payload = searchRequestHelper().buildSearchPayload(offset, limit, start, end, sort);
        Module response = mdsClient().search(payload, ctx.language);

        // convert JAXB objects to DTOs, then enqueue DTOs for updating
        ResolverResult result = resolver().parseAndProcess(response, ctx);

        // return
        Chunk chunk = new Chunk();
        chunk.addAll(result);
        chunk.offset = offset;
        chunk.limit = limit;
        chunk.total = response.getTotalSize().intValue();
        return chunk;
    }

    public void beforeExecuteCommand(final Long id, final Operation op) {
        synchronized (this.state) {
            this.state.processedIds.add(id);
        }
        this.tasksWatch.start(String.valueOf(id));
        LOGGER.debug("{} MDS item {}...", (op == Operation.DELETE ? "Deleting" : "Updating"), id);
    }

    public void afterExecuteCommand(final Long id, final Operation op) {
        synchronized (this.state) {
            this.state.successfulIds.add(id);
        }
        this.tasksWatch.stop();
        LOGGER.info("MDS item {} {}. (duration={}ms)",
                id, (op == Operation.DELETE ? "deleted" : "updated"), this.tasksWatch.getLastTaskTimeMillis());
    }

    public void errorExecuteCommand(final Long id, final Operation op, final Exception exc) {
        synchronized (this.state) {
            this.state.failedIds.add(id);
        }
        this.tasksWatch.stop();
        ErrorHandling.capture(exc, "Exception executing {} on MDS item {}", op, id);
    }

    private OffsetDateTime getLastSyncDate() {
        return Optional.ofNullable(this.cycleService.getLastSyncCycle(SyncCycleType.INCREMENTAL, this.moduleName))
                .orElse(OffsetDateTime.ofInstant(Instant.EPOCH, MDS_DATE_ZONE));
    }

    private String[] getSupportedLanguages() {
        String[] languages = this.langService.getSupportedLanguages();
        return languages.length == 0 ? new String[]{this.config.getDefaultLanguage()} : languages;
    }

    private void updateState(final ResolverResult result) {
        synchronized (this.state) {
            this.state.processedIds.addAll(result.getProcessedIds());
            this.state.successfulIds.addAll(result.getSuccessfulIds());
            this.state.successfulIds.removeAll(result.getFailedIds());
            this.state.failedIds.addAll(result.getFailedIds());
        }
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param type      type of sync
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncCycleType type, final OffsetDateTime timestamp) {
        WrapperDTO syncCycleWrapper = createSyncCycleWrapper(this.moduleName, type, createResultSnapshot(), timestamp);
        this.dataQueue.add(syncCycleWrapper);
    }

    private void printStatistics() {
        StringBuilder sb = new StringBuilder(System.lineSeparator());
        if (this.tasksWatch.getTaskCount() > 0) {
            sb.append("Sync of ")
                    .append(this.tasksWatch.getTaskCount())
                    .append(" MDS-Items finished in ")
                    .append(String.format("%.2f", this.syncWatch.getTotalTimeSeconds()))
                    .append("sec. Avg: ")
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
                        .append(System.lineSeparator()).append(StringUtils.rightPad("ID", 11))
                        .append("Duration")
                        .append(System.lineSeparator()).append(StringUtils.repeat('-', 19));
                for (StopWatch.TaskInfo task : longestTasks) {
                    sb.append(System.lineSeparator())
                            .append(StringUtils.rightPad(task.getTaskName(), 11))
                            .append(String.format("%8.2f", task.getTimeSeconds()));
                }
            }
        } else {
            sb.append("NOOP Sync finished in ")
                    .append(String.format("%d", this.syncWatch.getTotalTimeMillis()))
                    .append("ms.");
        }
        SYNC_LOGGER.info(sb.toString());
    }

    private SyncResult createResultSnapshot() {
        synchronized (this.state) {
            Set<Long> skippedIds = getSkippedIds(this.state);
            return new SyncResult(
                    this.state.successfulIds.toArray(Long[]::new),
                    this.state.failedIds.toArray(Long[]::new),
                    skippedIds.toArray(Long[]::new),
                    Duration.ofMillis(this.syncWatch.getTotalTimeMillis())
            );
        }
    }

    private void handleException(final Exception exc) {
        ErrorHandling.capture(exc, "Sync failed");
        synchronized (this.state) {
            this.state.phase = State.Phase.ERROR;
        }
    }

    private void handleSyncFinished() {
        if (this.syncWatch.isRunning()) {
            this.syncWatch.stop();
        }
        this.state.finished();
        System.gc();
    }

    private static Set<Long> getSkippedIds(final State state) {
        Set<Long> skippedIds = new TreeSet<>(state.processedIds);
        skippedIds.removeAll(state.successfulIds);
        skippedIds.removeAll(state.failedIds);
        return skippedIds;
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

        private final Set<Long> processedIds = new LinkedHashSet<>();
        private final Set<Long> successfulIds = new LinkedHashSet<>();
        private final Set<Long> failedIds = new LinkedHashSet<>();

        private Phase phase = Phase.NOT_STARTED;
        private int expectedTotalSize;
        private boolean amendmentSearchRequired;

        private void finished() {
            // if already marked with ERROR, leave it so
            if (this.phase != Phase.ERROR) {
                this.phase = this.failedIds.isEmpty() ? Phase.FINISHED : Phase.ERROR;
            }
        }
    }

    /**
     * One page of paginated processing
     */
    private static class Chunk extends ResolverResult {
        private int offset;
        private int limit;
        private int total;
    }

    public static class Config {

        private int pageSize = 10;
        private String defaultLanguage = "de";

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
    }
}
