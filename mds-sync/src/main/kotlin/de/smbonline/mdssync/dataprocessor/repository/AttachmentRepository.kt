package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttachmentsByObjectIdMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttachmentsMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentsByObjectIdAndTypeQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentsByObjectIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentsQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateAttachmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AttachmentData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.MediaType
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class AttachmentRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun saveObjectAttachment(
            id: Long,
            objectId: Long,
            filename: String,
            primary: Boolean,
            type: MediaType,
            licenseId: Long,
            credits: String?): Long {
        val result = graphQlClient.client.mutate(InsertOrUpdateAttachmentMutation(
                id, filename, primary, objectId, type.name, licenseId, Input.optional(credits)
        )).await()
        ensureNoError(result)

        result.data?.insert_smb_attachments_one
                ?: throw SyncFailedException("failed to save attachment $filename for object $objectId")
        return (result.data!!.insert_smb_attachments_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun getObjectAttachments(objectId: Long): List<AttachmentData> {
        val result = graphQlClient.client.query(FetchAttachmentsByObjectIdQuery(objectId)).await()
        return result.data?.smb_attachments?.map { it.fragments.attachmentData }.orEmpty()
    }

    suspend fun getObjectAttachments(objectId: Long, type: MediaType): List<AttachmentData> {
        val result = graphQlClient.client.query(
                FetchAttachmentsByObjectIdAndTypeQuery(objectId, type.name)
        ).await()
        return result.data?.smb_attachments?.map { it.fragments.attachmentData }.orEmpty()
    }

    suspend fun getAttachments(id: Long): List<AttachmentData> {
        val result = graphQlClient.client.query(FetchAttachmentsQuery(id)).await()
        return result.data?.smb_attachments?.map { it.fragments.attachmentData }.orEmpty()
    }

    suspend fun deleteAttachments(id: Long): Array<Long> {
        val result = graphQlClient.client.mutate(DeleteAttachmentsMutation(id)).await()
        ensureNoError(result)

        val images = result.data?.delete_smb_attachments?.returning
        return images?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }

    suspend fun deleteObjectAttachments(objectId: Long, imageIds: Array<Long>): Array<Long> {
        val result = graphQlClient.client.mutate(DeleteAttachmentsByObjectIdMutation(objectId)).await()
        ensureNoError(result)

        val images = result.data?.delete_smb_attachments?.returning
        return images?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }
}