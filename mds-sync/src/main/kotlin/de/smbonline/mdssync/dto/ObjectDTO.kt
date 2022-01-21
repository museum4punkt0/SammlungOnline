package de.smbonline.mdssync.dto

/**
 * Describes an object that should be synced. The language attribute defines the common translation language
 * for all attributes.
 */
data class ObjectDTO(override val mdsId: Long, var language: String) : MdsObject {

    override val type: String = "Object"
    override var attributes: List<AttributeDTO> = ArrayList()
    var exhibitionSpace: String? = null

    override fun toString(): String = "Object{id:$mdsId}"
}