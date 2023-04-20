package de.smbonline.mdssync.dto

open class Image(override val mdsId: Long) : Media(mdsId, MediaType.IMAGE) {
    override fun toString(): String = "Image{id=$mdsId, size=${size()}}"
}