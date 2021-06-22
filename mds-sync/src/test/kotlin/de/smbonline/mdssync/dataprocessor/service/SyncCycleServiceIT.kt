package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dto.SyncCycleDTO
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.time.OffsetDateTime

@SpringBootTest
class SyncCycleServiceIT {

    @Autowired
    private lateinit var syncCycleService: SyncCycleService

    @Test
    fun testSyncCycleSave() {
        runBlocking {
            val dto = SyncCycleDTO()
            dto.timestamp = OffsetDateTime.now()
            dto.debugInformation = "TestCase"
            dto.type = SyncCycleDTO.Type.INCREMENTAL
            val given = dto.timestamp.toEpochSecond()

            syncCycleService.save(dto)

            val saved = syncCycleService.getLastSyncCycle(SyncCycleDTO.Type.INCREMENTAL)?.toEpochSecond()
            assertThat(saved).isEqualTo(given)
        }
    }
}