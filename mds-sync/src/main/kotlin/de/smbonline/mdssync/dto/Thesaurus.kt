package de.smbonline.mdssync.dto

open class Thesaurus(override val mdsId: Long, override val type: String) : ParsedMdsItem(mdsId, type) {
    lateinit var name: String
    lateinit var instance: String

    override fun toString(): String = "$instance{id:$mdsId, name:$name}"
}