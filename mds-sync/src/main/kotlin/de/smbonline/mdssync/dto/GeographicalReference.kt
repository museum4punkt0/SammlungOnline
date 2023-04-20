package de.smbonline.mdssync.dto

open class GeographicalReference(
        override val mdsId: Long,
        override val objectId: Long,
        override val sequence: Int) : ParsedMdsItem(mdsId, "GeographicalReference"), ObjRelation {

    var details: String? = null
    var thesauri: List<Thesaurus> = mutableListOf()
}