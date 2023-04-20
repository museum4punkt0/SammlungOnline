package de.smbonline.mdssync.dto

class ObjImage(
        img: Image,
        override val objectId: Long,
        override val sequence: Int,
        val primary: Boolean = false
) : Image(img.mdsId), ObjRelation {

    lateinit var credits: Credits

    init {
        filePath = img.filePath
        base64 = img.base64
        attributes = img.attributes
    }

    override fun toString(): String = "Image{path=$filePath, object=$objectId, primary=$primary, size=${size()}}"
}