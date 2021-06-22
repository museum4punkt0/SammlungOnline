package de.smbonline.mdssync.exec;

import kotlin.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Min;
import javax.validation.constraints.Past;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import static de.smbonline.mdssync.util.Validations.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SyncController {

    private static final Logger logger = LoggerFactory.getLogger(SyncController.class);

    private final ObjectProvider<SyncExecuter> syncExecuterProvider;
    private final ObjectProvider<HighlightsResolver> highlightsResolverProvider;

    @Autowired
    public SyncController(
            final ObjectProvider<SyncExecuter> syncExecuterProvider,
            final ObjectProvider<HighlightsResolver> highlightsResolverProvider) {
        this.syncExecuterProvider = syncExecuterProvider;
        this.highlightsResolverProvider = highlightsResolverProvider;
    }

    // Always ever only one permit, otherwise we may run into data inconsistency
    private final Semaphore semaphore = new Semaphore(1);
    private final Config config = new Config();
    private Object runner; // TODO use interface and don't call toString()

    public Config getConfig() {
        return config;
    }

    public synchronized String getState() {
        return this.runner == null ? "not running" : this.runner.toString();
    }

    public SyncResult resolveHighlights() {
        Pair<Integer, TimeUnit> timeout = getConfig().getHighlightTimeout();
        if (!acquirePermit(timeout.getFirst(), timeout.getSecond())) {
            logger.info("Highlight sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            logger.info("Starting highlights sync...");
            HighlightsResolver resolver = newHighlightsResolver();
            this.runner = resolver;
            return resolver.sync();
        } finally {
            releasePermit();
        }
    }

    /**
     * Requests to sync specific MDs objects by ids.
     *
     * @param mdsIds MDS object ids
     * @return if sync was performed, {@code false} if another sync is already running
     */
    public SyncResult syncUpdates(final Long... mdsIds) {
        if (!acquirePermit(1, TimeUnit.SECONDS)) {
            logger.info("Manually requested sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            logger.info("Starting manually requested sync...");
            SyncExecuter executer = newExecuter();
            this.runner = executer;
            return executer.sync(mdsIds);
        } finally {
            releasePermit();
        }
    }

    /**
     * Requests to sync updates happened between {@code start} and {@code end}. {@code end} defaults to current time.
     *
     * @param start start time
     * @param end   (optional) end time
     * @return if sync was performed, {@code false} if another sync is already running
     */
    public SyncResult syncUpdates(final @Past LocalDateTime start, final LocalDateTime end) {
        LocalDateTime to = Optional.ofNullable(end).orElse(LocalDateTime.now());
        ensureStartBeforeEnd(start, to);

        if (!acquirePermit(1, TimeUnit.SECONDS)) {
            logger.info("Manually requested sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            logger.info("Starting manually requested sync...");
            SyncExecuter executer = newExecuter();
            this.runner = executer;
            return executer.sync(start, to);
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
            logger.info("Incremental sync not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            logger.info("Starting incremental sync...");
            SyncExecuter executer = newExecuter();
            this.runner = executer;
            return executer.sync();
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
            logger.info("Removal of deleted MDS objects not performed - no permit available.");
            return SyncResult.NOOP;
        }

        try {
            logger.info("Starting removal of deleted MDS objects...");
            SyncExecuter executer = newExecuter();
            this.runner = executer;
            return executer.syncDeleted();
        } finally {
            releasePermit();
        }
    }

    /**
     * Creates a new executer instance. Every sync should be run by a new executer.
     *
     * @return new executer
     */
    protected SyncExecuter newExecuter() {
        return this.syncExecuterProvider.getObject();
    }

    /**
     * Creates a new resolver instance. Every sync should be run by a new resolver.
     *
     * @return new executer
     */
    private HighlightsResolver newHighlightsResolver() {
        return this.highlightsResolverProvider.getObject();
    }

    private boolean acquirePermit(final @Min(1) int timeout, final TimeUnit unit) {
        int availablePermits = semaphore.availablePermits();
        if (availablePermits > 1) {
            logger.warn("Unbalanced invocation of acquire/release. Available permits={}, expected=0|1", availablePermits);
        }

        try {
            return this.semaphore.tryAcquire(timeout, unit);
        } catch (InterruptedException exc) {
            Thread.currentThread().interrupt();
            logger.error("Thread was interrupted while waiting for semaphore acquisition.");
            return false;
        } catch (Exception exc) {
            logger.error("Unhandled exception in semaphore.tryAcquire()", exc);
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
            logger.error("Unhandled exception in semaphore.release()", exc);
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
