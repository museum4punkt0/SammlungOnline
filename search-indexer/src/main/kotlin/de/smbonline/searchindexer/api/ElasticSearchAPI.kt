package de.smbonline.searchindexer.api

import com.fasterxml.jackson.databind.ObjectMapper
import de.smbonline.searchindexer.conf.ALL_RELEVANT_ATTRIBUTES
import de.smbonline.searchindexer.conf.COLLECTION_ATTRIBUTE
import de.smbonline.searchindexer.conf.COLLECTION_KEY_ATTRIBUTE
import de.smbonline.searchindexer.conf.COMPILATION_ATTRIBUTE
import de.smbonline.searchindexer.conf.CREDIT_LINE
import de.smbonline.searchindexer.conf.DEFAULT_LANGUAGE
import de.smbonline.searchindexer.conf.DIMENSIONS_AND_WEIGHT_ATTRIBUTE
import de.smbonline.searchindexer.conf.EXHIBITION_SPACE_ATTRIBUTE
import de.smbonline.searchindexer.conf.ElasticSearchConfig
import de.smbonline.searchindexer.conf.GEOGRAPHICAL_REFERENCES_ATTRIBUTE
import de.smbonline.searchindexer.conf.IDENT_NUMBER_ATTRIBUTE
import de.smbonline.searchindexer.conf.ID_ATTRIBUTE
import de.smbonline.searchindexer.conf.INVOLVED_PARTIES_ATTRIBUTE
import de.smbonline.searchindexer.conf.LITERATURE_ATTRIBUTE
import de.smbonline.searchindexer.conf.LOCATION_ATTRIBUTE
import de.smbonline.searchindexer.conf.LONG_DESCRIPTION_ATTRIBUTE
import de.smbonline.searchindexer.conf.MATERIAL_AND_TECHNIQUE_ATTRIBUTE
import de.smbonline.searchindexer.conf.PROVENANCE_ATTRIBUTE
import de.smbonline.searchindexer.conf.SIGNATURES_ATTRIBUTE
import de.smbonline.searchindexer.conf.TECHNICAL_TERM_ATTRIBUTE
import de.smbonline.searchindexer.conf.TITLES_ATTRIBUTE
import de.smbonline.searchindexer.dto.Data
import de.smbonline.searchindexer.dto.FieldSearch
import de.smbonline.searchindexer.dto.JsonAttr.*
import de.smbonline.searchindexer.dto.Search
import de.smbonline.searchindexer.dto.SearchObject
import de.smbonline.searchindexer.dto.SearchSuggest
import de.smbonline.searchindexer.log.LogExecutionTime
import org.apache.commons.lang3.StringUtils
import org.elasticsearch.action.DocWriteResponse
import org.elasticsearch.action.bulk.BulkRequest
import org.elasticsearch.action.delete.DeleteRequest
import org.elasticsearch.action.get.GetRequest
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.action.update.UpdateRequest
import org.elasticsearch.client.RequestOptions
import org.elasticsearch.client.RestHighLevelClient
import org.elasticsearch.common.xcontent.XContentType
import org.elasticsearch.index.query.Operator
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.index.query.QueryBuilders
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
                COLLECTION_ATTRIBUTE, COLLECTION_KEY_ATTRIBUTE, COMPILATION_ATTRIBUTE, CREDIT_LINE,
                DIMENSIONS_AND_WEIGHT_ATTRIBUTE,
                EXHIBITION_SPACE_ATTRIBUTE,
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                IDENT_NUMBER_ATTRIBUTE, INVOLVED_PARTIES_ATTRIBUTE,
                LOCATION_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
                PROVENANCE_ATTRIBUTE,
                TECHNICAL_TERM_ATTRIBUTE, TITLES_ATTRIBUTE
        )
        val SUGGESTION_FIELDS = arrayOf(
                COLLECTION_ATTRIBUTE, COMPILATION_ATTRIBUTE, CREDIT_LINE,
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                IDENT_NUMBER_ATTRIBUTE, ID_ATTRIBUTE, INVOLVED_PARTIES_ATTRIBUTE,
                LOCATION_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
                PROVENANCE_ATTRIBUTE,
                TECHNICAL_TERM_ATTRIBUTE, TITLES_ATTRIBUTE
        )
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
        val doc = jackson.writeValueAsBytes(obj.attributes);
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
     * Delete object if exists.
     */
    fun delete(objectId: Long): Data {
        return if (exists(objectId)) remove(objectId)
        else Data().setAttribute("$objectId", DocWriteResponse.Result.NOT_FOUND)
    }

    @LogExecutionTime
    private fun remove(objectId: Long): Data {
        val de = DeleteRequest("${config.objectIndex}-de", "$objectId")
        val en = DeleteRequest("${config.objectIndex}-en", "$objectId")
        val request = BulkRequest().add(de).add(en)
        val response = this.client.bulk(request, RequestOptions.DEFAULT)
        return if (HttpStatus.valueOf(response.status().status).is2xxSuccessful) {
            LOGGER.debug("Deleted Object: <{}, {}>", objectId, DocWriteResponse.Result.DELETED)
            Data().setAttribute("$objectId", DocWriteResponse.Result.DELETED.name)
        } else {
            LOGGER.error("Failed: {}", response)
            Data().setAttribute("$objectId", "FAILED")
        }
    }

    /**
     * Fetch search suggestions.
     */
    @LogExecutionTime
    fun suggest(suggestion: SearchSuggest, lang: String): Data {
        return if (suggestion.field == null) multiFieldSuggest(suggestion, lang) else fieldSuggest(suggestion, lang)
    }

    // TODO make this more sophisticated
    private fun multiFieldSuggest(suggestion: SearchSuggest, lang: String): Data {

        val suggestions = mutableListOf<Data>()

        // loop over all suggestion fields and aggregate the field suggestions
        for (field in SUGGESTION_FIELDS) {
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
                    suggestions.add(fs);
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

    private fun appendWildcard(str: String): String? {
        return if (str.endsWith('"') || str.endsWith(" ")) str else "${str}*"
    }

    private fun fieldSuggest(suggestion: SearchSuggest, lang: String): Data {
        val field = suggestable(suggestion.field!!) ?: return Data().setAttribute(ATTR_SUGGESTIONS, emptyList<Data>());
        val sort = if (config.suggestionsSort == ElasticSearchConfig.SuggestionSort.TERM) {
            BucketOrder.key(true)
        } else {
            BucketOrder.count(false)
        }
        val aggregationBuilder = AggregationBuilders.terms("suggestions")
                .field(field)
                .order(sort)
                .size(suggestion.limit)
        val queryBuilder = QueryBuilders
                .simpleQueryStringQuery(appendWildcard(suggestion.searchTerm))
                .defaultOperator(Operator.AND)
                .field(suggestion.field)
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
            results.add(Data()
                    .setAttribute(ATTR_FIELD, suggestion.field)
                    .setAttribute(ATTR_VALUE, wrapQuotes(bucket.keyAsString))
                    .setAttribute(ATTR_COUNTER, bucket.docCount))
        }
        return Data().setAttribute(ATTR_SUGGESTIONS, results)
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

    /**
     * Convert search object DTO into Elastic search-source-builder
     */
    private fun prepareSearchSourceBuilder(searchRequest: Search): SearchSourceBuilder {
        val queryBuilder: QueryBuilder = if (searchRequest.advancedSearch == null) {
            QueryBuilders.queryStringQuery(searchRequest.searchTerm)
                    .lenient(true)
                    .allowLeadingWildcard(false)
        } else {
            val advancedSearchTerm = buildAdvancedSearchTerm(searchRequest.advancedSearch!!)
            val fullSearchTerm = if (hasActualSearchTerm(searchRequest)) {
                "${searchRequest.searchTerm} $advancedSearchTerm"
            } else {
                stripFirstOperator(advancedSearchTerm)
            }
            QueryBuilders.queryStringQuery(fullSearchTerm)
                    .lenient(true)
                    .allowLeadingWildcard(false)
        }
        val sourceBuilder = SearchSourceBuilder()
                .from(searchRequest.offset)
                .size(searchRequest.limit)
                .trackTotalHitsUpTo(500000)
                .query(queryBuilder)
        for (sorting in searchRequest.sort) {
            val sortable = sortable(sorting.first)
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

    /**
     * Check if given field supports search suggestions and adjust to Elastic syntax if required.
     */
    private fun suggestable(field: String): String? {
        return if (SUGGESTION_FIELDS.contains(field)) {
            // our id is numeric, we need the string version for suggestions
            // for the other string fields we need the respective keyword type
            return if (field == ID_ATTRIBUTE) "@$ID_ATTRIBUTE.keyword" else "$field.keyword"
        } else null
    }

    /**
     * Check if given field is sortable and adjust to Elastic syntax if required.
     */
    private fun sortable(field: String): String? {
        // early return for sort fields natively provided by elasticsearch
        if (field.first() == '_' || field.first() == '@') {
            return field
        }
        // do not sort by long texts
        if (LITERATURE_ATTRIBUTE == field || LONG_DESCRIPTION_ATTRIBUTE == field || SIGNATURES_ATTRIBUTE == field) {
            return null
        }
        // do not try sorting on missing attribute
        if (!ALL_RELEVANT_ATTRIBUTES.contains(field)) {
            return null
        }
        // for text fields, we have to use .keyword suffix because "Fielddata is disabled on text fields by default."
        val isTextAttribute = SORTABLE_TEXT_FIELDS.contains(field)
        return if (isTextAttribute) "$field.keyword" else field
    }
}