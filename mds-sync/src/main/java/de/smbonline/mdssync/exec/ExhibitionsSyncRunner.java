package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.rest.Data;

public class ExhibitionsSyncRunner implements SyncRunner {
    @Override public Data getStatusInfo() {
        // TODO
        return new Data().setAttribute("status", "unimplemented");
    }

    @Override public SyncResult sync() {
        // TODO
        return SyncResult.NOOP;
    }
}
