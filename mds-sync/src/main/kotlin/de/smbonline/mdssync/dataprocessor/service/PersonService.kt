package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.InvolvedPartyData
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.PersonData
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dataprocessor.repository.PersonRepository
import de.smbonline.mdssync.dataprocessor.repository.ThesaurusRepository
import de.smbonline.mdssync.dto.ObjPerson
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.Person
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class PersonService(
        private val personRepository: PersonRepository,
        private val thesaurusRepository: ThesaurusRepository,
        private val objectRepository: ObjectRepository
) : DataService<Person>, Engine<WrapperDTO>() {

    override fun save(element: Person) {
        runBlocking {
            if (element is ObjPerson) {
                updateInvolvedParty(element)
            } else {
                insertOrUpdate(element)
            }
        }
    }

    override fun delete(element: Person) {
        runBlocking {
            deletePerson(element)
        }
    }

    fun deleteInvolvedParty(party: InvolvedPartyData): Boolean {
        var deleted: Boolean
        runBlocking {
            deleted = personRepository.deleteInvolvedParty((party.id as BigDecimal).longValueExact())
        }
        return deleted
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto is Person
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as Person)
            Operation.DELETE -> delete(element.dto as Person)
        }
    }

    fun getPersonIds(): Array<Long> {
        val data: Array<Long>
        runBlocking {
            data = personRepository.getPersonIds()
        }
        return data
    }

    fun getPerson(mdsId: Long): PersonData? {
        var data: PersonData?
        runBlocking {
            data = personRepository.fetchPersonData(mdsId)
        }
        return data
    }

    fun getInvolvedParties(objectId: Long?, personId: Long?): List<InvolvedPartyData> {
        if (objectId == null && personId == null) {
            throw IllegalArgumentException("at least one nun-null argument required")
        }
        var data: List<InvolvedPartyData>
        runBlocking {
            data = if (objectId == null) personRepository.fetchObjectLinks(personId!!)
            else if (personId == null) personRepository.fetchPersonLinks(objectId!!)
            else personRepository.fetchInvolvedParties(objectId, personId)
        }
        return data
    }

    private suspend fun updateInvolvedParty(element: ObjPerson): Long? {
        if (!objectRepository.existsObject(element.objectId)) {
            return null
        }

        // find person id - create new person if not yet present
        val personId = personRepository.fetchOrInsertPerson(element.mdsId, element.name)
        // find role id - create new role if not yet present
        val roleId = thesaurusRepository.fetchOrInsertThesaurus(element.role)
        // assign object+person+role if not yet present
        val involvedParty = personRepository.fetchInvolvedParty(element.objectId, personId, roleId)
        return if (involvedParty == null) {
            personRepository.insertInvolvedParty(element.objectId, personId, roleId, element.sequence)
        } else {
            val id = (involvedParty.id as BigDecimal).longValueExact()
            // sequence may be unset if invoked from PersonSync - in this case we keep the old info we
            // obtained from ObjSync already. But still we have to save _something_ so that the update-timestamp changes.
            val seq = if (element.sequence > 0) element.sequence else involvedParty.sequence
            personRepository.updateInvolvedParty(id, seq)
        }
    }

    private suspend fun insertOrUpdate(element: Person): Long {
        return personRepository.savePerson(element)
    }

    private suspend fun deletePerson(element: Person): Boolean {
        return personRepository.deletePerson(element.mdsId)
    }
}