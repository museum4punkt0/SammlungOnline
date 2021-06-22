package de.smbonline.mdssync.dto

class ImageDTO(val objectId: Long) {

    lateinit var base64: ByteArray
    lateinit var imageFileName: String
    lateinit var credits: String
    var primary: Boolean = false

    override fun toString(): String = "Attachment{name:$imageFileName, primary:$primary}"
}