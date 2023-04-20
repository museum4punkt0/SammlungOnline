package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dto.Media

interface AttachmentHandler {
    suspend fun deleteAll(objectId: Long)
    fun save(element: Media)
    fun delete(element: Media)
}