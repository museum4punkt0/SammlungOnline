package de.smbonline.mdssync.exec;

public interface PartialSyncRunner extends SyncRunner {
    SyncResult sync(final Long... ids);
}
