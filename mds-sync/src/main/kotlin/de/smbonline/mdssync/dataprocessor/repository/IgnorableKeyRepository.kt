package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAllIgnoreableKeysQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.IgnorableKeyData
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class IgnorableKeyRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    /**
     * Kotlin-2-Java bridge to run suspend function synchronously.
     * @return all IgnorableKeys
     * @see fetchAllIgnorableKeys
     */
    fun fetchAllIgnorableKeysBlocking(): List<IgnorableKeyData> {
        val result: List<IgnorableKeyData>
        runBlocking {
            result = fetchAllIgnorableKeys()
        }
        return result
    }

    /**
     * Fetches all IgnorableKeys.
     * @return all IgnorableKeys
     */
    suspend fun fetchAllIgnorableKeys(): List<IgnorableKeyData> {
        val result = graphQlClient.client.query(
                FetchAllIgnoreableKeysQuery()
        ).toDeferred().await()
        val keys = result.data?.smb_ignoreable_keys.orEmpty()
        return keys.map { it.fragments.ignorableKeyData }
    }
}