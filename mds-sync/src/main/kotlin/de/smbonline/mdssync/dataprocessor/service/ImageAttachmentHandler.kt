package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.AttachmentRepository
import de.smbonline.mdssync.dataprocessor.repository.ImageWebDavRepository
import de.smbonline.mdssync.dataprocessor.repository.LicenseRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.Media
import de.smbonline.mdssync.dto.MediaType
import de.smbonline.mdssync.dto.ObjImage
import de.smbonline.mdssync.util.Licenses
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class ImageAttachmentHandler @Autowired constructor(
        private val objectRepository: ObjectRepository,
        private val attachmentRepository: AttachmentRepository,
        private val licenseRepository: LicenseRepository,
        private val webDavRepository: ImageWebDavRepository,
        private val converterInterceptor: ImageConverterInterceptor
) : AttachmentHandler {

    override fun save(element: Media) {
        runBlocking {
            converterInterceptor.intercept(element)
            if (element is ObjImage) {
                saveOrUpdateImage(element)
            } else {
                updateIfExisting(element)
            }
        }
    }

    override fun delete(element: Media) {
        runBlocking {
            deleteImages(element)
        }
    }

    override suspend fun deleteAll(objectId: Long) {
        val images = attachmentRepository.getObjectAttachments(objectId, MediaType.IMAGE)
        for (image in images) {
            webDavRepository.delete(image.filename)
        }
        attachmentRepository.deleteObjectAttachments(objectId, images.map { (it.id as Number).toLong() }.toTypedArray())
    }

    private suspend fun updateIfExisting(element: Media) {
        val existing = attachmentRepository.getAttachments(element.mdsId)
        if (existing.isNotEmpty()) {
            webDavRepository.insertOrUpdate(element.filePath, element.base64)
            // just to trigger the modified_at timestamp, we save what is already saved
            existing.forEach {
                // keep old license info, we can be certain it was resolved via full object-sync
                // and hence is more reliable than the half-baked credits from image sync
                attachmentRepository.saveObjectAttachment(
                        element.mdsId,
                        (it.objectId as Number).toLong(),
                        element.filePath,
                        it.primary ?: false,
                        element.mediaType,
                        (it.licenseId as Number).toLong(),
                        it.credits
                )
            }
        }
    }

    private suspend fun saveOrUpdateImage(element: ObjImage) {
        if (objectRepository.existsObject(element.objectId)) {
            val licenseId = licenseRepository.fetchOrInsertLicense(element.credits.licenseKey)
            webDavRepository.insertOrUpdate(element.filePath, element.base64)
            attachmentRepository.saveObjectAttachment(
                    element.mdsId,
                    element.objectId,
                    element.filePath,
                    element.primary,
                    element.mediaType,
                    licenseId,
                    Licenses.toCreditLine(element.credits)
            )
        }
    }

    private suspend fun deleteImages(element: Media) {
        val existing = attachmentRepository.getAttachments(element.mdsId)
        if (existing.isNotEmpty()) {
            existing.forEach { webDavRepository.delete(it.filename) }
            attachmentRepository.deleteAttachments(element.mdsId)
        }
    }
}