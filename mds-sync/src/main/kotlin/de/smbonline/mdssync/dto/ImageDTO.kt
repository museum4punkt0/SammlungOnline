package de.smbonline.mdssync.dto

class ImageDTO(val objectId: Long) {

    lateinit var base64: ByteArray
    lateinit var imageFilePath: String
    lateinit var credits: CreditsDTO
    var primary: Boolean = false

    override fun toString(): String = "Attachment{path:$imageFilePath, primary:$primary}"
}