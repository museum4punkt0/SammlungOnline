package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteGeographicalReferencesMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchGeographicalReferenceIdsByObjectIdAndLanguageQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchGeographicalReferencesByThesaurusIdQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateGeographicalReferenceMutation
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.GeographicalReference
import de.smbonline.mdssync.exc.SyncFailedException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class GeographicalReferenceRepository @Autowired constructor(
        private val graphQlClient: GraphQlClient,
        private val languageRepository: LanguageRepository,
        private val thesaurusRepository: ThesaurusRepository
) {
    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(GeographicalReferenceRepository::class.java)
    }

    /**
     * Fetches all ids of GeographicalReferences for a given Object and Language.
     * @param objectId id of Object
     * @param lang key of Language
     * @return list of GeographicalReference ids
     */
    suspend fun getGeographicalReferenceIds(objectId: Long, lang: String): Array<Long> {
        val result = graphQlClient.client.query(FetchGeographicalReferenceIdsByObjectIdAndLanguageQuery(objectId, lang)).await()
        return result.data?.smb_geographical_references?.map {
            (it.id as Number).toLong()
        }.orEmpty().sorted().toTypedArray()
    }

    /**
     * Fetches all ids of objects that have a relation entry in GeographicalReferences for the vocabulary with the given id.
     * @param vocId id of vocabulary entry
     * @return list of Object ids
     */
    suspend fun getRelatedObjectIds(vocId: Long): Array<Long> {
        val result = graphQlClient.client.query(FetchGeographicalReferencesByThesaurusIdQuery(vocId)).await()
        return result.data?.smb_geographical_references?.map {
            (it.objectId as Number).toLong()
        }.orEmpty().distinct().toTypedArray()
    }

    suspend fun saveGeographicalReferences(references: List<GeographicalReference>, language: String): Array<Long> {
        val languageId = languageRepository.fetchOrInsertLanguage(language)
        val ids = mutableListOf<Long>()
        references.forEach { ref ->
            // create thesaurus entries if not yet present
            val mapping = thesaurusRepository.ensureThesauriExist(ref.thesauri)
            // assign object geo-references to object
            val geopolVoc = ref.thesauri.find { it.type == "GeopolVoc" }
            val placeVoc = ref.thesauri.find { it.type.matches(Regex("^Place.*Voc$")) }
            val typeVoc = ref.thesauri.find { it.type == "TypeVoc" }
            ids += upsertGeographicalReference(
                    ref.objectId, ref.mdsId, languageId, ref.sequence, ref.details, mapping[geopolVoc], mapping[placeVoc], mapping[typeVoc])
        }
        return ids.toTypedArray()
    }

    /**
     * Delete GeographicalReferences specified by their ids.
     * @param geoRefIds ids of GeographicalReferences
     */
    suspend fun deleteAll(geoRefIds: List<Long>) {
        graphQlClient.client.mutate(DeleteGeographicalReferencesMutation(geoRefIds)).await()
    }

    private suspend fun upsertGeographicalReference(
            objectId: Long,
            geoItemId: Long,
            languageId: Long,
            sequence: Int,
            details: String?,
            geopolVoc: Long?,
            placeVoc: Long?,
            typeVoc: Long?): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateGeographicalReferenceMutation(
                        objectId,
                        geoItemId,
                        languageId,
                        sequence,
                        Input.optional(details),
                        Input.optional(geopolVoc),
                        Input.optional(placeVoc),
                        Input.optional(typeVoc)
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_geographical_references_one
                ?: throw SyncFailedException("failed to save geographical reference $geoItemId for object $objectId")
        return (result.data!!.insert_smb_geographical_references_one!!.id as Number).toLong()
    }
}