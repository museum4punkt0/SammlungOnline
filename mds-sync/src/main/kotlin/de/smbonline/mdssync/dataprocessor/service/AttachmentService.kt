package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AttachmentData
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ObjectData
import de.smbonline.mdssync.dataprocessor.repository.AttachmentRepository
import de.smbonline.mdssync.dto.MediaType
import de.smbonline.mdssync.dto.Media
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import de.smbonline.mdssync.util.Dates
import de.smbonline.mdssync.util.MdsConstants
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class AttachmentService @Autowired constructor(
        private val imageHandler: ImageAttachmentHandler,
        private val videoHandler: VideoAttachmentHandler,
        private val audioHandler: AudioAttachmentHandler,
        private val pdfHandler: PdfAttachmentHandler,
        private val attachmentRepository: AttachmentRepository,
) : Engine<WrapperDTO>() {

    override fun isResponsible(element: WrapperDTO): Boolean {
        return getHandler(element) != null
    }

    override fun executeCommand(element: WrapperDTO) {
        val handler = getHandler(element) ?: return
        when (element.operation) {
            Operation.UPSERT -> handler.save(element.dto as Media)
            Operation.DELETE -> handler.delete(element.dto as Media)
        }
    }

    fun getLastUpdated(mdsId: Long): OffsetDateTime? {
        var obj: AttachmentData?
        runBlocking {
            obj = attachmentRepository.getAttachments(mdsId).minByOrNull { it.updatedAt.toString() }
        }
        return if (obj == null) null else OffsetDateTime.parse(obj?.updatedAt.toString())
    }

    fun getLastUpdated(mdsId: Long, objectId:Long): OffsetDateTime? {
        var obj: AttachmentData?
        runBlocking {
            obj = attachmentRepository.getAttachments(mdsId)
                    .firstOrNull { (it.objectId as Number).toLong() == objectId }
        }
        return if (obj == null) null else OffsetDateTime.parse(obj?.updatedAt.toString())
    }

    suspend fun deleteAll(objectId: Long) {
        imageHandler.deleteAll(objectId)
        videoHandler.deleteAll(objectId)
        audioHandler.deleteAll(objectId)
        pdfHandler.deleteAll(objectId)
    }

    private fun getHandler(element: WrapperDTO): AttachmentHandler? {
        if (element.dto !is Media) {
            return null
        }
        return when (element.dto.mediaType) {
            MediaType.IMAGE -> imageHandler
            MediaType.VIDEO -> videoHandler
            MediaType.AUDIO -> audioHandler
            MediaType.PDF -> pdfHandler // TODO PdfDTO
            else -> null
        }
    }
}