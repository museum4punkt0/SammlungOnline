package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAllIgnoreableKeysQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.IgnorableKeyData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class IgnorableKeyRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    /**
     * Fetches all IgnorableKeys.
     * @return all IgnorableKeys
     */
    suspend fun fetchAllIgnorableKeys(): List<IgnorableKeyData> {
        val result = graphQlClient.client.query(
                FetchAllIgnoreableKeysQuery()
        ).await()
        val keys = result.data?.smb_ignoreable_keys.orEmpty()
        return keys.map { it.fragments.ignorableKeyData }
    }
}