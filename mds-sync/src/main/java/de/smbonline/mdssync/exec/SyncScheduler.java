package de.smbonline.mdssync.exec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

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

    // default: every 15 Min
    @Scheduled(cron = "${scheduler.jobs.sync-incremental.cron:0 */15 * * * *}")
    public void syncObjects() {
        syncIfEnabled("incremental-sync", this.sync::nextIncremental);
    }

    // default: every hour at xx:10
    @Scheduled(cron = "${scheduler.jobs.sync-deleted.cron:0 10 */1 * * *}")
    public void syncDeletes() {
        syncIfEnabled("sync-deleted", this.sync::removeDeleted);
    }

    // default: every 12 hours, 12:30 and 00:30
    @Scheduled(cron = "${scheduler.jobs.sync-highlights.cron:0 30 0,12 0 * *}")
    public void syncHighlights() {
        syncIfEnabled("highlights-sync", this.sync::resolveHighlights);
    }

    // default: every day at 22:40
    @Scheduled(cron = "${scheduler.jobs.sync-attachments.cron:0 40 22 */1 * *}")
    public void syncAttachments() {
        syncIfEnabled("sync-attachments", this.sync::resolveAttachments);
    }

    // default: every day at 23:20
    @Scheduled(cron = "${scheduler.jobs.sync-persons.cron:0 20 23 */1 * *}")
    public void syncPersons() {
        syncIfEnabled("sync-persons", this.sync::resolvePersons);
    }

    // default: every day at 03:40
    @Scheduled(cron = "${scheduler.jobs.sync-exhibitions.cron:0 40 3 */1 * *}")
    public void syncExhibitions() {
        syncIfEnabled("sync-exhibitions", this.sync::resolveExhibitions);
    }

    // default: every day at 04:30
    @Scheduled(cron = "${scheduler.jobs.sync-assortments.cron:0 30 4 */1 * *}")
    public void syncAssortments() {
        syncIfEnabled("sync-assortments", this.sync::resolveAssortments);
    }

    // default: every day at 05:10
    @Scheduled(cron = "${scheduler.jobs.sync-thesaurus.cron:0 10 5 */1 * *}")
    public void syncThesauri() {
        syncIfEnabled("sync-thesaurus", this.sync::resolveThesauri);
    }

    private void syncIfEnabled(final String jobName, final Supplier<SyncResult> runner) {
        if (this.enabled) {
            LOGGER.debug("Starting Job '{}'...", jobName);
            SyncResult result = runner.get();
            boolean synced = result.getStatus() != SyncResult.Status.NOOP;
            LOGGER.debug("Job '{}' {}performed.", jobName, (synced ? "" : "not "));
        } else {
            LOGGER.trace("Ignoring trigger for Job '{}'. Scheduler disabled.", jobName);
        }
    }
}
