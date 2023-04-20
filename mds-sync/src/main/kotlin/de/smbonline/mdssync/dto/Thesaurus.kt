package de.smbonline.mdssync.dto

open class Thesaurus(override val mdsId: Long, override val type: String) : ParsedMdsItem(mdsId, type) {
    lateinit var name: String // TODO not required for ThesaurusTranslation
    lateinit var instance: String // TODO not required for ThesaurusTranslation

    override fun toString(): String = "$instance{id:$mdsId, name:$name}"
}