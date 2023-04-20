package de.smbonline.mdssync.dto

open class Media(override val mdsId: Long, override val mediaType: MediaType)
    : ParsedMdsItem(mdsId, "Attachment"), MdsAttachment {

    override lateinit var filePath: String
    override lateinit var base64: ByteArray

    override fun toString(): String = defaultToString()
}