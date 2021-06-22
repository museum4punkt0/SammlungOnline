package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.rest.Any;
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
        NOOP,
        SUCCESS,
        ERROR
    }

    public static final SyncResult NOOP = new SyncResult(new Long[0], new Long[0], new Long[0], Duration.ZERO);

    private final Long[] successfulIds;
    private final Long[] failedIds;
    private final Long[] skippedIds;
    private final Duration duration;
    private final Status status;

    public SyncResult(final Status status, final Duration dur) {
        this.status = status;
        this.successfulIds = null;
        this.failedIds = null;
        this.skippedIds = null;
        this.duration = dur;
    }

    public SyncResult(final Long[] success, final Long[] fail, final Long[] skipped, final Duration dur) {
        this.status = determineStatus(success, fail, skipped);
        this.successfulIds = success;
        this.failedIds = fail;
        this.skippedIds = skipped;
        this.duration = dur;
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

    public Any toJson() {
        return new Any()
                .setNonNullAttribute("status", this.status)
                .setNonNullAttribute("successful", this.successfulIds)
                .setNonNullAttribute("failed", this.failedIds)
                .setNonNullAttribute("skipped", this.skippedIds)
                .setNonNullAttribute("duration", DurationFormatUtils.formatDurationHMS(this.duration.toMillis()));
    }

    @Override
    public String toString() {
        String processed = this.successfulIds == null || this.failedIds == null || this.skippedIds == null
                ? "unknown" : String.valueOf(this.successfulIds.length + this.failedIds.length + this.skippedIds.length);
        return "syncResult: { " +
                "status: " + this.status + ", " +
                "processed: " + processed + ", " +
                "successfulIds: " + Arrays.toString(this.successfulIds) + ", " +
                "failedIds: " + Arrays.toString(this.failedIds) + ", " +
                "skippedIds: " + Arrays.toString(this.skippedIds) + ", " +
                "duration: " + this.duration +
                " }";
    }
}