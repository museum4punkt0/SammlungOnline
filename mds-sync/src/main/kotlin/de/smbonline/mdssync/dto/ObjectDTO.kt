package de.smbonline.mdssync.dto

/**
 * Describes an object that should be synced. The language attribute defines the common translation language
 * for all attributes.
 */
data class ObjectDTO(val mdsId: Long) {

    lateinit var language: String
    var attributes: ArrayList<AttributeDTO> = ArrayList()
    var exhibitionSpace: String? = null

    override fun toString(): String = "Object{id:$mdsId}"
}