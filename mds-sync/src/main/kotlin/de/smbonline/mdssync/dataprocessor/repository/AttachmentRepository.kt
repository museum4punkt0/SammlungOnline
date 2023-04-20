package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttachmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttachmentsByObjectIdMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentByFilenameQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentByIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentsByObjectAndTypeIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentsByObjectIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateAttachmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AttachmentData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.MediaType
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

// TODO add/fix documentation in Repositories

@Repository
class AttachmentRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun saveAttachment(
            id: Long,
            objectId: Long,
            filename: String,
            primary: Boolean,
            type: MediaType,
            licenseId: Long,
            credits: String?): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateAttachmentMutation(
                        id, filename, primary, objectId, type.name, licenseId, Input.optional(credits)
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_attachments_one
                ?: throw SyncFailedException("failed to save attachment $filename for object $objectId")
        return (result.data!!.insert_smb_attachments_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun getAttachments(objectId: Long): List<AttachmentData> {
        val result = graphQlClient.client.query(
                FetchAttachmentsByObjectIdQuery(objectId)
        ).await()
        return result.data?.smb_attachments?.map { it.fragments.attachmentData }.orEmpty()
    }

    suspend fun getAttachments(objectId: Long, type: MediaType): List<AttachmentData> {
        val result = graphQlClient.client.query(
                FetchAttachmentsByObjectAndTypeIdQuery(objectId, type.name)
        ).await()
        return result.data?.smb_attachments?.map { it.fragments.attachmentData }.orEmpty()
    }

    suspend fun getAttachment(filename: String): AttachmentData? {
        val result = graphQlClient.client.query(
                FetchAttachmentByFilenameQuery(filename)
        ).await()
        return result.data?.smb_attachments?.firstOrNull()?.fragments?.attachmentData
    }

    suspend fun getAttachment(id: Long): AttachmentData? {
        val result = graphQlClient.client.query(
                FetchAttachmentByIdQuery(id)
        ).await()
        return result.data?.smb_attachments_by_pk?.fragments?.attachmentData
    }

    suspend fun deleteAttachment(id: Long): Long? {
        val result = graphQlClient.client.mutate(
                DeleteAttachmentMutation(id)
        ).await()
        ensureNoError(result)

        return if (result.data?.delete_smb_attachments_by_pk == null) null else {
            (result.data!!.delete_smb_attachments_by_pk!!.id as BigDecimal).longValueExact()
        }
    }

    // TODO Maybe better to use this instead of running deleteImage in loop.
    //  We know frequent commits cause performance problems.
    suspend fun deleteAttachments(objectId: Long): List<Long> {
        val result = graphQlClient.client.mutate(
                DeleteAttachmentsByObjectIdMutation(objectId)
        ).await()
        ensureNoError(result)

        val images = result.data?.delete_smb_attachments?.returning
        return images?.map { (it.id as BigDecimal).longValueExact() }.orEmpty()
    }
}