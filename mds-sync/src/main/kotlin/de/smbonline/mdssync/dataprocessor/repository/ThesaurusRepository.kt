package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteThesaurusMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteThesaurusTranslationMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchThesaurusByMdsIdAndTypeQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchThesaurusIdsByInstanceNameQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchThesaurusInstanceNamesQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchThesaurusQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchThesaurusTranslationByThesaurusIdAndLanguageQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertThesaurusMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertThesaurusTranslationMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.UpdateThesaurusMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.UpdateThesaurusTranslationMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ThesaurusData
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ThesaurusTranslationData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.Thesaurus
import de.smbonline.mdssync.exc.SyncFailedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class ThesaurusRepository @Autowired constructor(
        private val graphQlClient: GraphQlClient,
        private val languageRepository: LanguageRepository) {

    suspend fun fetchAllInstances(): Array<String> {
        val result = graphQlClient.client.query(FetchThesaurusInstanceNamesQuery()).await()
        return result.data?.smb_thesaurus?.map { it.instance }.orEmpty().toTypedArray()
    }

    suspend fun fetchIdsForInstance(instance: String): Array<Long> {
        val result = graphQlClient.client.query(FetchThesaurusIdsByInstanceNameQuery(instance)).await()
        return result.data?.smb_thesaurus?.map { (it.id as Number).toLong() }.orEmpty().toTypedArray()
    }

    // --

    suspend fun fetchThesaurusData(mdsId: Long, type: String): ThesaurusData? {
        val result = graphQlClient.client.query(
                FetchThesaurusByMdsIdAndTypeQuery(mdsId, type)
        ).await()
        val thesaurus = result.data?.smb_thesaurus?.firstOrNull()
        return thesaurus?.fragments?.thesaurusData
    }

    suspend fun ensureThesauriExist(thesauri: List<Thesaurus>): Map<Thesaurus, Long> {
        val map = mutableMapOf<Thesaurus, Long>()
        for (thesaurus in thesauri) {
            val id = fetchOrInsertThesaurus(thesaurus)
            map[thesaurus] = id
        }
        return map
    }

    suspend fun fetchOrInsertThesaurus(data: Thesaurus): Long {
        val thesaurus = fetchThesaurusData(data.mdsId, data.type)
        return if (thesaurus == null) {
            insertThesaurus(data.mdsId, data.name, data.type, data.instance)
        } else {
            (thesaurus.id as Number).toLong()
        }
    }

    suspend fun fetchThesaurusData(id: Long): ThesaurusData? {
        val result = graphQlClient.client.query(FetchThesaurusQuery(id)).await()
        return result.data?.smb_thesaurus_by_pk?.fragments?.thesaurusData
    }

    suspend fun insertThesaurus(mdsId: Long, name: String, type: String, instance: String): Long {
        val result = graphQlClient.client.mutate(
                InsertThesaurusMutation(mdsId, name, type, instance)
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_thesaurus_one
                ?: throw SyncFailedException("failed to insert thesaurus entry $type{id=$mdsId, name=$name}")
        return (result.data!!.insert_smb_thesaurus_one!!.id as Number).toLong()
    }

    suspend fun updateThesaurus(id: Long, parentId: Long?, name: String): Long {
        val result = graphQlClient.client.mutate(
                UpdateThesaurusMutation(id, Input.optional(parentId), name)
        ).await()
        ensureNoError(result)

        val entry = result.data?.update_smb_thesaurus_by_pk
                ?: throw SyncFailedException("failed to update thesaurus entry $id")
        return (entry.id as Number).toLong()
    }

    suspend fun deleteThesaurus(id: Long): Boolean {
        val result = graphQlClient.client.mutate(DeleteThesaurusMutation(id)).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_thesaurus_by_pk
        return deleted != null && (deleted.id as Number).toLong() == id
    }

    // --- translations ---

    suspend fun fetchTranslationData(thesaurusId: Long, lang: String): ThesaurusTranslationData? {
        val result = graphQlClient.client.query(
                FetchThesaurusTranslationByThesaurusIdAndLanguageQuery(thesaurusId, lang)
        ).await()
        val thesaurus = result.data?.smb_thesaurus_translations?.firstOrNull()
        return thesaurus?.fragments?.thesaurusTranslationData
    }

    suspend fun insertOrUpdateTranslation(thesaurusId: Long, lang: String, value: String): Long {
        val existing = fetchTranslationData(thesaurusId, lang)
        if (existing == null) {
            val languageId = languageRepository.fetchOrInsertLanguage(lang)
            return insertTranslation(thesaurusId, languageId, value)
        }
        val id = (existing.id as Number).toLong()
        if (existing.value != value) {
            updateTranslation(id, value)
        }
        return id
    }

    private suspend fun insertTranslation(thesaurusId: Long, langId: Long, value: String): Long {
        val result = graphQlClient.client.mutate(
                InsertThesaurusTranslationMutation(thesaurusId, langId, value)
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_thesaurus_translations_one
                ?: throw SyncFailedException("failed to insert thesaurus translation for $thesaurusId")
        return (result.data!!.insert_smb_thesaurus_translations_one!!.id as Number).toLong()
    }

    private suspend fun updateTranslation(id: Long, value: String): Long {
        val result = graphQlClient.client.mutate(UpdateThesaurusTranslationMutation(id, value)).await()
        ensureNoError(result)

        val entry = result.data?.update_smb_thesaurus_translations_by_pk
                ?: throw SyncFailedException("failed to update thesaurus translation $id")
        return (entry.id as Number).toLong()
    }

    suspend fun deleteTranslation(id: Long): Boolean {
        val result = graphQlClient.client.mutate(DeleteThesaurusTranslationMutation(id)).await()
        ensureNoError(result)

        val deleted = result.data?.delete_smb_thesaurus_translations_by_pk
        return deleted != null && (deleted.id as Number).toLong() == id
    }
}