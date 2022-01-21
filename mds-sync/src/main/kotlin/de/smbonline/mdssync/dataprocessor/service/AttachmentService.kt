package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.AttachmentRepository
import de.smbonline.mdssync.dataprocessor.repository.LicenseRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dataprocessor.repository.WebDavRepository
import de.smbonline.mdssync.dto.ImageDTO
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import de.smbonline.mdssync.util.Credits
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class AttachmentService @Autowired constructor(
        private val objectRepository: ObjectRepository,
        private val attachmentRepository: AttachmentRepository,
        private val licenseRepository: LicenseRepository,
        private val webDavRepository: WebDavRepository
): DataService<ImageDTO>, Engine<WrapperDTO>() {

    override fun save(element: ImageDTO) {
        runBlocking {
            saveOrUpdateImage(element)
        }
    }

    override fun delete(element: ImageDTO) {
        runBlocking {
            deleteImage(element)
        }
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto::class.qualifiedName == ImageDTO::class.qualifiedName
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as ImageDTO)
            Operation.DELETE -> delete(element.dto as ImageDTO)
        }
    }

    suspend fun deleteAll(objectId: Long) {
        val images = attachmentRepository.getAttachments(objectId)
        for (image in images) {
            val imageId = (image.id as BigDecimal).longValueExact()
            webDavRepository.delete(image.attachment)
            attachmentRepository.deleteAttachment(imageId)
        }
    }

    private suspend fun saveOrUpdateImage(element: ImageDTO) {
        if (objectRepository.existsObject(element.objectId)) {
            val licenseId = licenseRepository.fetchOrInsertLicense(element.credits.licenseKey)
            webDavRepository.insertOrUpdate(element.imageFilePath, element.base64)
            attachmentRepository.saveImage(
                    element.imageFilePath,
                    element.primary,
                    element.objectId,
                    licenseId,
                    Credits.toCreditLine(element.credits)
            )
        }
    }

    private suspend fun deleteImage(element: ImageDTO) {
        val image = attachmentRepository.getAttachment(element.imageFilePath) ?: return
        val imageId = (image.id as BigDecimal).longValueExact()
        webDavRepository.delete(image.attachment)
        attachmentRepository.deleteAttachment(imageId)
    }
}