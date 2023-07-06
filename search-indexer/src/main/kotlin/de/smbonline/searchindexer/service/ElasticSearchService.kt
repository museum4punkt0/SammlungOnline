package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.ElasticSearchAPI
import de.smbonline.searchindexer.conf.*
import de.smbonline.searchindexer.dto.*
import de.smbonline.searchindexer.dto.JsonAttr.ATTR_RESULTS
import de.smbonline.searchindexer.norm.impl.shared.Links
import io.sentry.Sentry
import io.sentry.SentryLevel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ElasticSearchService @Autowired constructor(
        val config: ElasticSearchConfig,
        val api: ElasticSearchAPI
) {

    private companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(ElasticSearchService::class.java)
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

    fun fetchFacets(search: Search, language: String): Data {
        // make sure we do not stress Elastic too much
        search.offset = 0
        search.limit = 0
        search.sort = emptyArray()
        // now run the aggregation search
        return api.fetchFacets(search, language)
    }

    private fun transformObject(data: Data, language: String): SearchObject {
        val id = data.getTypedAttribute<Number>(ID_ATTRIBUTE)

        // In case of unknown orgUnits, we run into NPEs accessing the ids
        if (id == null) {
            LOGGER.error("Missing id in object data {}", data)
            Sentry.captureMessage("Missing id in object ${data.attributes}", SentryLevel.ERROR)
        }

        // Convert attributes if required
        val obj = SearchObject(id?.toLong() ?: 0, language)
        data.attributes
                .filter { it.value != null } // return undefined instead of null
                // TODO extract filter logic, incl. _ORIGINDATE and PROVENANCE_EVALUATION_ATTRIBUTE, TITLES_ATTRIBUTE from special cases below
                .filter { it.key != _ORIGINDATE } // remove internal fields
                .forEach { (key, value) ->
                    // adjust nested items
                    if (value is Collection<*> && value.firstOrNull() is Data) {
                        for (item in (value as Collection<Data>)) {
                            // TODO add lookup if available
//                        if (item.hasAttribute(ID_ATTRIBUTE)) {
//                            val type = when (key) {
//                                CULTURAL_REFERENCES_ATTRIBUTE -> "thesaurus"
//                                EXHIBITIONS_ATTRIBUTE -> "exhibition"
//                                GEOGRAPHICAL_REFERENCES_ATTRIBUTE -> "thesaurus"
//                                INVOLVED_PARTIES_ATTRIBUTE -> "person"
//                                MATERIAL_AND_TECHNIQUE_ATTRIBUTE -> "thesaurus"
//                                else -> null
//                            }
//                            type?.let {
//                                item.setAttribute("lookup", HtmlLinks.lookup(it, requireId(item.getAttribute(ID_ATTRIBUTE))))
//                            }
//                        }
                            // If html-support is disabled by configuration, we only use the plain text fields
                            if (!config.markupAllowed) {
                                item.removeAttribute(MARKUP_VALUE_ATTRIBUTE)
                            }
                        }
                    }
                    if (value is Data) {
                        // If html-support is disabled by configuration, we only use the plain text fields
                        if (!config.markupAllowed) {
                            value.removeAttribute(MARKUP_VALUE_ATTRIBUTE)
                        }
                        // Special case where we are lacking FORMATTED_VALUE_ATTRIBUTE in Elastic because
                        // DATE_RANGE_ATTRIBUTE has type "date_range" instead of "object" and does not allow additional fields
                        if (key == DATE_RANGE_ATTRIBUTE) {
                            value.setAttribute(FORMATTED_VALUE_ATTRIBUTE, DateRange.toFormattedString(value, language))
                        }
                    }
                    obj.setAttribute(key, value)
                }

        // Apply additional attributes and business logic
        if (id != null) {

            // special case for permalink which is not stored in Elastic
            val htmlLink = if (config.markupAllowed) "<div>%s</div>".format(Links.permalinkHTML(obj)) else null
            obj.setAttribute("permalink", Data()
                    .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, Links.permalink(obj))
                    .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, htmlLink))

            // special case for provenanceEvaluation - do not use it if there are no provenance-steps
            if (obj.hasAttribute(PROVENANCE_EVALUATION_ATTRIBUTE) && !obj.hasAttribute(PROVENANCE_ATTRIBUTE)) {
                obj.removeAttribute(PROVENANCE_EVALUATION_ATTRIBUTE)
            }
            // special case for (further) titles - do not use it if there is only one
            if (obj.hasAttribute(TITLES_ATTRIBUTE) && obj.getTypedAttribute<Collection<Data>>(TITLES_ATTRIBUTE)!!.size == 1) {
                obj.removeAttribute(TITLES_ATTRIBUTE)
            }
        }
        return obj
    }

    private fun getDefaultSort(request: Search): Array<Pair<String, Boolean>> {
        val hasSearchTerm = request.searchTerm.isNotBlank() && request.searchTerm != "*"
        return if (!hasSearchTerm && request.advancedSearch == null) {
            // special case for searches without any search term:
            // there is no sense in sorting by score, so we retrieve the newest objects first instead
            arrayOf(Pair("@lastSynced", false), Pair(HAS_ATTACHMENTS_ATTRIBUTE, false))
        } else {
            arrayOf(Pair("_score", false), Pair(HAS_ATTACHMENTS_ATTRIBUTE, false), Pair("@lastSynced", false))
        }
    }
}