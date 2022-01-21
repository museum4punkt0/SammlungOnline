package de.smbonline.mdssync.exec;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class SyncControllerIT {

    @Autowired
    SyncController syncController;

    @Test
    public void runSyncByTimeRange() {
        LocalDateTime start = LocalDateTime.of(2019, 12, 14, 17, 0, 0);
        LocalDateTime end = LocalDateTime.of(2019, 12, 14, 18, 0, 0);

        SyncResult result = syncController.syncUpdates(start, end);
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isEmpty();
    }

    @Test
    public void runSyncByIds() {
        SyncResult result = syncController.syncUpdates(865040L, 867231L, 959003L);
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }

    @Test
    public void syncHighlights() {
        SyncResult result = syncController.resolveHighlights();
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }

    @Test
    public void syncDeleted() {
        SyncResult result = syncController.removeDeleted();
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }
}
