package de.smbonline.mdssync.dto

open class CulturalReference(
        override val mdsId: Long,
        override val objectId: Long,
        override val sequence: Int) : ParsedMdsItem(mdsId, "CulturalReference"), ObjRelation {

    var thesauri: List<Thesaurus> = mutableListOf()
}