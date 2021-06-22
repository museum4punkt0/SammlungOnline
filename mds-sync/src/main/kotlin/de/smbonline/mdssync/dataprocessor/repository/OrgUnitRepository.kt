package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteOrgUnitByNameMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteOrgUnitMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchOrgUnitByNameQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchOrgUnitsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrgUnitMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.OrgUnitData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class OrgUnitRepository {

    @Autowired
    private lateinit var graphQlClient: GraphQlClient

    /**
     * Fetches all orgUnits.
     * @return orgUnit data
     */
    suspend fun fetchAllOrgUnits(): List<OrgUnitData> {
        val result = graphQlClient.client.query(
                FetchOrgUnitsQuery()
        ).toDeferred().await()
        val orgUnits = result.data?.smb_org_unit.orEmpty()
        return orgUnits.map { it.fragments.orgUnitData }
    }

    /**
     * Fetches the orgUnit by the given name.
     * @param orgUnitName
     * @return orgUnit data or null if no such orgUnit exists
     */
    suspend fun fetchOrgUnitByOrgUnitName(orgUnitName: String): OrgUnitData? {
        val result = graphQlClient.client.query(
                FetchOrgUnitByNameQuery(orgUnitName = orgUnitName)
        ).toDeferred().await()
        return result.data?.smb_org_unit?.firstOrNull()?.fragments?.orgUnitData
    }

    /**
     * Returns the ID of the requested org-unit.
     * @param orgUnitName
     * @return orgUnit-ID or null if no such orgUnit exists
     */
    suspend fun getOrgUnitIdByOrgUnitName(orgUnitName: String): Long? {
        val result = fetchOrgUnitByOrgUnitName(orgUnitName) ?: return null
        return (result.id as BigDecimal).longValueExact()
    }

    /**
     * Saves a single orgUnit.
     * @param orgUnitName
     * @return ID of the saved orgUnit
     */
    suspend fun saveOrgUnit(orgUnitName: String): Long {
        val result = graphQlClient.client.mutate(
                InsertOrgUnitMutation(orgUnitName = orgUnitName)
        ).toDeferred().await()

        if (result.data?.insert_smb_org_unit_one == null) {
            throw SyncFailedException("failed saving ourg-unit $orgUnitName")
        }
        return (result.data!!.insert_smb_org_unit_one!!.id as BigDecimal).longValueExact()
    }

    /**
     * Deletes a single orgUnit by the given pk.
     * @param orgUnitId
     * @return ID of the deleted row, null if no row was deleted
     */
    suspend fun deleteOrgUnit(orgUnitId: Long): Long? {
        val result = graphQlClient.client.mutate(
                DeleteOrgUnitMutation(orgUnitId = orgUnitId)
        ).toDeferred().await()
        ensureNoError(result)

        return if (result.data?.delete_smb_org_unit_by_pk == null) null else {
            (result.data!!.delete_smb_org_unit_by_pk!!.id as BigDecimal).longValueExact()
        }
    }

    /**
     * Deletes an orgUnit by the given name.
     * @param orgUnitName
     * @return ID of the deleted row, null if no row was deleted
     */
    suspend fun deleteOrgUnit(orgUnitName: String): Long? {
        val result = graphQlClient.client.mutate(
                DeleteOrgUnitByNameMutation(orgUnitName = orgUnitName)
        ).toDeferred().await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_org_unit?.returning.orEmpty()
        return if (deleted.isEmpty()) null else {
            (deleted.first().id as BigDecimal).longValueExact()
        }
    }
}