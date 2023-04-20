package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ExhibitData
import de.smbonline.mdssync.dataprocessor.repository.ExhibitionRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.Exhibition
import de.smbonline.mdssync.dto.ObjExhibition
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class ExhibitionService(
        private val exhibitionRepository: ExhibitionRepository,
        private val objectRepository: ObjectRepository
) : DataService<Exhibition>, Engine<WrapperDTO>() {

    override fun save(element: Exhibition) {
        runBlocking {
            insertOrUpdate(element)
            if (element is ObjExhibition) {
                linkExhibitionObject(element)
            }
        }
    }

    override fun delete(element: Exhibition) {
        runBlocking {
            deleteExhibition(element)
        }
    }

    fun deleteExhibit(exhibit: ExhibitData): Boolean {
        var deleted: Boolean
        runBlocking {
            deleted = deleteExhibit((exhibit.id as BigDecimal).longValueExact())
        }
        return deleted
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto is Exhibition
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as Exhibition)
            Operation.DELETE -> delete(element.dto as Exhibition)
        }
    }

    fun getExhibitionIds(): Array<Long> {
        val data: Array<Long>
        runBlocking {
            data = exhibitionRepository.getExhibitionIds()
        }
        return data
    }

    fun getExhibits(objectId: Long): List<ExhibitData> {
        var data: List<ExhibitData>
        runBlocking {
            data = exhibitionRepository.fetchExhibits(objectId)
        }
        return data
    }

    private suspend fun linkExhibitionObject(element: ObjExhibition): Long? {
        if (objectRepository.existsObject(element.objectId)) {
            return exhibitionRepository.fetchOrInsertExhibit(element)
        }
        return null
    }

    private suspend fun insertOrUpdate(element: Exhibition): Long {
        return exhibitionRepository.saveExhibition(element)
    }

    private suspend fun deleteExhibition(element: Exhibition): Boolean {
        return exhibitionRepository.deleteExhibition(element.mdsId)
    }

    private suspend fun deleteExhibit(id: Long): Boolean {
        return exhibitionRepository.deleteExhibit(id)
    }
}