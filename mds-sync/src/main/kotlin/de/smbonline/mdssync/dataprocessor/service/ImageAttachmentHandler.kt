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
import java.math.BigDecimal

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
            deleteImage(element)
        }
    }

    override suspend fun deleteAll(objectId: Long) {
        val images = attachmentRepository.getAttachments(objectId, MediaType.IMAGE)
        for (image in images) {
            val imageId = (image.id as BigDecimal).longValueExact()
            webDavRepository.delete(image.filename)
            attachmentRepository.deleteAttachment(imageId)
        }
    }

    private suspend fun updateIfExisting(element: Media) {
        val attachment = attachmentRepository.getAttachment(element.mdsId) ?: return
        webDavRepository.insertOrUpdate(attachment.filename, element.base64)
        // just to trigger the modified_at timestamp, we save what is already saved
        attachmentRepository.saveAttachment(
                element.mdsId,
                (attachment.objectId as BigDecimal).longValueExact(),
                attachment.filename,
                attachment.primary ?: false,
                element.mediaType,
                (attachment.licenseId as BigDecimal).longValueExact(),
                attachment.credits
        )
    }

    private suspend fun saveOrUpdateImage(element: ObjImage) {
        if (objectRepository.existsObject(element.objectId)) {
            val licenseId = licenseRepository.fetchOrInsertLicense(element.credits.licenseKey)
            webDavRepository.insertOrUpdate(element.filePath, element.base64)
            attachmentRepository.saveAttachment(
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

    private suspend fun deleteImage(element: Media) {
        val image = attachmentRepository.getAttachment(element.mdsId) ?: return
        val imageId = (image.id as BigDecimal).longValueExact()
        webDavRepository.delete(image.filename)
        attachmentRepository.deleteAttachment(imageId)
    }
}