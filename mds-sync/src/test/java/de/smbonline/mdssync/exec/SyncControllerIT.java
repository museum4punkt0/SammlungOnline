package de.smbonline.mdssync.exec;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

import static de.smbonline.mdssync.util.MdsConstants.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class SyncControllerIT {

    @Autowired
    SyncController syncController;

    @Test
    void runAssortmentSync() {
        SyncResult result = syncController.resolveAssortments();
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }

    @Test
    void runSyncByTimeRange() {
        OffsetDateTime start = LocalDateTime.of(2019, 12, 14, 17, 0, 0).atZone(MDS_DATE_ZONE).toOffsetDateTime();
        OffsetDateTime end = LocalDateTime.of(2019, 12, 14, 18, 0, 0).atZone(MDS_DATE_ZONE).toOffsetDateTime();

        SyncResult result = syncController.syncUpdates("Object", start, end);
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isEmpty();
    }

    @Test
    void runSyncByIds() {
        SyncResult result = syncController.syncUpdates("Object", 865040L, 867231L, 959003L);
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }

    @Test
    void syncHighlights() {
        SyncResult result = syncController.resolveHighlights();
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }

    @Test
    void syncDeleted() {
        SyncResult result = syncController.removeDeleted();
        assertThat(result.getStatus()).isNotEqualTo(SyncResult.Status.ERROR);
        assertThat(result.getFailedIds()).isNullOrEmpty();
    }
}
