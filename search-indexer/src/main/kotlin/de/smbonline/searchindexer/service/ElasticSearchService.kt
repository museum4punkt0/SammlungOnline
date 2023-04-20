package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.ElasticSearchAPI
import de.smbonline.searchindexer.conf.*
import de.smbonline.searchindexer.dto.*
import de.smbonline.searchindexer.dto.JsonAttr.*
import io.sentry.Sentry
import io.sentry.SentryLevel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ElasticSearchService @Autowired constructor(val api: ElasticSearchAPI) {

    private companion object {
        val LOGGER:Logger = LoggerFactory.getLogger(ElasticSearchService::class.java)
    }

    fun exists(objectId: Long, language: String): Boolean {
        return api.exists(objectId, language)
    }

    fun get(objectId: Long, language: String): SearchObject? {
        val data = api.pull(objectId, language)
        return if (data != null) transformObject(data, language) else null
    }

    fun push(searchObject: SearchObject): Data {
        return api.push(searchObject)
    }

    fun delete(objectId: Long): Data {
        return api.delete(objectId)
    }

    fun delete(objectId: Long, language: String): Data {
        return api.delete(objectId, language)
    }

    fun deleteField(objectId: Long, language: String, field: String): Data {
        return api.deleteField(objectId, language, field)
    }

    fun search(request: Search, language: String): Data {
        if (request.sort.isEmpty()) {
            request.sort = getDefaultSort(request)
        }
        val data = api.search(request, language)
        if (data.hasAttribute(ATTR_RESULTS)) {
            val transformed = data.getTypedAttribute<Collection<Data>>(ATTR_RESULTS)
                    ?.map { transformObject(it, language) }?.toList()
            data.setAttribute(ATTR_RESULTS, transformed)
        }
        return data
    }

    fun suggest(suggestion: SearchSuggest, language: String): Data {
        return api.suggest(suggestion, language);
    }

    private fun transformObject(data: Data, language: String): SearchObject {
        val id = data.getTypedAttribute<Number>(ID_ATTRIBUTE)
        // FIXME this is new ... we get NPEs accessing the ids
        if (id == null) {
            LOGGER.error("Missing id in object data {}", data)
            Sentry.captureMessage("Missing id in object ${data.attributes}", SentryLevel.ERROR)
        }

        val obj = SearchObject(id?.toLong() ?: 0, language)
        data.attributes.forEach { (key, value) ->
            obj.setAttribute(key, value)
            if (key == DATE_RANGE_ATTRIBUTE) {
                // Special case where we are lacking FORMATTED_VALUE_ATTRIBUTE in Elastic because
                // DATE_RANGE_ATTRIBUTE has type "date_range" instead of "object" and does not allow additional fields
                (value as Data).setAttribute(FORMATTED_VALUE_ATTRIBUTE, DateRange.toFormattedString(value, language))
            }
        }
        // TBD if we have provenanceEvaluation but no provenance entries, should remove provenanceEvaluation?
        return obj
    }

    private fun getDefaultSort(request: Search): Array<Pair<String, Boolean>> {
        val hasSearchTerm = request.searchTerm.isNotBlank() && request.searchTerm != "*"
        return if (!hasSearchTerm && request.advancedSearch == null) {
            // special case for searches without any search term:
            // there is no sense in sorting by score, so we retrieve the newest objects first instead
            arrayOf(Pair("@lastSynced", false))
        } else if (!hasSearchTerm && hasOnlyAdvancedFields(request.advancedSearch!!, ASSORTMENTS_ATTRIBUTE, COLLECTION_ATTRIBUTE, COMPILATION_ATTRIBUTE)) {
            // special case for predefined searches:
            // we want to see the objects that have images on top
            arrayOf(Pair(HAS_ATTACHMENTS_ATTRIBUTE, false))
        } else {
            arrayOf(Pair("_score", false))
        }
    }

    private fun hasOnlyAdvancedFields(fieldSearch: Array<FieldSearch>, vararg fieldNames: String): Boolean {
        for (search in fieldSearch) {
            if (!fieldNames.contains(search.field)) {
                return false
            }
        }
        return true
    }
}