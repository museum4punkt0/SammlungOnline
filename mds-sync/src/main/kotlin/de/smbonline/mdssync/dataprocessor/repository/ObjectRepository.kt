package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteObjectMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchObjectIdsByCollectionQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchObjectIdsByOrgUnitQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchObjectsByLocationIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchObjectQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateObjectMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ObjectData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.PrincipalObject
import de.smbonline.mdssync.exc.SyncFailedException
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class ObjectRepository @Autowired constructor(
        private val graphQlClient: GraphQlClient,
        private val thesaurusRepository: ThesaurusRepository
) {

    /**
     * Kotlin-2-Java bridge to run suspend function synchronously.
     * @param mdsId of requested Object
     * @return whether Object exists
     * @see existsObject
     */
    fun existsObjectBlocking(mdsId: Long): Boolean {
        val result: Boolean
        runBlocking {
            result = existsObject(mdsId)
        }
        return result
    }

    /**
     * Check if Object with given id exists.
     * @param mdsId of requested Object
     * @return whether Object exists
     */
    suspend fun existsObject(mdsId: Long): Boolean {
        val result = graphQlClient.client.query(FetchObjectQuery(mdsId)).await()
        val obj = result.data?.smb_objects_by_pk
        return obj != null
    }

    /**
     * Fetches the Object with the given id.
     * @param mdsId MDS id of requested Object
     * @return Object with id or null if not found
     */
    suspend fun fetchObject(mdsId: Long): ObjectData? {
        val result = graphQlClient.client.query(FetchObjectQuery(mdsId)).await()
        return result.data?.smb_objects_by_pk?.fragments?.objectData
    }

    /**
     * Insert or update given Object. NOTE: Only the pure object data is stored, not the Attributes.
     * @param smbObject Object data
     * @return id of stored Object
     * @throws SyncFailedException if Object could not be saved
     */
    suspend fun saveObject(smbObject: PrincipalObject): Long {
        val locVocId = if (smbObject.locationVoc == null) null else {
            thesaurusRepository.fetchOrInsertThesaurus(smbObject.locationVoc!!)
        }
        val result = graphQlClient.client.mutate(
                InsertOrUpdateObjectMutation(
                        smbObject.mdsId,
                        Input.optional(smbObject.exhibitionSpace),
                        Input.optional(locVocId)
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_objects_one ?: throw SyncFailedException("failed to save object ${smbObject.mdsId}")
        return (result.data!!.insert_smb_objects_one!!.id as BigDecimal).longValueExact()
    }

    /**
     * Deletes the Object by the given MDS-ID.
     * @return whether Object was deleted
     */
    suspend fun deleteObject(mdsId: Long): Boolean {
        val result = graphQlClient.client.mutate(DeleteObjectMutation(mdsId)).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_objects_by_pk?.id
        return deleted != null && (deleted as BigDecimal).longValueExact() == mdsId
    }

    /**
     * Fetches all ids of objects that link to the location vocabulary with the given id.
     * @param vocId id of vocabulary entry
     * @return list of Object ids
     */
    suspend fun getLocatedObjectIds(vocId: Long): Array<Long> {
        val result = graphQlClient.client.query(FetchObjectsByLocationIdQuery(vocId)).await()
        return result.data?.smb_objects?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }

    suspend fun getCollectionObjectIds(collectionKey: String): Array<Long> {
        val key = "$collectionKey%"
        val result = graphQlClient.client.query(FetchObjectIdsByCollectionQuery(key)).await()
        return result.data?.smb_objects?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }

    suspend fun getOrgUnitObjectIds(orgUnitName: String): Array<Long> {
        val result = graphQlClient.client.query(FetchObjectIdsByOrgUnitQuery(orgUnitName)).await()
        return result.data?.smb_objects?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }
}