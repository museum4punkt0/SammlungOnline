package de.smbonline.mdssync.dto

open class MaterialReference(
        override val mdsId: Long,
        override val objectId: Long,
        override val sequence: Int) : ParsedMdsItem(mdsId, "MaterialReference"), ObjRelation {

    var details: String? = null
    var thesauri: List<Thesaurus> = mutableListOf()
}