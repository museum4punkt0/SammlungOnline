package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteMaterialReferencesMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchMaterialReferenceIdsByObjectIdAndLanguageQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateMaterialReferenceMutation
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.MaterialReference
import de.smbonline.mdssync.exc.SyncFailedException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class MaterialReferenceRepository @Autowired constructor(
        private val graphQlClient: GraphQlClient,
        private val languageRepository: LanguageRepository,
        private val thesaurusRepository: ThesaurusRepository
) {
    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(MaterialReferenceRepository::class.java)
        val SPECIFIC_TYPE_VOCS = arrayOf("MaterialVoc", "TechniqueVoc", "MatTechVoc", "PhotographyVoc", "PresentationVoc")
    }

    /**
     * Fetches all ids of MaterialReferences for a given Object and Language.
     * @param objectId id of Object
     * @param lang key of Language
     * @return list of MaterialReference ids
     */
    suspend fun getMaterialReferenceIds(objectId: Long, lang: String): Array<Long> {
        val result = graphQlClient.client.query(
                FetchMaterialReferenceIdsByObjectIdAndLanguageQuery(objectId, lang)
        ).await()

        return result.data?.smb_material_references
                ?.map { (it.id as BigDecimal).longValueExact() }.orEmpty().toTypedArray()
    }

    suspend fun saveMaterialReferences(references: List<MaterialReference>, language: String): Array<Long> {
        val languageId = languageRepository.fetchOrInsertLanguage(language)
        val ids = mutableListOf<Long>()
        references.forEach { ref ->
            // create thesaurus entries if not yet present
            val mapping = thesaurusRepository.ensureThesauriExist(ref.thesauri)
            // assign material-references to object
            val specificTypeVoc = ref.thesauri.find { SPECIFIC_TYPE_VOCS.contains(it.type) }
            val typeVoc = ref.thesauri.find { it.type == "TypeVoc" }
            ids += upsertMaterialReference(
                    ref.objectId, ref.mdsId, languageId, ref.sequence, ref.details, mapping[specificTypeVoc], mapping[typeVoc]
            )
        }
        return ids.toTypedArray()
    }

    /**
     * Delete MaterialReferences specified by their ids.
     * @param materialRefIds ids of MaterialReferences
     */
    suspend fun deleteAll(materialRefIds: List<Long>) {
        graphQlClient.client.mutate(
                DeleteMaterialReferencesMutation(materialRefIds)
        ).await() // await is sort-of important, otherwise deletion is not performed!?
    }

    private suspend fun upsertMaterialReference(
            objectId: Long,
            materialId: Long,
            languageId: Long,
            sequence: Int,
            details: String?,
            specificTypeVoc: Long?,
            typeVoc: Long?): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateMaterialReferenceMutation(
                        objectId, materialId,
                        languageId,
                        sequence,
                        Input.optional(details),
                        Input.optional(specificTypeVoc),
                        Input.optional(typeVoc)
                )
        ).await()
        ensureNoError(result)

        result.data?.insert_smb_material_references_one
                ?: throw SyncFailedException("failed to save material reference $materialId for object $objectId")
        return (result.data!!.insert_smb_material_references_one!!.id as BigDecimal).longValueExact()
    }
}