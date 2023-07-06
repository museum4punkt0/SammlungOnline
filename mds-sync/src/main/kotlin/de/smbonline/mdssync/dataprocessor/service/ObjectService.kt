package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ObjectData
import de.smbonline.mdssync.dataprocessor.repository.AttributeRepository
import de.smbonline.mdssync.dataprocessor.repository.CulturalReferenceRepository
import de.smbonline.mdssync.dataprocessor.repository.GeographicalReferenceRepository
import de.smbonline.mdssync.dataprocessor.repository.MaterialReferenceRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.PrincipalObject
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import de.smbonline.mdssync.util.Dates
import de.smbonline.mdssync.util.MdsConstants.*
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class ObjectService @Autowired constructor(
        private val objectRepository: ObjectRepository,
        private val attributeRepository: AttributeRepository,
        private val geographicalReferenceRepository: GeographicalReferenceRepository,
        private val culturalReferenceRepository: CulturalReferenceRepository,
        private val materialReferenceRepository: MaterialReferenceRepository,
        private val attachmentService: AttachmentService
) : DataService<PrincipalObject>, Engine<WrapperDTO>() {

    override fun save(element: PrincipalObject) {
        runBlocking {
            upsertObject(element)
        }
    }

    override fun delete(element: PrincipalObject) {
        runBlocking {
            deleteObject(element)
        }
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto::class.qualifiedName == PrincipalObject::class.qualifiedName
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as PrincipalObject)
            Operation.DELETE -> delete(element.dto as PrincipalObject)
        }
    }

    private suspend fun deleteObject(element: PrincipalObject) {
        attachmentService.deleteAll(element.mdsId)
        objectRepository.deleteObject(element.mdsId)
    }

    /**
     * Saves the object including attribute translations for *one* language specified in the ObjectDto.
     * The object and the attributes will be updated, inserted or deleted if they are no longer part of the object.
     * @param obj
     */
    private suspend fun upsertObject(obj: PrincipalObject) {

        // find existing object
        val exists = objectRepository.existsObject(obj.mdsId)

        // get attributes before saving the object
        val oldAttributeIds = if (exists) {
            attributeRepository.getAttributeIds(obj.mdsId, obj.language)
        } else emptyArray()

        // get geolocations before saving the object
        val oldGeoRefIds = if (exists) {
            geographicalReferenceRepository.getGeographicalReferenceIds(obj.mdsId, obj.language)
        } else emptyArray()

        // get cultural-references before saving the object
        val oldCultureRefIds = if (exists) {
            culturalReferenceRepository.getCulturalReferenceIds(obj.mdsId, obj.language)
        } else emptyArray()

        // get materials before saving the object
        val oldMaterialRefIds = if (exists) {
            materialReferenceRepository.getMaterialReferenceIds(obj.mdsId, obj.language)
        } else emptyArray()

        // save object
        val objectId = objectRepository.saveObject(obj)

        // save new geolocations
        val newGeoRefIds = geographicalReferenceRepository.saveGeographicalReferences(obj.geoLocs, obj.language)
        // delete the geolocations that are no longer part of the current object
        val obsoleteGeoLocIds = oldGeoRefIds.filter { !newGeoRefIds.contains(it) }
        geographicalReferenceRepository.deleteAll(obsoleteGeoLocIds)

        // save new cultural-references
        val newCultureRefIds = culturalReferenceRepository.saveCulturalReferences(obj.culturalRefs, obj.language)
        // delete the cultural-references that are no longer part of the current object
        val obsoleteCultureLocIds = oldCultureRefIds.filter { !newCultureRefIds.contains(it) }
        culturalReferenceRepository.deleteAll(obsoleteCultureLocIds)

        // save new materials and techniques
        val newMaterialRefIds = materialReferenceRepository.saveMaterialReferences(obj.materials, obj.language)
        // delete the materials that are no longer part of the current object
        val obsoleteMaterialRefIds = oldMaterialRefIds.filter { !newMaterialRefIds.contains(it) }
        materialReferenceRepository.deleteAll(obsoleteMaterialRefIds)

        // save new attributes
        val newAttributeIds = attributeRepository.saveAttributeTranslations(obj.attributes, objectId, obj.language)
        // delete the attributes that are no longer part of the current object
        val obsoleteAttributeIds = oldAttributeIds.filter { !newAttributeIds.contains(it) }
        attributeRepository.deleteAll(obsoleteAttributeIds)

        // TODO remove this; AttachmentService must be able to handle this properly - or we adjust the AttachmentResolver just like we do for exhibitions and involved-parties
        // Delete all attachments, since we cannot know if an image is updated or not.
        // To prevent orphan attachments we have to delete all existing images in this step here
        // before we can save new images of an Object.
        // The new images will be saved by consuming the appropriate Images from the DataQueue *after*
        // invocation of this method here. So it is important that the ObjectDTO is always pushed
        // to the DataQueue before the related Images are pushed.
        attachmentService.deleteAll(objectId)
    }

    fun getIdsForCollection(collectionKey: String, prefix: Boolean): Array<Long> {
        var ids: Array<Long>
        runBlocking {
            ids = if (prefix) objectRepository.getCollectionObjectIds(collectionKey)
            else objectRepository.getOrgUnitObjectIds(collectionKey)
        }
        return ids
    }

    fun getIdsForGeographicalReferencesVoc(vocId: Long): Array<Long> {
        var ids: Array<Long>
        runBlocking {
            ids = geographicalReferenceRepository.getRelatedObjectIds(vocId)
        }
        return ids
    }

    fun getIdsForLocationVoc(vocId: Long): Array<Long> {
        var ids: Array<Long>
        runBlocking {
            ids = objectRepository.getLocatedObjectIds(vocId)
        }
        return ids
    }

    fun getIdsForCulturalReferencesVoc(vocId: Long): Array<Long> {
        var ids: Array<Long>
        runBlocking {
            ids = culturalReferenceRepository.getRelatedObjectIds(vocId)
        }
        return ids
    }

    fun getIdsForMaterialReferencesVoc(vocId: Long): Array<Long> {
        var ids: Array<Long>
        runBlocking {
            ids = materialReferenceRepository.getRelatedObjectIds(vocId)
        }
        return ids
    }

    fun getLastUpdated(mdsId: Long): OffsetDateTime? {
        var obj: ObjectData?
        runBlocking {
            obj = objectRepository.fetchObject(mdsId)
        }

        val exactLocalDateString = obj?.attributes?.find { it.attributeKey == FIELD_LAST_MODIFIED }?.value
        val approxOffsetTimeString = obj?.updatedAt?.toString()
        return if (exactLocalDateString != null) {
            Dates.toOffsetDateTime(exactLocalDateString)
        } else if (approxOffsetTimeString != null) {
            OffsetDateTime.parse(approxOffsetTimeString).minusMinutes(5)
        } else null
    }

}