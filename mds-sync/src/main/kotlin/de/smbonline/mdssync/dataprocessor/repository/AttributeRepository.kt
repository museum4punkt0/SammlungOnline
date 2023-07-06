package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.BulkInsertOrUpdateAttributeTranslationsMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.DeleteAttributeTranslationsMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttributeQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttributeTranslationIdsByObjectIdAndLanguageQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchAttributeTranslationsByObjectIdAndLanguageQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateAttributeMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AttributeData
import de.smbonline.mdssync.dataprocessor.graphql.queries.type.Smb_attribute_translations_insert_input
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.AttributeValue
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.io.SyncFailedException
import java.math.BigDecimal
import kotlin.math.min

@Repository
class AttributeRepository @Autowired constructor(
        private val graphQlClient: GraphQlClient,
        private val languageRepository: LanguageRepository
) {
    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(AttributeRepository::class.java)
    }

    /**
     * Fetches all ids of AttributeTranslations for a given Object and Language.
     * @param objectId id of Object
     * @param lang key of Language
     * @return list of AttributeTranslation ids
     */
    suspend fun getAttributeIds(objectId: Long, lang: String): Array<Long> {
        val result = graphQlClient.client.query(
                FetchAttributeTranslationIdsByObjectIdAndLanguageQuery(objectId = objectId, lang = lang)
        ).await()

        return result.data?.smb_attribute_translations
                ?.map { (it.id as BigDecimal).longValueExact() }.orEmpty().toTypedArray()
    }

    /**
     * Stores a list of AttributeTranslations. NOTE: The language setting inside the AttributeDtos is ignored
     * and overruled by the given language code.
     * @param attributes definition of AttributeTranslations
     * @param objectId id of owning Object
     * @param lang key to be used for translation reference
     */
    suspend fun saveAttributeTranslations(attributes: List<AttributeValue>, objectId: Long, lang: String): Array<Long> {
        LOGGER.debug("Saving ${attributes.size} attribute values for object $objectId.")

        if (attributes.isEmpty()) {
            return emptyArray()
        }

        val languageId = languageRepository.fetchOrInsertLanguage(lang)
        val ids = mapToIds(attributes, objectId, lang)
        val results = ArrayList<Response<BulkInsertOrUpdateAttributeTranslationsMutation.Data>>()
        val chunkSize = 150 // we run into OOM when we bulk-commit a lot of attributes, so we chunk them

        // first we have to insert attributes that are not existent yet
        ensureAttributesExist(attributes.filter { !ids.keys.contains(it.fqKey) }.distinctBy { it.key })

        // then we can finally set the translations
        var idx = 0
        while (idx < attributes.size) {
            val chunk = attributes.subList(idx, min(idx + chunkSize, attributes.size))
            results.add(graphQlClient.client.mutate(BulkInsertOrUpdateAttributeTranslationsMutation(
                    attributes = chunk.map { attr ->
                        Smb_attribute_translations_insert_input(
                                attribute_key = Input.optional(attr.key),
                                fq_key = Input.optional(attr.fqKey),
                                id = Input.optional(ids.entries.find { it.key == attr.fqKey }?.value),
                                language_id = Input.optional(languageId),
                                object_id = Input.optional(objectId),
                                value = Input.optional(attr.value),
                                visible = Input.optional(attr.visible)
                        )
                    }
            )).await())
            idx += chunkSize
        }

        ensureNoError(*results.toTypedArray())

        val saved = results.flatMap { it.data?.insert_smb_attribute_translations?.returning.orEmpty() }
        return saved.map { (it.id as BigDecimal).longValueExact() }.toTypedArray()
    }

    // TODO this loop can be improved by fetching all in one go and then creating
    //  all those that could not be fetched - again in one go
    private suspend fun ensureAttributesExist(attributes: List<AttributeValue>) {
        for (attr in attributes) {
            fetchOrInsertAttribute(attr)
        }
    }

    /**
     * Determine which of the given AttributeDtos reference AttributeTranslations that already exist and which are new.
     * Assign stored ids to the existing ones and returns as mapping of fqKeys to ids. This is required to distinguish
     * which AttributeTranslation need insertions and which need updates.
     * @param attributes definition of AttributeTranslations
     * @param objectId id to resolve Object relation
     * @param lang key to resolve Language relation
     * @return existing attribute fqKeys mapped to respective ids
     */
    private suspend fun mapToIds(attributes: List<AttributeValue>, objectId: Long, lang: String): Map<String, Long> {
        val existing = graphQlClient.client.query(
                FetchAttributeTranslationsByObjectIdAndLanguageQuery(
                        objectId = objectId,
                        lang = lang
                )
        ).await()

        val findIdForFqKey = fun(fqKey: String): Long? {
            val attr = existing.data?.smb_attribute_translations?.find { it.fragments.attributeTranslationsData.fqKey == fqKey }
            return if (attr == null) null else (attr.fragments.attributeTranslationsData.id as BigDecimal).longValueExact()
        }

        @Suppress("UNCHECKED_CAST")
        return attributes
                .map { it.fqKey to findIdForFqKey(it.fqKey) }
                .filter { it.second != null }
                .toMap() as Map<String, Long>
    }

    private suspend fun fetchOrInsertAttribute(attr: AttributeValue): String {
        val attribute = fetchAttribute(attr.key)
        return attribute?.key ?: insertAttribute(attr.key, attr.datatype)
    }

    private suspend fun fetchAttribute(key: String): AttributeData? {
        val result = graphQlClient.client.query(
                FetchAttributeQuery(key = key)
        ).await()
        return result.data?.smb_attributes_by_pk?.fragments?.attributeData
    }

    private suspend fun insertAttribute(key: String, dataType: String?): String {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateAttributeMutation(key = key, datatype = Input.optional(dataType))
        ).await()

        ensureNoError(result)

        result.data?.insert_smb_attributes_one ?: throw SyncFailedException("failed to insert attribute $key")
        return result.data!!.insert_smb_attributes_one!!.key
    }

    /**
     * Delete AttributeTranslations specified by their ids.
     * @param attributeIds ids of AttributeTranslations
     */
    suspend fun deleteAll(attributeIds: List<Long>) {
        graphQlClient.client.mutate(
                DeleteAttributeTranslationsMutation(attributeTranslationIds = attributeIds)
        ).await() // await is sort-of important, otherwise deletion is not performed!?
    }
}