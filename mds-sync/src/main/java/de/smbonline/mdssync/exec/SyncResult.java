package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.rest.Data;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.time.DurationFormatUtils;
import org.springframework.lang.Nullable;

import java.time.Duration;
import java.util.Arrays;

/**
 * holder object for sync summary
 */
public class SyncResult {

    public enum Status {
        /**
         * Just started the sync - we don't know the status yet
         */
        TBD,
        /**
         * Sync finished without actually syncing something
         */
        NOOP,
        /**
         * Sync finished successfully
         */
        SUCCESS,
        /**
         * Sync finished with (partial) errors
         */
        ERROR,
    }

    public static final SyncResult NOOP = new SyncResult(new Long[0], new Long[0], new Long[0], Duration.ZERO);
    public static final SyncResult ASYNC = new SyncResult(Status.TBD, Duration.ZERO);

    private final Long[] successfulIds;
    private final Long[] failedIds;
    private final Long[] skippedIds;
    private final Duration duration;
    private final Status status;
    private final String summary;
    private final String fullInfo;

    public SyncResult(final Status status, final Duration dur) {
        this.status = status;
        this.successfulIds = null;
        this.failedIds = null;
        this.skippedIds = null;
        this.duration = dur;
        this.summary = buildSummary();
        this.fullInfo = buildFullInfo();
    }

    public SyncResult(final Long[] success, final Long[] fail, final Long[] skipped, final Duration dur) {
        this.status = determineStatus(success, fail, skipped);
        this.successfulIds = success;
        this.failedIds = fail;
        this.skippedIds = skipped;
        this.duration = dur;
        this.summary = buildSummary();
        this.fullInfo = buildFullInfo();
    }

    public Status getStatus() {
        return this.status;
    }

    private static Status determineStatus(final Long[] success, final Long[] fail, final Long[] skipped) {
        if (success.length + fail.length + skipped.length == 0) {
            return Status.NOOP;
        }
        return fail.length > 0 ? Status.ERROR : Status.SUCCESS;
    }

    public @Nullable Long[] getSuccessfulIds() {
        return ArrayUtils.clone(this.successfulIds);
    }

    public @Nullable Long[] getSkippedIds() {
        return ArrayUtils.clone(this.skippedIds);
    }

    public @Nullable Long[] getFailedIds() {
        return ArrayUtils.clone(this.failedIds);
    }

    public Duration getDuration() {
        return this.duration;
    }

    public Data toJson() {
        return new Data()
                .setNonNullAttribute("status", this.status)
                .setNonNullAttribute("successful", this.successfulIds)
                .setNonNullAttribute("failed", this.failedIds)
                .setNonNullAttribute("skipped", this.skippedIds)
                .setNonNullAttribute("duration", DurationFormatUtils.formatDurationHMS(this.duration.toMillis()));
    }

    public String getSummary() {
        return this.summary;
    }

    private String buildSummary() {
        String lineEnd = "\n";
        StringBuilder sb = new StringBuilder()
                .append("Duration: ").append(DurationFormatUtils.formatDurationHMS(this.duration.toMillis()))
                .append(lineEnd)
                .append("Synced: ").append(this.successfulIds == null ? "unknown" : this.successfulIds.length)
                .append(lineEnd)
                .append("Failed: ").append(this.failedIds == null ? "unknown" : this.failedIds.length)
                .append(lineEnd)
                .append("Skipped: ").append(this.skippedIds == null ? "unknown" : this.skippedIds.length);
        return sb.toString();
    }

    @Override
    public String toString() {
        return this.fullInfo;
    }

    private String buildFullInfo() {
        String processed = this.successfulIds == null || this.failedIds == null || this.skippedIds == null
                ? "unknown" : String.valueOf(this.successfulIds.length + this.failedIds.length + this.skippedIds.length);
        return "syncResult: { " +
                "status: " + this.status + ", " +
                "processed: " + processed + ", " +
                "successfulIds: " + Arrays.toString(this.successfulIds) + ", " +
                "failedIds: " + Arrays.toString(this.failedIds) + ", " +
                "skippedIds: " + Arrays.toString(this.skippedIds) + ", " +
                "duration: " + DurationFormatUtils.formatDurationHMS(this.duration.toMillis()) +
                " }";
    }
}