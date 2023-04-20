package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.SyncCycleData
import de.smbonline.mdssync.dataprocessor.repository.SyncCycleRepository
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.SyncCycle
import de.smbonline.mdssync.dto.SyncCycleType
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class SyncCycleService @Autowired constructor(private val syncCycleRepository: SyncCycleRepository)
    : DataService<SyncCycle>, Engine<WrapperDTO>() {

    override fun save(element: SyncCycle) {
        runBlocking {
            syncCycleRepository.saveSyncCycle(element)
        }
    }

    override fun delete(element: SyncCycle) {
        // There is no need to implement this method
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto is SyncCycle
    }

    override fun executeCommand(element: WrapperDTO) {
        if (element.operation == Operation.UPSERT) {
            save(element.dto as SyncCycle)
        }
    }

    fun getLastSyncCycle(type: SyncCycleType, module:String): OffsetDateTime? {
        val syncCycle: SyncCycleData?
        runBlocking {
            syncCycle = syncCycleRepository.fetchLastSyncCycle(type, module)
        }
        val timestamp = syncCycle?.timestamp ?: return null
        return OffsetDateTime.parse(timestamp.toString())
    }
}