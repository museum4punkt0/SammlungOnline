package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteInvolvedPartyMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeletePersonMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchInvolvedPartiesByObjectAndPersonIdsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchInvolvedPartiesByObjectIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchInvolvedPartiesByPersonIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchInvolvedPartiesByRoleIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchInvolvedPartyQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchPersonIdsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchPersonQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertInvolvedPartyMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdatePersonMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.UpdateInvolvedPartyMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.InvolvedPartyData
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.PersonData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.Person
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class PersonRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    /**
     * Insert or update given Person. NOTE: Only the pure object data is stored, not the Attributes.
     * @param dto Person data
     * @return id of stored Person
     * @throws SyncFailedException if Person could not be saved
     */
    suspend fun savePerson(dto: Person): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdatePersonMutation(
                        mdsId = dto.mdsId,
                        name = Input.optional(dto.name),
                        dateOfBirth = Input.optional(dto.dateOfBirth?.toString()),
                        dateOfDeath = Input.optional(dto.dateOfDeath?.toString()),
                        dateRange = Input.optional(dto.biographicalDates),
                        normdata1 = Input.optional(dto.normdata1),
                        normdata2 = Input.optional(dto.normdata2),
                        normdata3 = Input.optional(dto.normdata3),
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_persons_one ?: throw SyncFailedException("failed to save person ${dto.mdsId}")
        return (result.data!!.insert_smb_persons_one!!.id as Number).toLong()
    }

    /**
     * Deletes the Person by the given MDS-ID.
     * @return whether Person was deleted
     */
    suspend fun deletePerson(mdsId: Long): Boolean {
        val result = graphQlClient.client.mutate(DeletePersonMutation(mdsId)).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_persons_by_pk?.id
        return deleted != null && (deleted as Number).toLong() == mdsId
    }

    suspend fun getPersonIds(): Array<Long> {
        val result = graphQlClient.client.query(FetchPersonIdsQuery()).await()
        return result.data?.smb_persons?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }

    suspend fun fetchPersonData(id: Long): PersonData? {
        val result = graphQlClient.client.query(FetchPersonQuery(id)).await()
        return result.data?.smb_persons_by_pk?.fragments?.personData;
    }

    suspend fun fetchOrInsertPerson(mdsId: Long, name: String?): Long {
        val person = fetchPersonData(mdsId)
        return if (person == null) {
            val dto = Person(mdsId)
            dto.name = name
            savePerson(dto)
        } else (person.id as Number).toLong()
    }

//    suspend fun fetchOrInsertInvolvedParty(objectId: Long, personId: Long, roleId: Long): Long {
//        val involvedParty = fetchInvolvedParty(objectId, personId, roleId)
//        return if (involvedParty == null) {
//            insertInvolvedParty(objectId, personId, roleId)
//        } else {
//            (involvedParty.id as Number).toLong()
//        }
//    }

    suspend fun fetchPersonLinks(objectId: Long): List<InvolvedPartyData> {
        val result = graphQlClient.client.query(FetchInvolvedPartiesByObjectIdQuery(objectId)).await()
        return result.data?.smb_persons_objects?.map { it.fragments.involvedPartyData }.orEmpty()
    }

    suspend fun fetchObjectLinks(personId: Long): List<InvolvedPartyData> {
        val result = graphQlClient.client.query(FetchInvolvedPartiesByPersonIdQuery(personId)).await()
        return result.data?.smb_persons_objects?.map { it.fragments.involvedPartyData }.orEmpty()
    }

    suspend fun fetchInvolvedParties(objectId: Long, personId: Long): List<InvolvedPartyData> {
        val result = graphQlClient.client.query(FetchInvolvedPartiesByObjectAndPersonIdsQuery(objectId, personId)).await()
        return result.data?.smb_persons_objects?.map { it.fragments.involvedPartyData }.orEmpty()
    }

    suspend fun fetchInvolvedParties(roleId: Long): List<InvolvedPartyData> {
        val result = graphQlClient.client.query(FetchInvolvedPartiesByRoleIdQuery(roleId)).await()
        return result.data?.smb_persons_objects?.map { it.fragments.involvedPartyData }.orEmpty()
    }

    suspend fun fetchInvolvedParty(objectId: Long, personId: Long, roleId: Long): InvolvedPartyData? {
        val result = graphQlClient.client.query(FetchInvolvedPartyQuery(objectId, personId, roleId)).await()
        val involvedParty = result.data?.smb_persons_objects?.firstOrNull()
        return involvedParty?.fragments?.involvedPartyData;
    }

    suspend fun updateInvolvedParty(id: Long, attributionId: Long?, sequence: Int): Long {
        val result = graphQlClient.client.mutate(
                UpdateInvolvedPartyMutation(
                        id,
                        Input.optional(attributionId),
                        sequence
                )).await()
        ensureNoError(result)

        val entry = result.data?.update_smb_persons_objects_by_pk
                ?: throw SyncFailedException("failed to update InvolvedParty $id")
        return (entry.id as Number).toLong()
    }

    suspend fun insertInvolvedParty(objectId: Long, personId: Long, roleId: Long, attributionId: Long?, sequence: Int): Long {
        val result = graphQlClient.client.mutate(
                InsertInvolvedPartyMutation(
                        objectId,
                        personId,
                        roleId,
                        Input.optional(attributionId),
                        sequence
                )).await()
        ensureNoError(result)

        result.data?.insert_smb_persons_objects_one
                ?: throw SyncFailedException("failed to insert InvolvedParty{object=$objectId, person=$personId, role=$roleId}")
        return (result.data!!.insert_smb_persons_objects_one!!.id as Number).toLong()
    }

    suspend fun deleteInvolvedParty(id: Long): Boolean {
        val result = graphQlClient.client.mutate(DeleteInvolvedPartyMutation(id)).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_persons_objects_by_pk?.id
        return deleted != null && (deleted as Number).toLong() == id
    }
}
