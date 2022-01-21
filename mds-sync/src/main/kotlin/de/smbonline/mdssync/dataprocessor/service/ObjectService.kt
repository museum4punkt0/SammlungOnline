package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ObjectData
import de.smbonline.mdssync.dataprocessor.repository.AttributeRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.ObjectDTO
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class ObjectService : DataService<ObjectDTO>, Engine<WrapperDTO>() {

    @Autowired
    lateinit var objectRepository: ObjectRepository

    @Autowired
    lateinit var attributeRepository: AttributeRepository

    @Autowired
    lateinit var attachmentService: AttachmentService

    override fun save(element: ObjectDTO) {
        runBlocking {
            saveOrUpdateObject(element)
        }
    }

    override fun delete(element: ObjectDTO) {
        runBlocking {
            deleteObject(element)
        }
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto::class.qualifiedName == ObjectDTO::class.qualifiedName
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as ObjectDTO)
            Operation.DELETE -> delete(element.dto as ObjectDTO)
        }
    }

    private suspend fun deleteObject(element: ObjectDTO) {
        attachmentService.deleteAll(element.mdsId)
        objectRepository.deleteObject(element.mdsId)
    }

    /**
     * Saves the object including attribute translations for *one* language specified in the ObjectDto.
     * The object and the attributes will be updated, inserted or deleted if they are no longer part of the object.
     * @param obj
     */
    private suspend fun saveOrUpdateObject(obj: ObjectDTO) {

        // find existing object
        val exists = objectRepository.existsObject(obj.mdsId)

        // get attributes before saving the object
        val oldAttributeIds = if (exists) {
            attributeRepository.getAttributeIds(obj.mdsId, obj.language)
        } else emptyList()

        // save object
        val objectId = objectRepository.saveObject(smbObject = obj)

        // save new attributes
        val newAttributeIds = attributeRepository.saveAttributeTranslations(obj.attributes, objectId, obj.language)

        // delete the attributes that are no longer part of the current object
        val obsoleteAttributeIds = oldAttributeIds.filter { !newAttributeIds.contains(it) }
        attributeRepository.deleteAll(obsoleteAttributeIds)

        // TODO implement image support similar to highlights or attributes with negative list
        // Delete all attachments, since we cannot know if an image is updated or not.
        // To prevent orphan attachments we have to delete all existing images in this step here
        // before we can save new images of an Object.
        // The new images will be saved by consuming the appropriate Images from the DataQueue *after*
        // invocation of this method here. So it is important that the ObjectDto is always pushed
        // to the DataQueue before the related Images are pushed.
        attachmentService.deleteAll(objectId)
    }

    fun getLastUpdated(mdsId: Long): OffsetDateTime? {
        var obj: ObjectData?
        runBlocking {
            obj = objectRepository.fetchObject(mdsId)
        }
        val timestamp = obj?.updatedAt ?: return null
        return OffsetDateTime.parse(timestamp.toString())
    }
}