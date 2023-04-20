package de.smbonline.searchindexer.api

import com.fasterxml.jackson.databind.ObjectMapper
import de.smbonline.searchindexer.conf.*
import de.smbonline.searchindexer.conf.ElasticSearchConfig
import de.smbonline.searchindexer.dto.Data
import de.smbonline.searchindexer.dto.FieldSearch
import de.smbonline.searchindexer.dto.JsonAttr.*
import de.smbonline.searchindexer.dto.Search
import de.smbonline.searchindexer.dto.SearchObject
import de.smbonline.searchindexer.dto.SearchSuggest
import de.smbonline.searchindexer.log.LogExecutionTime
import org.apache.commons.lang3.StringUtils
import org.apache.commons.text.WordUtils
import org.elasticsearch.action.DocWriteResponse
import org.elasticsearch.action.bulk.BulkRequest
import org.elasticsearch.action.delete.DeleteRequest
import org.elasticsearch.action.get.GetRequest
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.action.update.UpdateRequest
import org.elasticsearch.client.RequestOptions
import org.elasticsearch.client.RestHighLevelClient
import org.elasticsearch.common.xcontent.StatusToXContentObject
import org.elasticsearch.xcontent.XContentType
import org.elasticsearch.index.query.Operator
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.script.Script
import org.elasticsearch.search.aggregations.AggregationBuilders
import org.elasticsearch.search.aggregations.BucketOrder
import org.elasticsearch.search.aggregations.bucket.terms.Terms
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.elasticsearch.search.sort.SortOrder
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component

