package de.smbonline.mdssync.dto

data class ModuleItemDTO(override val mdsId: Long, override val type: String) : MdsObject {
    override var attributes: List<AttributeDTO> = ArrayList()

    override fun toString(): String = "$type{id:$mdsId}"
}