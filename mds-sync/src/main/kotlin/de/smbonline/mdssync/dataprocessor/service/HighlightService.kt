package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.HighlightData
import de.smbonline.mdssync.dataprocessor.repository.HighlightRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dataprocessor.repository.OrgUnitRepository
import de.smbonline.mdssync.dto.HighlightDTO
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class HighlightService @Autowired constructor(
        private val highlightRepository: HighlightRepository,
        private val orgUnitRepository: OrgUnitRepository,
        private val objectRepository: ObjectRepository
) : DataService<HighlightDTO>, Engine<WrapperDTO>() {

    override fun save(element: HighlightDTO) {
        runBlocking {
            saveHighlights(element)
        }
    }

    override fun delete(element: HighlightDTO) {
        runBlocking {
            deleteHighlights(element)
        }
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto::class.qualifiedName == HighlightDTO::class.qualifiedName
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as HighlightDTO)
            Operation.DELETE -> delete(element.dto as HighlightDTO)
        }
    }

    fun getAllHighlightOrgUnits(): List<String> {
        val data: List<HighlightData>
        runBlocking {
            data = highlightRepository.fetchAllHighlights()
        }
        return data.map { it.org_unit.name }.distinct()
    }

    fun getHighlightObjectIds(orgUnitName: String): List<Long> {
        val ids: List<Long>
        runBlocking {
            val id = orgUnitRepository.getOrgUnitIdByOrgUnitName(orgUnitName)
            ids = if (id != null) {
                highlightRepository.fetchHighlightsByOrgUnitId(id).map {
                    (it.object_id as BigDecimal).longValueExact()
                }
            } else emptyList()
        }
        return ids
    }

    /**
     * Saves all highlights of an orgUnit and deletes highlights that are not part of the orgUnit anymore.
     * @param element
     */
    private suspend fun saveHighlights(element: HighlightDTO) {
        val orgUnitId = fetchOrInsertOrgUnit(element.orgUnitName)
        val oldHighlightIds = getHighlightIds(orgUnitId)
        val newHighlightIds = saveHighlightElements(orgUnitId, element.objectIds)
        val toBeDeletedHighlightIds = oldHighlightIds.filter { !newHighlightIds.contains(it) }

        deleteHighlightsOfOrgUnit(orgUnitId, toBeDeletedHighlightIds)
    }

    /**
     * Saves the orgUnit if it does not exist or fetch the orgUnitId if it already exists.
     * @param orgUnitName
     * @return orgUnit-ID or null if saving was not successful
     */
    private suspend fun fetchOrInsertOrgUnit(orgUnitName: String): Long {
        return orgUnitRepository.getOrgUnitIdByOrgUnitName(orgUnitName)
                ?: orgUnitRepository.saveOrgUnit(orgUnitName)
    }

    private suspend fun getHighlightIds(orgUnitId: Long): List<Long> {
        return highlightRepository.fetchHighlightsByOrgUnitId(orgUnitId).map {
            (it.id as BigDecimal).longValueExact()
        }
    }

    /**
     * Saves the highlight elements and returns the saved ids, including the ids that already existed.
     * @param orgUnitId
     * @param objectsMdsIds
     * @return list of saved ids
     */
    private suspend fun saveHighlightElements(orgUnitId: Long, objectsMdsIds: List<Long>): List<Long> {
        val savedHighlights = ArrayList<Long>()
        for (objectMdsId in objectsMdsIds) {
            // only mark this object as highlight if really available
            if (objectRepository.existsObject(objectMdsId)) {
                // only save if the highlight does not exist
                val highlightId = highlightRepository.getHighlightId(orgUnitId, objectMdsId)
                        ?: highlightRepository.saveHighlight(orgUnitId, objectMdsId)
                highlightId.let { savedHighlights.add(highlightId) }
            }
        }
        return savedHighlights
    }

    /**
     * Deletes all Highlights referenced by OrgUnit and Object ids.
     * @param orgUnitId id of OrgUnit
     * @param objectIds ids of Objects
     */
    private suspend fun deleteHighlightsOfOrgUnit(orgUnitId: Long, objectIds: List<Long>) {
        objectIds.forEach { highlightRepository.deleteHighlight(orgUnitId, it) }
    }

    /**
     * Deletes all Highlights of an OrgUnit. NOTE: Ids of Objects are ignored here,
     * all Objects of specified OrgUnit are deleted.
     * @param element Highlight object with OrgUnit name
     */
    private suspend fun deleteHighlights(element: HighlightDTO) {
        val orgUnitId = orgUnitRepository.getOrgUnitIdByOrgUnitName(element.orgUnitName) ?: return
        highlightRepository.deleteHighlights(orgUnitId)
    }
}