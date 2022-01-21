package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.SyncCycleRepository
import de.smbonline.mdssync.dto.ObjectDTO
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.SyncCycleDTO
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class SyncCycleService : DataService<SyncCycleDTO>, Engine<WrapperDTO>() {

    @Autowired
    lateinit var syncCycleRepository: SyncCycleRepository

    override fun save(element: SyncCycleDTO) {
        runBlocking {
            syncCycleRepository.saveSyncCycle(element)
        }
    }

    override fun delete(element: SyncCycleDTO) {
        // There is no need to implement this method
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto::class.qualifiedName == SyncCycleDTO::class.qualifiedName
    }

    override fun executeCommand(element: WrapperDTO) {
        if (element.operation == Operation.UPSERT) {
            save(element.dto as SyncCycleDTO)
        }
    }

    fun getLastSyncCycle(type: SyncCycleDTO.Type): OffsetDateTime? {
        val syncCycle = syncCycleRepository.fetchLastSyncCycleBlocking(type)
        val timestamp = syncCycle?.timestamp ?: return null
        return OffsetDateTime.parse(timestamp.toString())
    }
}