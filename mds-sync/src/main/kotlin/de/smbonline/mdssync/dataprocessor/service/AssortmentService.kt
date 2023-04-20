package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AssortmentData
import de.smbonline.mdssync.dataprocessor.repository.AssortmentRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.Assortment
import de.smbonline.mdssync.dto.AssortmentType
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.exc.SyncFailedException
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class AssortmentService(
        private val assortmentRepository: AssortmentRepository,
        private val objectRepository: ObjectRepository
) : DataService<Assortment>, Engine<WrapperDTO>() {

    override fun save(element: Assortment) {
        saveAssortment(element)
    }

    override fun delete(element: Assortment) {
        deleteAssortment(element)
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto::class.qualifiedName == Assortment::class.qualifiedName
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as Assortment)
            Operation.DELETE -> delete(element.dto as Assortment)
        }
    }

    fun getObjectIds(key: String): Array<Long> {
        val data: Array<Long>
        runBlocking {
            val assortment = assortmentRepository.getAssortment(key)
            data = if (assortment != null) {
                getLinkedObjectIds((assortment.id as BigDecimal).longValueExact())
            } else emptyArray()
        }
        return data
    }

    fun getAssortments(ids: Array<Long>): List<AssortmentData> {
        val data = mutableListOf<AssortmentData>()
        runBlocking {
            ids.forEach { id ->
                assortmentRepository.fetchAssortment(id)?.let { data.add(it) }
            }
        }
        return data
    }

    fun getAssortmentKeys(type: AssortmentType?): Array<String> {
        val data: List<AssortmentData>
        runBlocking {
            data = if (type != null) {
                assortmentRepository.fetchAssortments(type)
            } else {
                assortmentRepository.fetchAllAssortments()
            }
        }
        return data.map { it.key }.toTypedArray()
    }

    private fun saveAssortment(element: Assortment) {
        runBlocking {
            // prepare
            val assortmentId = fetchOrInsertAssortment(element.key, AssortmentType.OBJECT_GROUP)
            val oldObjectIds = getLinkedObjectIds(assortmentId)
            // link (new) objects
            val newObjectIds = linkObjects(assortmentId, element.objectIds)
            val unlinkObjectIds = oldObjectIds.filter { !newObjectIds.contains(it) }
            // unlink (old) objects
            unlinkObjects(assortmentId, unlinkObjectIds.toTypedArray())
        }
    }

    private suspend fun fetchOrInsertAssortment(key: String, type: AssortmentType): Long {
        val assortment = assortmentRepository.getAssortment(key)
                ?: return assortmentRepository.saveAssortment(key, type, "")
        if (assortment.queryType != type.name) {
            throw SyncFailedException("assortment with key $key has type ${assortment.queryType} instead of $type")
        }
        return (assortment.id as BigDecimal).longValueExact()
    }

    private suspend fun getLinkedObjectIds(assortmentId: Long): Array<Long> {
        return assortmentRepository.fetchObjectIdsByAssortmentId(assortmentId)
    }

    private suspend fun linkObjects(assortmentId: Long, objectIds: Array<Long>): Array<Long> {
        val linkedObjects = ArrayList<Long>()
        for (objectMdsId in objectIds) {
            // only link this object if really available
            if (objectRepository.existsObject(objectMdsId)) {
                // only link if the link does not exist yet
                if (!assortmentRepository.isLinked(assortmentId, objectMdsId)) {
                    assortmentRepository.link(assortmentId, objectMdsId)
                }
                linkedObjects.add(objectMdsId)
            }
        }
        return linkedObjects.toTypedArray()
    }

    private suspend fun unlinkObjects(assortmentId: Long, objectIds: Array<Long>) {
        objectIds.forEach { assortmentRepository.unlink(assortmentId, it) }
    }

    private fun deleteAssortment(element: Assortment) {
        runBlocking {
            val assortment = assortmentRepository.getAssortment(element.key) ?: return@runBlocking
            assortmentRepository.delete((assortment.id as BigDecimal).longValueExact())
        }
    }
}