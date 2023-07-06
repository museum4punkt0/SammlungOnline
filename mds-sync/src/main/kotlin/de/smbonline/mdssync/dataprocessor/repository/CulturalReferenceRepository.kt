package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteCulturalReferencesMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchCulturalReferenceIdsByObjectIdAndLanguageQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchCulturalReferencesByThesaurusIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateCulturalReferenceMutation
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.CulturalReference
import de.smbonline.mdssync.exc.SyncFailedException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class CulturalReferenceRepository @Autowired constructor(
        private val graphQlClient: GraphQlClient,
        private val languageRepository: LanguageRepository,
        private val thesaurusRepository: ThesaurusRepository
) {
    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(CulturalReferenceRepository::class.java)
    }

    /**
     * Fetches all ids of CulturalReferences for a given Object and Language.
     * @param objectId id of Object
     * @param lang key of Language
     * @return list of CulturalReference ids
     */
    suspend fun getCulturalReferenceIds(objectId: Long, lang: String): Array<Long> {
        val result = graphQlClient.client.query(FetchCulturalReferenceIdsByObjectIdAndLanguageQuery(objectId, lang)).await()
        return result.data?.smb_cultural_references?.map {
            (it.id as Number).toLong()
        }.orEmpty().sorted().toTypedArray()
    }

    /**
     * Fetches all ids of objects that have a relation entry in CulturalReferences for the vocabulary with the given id.
     * @param vocId id of vocabulary entry
     * @return list of Object ids
     */
    suspend fun getRelatedObjectIds(vocId: Long): Array<Long> {
        val result = graphQlClient.client.query(FetchCulturalReferencesByThesaurusIdQuery(vocId)).await()
        return result.data?.smb_cultural_references?.map {
            (it.objectId as Number).toLong()
        }.orEmpty().distinct().toTypedArray()
    }

    suspend fun saveCulturalReferences(references: List<CulturalReference>, language: String): Array<Long> {
        val languageId = languageRepository.fetchOrInsertLanguage(language)
        val ids = mutableListOf<Long>()
        references.forEach { ref ->
            // create thesaurus entries if not yet present
            val mapping = thesaurusRepository.ensureThesauriExist(ref.thesauri)
            // assign object geo-references to object
            val nameVoc = ref.thesauri.find { it.type == "NameVoc" }
            val typeVoc = ref.thesauri.find { it.type == "TypeVoc" }
            val denominationVoc = ref.thesauri.find { it.type == "DenominationVoc" }
            ids += upsertCulturalReference(
                    ref.objectId, ref.mdsId, languageId, ref.sequence, mapping[nameVoc], mapping[typeVoc], mapping[denominationVoc])
        }
        return ids.toTypedArray()
    }

    /**
     * Delete CulturalReferences specified by their ids.
     * @param geoRefIds ids of CulturalReferences
     */
    suspend fun deleteAll(geoRefIds: List<Long>) {
        graphQlClient.client.mutate(DeleteCulturalReferencesMutation(geoRefIds)).await()
    }

    private suspend fun upsertCulturalReference(
            objectId: Long,
            cultureItemId: Long,
            languageId: Long,
            sequence: Int,
            nameVoc: Long?,
            typeVoc: Long?,
            denominationVoc: Long?): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateCulturalReferenceMutation(
                        objectId,
                        cultureItemId,
                        languageId,
                        sequence,
                        Input.optional(nameVoc),
                        Input.optional(typeVoc),
                        Input.optional(denominationVoc)
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_cultural_references_one
                ?: throw SyncFailedException("failed to save cultural reference $cultureItemId for object $objectId")
        return (result.data!!.insert_smb_cultural_references_one!!.id as Number).toLong()
    }
}