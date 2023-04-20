package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.rest.Data;

public interface SyncRunner {
    Data getStatusInfo();

    SyncResult sync();
}
