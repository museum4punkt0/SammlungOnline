package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.AttachmentRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.Media
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class AudioAttachmentHandler @Autowired constructor(
        private val objectRepository: ObjectRepository,
        private val attachmentRepository: AttachmentRepository
        // TODO more injections
) : AttachmentHandler {

    override fun save(element: Media) {
        runBlocking {
            saveOrUpdateAudio(element)
        }
    }

    override fun delete(element: Media) {
        runBlocking {
            deleteAudio(element)
        }
    }

    override suspend fun deleteAll(objectId: Long) {
        // TODO implement
    }

    private suspend fun saveOrUpdateAudio(element: Media) {
        // TODO implement
    }

    private suspend fun deleteAudio(element: Media) {
        // TODO implement
    }
}