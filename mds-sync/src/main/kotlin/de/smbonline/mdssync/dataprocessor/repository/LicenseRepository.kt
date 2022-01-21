package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchLicenseByKeyQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchLicensesQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateLicenseMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.LicenseData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.io.SyncFailedException
import java.math.BigDecimal

@Repository
class LicenseRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun fetchLicense(key: String): LicenseData? {
        val result = graphQlClient.client.query(
                FetchLicenseByKeyQuery(key = key)
        ).toDeferred().await()
        val license = result.data?.smb_licenses?.firstOrNull()
        return license?.fragments?.licenseData;
    }

    fun fetchLicensesBlocking(): List<LicenseData> {
        val result: List<LicenseData>
        runBlocking {
            result = fetchLicenses()
        }
        return result
    }

    suspend fun fetchLicenses(): List<LicenseData> {
        val result = graphQlClient.client.query(
                FetchLicensesQuery()
        ).toDeferred().await()
        val licenses = result.data?.smb_licenses.orEmpty()
        return licenses.map { it.fragments.licenseData }
    }

    suspend fun fetchOrInsertLicense(key: String): Long {
        val license = fetchLicense(key)
        return if (license == null) insertLicense(key, null) else (license.id as BigDecimal).longValueExact()
    }

    suspend fun insertLicense(key: String, link: String?): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateLicenseMutation(key = key, link = Input.optional(link))
        ).toDeferred().await()

        ensureNoError(result)

        result.data?.insert_smb_licenses_one ?: throw SyncFailedException("failed to insert license $key")
        return (result.data!!.insert_smb_licenses_one!!.id as BigDecimal).longValueExact()
    }
}