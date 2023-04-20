package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.exc.ErrorHandling;
import kotlin.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Validations.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SyncController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SyncController.class);

    private final ObjectProvider<SyncExecuter> executerProvider;
    private final ObjectProvider<HighlightsSyncRunner> highlightsRunnerProvider;
    private final ObjectProvider<AssortmentsSyncRunner> assortmentsRunnerProvider;
    private final ObjectProvider<PersonsSyncRunner> personsRunnerProvider;
    private final ObjectProvider<ExhibitionsSyncRunner> exhibitionsRunnerProvider;
    private final ObjectProvider<ThesaurusSyncRunner> thesaurusRunnerProvider;

    @Autowired
    public SyncController(
            final ObjectProvider<SyncExecuter> syncExecuterProvider,
            final ObjectProvider<HighlightsSyncRunner> highlightsRunnerProvider,
            final ObjectProvider<AssortmentsSyncRunner> assortmentsRunnerProvider,
            final ObjectProvider<PersonsSyncRunner> personsRunnerProvider,
            final ObjectProvider<ExhibitionsSyncRunner> exhibitionsRunnerProvider,
            final ObjectProvider<ThesaurusSyncRunner> thesaurusRunnerProvider
    ) {
        this.executerProvider = syncExecuterProvider;
        this.highlightsRunnerProvider = highlightsRunnerProvider;
        this.assortmentsRunnerProvider = assortmentsRunnerProvider;
        this.personsRunnerProvider = personsRunnerProvider;
        this.exhibitionsRunnerProvider = exhibitionsRunnerProvider;
        this.thesaurusRunnerProvider = thesaurusRunnerProvider;
    }

    // Always ever only one permit, otherwise we may run into data inconsistency
    private final Semaphore semaphore = new Semaphore(1);
    private final Config config = new Config();
    private SyncRunner runner;

    public Config getConfig() {
        return config;
    }

    public synchronized Object getState() {
        return this.runner == null ? "not running" : this.runner.getStatusInfo();
    }

    public SyncResult resolveHighlights() {
        Pair<Integer, TimeUnit> timeout = getConfig().getHighlightTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Highlight sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting highlights sync...");
            SyncRunner sync = newHighlightsSyncRunner();
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    public SyncResult resolveAssortments() {
        Pair<Integer, TimeUnit> timeout = getConfig().getIncrementalTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Assortment sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting assortments sync...");
            SyncRunner sync = newAssortmentsSyncRunner();
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    public SyncResult resolveAttachments() {
        Pair<Integer, TimeUnit> timeout = getConfig().getIncrementalTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Attachments sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting attachments sync...");
            SyncRunner sync = newExecuter(MODULE_MULTIMEDIA);
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    public SyncResult resolvePersons() {
        Pair<Integer, TimeUnit> timeout = getConfig().getIncrementalTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Person sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting persons sync...");
            SyncRunner sync = newPersonsSyncRunner();
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    public SyncResult resolveExhibitions() {
        Pair<Integer, TimeUnit> timeout = getConfig().getIncrementalTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Exhibition sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting exhibitions sync...");
            SyncRunner sync = newExhibitionsSyncRunner();
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    public SyncResult resolveThesauri() {
        Pair<Integer, TimeUnit> timeout = getConfig().getIncrementalTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Thesaurus sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting thesaurus sync...");
            SyncRunner sync = newThesaurusSyncRunner();
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    /**
     * Requests to sync specific MDS objects by ids.
     *
     * @param moduleName name of MDS module in which to search for the ids
     * @param ids        entity ids
     * @return if sync was performed, {@code false} if another sync is already running
     */
    public SyncResult syncUpdates(final String moduleName, final Long... ids) {
        if (!acquirePermit(1, TimeUnit.SECONDS)) {
            LOGGER.info("Manually requested sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting manually requested sync...");
            PartialSyncRunner sync = newRunnerForModule(moduleName);
            this.runner = sync;
            return sync.sync(ids);
        } finally {
            releasePermit();
        }
    }

    /**
     * Requests to sync updates happened between {@code start} and {@code end}. {@code end} defaults to current time.
     *
     * @param moduleName name of MDS module in which to search for the ids
     * @param start      start time
     * @param end        (optional) end time
     * @return if sync was performed, {@code false} if another sync is already running
     */
    public SyncResult syncUpdates(final String moduleName, final OffsetDateTime start, final @Nullable OffsetDateTime end) {
        OffsetDateTime to = Optional.ofNullable(end).orElse(OffsetDateTime.now(MDS_DATE_ZONE));
        ensureStartBeforeEnd(start, to);

        if (!acquirePermit(1, TimeUnit.SECONDS)) {
            LOGGER.info("Manually requested sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting manually requested sync...");
            SyncExecuter sync = newExecuter(moduleName);
            this.runner = sync;
            return sync.sync(start, to);
        } finally {
            releasePermit();
        }
    }

    /**
     * Requests to sync creations and modifications happened between last sync and now.
     *
     * @return if sync was performed, {@code false} if another sync is already running
     */
    public SyncResult nextIncremental() {
        Pair<Integer, TimeUnit> timeout = getConfig().getIncrementalTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Incremental sync of {} not performed - no permit available.", MODULE_OBJECTS);
            return SyncResult.NOOP;
        }

        try {
            LOGGER.info("Starting incremental sync of {}...", MODULE_OBJECTS);
            SyncRunner sync = newExecuter(MODULE_OBJECTS);
            this.runner = sync;
            return sync.sync();
        } finally {
            releasePermit();
        }
    }

    /**
     * Requests to sync removed objects deleted between last sync and now.
     *
     * @return if sync was performed, {@code false} if another sync is already running
     */
    public SyncResult removeDeleted() {
        Pair<Integer, TimeUnit> timeout = getConfig().getDeleteTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            LOGGER.info("Removal of deleted MDS objects not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {

            SyncResult.Status status = SyncResult.Status.NOOP;
            Duration duration = Duration.ZERO;

            String[] modules = {MODULE_OBJECTS, MODULE_PERSON, MODULE_EXHIBITIONS, MODULE_MULTIMEDIA};
            for (String module : modules) {
                LOGGER.info("Starting removal of deleted {} items...", module);
                SyncExecuter sync = newExecuter(module);
                this.runner = sync;
                SyncResult intermediateResult = sync.syncDeleted();
                if (intermediateResult.getStatus().ordinal() > status.ordinal()) {
                    status = intermediateResult.getStatus();
                }
                duration = duration.plus(intermediateResult.getDuration());
            }

            return new SyncResult(status, duration);

        } finally {
            releasePermit();
        }
    }

    private PartialSyncRunner newRunnerForModule(final String moduleName) {
        switch (moduleName) {
            case MODULE_OBJECT_GROUPS:
                return newAssortmentsSyncRunner();
            case MODULE_PERSON:
                return newPersonsSyncRunner();
            case VOCABULARY:
                return newThesaurusSyncRunner();
            default:
                // SyncExecuter works for all modules
                return newExecuter(moduleName);
        }
    }

    /**
     * Creates a new executer instance. Every sync should be run by a new executer.
     *
     * @param moduleName name of MDS module in which to search for the ids
     * @return new executer
     */
    protected SyncExecuter newExecuter(final String moduleName) {
        SyncExecuter executer = this.executerProvider.getObject();
        executer.setModuleName(moduleName);
        return executer;
    }

    /**
     * Creates a new runner instance. Every sync should be run by a new runner.
     *
     * @return new runner
     */
    private HighlightsSyncRunner newHighlightsSyncRunner() {
        return this.highlightsRunnerProvider.getObject();
    }

    /**
     * Creates a new runner instance. Every sync should be run by a new runner.
     *
     * @return new runner
     */
    private AssortmentsSyncRunner newAssortmentsSyncRunner() {
        return this.assortmentsRunnerProvider.getObject();
    }

    /**
     * Creates a new runner instance. Every sync should be run by a new runner.
     *
     * @return new runner
     */
    private PersonsSyncRunner newPersonsSyncRunner() {
        return this.personsRunnerProvider.getObject();
    }

    /**
     * Creates a new runner instance. Every sync should be run by a new runner.
     *
     * @return new runner
     */
    private ExhibitionsSyncRunner newExhibitionsSyncRunner() {
        return this.exhibitionsRunnerProvider.getObject();
    }

    /**
     * Creates a new runner instance. Every sync should be run by a new runner.
     *
     * @return new runner
     */
    private ThesaurusSyncRunner newThesaurusSyncRunner() {
        return this.thesaurusRunnerProvider.getObject();
    }

    private boolean acquirePermit(final int timeout, final TimeUnit unit) {
        int availablePermits = this.semaphore.availablePermits();
        if (availablePermits > 1) {
            LOGGER.warn("Unbalanced invocation of acquire/release. Available permits={}, expected=0|1", availablePermits);
        }

        try {
            return this.semaphore.tryAcquire(timeout, unit);
        } catch (InterruptedException exc) {
            Thread.currentThread().interrupt();
            LOGGER.error("Thread was interrupted while waiting for semaphore acquisition.");
            return false;
        } catch (Exception exc) {
            ErrorHandling.capture(exc, "Unhandled exception in semaphore.tryAcquire()");
            return false;
        }
    }

    /**
     * Release an earlier acquired permit. This method <b>must</b> and <b>must only</b> be
     * invoked when a permit was acquired before - otherwise we will have more permits
     * available than intended.
     *
     * @return if permit was released
     */
    private boolean releasePermit() {
        try {
            this.semaphore.release();
            return true;
        } catch (Exception exc) {
            // whatever happens, do not throw an exception since we are running in a finally block
            ErrorHandling.capture(exc, "Unhandled exception in semaphore.release()");
            return false;
        }
    }

    // for debugging and testing
    int getAvailablePermits() {
        return semaphore.availablePermits();
    }

    public static class Config {

        private Pair<Integer, TimeUnit> incrementalTimeout = new Pair<>(60, TimeUnit.SECONDS);
        private Pair<Integer, TimeUnit> highlightTimeout = new Pair<>(60, TimeUnit.SECONDS);
        private Pair<Integer, TimeUnit> deleteTimeout = new Pair<>(5, TimeUnit.MINUTES);

        public Pair<Integer, TimeUnit> getDeleteTimeout() {
            return this.deleteTimeout;
        }

        public void setDeleteTimeout(final Pair<Integer, TimeUnit> timeout) {
            this.deleteTimeout = timeout;
        }

        public Pair<Integer, TimeUnit> getIncrementalTimeout() {
            return this.incrementalTimeout;
        }

        public void setIncrementalTimeout(final Pair<Integer, TimeUnit> timeout) {
            this.incrementalTimeout = timeout;
        }

        public Pair<Integer, TimeUnit> getHighlightTimeout() {
            return this.highlightTimeout;
        }

        public void setHighlightTimeout(final Pair<Integer, TimeUnit> timeout) {
            this.highlightTimeout = timeout;
        }
    }
}