@Component
class ElasticSearchAPI @Autowired constructor(
        private val jackson: ObjectMapper,
        private val config: ElasticSearchConfig,
        private val client: RestHighLevelClient
) {
    private companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(ElasticSearchAPI::class.java)
        val SORTABLE_TEXT_FIELDS = arrayOf(
                ACQUISITION_ATTRIBUTE,
                COLLECTION_ATTRIBUTE, COLLECTION_KEY_ATTRIBUTE, COMPILATION_ATTRIBUTE, CREDIT_LINE_ATTRIBUTE,
                DIMENSIONS_AND_WEIGHT_ATTRIBUTE,
                EXHIBITIONS_ATTRIBUTE,
                EXHIBITION_SPACE_ATTRIBUTE,
                FINDSPOT_ATTRIBUTE,
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                IDENT_NUMBER_ATTRIBUTE, INVOLVED_PARTIES_ATTRIBUTE,
                LOCATION_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
                PROVENANCE_EVALUATION_ATTRIBUTE,
                TECHNICAL_TERM_ATTRIBUTE, TITLES_ATTRIBUTE
        )
        val FULLTEXT_SUGGESTION_FIELDS = arrayOf(
                TITLES_ATTRIBUTE,
                FINDSPOT_ATTRIBUTE,
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                INVOLVED_PARTIES_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
                TECHNICAL_TERM_ATTRIBUTE,
                EXHIBITIONS_ATTRIBUTE,
                //COLLECTION_ATTRIBUTE,
                //COMPILATION_ATTRIBUTE
        )
        val NO_SUGGESTION_FIELDS = arrayOf(
                ASSORTMENTS_ATTRIBUTE,
                COLLECTION_KEY_ATTRIBUTE,
                DATE_RANGE_ATTRIBUTE,
                HAS_ATTACHMENTS_ATTRIBUTE,
                INSCRIPTION_ATTRIBUTE,
                IS_EXHIBIT_ATTRIBUTE,
                IS_HIGHLIGHT_ATTRIBUTE,
                LITERATURE_ATTRIBUTE,
                LONG_DESCRIPTION_ATTRIBUTE,
                PROVENANCE_ATTRIBUTE,
                PROVENANCE_EVALUATION_ATTRIBUTE,
                SIGNATURES_ATTRIBUTE
        )
        val OBJECT_FIELDS = arrayOf(
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                INVOLVED_PARTIES_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE
        )
        val WORD_DELIMITERS = " /-()[]{}\"".toCharArray()
    }

    /**
     * Check if object is indexed.
     */
    fun exists(objectId: Long, lang: String = DEFAULT_LANGUAGE): Boolean {
        return pull(objectId, lang) != null
    }

    /**
     * Fetch object from Elastic index.
     */
    @LogExecutionTime
    fun pull(objectId: Long, lang: String): Data? {
        val request = GetRequest("${config.objectIndex}-${lang}", "$objectId")
        val response = client.get(request, RequestOptions.DEFAULT)
        return if (response.isExists) Data.fromMap(response.source.toSortedMap()) else null
    }

    /**
     * Push object to Elastic index.
     */
    @LogExecutionTime
    fun push(obj: SearchObject): Data {
        val doc = jackson.writeValueAsBytes(obj.attributes)
        val request = UpdateRequest("${config.objectIndex}-${obj.language}", "${obj.id}")
                .doc(doc, XContentType.JSON) // for update
                .upsert(doc, XContentType.JSON) // for insert
        val response = client.update(request, RequestOptions.DEFAULT)
        val success = response.result == DocWriteResponse.Result.CREATED
                || response.result == DocWriteResponse.Result.UPDATED
                || response.result == DocWriteResponse.Result.NOOP
        if (success && LOGGER.isDebugEnabled) {
            LOGGER.debug("Pushed Object: <{}, {}>", obj.id, response.result)
        }
        if (!success) {
            LOGGER.error("Failed: {}", response)
        }
        return Data().setAttribute("${obj.id}", response.result.name)
    }

    /**
     * Delete object from all indexes if exists.
     */
    @LogExecutionTime
    fun delete(objectId: Long): Data {
        return if (exists(objectId)) remove(objectId)
        else Data().setAttribute("$objectId", DocWriteResponse.Result.NOT_FOUND.name)
    }

    private fun remove(objectId: Long): Data {
        val de = DeleteRequest("${config.objectIndex}-de", "$objectId")
        val en = DeleteRequest("${config.objectIndex}-en", "$objectId")
        val request = BulkRequest().add(de).add(en)
        val response = this.client.bulk(request, RequestOptions.DEFAULT)
        return handleDeletedResponse(response, objectId)
    }

    /**
     * Delete object from index if exists.
     */
    @LogExecutionTime
    fun delete(objectId: Long, lang: String): Data {
        return if (exists(objectId, lang)) remove(objectId, lang)
        else Data().setAttribute("$objectId", DocWriteResponse.Result.NOT_FOUND.name)
    }

    private fun remove(objectId: Long, lang: String): Data {
        val request = DeleteRequest("${config.objectIndex}-$lang", "$objectId")
        val response = this.client.delete(request, RequestOptions.DEFAULT)
        return handleDeletedResponse(response, objectId)
    }

    private fun handleDeletedResponse(response: StatusToXContentObject, objectId: Long): Data {
        return if (HttpStatus.valueOf(response.status().status).is2xxSuccessful) {
            LOGGER.debug("Deleted Object: <{}, {}>", objectId, DocWriteResponse.Result.DELETED)
            Data().setAttribute("$objectId", DocWriteResponse.Result.DELETED.name)
        } else {
            LOGGER.error("Failed: {}", response)
            Data().setAttribute("$objectId", "FAILED")
        }
    }

    fun deleteField(objectId: Long, lang: String, field: String): Data {
        return if (exists(objectId, lang)) {
            val script = Script("ctx._source.remove(\"${field}\")")
            val request = UpdateRequest("${config.objectIndex}-${lang}", "$objectId").script(script)
            val response = client.update(request, RequestOptions.DEFAULT)
            val success = response.result == DocWriteResponse.Result.UPDATED
                    || response.result == DocWriteResponse.Result.NOOP
            if (success && LOGGER.isDebugEnabled) {
                LOGGER.debug("Deleted field {} from Object {}", field, objectId)
            }
            if (!success) {
                LOGGER.error("Failed: {}", response)
            }
            Data().setAttribute("$objectId", response.result.name).setAttribute("field", field)
        } else {
            Data().setAttribute("$objectId", DocWriteResponse.Result.NOT_FOUND.name)
        }
    }

    /**
     * Fetch search suggestions.
     */
    @LogExecutionTime
    fun suggest(suggestion: SearchSuggest, lang: String): Data {
        return if (suggestion.field == null) multiFieldSuggest(suggestion, lang) else fieldSuggest(suggestion, lang)
    }

    // TODO make this more sophisticated - use elastic-inbuilt-suggestions
    private fun multiFieldSuggest(suggestion: SearchSuggest, lang: String): Data {

        val suggestions = mutableListOf<Data>()

        // loop over all suggestion fields and aggregate the field suggestions
        for (field in FULLTEXT_SUGGESTION_FIELDS) {
            val fieldSuggestion = SearchSuggest(suggestion.searchTerm)
            fieldSuggestion.field = field
            fieldSuggestion.limit = suggestion.limit
            // get suggestions for field
            val fieldSuggestions: List<Data> = fieldSuggest(fieldSuggestion, lang).getTypedAttribute(ATTR_SUGGESTIONS)!!
            for (fs in fieldSuggestions) {
                // in some cases a same suggestion may be given by another field
                val same = suggestions.find { it.getAttribute(ATTR_VALUE) == fs.getAttribute(ATTR_VALUE) }
                if (same == null) {
                    // default case
                    suggestions.add(fs)
                } else {
                    // edge case
                    // we have a hit on multiple fields; aggregate counters for same values and remove the field attribute
                    val addend1 = same.getTypedAttribute<Long>(ATTR_COUNTER)!!
                    val addend2 = fs.getTypedAttribute<Long>(ATTR_COUNTER)!!
                    same.setAttribute(ATTR_COUNTER, addend1 + addend2).removeAttribute(ATTR_FIELD)
                }
            }
        }

        // sort aggregated suggestions by relevance
        val sorted = suggestions.sortedWith { d1: Data, d2: Data ->
            if (config.suggestionsSort == ElasticSearchConfig.SuggestionSort.TERM) {
                val s1 = d1.getTypedAttribute<String>(ATTR_VALUE)!!
                val s2 = d2.getTypedAttribute<String>(ATTR_VALUE)!!
                unwrapQuotes(s1).compareTo(unwrapQuotes(s2)) // asc
            } else {
                val c1 = d1.getTypedAttribute<Long>(ATTR_COUNTER)!!
                val c2 = d2.getTypedAttribute<Long>(ATTR_COUNTER)!!
                c2.compareTo(c1) // desc
            }
        }

        // return the most relevant suggestions respecting the given limit
        return Data().setAttribute(ATTR_SUGGESTIONS, sorted.subList(0, sorted.size.coerceAtMost(suggestion.limit)))
    }

    private fun unwrapQuotes(str: String): String {
        return StringUtils.unwrap(str, '"')
    }

    private fun wrapQuotes(str: String): String {
        return if (str.indexOf(' ') > -1) StringUtils.wrap(str, '"') else str
    }

    // TODO use elastic-inbuilt-suggestions
    private fun fieldSuggest(suggestion: SearchSuggest, lang: String): Data {
        val rawSearchTerm = normalize(suggestion.searchTerm)
        val field = suggestableField(suggestion.field!!)
                ?: return Data().setAttribute(ATTR_SUGGESTIONS, emptyList<Data>())
        val sort = if (config.suggestionsSort == ElasticSearchConfig.SuggestionSort.TERM) {
            BucketOrder.key(true)
        } else {
            BucketOrder.count(false)
        }
        val leadingWildcards = config.partialMatchSuggestions
        val aggregationBuilder = AggregationBuilders.terms("suggestions")
                .field("$field.keyword")
                .order(sort)
                .size(suggestion.limit)
        val queryBuilder = QueryBuilders
                .queryStringQuery(suggestableTerm(suggestion.searchTerm, leadingWildcards))
                .allowLeadingWildcard(leadingWildcards)
                .defaultOperator(Operator.AND)
                .field(field)
                .lenient(true)
        val sourceBuilder = SearchSourceBuilder()
                .from(0)
                .size(0)
                .trackTotalHits(false)
                .query(queryBuilder)
                .aggregation(aggregationBuilder)
        val request = SearchRequest().indices("${config.objectIndex}-${lang}").source(sourceBuilder)
        val response = search(request)
        val buckets = response.aggregations.get<Terms>("suggestions").buckets
        val results = mutableListOf<Data>()
        for (bucket in buckets) {
            val term = bucket.keyAsString
            if (normalize(term).contains(rawSearchTerm)) {
                results.add(Data()
                        .setAttribute(ATTR_FIELD, suggestion.field)
                        .setAttribute(ATTR_VALUE, wrapQuotes(WordUtils.capitalize(term, *WORD_DELIMITERS))) // workaround as we have lowercase suggestions
                        .setAttribute(ATTR_COUNTER, bucket.docCount))
            }
        }
        return Data().setAttribute(ATTR_SUGGESTIONS, results)
    }

    private fun normalize(string: String): String {
        return string.replace(Regex("[*'\" ]"), "").lowercase()
    }

    @LogExecutionTime
    fun search(searchRequest: Search, lang: String): Data {
        val sourceBuilder = prepareSearchSourceBuilder(searchRequest)
        val request = SearchRequest().indices("${config.objectIndex}-${lang}").source(sourceBuilder)
        val response = search(request)
        return Data()
                .setNonNullAttribute(ATTR_OFFSET, sourceBuilder.from())
                .setNonNullAttribute(ATTR_LIMIT, sourceBuilder.size())
                .setNonNullAttribute(ATTR_TOTAL, response.hits.totalHits?.value)
                .setNonNullAttribute(ATTR_RESULTS, response.hits.hits.map { Data.fromMap(it.sourceAsMap.toSortedMap()) })
    }

    private fun defaultCombinedQuery(term: String): QueryBuilder {
        val normalizedSearchTerm = convertTopLevelFieldsToFormattedSubLevelFields(term)
        return QueryBuilders.boolQuery()
                .must(QueryBuilders.queryStringQuery(normalizedSearchTerm)
                        .lenient(true)
                        .allowLeadingWildcard(false))
    }

    private fun convertTopLevelFieldsToFormattedSubLevelFields(term: String): String {
        var converted = term
        for (field in OBJECT_FIELDS) {
            converted = converted.replace("$field:", "$field.$FORMATTED_VALUE_ATTRIBUTE:")
        }
        return converted
    }

    /**
     * Convert search object DTO into Elastic search-source-builder
     */
    private fun prepareSearchSourceBuilder(searchRequest: Search): SearchSourceBuilder {
        val queryBuilder: QueryBuilder = if (searchRequest.advancedSearch == null) {
            defaultCombinedQuery(searchRequest.searchTerm)
        } else {
            val advancedSearchTerm = buildAdvancedSearchTerm(searchRequest.advancedSearch!!)
            val fullSearchTerm = if (hasActualSearchTerm(searchRequest)) {
                "(${searchRequest.searchTerm}) $advancedSearchTerm"
            } else {
                stripFirstOperator(advancedSearchTerm)
            }
            defaultCombinedQuery(fullSearchTerm)
        }
        val sourceBuilder = SearchSourceBuilder()
                .from(searchRequest.offset)
                .size(searchRequest.limit)
                .trackTotalHitsUpTo(500000)
                .query(queryBuilder)
        for (sorting in searchRequest.sort) {
            val sortable = sortableField(sorting.first)
            if (sortable != null) {
                sourceBuilder.sort(sortable, if (sorting.second) SortOrder.ASC else SortOrder.DESC)
            }
        }
        return sourceBuilder
    }

    /**
     * Run a search.
     */
    private fun search(request: SearchRequest): SearchResponse {
        return client.search(request, RequestOptions.DEFAULT)
    }

    /**
     * If given string starts with a field-search operator, remove it.
     */
    private fun stripFirstOperator(string: String): String {
        // we need a backslash in front of the operator char since all of them are regex special chars
        val operators = FieldSearch.Operator.values().joinToString("|") { it.value.trim() + "|\\" + it.char }
        return string.replace(Regex("^\\s*($operators)\\s*", RegexOption.IGNORE_CASE), "")
    }

    /**
     * Build one complex search term from all given field searches.
     */
    private fun buildAdvancedSearchTerm(advancedSearch: Array<FieldSearch>): String {
        var searchTerm = ""
        // combine all field searches into one string
        for (fieldSearch in advancedSearch) {
            searchTerm += " " + fieldSearch.operator.value + '(' + fieldSearch.field + ':' + fieldSearch.searchTerm + ')'
        }
        // replace multiple whitespaces by only one
        searchTerm = searchTerm.replace(Regex("\\s+"), " ")
        // finally cut off leading and trailing whitespaces
        return searchTerm.trim()
    }

    /**
     * Check if search term has actual search literals.
     */
    private fun hasActualSearchTerm(searchRequest: Search): Boolean {
        val withoutWildcards = searchRequest.searchTerm.replace(Regex("[*?]"), "")
        return withoutWildcards.isNotBlank()
    }

    private fun suggestableTerm(str: String, leadingWildcard: Boolean = false): String {
        var term = str
        if (leadingWildcard && !(term.startsWith('*') || term.startsWith('"') || term.startsWith('?'))) {
            term = "*${term}"
        }
        if (!leadingWildcard) {
            term = StringUtils.stripStart(term, "*?")
        }
        if (!(term.endsWith('*') || term.endsWith('?') || term.endsWith('"') || term.endsWith(' '))) {
            term = "${term}*"
        }
        return term
    }

    /**
     * Check if given field supports search suggestions and adjust to Elastic syntax if required.
     */
    private fun suggestableField(field: String): String? {
        return if (!NO_SUGGESTION_FIELDS.contains(field)) {
            // our id is numeric, we need the string version for suggestions
            // for the nested objects we use a dedicated attribute
            when (field) {
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                ID_ATTRIBUTE -> "@$ID_ATTRIBUTE"
                INVOLVED_PARTIES_ATTRIBUTE -> "$field.name"
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                else -> field
            }
        } else null
    }

    /**
     * Check if given field is sortable and adjust to Elastic syntax if required.
     */
    private fun sortableField(field: String): String? {
        // early return for sort fields natively provided by elasticsearch
        if (field.first() == '_' || field.first() == '@') {
            return field
        }

        val topLevelField = field.substringBefore('.')

        // do not sort by long texts
        if (INSCRIPTION_ATTRIBUTE == topLevelField
                || LITERATURE_ATTRIBUTE == topLevelField
                || LONG_DESCRIPTION_ATTRIBUTE == topLevelField
                || PROVENANCE_ATTRIBUTE == topLevelField
                || SIGNATURES_ATTRIBUTE == topLevelField
                || ASSORTMENTS_ATTRIBUTE == topLevelField) {
            return null
        }
        // do not sort by tags
        if (ICONCLASS_ATTRIBUTE == topLevelField
                || ICONOGRAPHY_ATTRIBUTE == topLevelField
                || KEYWORDS_ATTRIBUTE == topLevelField) {
            return null
        }
        // do not try sorting on missing attribute
        if (!ALL_RELEVANT_ATTRIBUTES.contains(topLevelField)) {
            return null
        }
        // for complex types we have to use the formatted property
        if (OBJECT_FIELDS.contains(topLevelField)) {
            val subLevelField = field.substringAfter('.', "")
            return when {
                subLevelField.isEmpty() -> {
                    "$topLevelField.$FORMATTED_VALUE_ATTRIBUTE.keyword"
                }
                subLevelField.endsWith("id", true) -> {
                    field
                }
                else -> {
                    "$field.keyword"
                }
            }
        }
        // for text fields, we have to use .keyword suffix because "Fielddata is disabled on text fields by default."
        return if (SORTABLE_TEXT_FIELDS.contains(topLevelField)) "$field.keyword" else field
    }
}