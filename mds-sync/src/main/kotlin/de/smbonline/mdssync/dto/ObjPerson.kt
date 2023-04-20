package de.smbonline.mdssync.dto

class ObjPerson(
        person: Person,
        override val objectId: Long,
        override val sequence: Int,
        val role: Thesaurus
) : Person(person.mdsId), ObjRelation {
    init {
        dateOfBirth = person.dateOfBirth
        dateOfDeath = person.dateOfDeath
        biographicalDates = person.biographicalDates
        name = person.name
        normdata1 = person.normdata1
        normdata2 = person.normdata2
        normdata3 = person.normdata3
        attributes = person.attributes
    }

    override fun toString(): String {
        return "InvolvedParty{object=$objectId, person=$mdsId, role=${role.mdsId}"
    }
}
