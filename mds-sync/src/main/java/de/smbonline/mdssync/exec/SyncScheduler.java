package de.smbonline.mdssync.exec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SyncScheduler {

    private static final Logger LOGGER = LoggerFactory.getLogger(SyncScheduler.class);

    private final SyncController sync;

    private boolean enabled;

    @Autowired
    public SyncScheduler(
            final SyncController sync,
            final @Value("${scheduler.jobs.enabled:true}") boolean enabled) {
        this.sync = sync;
        this.enabled = enabled;
    }

    public void setEnabled(final boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    // default: every 12 hours, 12:30 and 00:30
    @Scheduled(cron = "${scheduler.jobs.sync-highlights.cron:0 0 */12 30 * *}")
    public void syncHighlights() {
        if (this.enabled) {
            LOGGER.debug("Starting Job 'highlights-sync'...");
            SyncResult result = this.sync.resolveHighlights();
            boolean synced = result.getStatus() != SyncResult.Status.NOOP;
            LOGGER.debug("Job 'highlights-sync' {}performed.", (synced ? "" : "not "));
        } else {
            LOGGER.trace("Ignoring trigger for Job 'highlights-sync'. Scheduler disabled.");
        }
    }

    // default: every 15 Min
    @Scheduled(cron = "${scheduler.jobs.sync-incremental.cron:0 */15 * * * *}")
    public void syncUpdates() {
        if (this.enabled) {
            LOGGER.debug("Starting Job 'incremental-sync'...");
            SyncResult result = this.sync.nextIncremental();
            boolean synced = result.getStatus() != SyncResult.Status.NOOP;
            LOGGER.debug("Job 'incremental-sync' {}performed.", (synced ? "" : "not "));
        } else {
            LOGGER.trace("Ignoring trigger for Job 'incremental-sync'. Scheduler disabled.");
        }
    }

    // default: every hour
    @Scheduled(cron = "${scheduler.jobs.sync-deleted.cron:0 0 */1 * * *}")
    public void syncDeletes() {
        if (this.enabled) {
            LOGGER.debug("Starting Job 'sync-deleted'...");
            SyncResult result = this.sync.removeDeleted();
            boolean synced = result.getStatus() != SyncResult.Status.NOOP;
            LOGGER.debug("Job 'sync-deleted' {}performed.", (synced ? "" : "not "));
        } else {
            LOGGER.trace("Ignoring trigger for Job 'sync-deleted'. Scheduler disabled.");
        }
    }
}
