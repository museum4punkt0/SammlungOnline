package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.rest.Data;

import java.time.Duration;

public class ExhibitionsSyncRunner implements SyncRunner {

    @Override public Data getStatusInfo() {
        // TODO
        return new Data().setAttribute("status", "unimplemented");
    }

    @Override public SyncResult sync() {
        // TODO
        return new SyncResult(SyncResult.Status.ERROR, Duration.ZERO);
    }
}
