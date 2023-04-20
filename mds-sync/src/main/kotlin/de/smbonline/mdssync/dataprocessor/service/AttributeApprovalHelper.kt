package de.smbonline.mdssync.dataprocessor.service

import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttributeApprovalsQuery
import de.smbonline.mdssync.dto.AttributeValue
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class AttributeApprovalHelper @Autowired constructor(private val graphQlClient: GraphQlClient) {

    fun isApproved(attr: AttributeValue, orgUnit: String): Boolean {
        var approved = false
        runBlocking {
            val result = graphQlClient.client.query(FetchAttributeApprovalsQuery(attr.key)).await()
            val approvals = result.data?.smb_attribute_approval?.firstOrNull()?.approvals
            approvals?.let { arr ->
                // format must be '[key,key,key]'
                if (arr.startsWith('[') && arr.endsWith(']')) {
                    val collectionKeys = arr.substring(1, arr.length - 1).split(",")
                    approved = collectionKeys.any { orgUnit.startsWith(it) }
                }
            }
        }
        return approved
    }
}