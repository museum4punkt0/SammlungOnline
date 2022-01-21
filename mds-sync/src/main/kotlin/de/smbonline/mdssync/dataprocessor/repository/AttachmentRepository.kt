package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttachmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttachmentsByObjectIdMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentByFilenameQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttachmentsByObjectIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateAttachmentMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AttachmentData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

// TODO add/fix documentation in Repositories

@Repository
class AttachmentRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun saveImage(filename: String, primary: Boolean, objectId: Long, licenseId: Long, credits: String): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateAttachmentMutation(
                        filename = filename,
                        primary = primary,
                        objectId = objectId,
                        licenseId = licenseId,
                        credits = Input.optional(credits)
                )
        ).toDeferred().await()
        ensureNoError(result)

        result.data?.insert_smb_attachments_one
                ?: throw SyncFailedException("failed to save image $filename for object $objectId")
        return (result.data!!.insert_smb_attachments_one!!.id as BigDecimal).longValueExact()
    }

    suspend fun getAttachments(objectId: Long): List<AttachmentData> {
        val result = graphQlClient.client.query(
                FetchAttachmentsByObjectIdQuery(objectId = objectId)
        ).toDeferred().await()
        return result.data?.smb_attachments?.map { it.fragments.attachmentData }.orEmpty()
    }

    suspend fun getAttachment(filename: String): AttachmentData? {
        val result = graphQlClient.client.query(
                FetchAttachmentByFilenameQuery(filename = filename)
        ).toDeferred().await()
        return result.data?.smb_attachments?.first()?.fragments?.attachmentData
    }

    suspend fun deleteAttachment(id: Long): Long? {
        val result = graphQlClient.client.mutate(
                DeleteAttachmentMutation(attachmentId = id)
        ).toDeferred().await()
        ensureNoError(result)

        return if (result.data?.delete_smb_attachments_by_pk == null) null else {
            (result.data!!.delete_smb_attachments_by_pk!!.id as BigDecimal).longValueExact()
        }
    }

    // TODO Maybe better to use this instead of running deleteImage in loop.
    //  We know frequent commits cause performance problems.
    suspend fun deleteAttachments(objectId: Long): List<Long> {
        val result = graphQlClient.client.mutate(
                DeleteAttachmentsByObjectIdMutation(objectId = objectId)
        ).toDeferred().await()
        ensureNoError(result)

        val images = result.data?.delete_smb_attachments?.returning
        return images?.map { (it.id as BigDecimal).longValueExact() }.orEmpty()
    }
}