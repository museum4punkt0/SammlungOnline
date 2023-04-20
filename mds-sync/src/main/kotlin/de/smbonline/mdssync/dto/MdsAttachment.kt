package de.smbonline.mdssync.dto

interface MdsAttachment : MdsItem {

    /**
     * Type distinguisher
     */
    val mediaType: MediaType

    /**
     * Target folder+filename of this attachment
     */
    val filePath: String

    /**
     * The actual content of this attachment
     */
    val base64: ByteArray

    /**
     * Can be called in toString() from inheriting class
     */
    fun defaultToString(): String {
        return "$type{id=$mdsId, path=$filePath, size=${size()}}"
    }

    fun size(): String {
        return "${"%.2f".format(base64.size / 1000f / 1000f)}Mb)"
    }
}