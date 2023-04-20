package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dto.SyncCycle
import de.smbonline.mdssync.dto.SyncCycleType
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import java.time.OffsetDateTime

@SpringBootTest
@ActiveProfiles("test")
class SyncCycleServiceIT {

    @Autowired
    private lateinit var syncCycleService: SyncCycleService

    @Test
    fun testSyncCycleSave() {
        runBlocking {
            val dto = SyncCycle()
            dto.timestamp = OffsetDateTime.now()
            dto.debugInformation = "TestCase"
            dto.type = SyncCycleType.INCREMENTAL
            dto.module = "Object"
            val given = dto.timestamp.toEpochSecond()

            syncCycleService.save(dto)

            val saved = syncCycleService.getLastSyncCycle(SyncCycleType.INCREMENTAL, "Object")?.toEpochSecond()
            assertThat(saved).isEqualTo(given)
        }
    }
}