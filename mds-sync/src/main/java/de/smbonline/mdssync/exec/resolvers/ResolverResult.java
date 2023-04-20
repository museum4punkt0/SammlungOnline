package de.smbonline.mdssync.exec.resolvers;

import java.util.Collections;
import java.util.TreeSet;
import java.util.Set;

public class ResolverResult {

    private final Set<Long> processedIds = new TreeSet<>();
    private final Set<Long> successfulIds = new TreeSet<>();
    private final Set<Long> failedIds = new TreeSet<>();

    public synchronized void addAll(final ResolverResult other) {
        this.processedIds.addAll(other.getProcessedIds());
        this.successfulIds.addAll(other.getSuccessfulIds());
        this.failedIds.addAll(other.getFailedIds());
    }

    public synchronized void processed(final Long id) {
        this.processedIds.add(id);
    }

    public synchronized void successful(final Long id) {
        this.processedIds.add(id);
        this.successfulIds.add(id);
        this.failedIds.remove(id);
    }

    public synchronized void failed(final Long id) {
        this.processedIds.add(id);
        this.failedIds.add(id);
        this.successfulIds.remove(id);
    }

    public synchronized boolean hasSucceeded(final Long id) {
        return this.successfulIds.contains(id);
    }

    public synchronized boolean hasFailed(final Long id) {
        return this.failedIds.contains(id);
    }

    public synchronized Set<Long> getProcessedIds() {
        return Collections.unmodifiableSet(this.processedIds);
    }

    public synchronized Set<Long> getSuccessfulIds() {
        return Collections.unmodifiableSet(this.successfulIds);
    }

    public synchronized Set<Long> getFailedIds() {
        return Collections.unmodifiableSet(this.failedIds);
    }

    @Override
    public synchronized String toString() {
        String template = "ResolverResult{processedIds=%d, successfulIds=%d, failedIds=%d}";
        return String.format(template, this.processedIds.size(), this.successfulIds.size(), this.failedIds.size());
    }
}
