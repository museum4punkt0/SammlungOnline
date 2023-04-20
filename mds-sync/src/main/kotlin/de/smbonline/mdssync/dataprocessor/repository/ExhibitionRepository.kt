package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteExhibitMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteExhibitionMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchExhibitQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchExhibitionIdsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchExhibitsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertExhibitMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateExhibitionMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ExhibitData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.Exhibition
import de.smbonline.mdssync.dto.ObjExhibition
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class ExhibitionRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    /**
     * Insert or update given Exhibition. NOTE: Only the pure object data is stored, not the Attributes.
     * @param dto Exhibition data
     * @return id of stored Exhibition
     * @throws SyncFailedException if Exhibition could not be saved
     */
    suspend fun saveExhibition(dto: Exhibition): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateExhibitionMutation(
                        exhibitionId = dto.mdsId,
                        title = Input.optional(dto.title),
                        description = Input.optional(dto.description),
                        location = Input.optional(dto.location),
                        startDate = Input.optional(dto.startDate?.toString()),
                        endDate = Input.optional(dto.endDate?.toString()))
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_exhibitions_one ?: throw SyncFailedException("failed to save exhibition ${dto.mdsId}")
        return (result.data!!.insert_smb_exhibitions_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun getExhibitionIds(): Array<Long> {
        val result = graphQlClient.client.query(
                FetchExhibitionIdsQuery()
        ).await()
        return result.data?.smb_exhibitions?.map { (it.id as BigDecimal).longValueExact() }.orEmpty().toTypedArray()
    }

    suspend fun fetchExhibits(objectId: Long): List<ExhibitData> {
        val result = graphQlClient.client.query(
                FetchExhibitsQuery(objectId)
        ).await()
        return result.data?.smb_exhibitions_objects?.map { it.fragments.exhibitData }.orEmpty()
    }

    /**
     * Deletes the Exhibition by the given MDS-ID.
     * @return whether Exhibition was deleted
     */
    suspend fun deleteExhibition(mdsId: Long): Boolean {
        val result = graphQlClient.client.mutate(
                DeleteExhibitionMutation(mdsId)
        ).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_exhibitions_by_pk?.id
        return deleted != null && (deleted as BigDecimal).longValueExact() == mdsId
    }

    suspend fun fetchOrInsertExhibit(dto: ObjExhibition): Long {
        val exhibit = fetchExhibit(dto.objectId, dto.mdsId)
        return if (exhibit == null) insertExhibit(dto) else (exhibit.id as BigDecimal).longValueExact()
    }

    suspend fun fetchExhibit(objectId: Long, exhibitionId: Long): ExhibitData? {
        val result = graphQlClient.client.query(
                FetchExhibitQuery(objectId, exhibitionId)
        ).await()
        val link = result.data?.smb_exhibitions_objects?.firstOrNull()
        return link?.fragments?.exhibitData;
    }

    suspend fun insertExhibit(dto: ObjExhibition): Long {
        val result = graphQlClient.client.mutate(
                InsertExhibitMutation(dto.objectId, dto.mdsId)
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_exhibitions_objects_one
                ?: throw SyncFailedException("failed to insert exhibition link $dto")
        return (result.data!!.insert_smb_exhibitions_objects_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun deleteExhibit(id: Long): Boolean {
        val result = graphQlClient.client.mutate(DeleteExhibitMutation(id)).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_exhibitions_objects_by_pk?.id
        return deleted != null && (deleted as BigDecimal).longValueExact() == id
    }
}