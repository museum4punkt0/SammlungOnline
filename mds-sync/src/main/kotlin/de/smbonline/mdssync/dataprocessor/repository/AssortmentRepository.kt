package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAssortmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAssortmentObjectMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAssortmentByIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAssortmentByKeyQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAssortmentObjectQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAssortmentsByTypeQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAssortmentsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchObjectIdsByAssortmentIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertAssortmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertAssortmentObjectMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AssortmentData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.AssortmentType
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class AssortmentRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun getAssortment(key: String): AssortmentData? {
        val result = graphQlClient.client.query(
                FetchAssortmentByKeyQuery(key)
        ).await()
        return result.data?.smb_assortments?.firstOrNull()?.fragments?.assortmentData
    }

    suspend fun fetchAssortment(id: Long): AssortmentData? {
        val result = graphQlClient.client.query(
                FetchAssortmentByIdQuery(id)
        ).await()
        return result.data?.smb_assortments_by_pk?.fragments?.assortmentData
    }

    suspend fun fetchAssortments(type: AssortmentType): List<AssortmentData> {
        val result = graphQlClient.client.query(
                FetchAssortmentsByTypeQuery(type.name)
        ).await()
        return result.data?.smb_assortments?.map { it.fragments.assortmentData }.orEmpty()
    }

    suspend fun fetchAllAssortments(): List<AssortmentData> {
        val result = graphQlClient.client.query(
                FetchAssortmentsQuery()
        ).await()
        return result.data?.smb_assortments?.map { it.fragments.assortmentData }.orEmpty()
    }

    suspend fun saveAssortment(key: String, type: AssortmentType, query: String?): Long {
        val result = graphQlClient.client.mutate(
                InsertAssortmentMutation(
                        key = key,
                        type = type.name,
                        query = Input.optional(query),
                        image = Input.absent())
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_assortments_one
                ?: throw SyncFailedException("failed to save assortment for key:$key / type:$type")

        return (result.data!!.insert_smb_assortments_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun fetchObjectIdsByAssortmentId(assortmentId: Long): Array<Long> {
        val result = graphQlClient.client.query(
                FetchObjectIdsByAssortmentIdQuery(assortmentId)
        ).await()
        return result.data?.smb_assortments_objects?.map { (it.objectId as BigDecimal).longValueExact() }.orEmpty().toTypedArray()
    }

    suspend fun link(assortmentId: Long, objectId: Long): Long {
        val result = graphQlClient.client.mutate(
                InsertAssortmentObjectMutation(assortmentId, objectId)
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_assortments_objects_one
                ?: throw SyncFailedException("failed to link object $objectId to assortment $assortmentId")
        return (result.data!!.insert_smb_assortments_objects_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun unlink(assortmentId: Long, objectId: Long): Long? {
        val result = graphQlClient.client.mutate(
                DeleteAssortmentObjectMutation(assortmentId, objectId)
        ).await()
        ensureNoError(result)

        val entry = result.data?.delete_smb_assortments_objects?.returning?.firstOrNull() ?: return null
        return (entry.id as BigDecimal).longValueExact()
    }

    suspend fun delete(assortmentId: Long): Long? {
        val result = graphQlClient.client.mutate(
                DeleteAssortmentMutation(assortmentId)
        ).await()
        ensureNoError(result)

        return if (result.data?.delete_smb_assortments_by_pk == null) null else {
            (result.data!!.delete_smb_assortments_by_pk!!.id as BigDecimal).longValueExact()
        }
    }

    suspend fun isLinked(assortmentId: Long, objectId: Long): Boolean {
        val result = graphQlClient.client.query(
                FetchAssortmentObjectQuery(assortmentId, objectId)
        ).await()

        val obj = result.data?.smb_assortments_objects?.firstOrNull()
        return obj != null
    }

}