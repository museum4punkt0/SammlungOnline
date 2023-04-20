package de.smbonline.mdssync.dto

class ObjExhibition(
        exhibition: Exhibition,
        override val objectId: Long,
        override val sequence: Int
) : Exhibition(exhibition.mdsId), ObjRelation {

    init {
        title = exhibition.title
        description = exhibition.description
        location = exhibition.location
        startDate = exhibition.startDate
        endDate = exhibition.endDate
        attributes = exhibition.attributes
    }

    override fun toString(): String {
        return "ExhibitionLink{object=$objectId, exhibition=$mdsId}"
    }
}