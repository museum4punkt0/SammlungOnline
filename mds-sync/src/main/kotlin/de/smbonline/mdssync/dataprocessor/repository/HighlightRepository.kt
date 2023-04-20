package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteHighlightsByOrgUnitIdMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteHightlightMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAllHighlightsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchHighlightsByOrgUnitIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchHightlightByOrgUnitIdAndObjectIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertHighlightMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.HighlightData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class HighlightRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    /**
     * Fetches all Highlights.
     * @return data of all Highlights
     */
    suspend fun fetchAllHighlights(): List<HighlightData> {
        val result = graphQlClient.client.query(
                FetchAllHighlightsQuery()
        ).await()
        return result.data?.smb_highlights?.map { it.fragments.highlightData }.orEmpty()
    }

    /**
     * Fetches all Highlights of the given OrgUnit.
     * @param orgUnitId id of OrgUnit
     */
    suspend fun fetchHighlightsByOrgUnitId(orgUnitId: Long): List<HighlightData> {
        val result = graphQlClient.client.query(
                FetchHighlightsByOrgUnitIdQuery(orgUnitId = orgUnitId)
        ).await()
        return result.data?.smb_highlights?.map { it.fragments.highlightData }.orEmpty()
    }

    /**
     * Checks if a Highlights combination of the given OrgUnit and Object exists.
     * @param orgUnitId id of OrgUnit
     * @param objectId id of Object
     * @return Boolean if Highlight exists
     */
    suspend fun existsHighlight(orgUnitId: Long, objectId: Long): Boolean {
        return getHighlightId(orgUnitId, objectId) != null
    }

    /**
     * Fetch the Highlight id for the given combination of OrgUnit and Object.
     * @param orgUnitId id of OrgUnit
     * @param objectId id of Object
     * @return id of the Highlight or null if OrgUnit-Object-combination is not found
     */
    suspend fun getHighlightId(orgUnitId: Long, objectId: Long): Long? {
        val result = graphQlClient.client.query(
                FetchHightlightByOrgUnitIdAndObjectIdQuery(
                        orgUnitId = orgUnitId,
                        objectId = objectId
                )
        ).await()

        val highlight = result.data?.smb_highlights?.firstOrNull() ?: return null
        return (highlight.fragments.highlightData.id as BigDecimal).longValueExact()
    }

    /**
     * Inserts a new Highlight. NOTE: The combination of OrgUnit id and Object id must be unique and hence should be checked before.
     * @param orgUnitId id of OrgUnit
     * @param objectId id of Object
     * @return id of the inserted row
     * @throws SyncFailedException if new row could not be inserted
     */
    suspend fun saveHighlight(orgUnitId: Long, objectId: Long): Long {
        val result = graphQlClient.client.mutate(
                InsertHighlightMutation(
                        orgUnitId = orgUnitId,
                        objectId = objectId
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_highlights_one
                ?: throw SyncFailedException("failed to save highlight for org:$orgUnitId / obj:$objectId")

        return (result.data!!.insert_smb_highlights_one!!.id as BigDecimal).longValueExact()
    }

    /**
     * Deletes a highlight by the given OrgUnit id and Object id.
     * @param orgUnitId id of OrgUnit
     * @param objectId id of Object
     * @return id of the deleted row, null if no row was deleted
     */
    suspend fun deleteHighlight(orgUnitId: Long, objectId: Long): Long? {
        val result = graphQlClient.client.mutate(
                DeleteHightlightMutation(
                        orgUnitId = orgUnitId,
                        objectId = objectId
                )
        ).await()
        ensureNoError(result)

        val highlight = result.data?.delete_smb_highlights?.returning?.firstOrNull() ?: return null
        return (highlight.id as BigDecimal).longValueExact()
    }

    /**
     * Deletes all Highlights for the given OrgUnit.
     * @param orgUnitId id of OrgUnit
     * @return Ids of affected rows
     */
    suspend fun deleteHighlights(orgUnitId: Long): List<Long> {
        val result = graphQlClient.client.mutate(
                DeleteHighlightsByOrgUnitIdMutation(
                        orgUnitId = orgUnitId
                )
        ).await()
        ensureNoError(result)

        val highlights = result.data?.delete_smb_highlights?.returning
        return highlights?.map { (it.id as BigDecimal).longValueExact() }.orEmpty()
    }
}