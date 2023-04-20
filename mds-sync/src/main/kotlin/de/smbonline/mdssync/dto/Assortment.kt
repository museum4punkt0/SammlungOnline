package de.smbonline.mdssync.dto

class Assortment(val key: String, override val mdsId: Long = -1) : ParsedMdsItem(mdsId, "Assortment"){

    lateinit var objectIds: Array<Long>

    override fun toString(): String = "$type{key:$key, ids:$objectIds}"
}