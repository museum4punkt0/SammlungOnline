package de.smbonline.mdssync.dto

open class ParsedMdsItem(override val mdsId: Long, override val type: String) : MdsItem {
    override var attributes: List<AttributeValue> = mutableListOf()

    override fun toString(): String = "$type{id:$mdsId}"
}