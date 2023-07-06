package de.smbonline.searchindexer.api

import com.fasterxml.jackson.databind.ObjectMapper
import de.smbonline.searchindexer.conf.*
import de.smbonline.searchindexer.dto.*
import de.smbonline.searchindexer.dto.JsonAttr.*
import de.smbonline.searchindexer.log.LogExecutionTime
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier
import de.smbonline.searchindexer.util.I18n
import de.smbonline.searchindexer.util.Misc.*
import org.apache.commons.lang3.StringUtils.*
import org.elasticsearch.action.DocWriteResponse
import org.elasticsearch.action.bulk.BulkRequest
import org.elasticsearch.action.delete.DeleteRequest
import org.elasticsearch.action.get.GetRequest
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.action.update.UpdateRequest
import org.elasticsearch.client.RequestOptions
import org.elasticsearch.client.RestHighLevelClient
import org.elasticsearch.common.unit.Fuzziness
import org.elasticsearch.common.xcontent.StatusToXContentObject
import org.elasticsearch.index.query.Operator
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.script.Script
import org.elasticsearch.search.aggregations.AggregationBuilders
import org.elasticsearch.search.aggregations.BucketOrder
import org.elasticsearch.search.aggregations.bucket.MultiBucketsAggregation
import org.elasticsearch.search.aggregations.bucket.terms.Terms
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.elasticsearch.search.sort.SortOrder
import org.elasticsearch.xcontent.XContentType
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.context.request.RequestAttributes
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.net.URI
import java.util.*


@Component
class ElasticSearchAPI @Autowired constructor(
        private val jackson: ObjectMapper,
        private val config: ElasticSearchConfig,
        private val client: RestHighLevelClient,
        private val mappings: MappingSupplier,
        private val translator: I18n
) {
    private companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(ElasticSearchAPI::class.java)
        val SORTABLE_TEXT_FIELDS = arrayOf(
                ACQUISITION_ATTRIBUTE,
                COLLECTION_ATTRIBUTE,
                COLLECTION_KEY_ATTRIBUTE,
                COMPILATION_ATTRIBUTE,
                CREDIT_LINE_ATTRIBUTE,
                DIMENSIONS_AND_WEIGHT_ATTRIBUTE,
                EXHIBITION_SPACE_ATTRIBUTE,
                FINDSPOT_ATTRIBUTE,
                IDENT_NUMBER_ATTRIBUTE,
                LOCATION_ATTRIBUTE,
                PROVENANCE_EVALUATION_ATTRIBUTE,
                TITLE_ATTRIBUTE,
        )
        val FULLTEXT_SUGGESTION_FIELDS = arrayOf(
                CULTURAL_REFERENCES_ATTRIBUTE,
                EXHIBITIONS_ATTRIBUTE,
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                INVOLVED_PARTIES_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
                TECHNICAL_TERM_ATTRIBUTE,
                TITLES_ATTRIBUTE,
        )
        val NO_SUGGESTION_FIELDS = arrayOf(
                ARCHIVE_CONTENT,
                ASSETS_ATTRIBUTE,
                ASSORTMENTS_ATTRIBUTE,
                COLLECTION_KEY_ATTRIBUTE,
                DESCRIPTION_ATTRIBUTE,
                DATE_RANGE_ATTRIBUTE,
                HAS_ATTACHMENTS_ATTRIBUTE,
                ID_ATTRIBUTE, // must be excluded, not part of advanced-search
                INSCRIPTION_ATTRIBUTE,
                IS_EXHIBIT_ATTRIBUTE,
                IS_HIGHLIGHT_ATTRIBUTE,
                LITERATURE_ATTRIBUTE,
                PROVENANCE_ATTRIBUTE,
                PROVENANCE_EVALUATION_ATTRIBUTE,
                SIGNATURES_ATTRIBUTE,
                TITLE_ATTRIBUTE // TITLES_ATTRIBUTE is enough
        )
        val OBJECT_FIELDS = arrayOf(
                ASSETS_ATTRIBUTE,
                CULTURAL_REFERENCES_ATTRIBUTE,
                DESCRIPTION_ATTRIBUTE,
                EXHIBITIONS_ATTRIBUTE,
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
                ICONCLASS_ATTRIBUTE,
                ICONOGRAPHY_ATTRIBUTE,
                INVOLVED_PARTIES_ATTRIBUTE,
                KEYWORDS_ATTRIBUTE,
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
                TECHNICAL_TERM_ATTRIBUTE,
                TITLES_ATTRIBUTE,
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
            var painless = "ctx._source.remove(\"${field}\")"
            if (field == DATE_RANGE_ATTRIBUTE) {
                painless += ";ctx._source.remove(\"${_ORIGINDATE}\")"
            }
            val script = Script(painless)
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


    @LogExecutionTime
    fun fetchFacets(search: Search, lang: String): Data {
        val facetFields = listOf(LOCATION_ATTRIBUTE, COLLECTION_KEY_ATTRIBUTE, ASSORTMENTS_ATTRIBUTE)
        val i18n = translator.get(lang)

        // build search query
        val sourceBuilder = prepareSearchSourceBuilder(search)
                .from(0)
                .size(0)
                .trackTotalHits(false)

        // build aggregations
        for (facetField in facetFields) {
            val keyword = if (isKeyword(facetField)) facetField else "$facetField.keyword"
            sourceBuilder.aggregation(AggregationBuilders.terms(facetField)
                    .field(keyword)
                    .order(BucketOrder.key(true))
                    .size(1000))
        }

        // combine everything to a search request - actual search hits are irrelevant, we are interested in the aggregations only
        val request = SearchRequest().indices("${config.objectIndex}-${lang}").source(sourceBuilder)

        // run a search
        val response = search(request)

        // extract the suggestions-buckets
        val results = mutableListOf<Data>()

        // TODO fix code style and redundancy
        for (facetField in facetFields) {
            val buckets = response.aggregations.get<Terms>(facetField).buckets
            val options = mutableListOf<Data>()
            val facet = Data()
                    .setNonNullAttribute(ATTR_FIELD, facetField)
                    .setNonNullAttribute(ATTR_LABEL, i18n.getFacetLabel(facetField))
                    .setNonNullAttribute(ATTR_OPTIONS, options)
            // for collectionKeys, we have two levels: (1) collection, (2) compilation
            if (facetField == COLLECTION_KEY_ATTRIBUTE) {
                val collections = aggregateCollectionKeys(buckets)
                collections.forEach { (key, orgUnits) ->
                    val subOptions = orgUnits.map { compilation ->
                        val bucket = buckets.find { b -> b.keyAsString == compilation } ?: return@map null
                        val label = i18n.getFacetOptionLabel(COMPILATION_ATTRIBUTE, compilation)
                        // A bit weird, but ok: If there is no label for the orgUnit that means
                        // the orgUnit is not registered as compilation and hence should not be shown to the users.
                        if (label == compilation) {
                            return@map null
                        }
                        Data().setNonNullAttribute(ATTR_LABEL, label)
                                .setNonNullAttribute(ATTR_VALUE, wrapQuotes(escapeWildcards(compilation)))
                                .setNonNullAttribute(ATTR_COUNTER, bucket.docCount)
                    }.filterNotNull()
                    options.add(Data()
                            .setNonNullAttribute(ATTR_LABEL, i18n.getFacetOptionLabel(facetField, key))
                            .setNonNullAttribute(ATTR_VALUE, appendWildcard(key))
                            .setNonNullAttribute(ATTR_OPTIONS, subOptions.ifEmpty { null })
                    )
                }
            } else {
                for (bucket in buckets) {
                    val term = bucket.keyAsString
                    val option = Data()
                            .setNonNullAttribute(ATTR_LABEL, i18n.getFacetOptionLabel(facetField, term))
                            .setNonNullAttribute(ATTR_VALUE, wrapQuotes(escapeWildcards(term)))
                            .setNonNullAttribute(ATTR_COUNTER, bucket.docCount)
                    options.add(option)
                }
            }

            // At this point we have one facet for each collectionKey and respective
            // compilations as options. However, some collectionKeys in combination form a collection
            // ("Skulpturensammlung und Museum für Byzantinische Kunst" consists of MSB, SKS and SBM.)
            // Hence, in a second step, we aggregate collections by same titles and merge all their options.
            if (config.aggregateSameFacets) {
                joinFacetOptions(options)
            }

            results.add(facet)
        }

        // done
        return Data().setAttribute(ATTR_FACETS, results)
    }

    private fun joinFacetOptions(options: MutableList<Data>) {
        val distinctLabels = options.map { it.getTypedAttribute<String>(ATTR_LABEL) }.distinct()
        distinctLabels.forEach { label ->
            val same = options.filter { it.getTypedAttribute<String>(ATTR_LABEL) == label }
            val first = same.first()
            val subOptions = first.getTypedAttribute<MutableList<Data>>(ATTR_OPTIONS)
            if (same.size > 1) {
                for (next in same.drop(1)) {
                    if (first.hasAttribute(ATTR_VALUE)) {
                        val or = "${first.getAttribute(ATTR_VALUE)} OR ${next.getAttribute(ATTR_VALUE)}"
                        first.setNonNullAttribute(ATTR_VALUE, or)
                    }
                    if (first.hasAttribute(ATTR_COUNTER)) {
                        val sum = first.getTypedAttribute<Int>(ATTR_COUNTER)!! + next.getTypedAttribute<Int>(ATTR_COUNTER)!!
                        first.setAttribute(ATTR_COUNTER, sum)
                    }
                    subOptions?.addAll(next.getTypedAttribute<List<Data>>(ATTR_OPTIONS).orEmpty())
                    options.remove(next)
                }
            }
            subOptions?.let(::joinFacetOptions)
        }
    }

    private fun aggregateCollectionKeys(buckets: List<MultiBucketsAggregation.Bucket>): Map<String, Set<String>> {
        val aggregation = mutableMapOf<String, SortedSet<String>>()
        buckets.map { it.keyAsString }.forEach { orgUnit ->
            val collectionKey = mappings.fetchCollection(orgUnit)?.key
            if (collectionKey != null) {
                val compilations = aggregation.computeIfAbsent(collectionKey) { sortedSetOf() }
                compilations.add(orgUnit)
            }
        }
        return aggregation
    }

    /**
     * Fetch search suggestions.
     */
    @LogExecutionTime
    fun suggest(suggestion: SearchSuggest, lang: String): Data {
        return if (suggestion.field == null) multiFieldSuggest(suggestion, FULLTEXT_SUGGESTION_FIELDS, lang) else fieldSuggest(suggestion, lang)
    }

    // TODO make this more sophisticated - use dedicated nested "suggestions" field for each attribute
    private fun multiFieldSuggest(suggestion: SearchSuggest, fields: Array<String>, lang: String): Data {

        val suggestions = mutableListOf<Data>()

        // loop over all suggestion fields and aggregate the field suggestions
        for (field in fields) {
            val fieldSuggestion = suggestion.clone()
            fieldSuggestion.field = field
            // get suggestions for field
            val fieldSuggestions: List<Data> = fieldSuggest(fieldSuggestion, lang).getTypedAttribute(ATTR_SUGGESTIONS)!!
            // if we want to aggregate, combine same suggestions into "Volltext" suggestion
            if (config.aggregateSameSuggestions) {
                for (fs in fieldSuggestions) {
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
            } else {
                suggestions.addAll(fieldSuggestions)
            }
        }

        // sort aggregated suggestions by relevance
        val sorted = suggestions.sortedWith { d1: Data, d2: Data ->
            if (config.suggestionsSort == ElasticSearchConfig.SuggestionSort.TERM) {
                val s1 = d1.getTypedAttribute<String>(ATTR_VALUE)!!
                val s2 = d2.getTypedAttribute<String>(ATTR_VALUE)!!
                unwrapQuotes(s1.lowercase()).compareTo(unwrapQuotes(s2.lowercase())) // asc
            } else {
                val c1 = d1.getTypedAttribute<Long>(ATTR_COUNTER)!!
                val c2 = d2.getTypedAttribute<Long>(ATTR_COUNTER)!!
                c2.compareTo(c1) // desc
            }
        }

        // return the most relevant suggestions respecting the given limit
        return Data().setAttribute(ATTR_SUGGESTIONS, sorted.subList(0, sorted.size.coerceAtMost(suggestion.limit)))
    }

    private fun fieldSuggest(suggestion: SearchSuggest, lang: String): Data {

        val field = suggestableField(suggestion.field!!)
                ?: return Data().setAttribute(ATTR_SUGGESTIONS, emptyList<Data>())

        // build search query
        val wildcardTerm = suggestableTerm(suggestion.searchTerm, true)
        val keyword = if (isKeyword(field)) field else "$field.keyword"
        val queryBuilder = QueryBuilders.boolQuery().must(
                QueryBuilders.wildcardQuery(keyword, wildcardTerm).caseInsensitive(true)
        )

        if (suggestion.advancedSearch != null) {
            val filters = buildAdvancedSearchTerm(suggestion.advancedSearch!!)
            val filtersQuery = convertTopLevelFieldsToFormattedSubLevelFields(filters)
            val filtersQueryBuilder = QueryBuilders.queryStringQuery(stripFirstOperator(filtersQuery))
                    .defaultOperator(Operator.AND)
                    .fuzziness(Fuzziness.ZERO)
                    .fuzzyMaxExpansions(0)
                    .fuzzyPrefixLength(0)
                    .phraseSlop(0)
                    .fuzzyTranspositions(false)
                    .lenient(true)
            if (filters.startsWith("OR ")) {
                queryBuilder.should(filtersQueryBuilder)
            } else if (filters.startsWith("NOT ")) {
                queryBuilder.mustNot(filtersQueryBuilder)
            } else {
                queryBuilder.must(filtersQueryBuilder)
            }
        }

        // build aggregation query - this is the relevant one for result aggregation
        val sort = if (config.suggestionsSort == ElasticSearchConfig.SuggestionSort.TERM) {
            BucketOrder.key(true)
        } else {
            BucketOrder.count(false)
        }
        val aggregationBuilder = AggregationBuilders.terms("suggestions")
                .field(keyword)
                .order(sort)
                .size(suggestion.limit)

        // combine everything to a search request - actual search hits are irrelevant, we are interested in the aggregation only
        val sourceBuilder = SearchSourceBuilder()
                .from(0)
                .size(0)
                .trackTotalHits(false)
                .query(queryBuilder)
                .aggregation(aggregationBuilder)
        val request = SearchRequest().indices("${config.objectIndex}-${lang}").source(sourceBuilder)

        // run a search
        val response = search(request)

        // extract the suggestions-buckets
        val buckets = response.aggregations.get<Terms>("suggestions").buckets
        val results = mutableListOf<Data>()
        for (bucket in buckets) {
            val term = bucket.keyAsString
            // for fields that are arrays, we only want to have the elements with hits
            // and omit all other elements contained as bucket
            if (checkMatch(term, suggestion.searchTerm, config.partialMatchSuggestions)) {
                results.add(Data()
                        .setAttribute(ATTR_FIELD, suggestion.field)
                        .setAttribute(ATTR_VALUE, wrapQuotes(escapeWildcards(term)))
                        .setAttribute(ATTR_COUNTER, bucket.docCount))
            }
        }

        // done
        return Data().setAttribute(ATTR_SUGGESTIONS, results)
    }

    private fun checkMatch(bucketTerm: String, searchTerm: String, partialAllowed: Boolean): Boolean {
        val candidate = normalize(bucketTerm)
        val input = normalize(searchTerm)
        if (partialAllowed && candidate.contains(input) || candidate.startsWith(input)) {
            return true
        }
        // even if partial matches are disallowed, we still allow matches at word boundaries
        // e.g. "pic" should not match "epic" but should match "Pablo Picasso"
        return WORD_DELIMITERS.map { "$it${normalize(searchTerm, true)}" }.any { bucketTerm.contains(it, true) }
    }

    private fun normalize(string: String, wildcardsOnly: Boolean = false): String {
        val pattern = if (wildcardsOnly) "[?*]" else "[?*'\" ]"
        return string.replace(Regex(pattern), "").trim().lowercase()
    }

    private fun escapeWildcards(string: String): String {
        return string.replace(Regex("([?*])"), "\\$1")
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
        LOGGER.trace("Search query is: {}", normalizedSearchTerm)
        return QueryBuilders.boolQuery()
                .must(QueryBuilders.queryStringQuery(normalizedSearchTerm)
                        .lenient(true)
                        .minimumShouldMatch(config.minimumMatch)
                        .defaultOperator(config.defaultOperator)
                        .allowLeadingWildcard(false))
    }

    private fun convertTopLevelFieldsToFormattedSubLevelFields(term: String): String {
        var converted = term
        // nested objects have one dedicated text field that should be used
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
            val fullSearchTerm = buildFullSearchTerm(searchRequest.searchTerm, searchRequest.advancedSearch!!)
            defaultCombinedQuery(fullSearchTerm)
        }
        val sourceBuilder = SearchSourceBuilder()
                .from(searchRequest.offset)
                .size(searchRequest.limit)
                .trackTotalHitsUpTo(500000)
                .minScore(config.minimumScore)
                .query(queryBuilder)
        for (sorting in searchRequest.sort) {
            val field = sortableField(sorting.first)
            if (field != null) {
                sourceBuilder.sort(field, if (sorting.second) SortOrder.ASC else SortOrder.DESC)
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
        return string.replace(Regex("^\\s*($operators)\\s*"), "")
    }

    /**
     * Build one complex search term from all given field searches.
     */
    private fun buildAdvancedSearchTerm(advancedSearch: Array<FieldSearch>): String {
        var searchTerm = ""
        // combine all field searches into one string
        for (fieldSearch in advancedSearch) {
            searchTerm += " " + buildFieldSearchTerm(fieldSearch)
        }
        // replace multiple whitespaces by only one
        searchTerm = searchTerm.replace(Regex("\\s+"), " ")
        // finally cut off leading and trailing whitespaces
        return searchTerm.trim()
    }

    private fun buildFieldSearchTerm(fieldSearch: FieldSearch): String {
        val normalizedTerm = insertDefaultOperators(fieldSearch.searchTerm, FieldSearch.Operator.AND.value)
        val finalTerm = if (isBoolean(fieldSearch.field)) normalizedTerm else appendWildcard(normalizedTerm)
        val fieldAndTerm = "${fieldSearch.field}:$finalTerm"
        return "${fieldSearch.operator.value} ${wrapBrackets(fieldAndTerm)}"
    }

    private fun insertDefaultOperators(term: String, operator: String): String {
        if (term.indexOf('"') > -1 || term.matches(Regex("^\\s*\\(?\\[.+TO.+\\]\\)?\\s*\$"))) {
            return term // keep as is if quoted
            // TODO should be more sophisticated for terms like <one AND (two (three OR four) OR "five six" seven) eight>
            // Expected result: <one AND (two :op (three OR four) OR "five six" :op seven) :op eight>
        }
        val words = term.split(" ").filter { it.isNotBlank() }
        var termWithOperators = ""
        words.forEachIndexed { index, word ->
            run {
                termWithOperators += if (index == 0) {
                    // keep the first word
                    word
                } else if (endsWithOperator(termWithOperators) || isOperator(word)) {
                    // keep all operators
                    " $word"
                } else {
                    // insert default operator
                    " $operator $word"
                }
            }
        }
        termWithOperators = termWithOperators.replace(Regex(" (OR) "), " $1 (")
        val requiredNumberOfBrackets = countMatches(termWithOperators, "(") - countMatches(termWithOperators, ")")
        return if (requiredNumberOfBrackets > 0) termWithOperators + repeat(')', requiredNumberOfBrackets) else termWithOperators
    }

    private fun appendWildcard(str: String): String {
        return if ("?*)\" ".toCharArray().any { str.endsWith(it) }) str else "$str*"
    }

    private fun endsWithOperator(term: String): Boolean {
        val words = term.split(Regex("[ ()]"))
        return isOperator(words.last())
    }

    private fun isOperator(word: String): Boolean {
        val stripped = word.trim(' ', '(', ')')
        return FieldSearch.Operator.values().any {
            it.value.trim() == stripped || (stripped.length == 1 && stripped.first() == it.char)
        }
    }

    private fun buildFullSearchTerm(mainSearchTerm: String?, advancedSearch: Array<FieldSearch>): String {
        val advancedSearchTerm = buildAdvancedSearchTerm(advancedSearch)
        return if (hasActualSearchTerm(mainSearchTerm)) {
            "${wrapBrackets(mainSearchTerm)} $advancedSearchTerm"
        } else {
            stripFirstOperator(advancedSearchTerm)
        }
    }

    /**
     * Check if search term has actual search literals.
     */
    private fun hasActualSearchTerm(searchTerm: String?): Boolean {
        val withoutWildcards = searchTerm?.replace(Regex("[*?]"), "")
        return withoutWildcards.orEmpty().isNotBlank()
    }

    private fun suggestableTerm(str: String, leadingWildcard: Boolean = false): String {
        var term = str
        if (leadingWildcard && !(term.startsWith('*') || term.startsWith('"') || term.startsWith('?'))) {
            term = "*${term}"
        }
        if (!leadingWildcard) {
            term = stripStart(term, "*?")
        }
        return appendWildcard(term)
    }

    /**
     * Check if given field supports search suggestions and adjust to Elastic syntax if required.
     */
    private fun suggestableField(field: String): String? {
        return if (!NO_SUGGESTION_FIELDS.contains(field)) {
            // for the nested objects we use a dedicated attribute
            when (field) {
                ASSETS_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                CULTURAL_REFERENCES_ATTRIBUTE -> "$field.name"
                EXHIBITIONS_ATTRIBUTE -> "$field.title"
                GEOGRAPHICAL_REFERENCES_ATTRIBUTE -> "$field.location"
                ICONCLASS_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                ICONOGRAPHY_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                // our id is numeric, we need the string version for suggestions
                ID_ATTRIBUTE -> "@$ID_ATTRIBUTE"
                INVOLVED_PARTIES_ATTRIBUTE -> "$field.name"
                KEYWORDS_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                MATERIAL_AND_TECHNIQUE_ATTRIBUTE -> "$field.name"
                TECHNICAL_TERM_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
                TITLES_ATTRIBUTE -> "$field.$FORMATTED_VALUE_ATTRIBUTE"
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

        // do not try sorting on missing field
        if (!ALL_RELEVANT_ATTRIBUTES.contains(topLevelField)) {
            return null
        }

        // do not sort by long texts
        if (ARCHIVE_CONTENT == topLevelField
                || DESCRIPTION_ATTRIBUTE == topLevelField
                || INSCRIPTION_ATTRIBUTE == topLevelField
                || LITERATURE_ATTRIBUTE == topLevelField
                || PROVENANCE_ATTRIBUTE == topLevelField
                || SIGNATURES_ATTRIBUTE == topLevelField
                || ASSORTMENTS_ATTRIBUTE == topLevelField) {
            return null
        }

        // do not sort by assets
        if (ASSETS_ATTRIBUTE == topLevelField) {
            return null
        }

        // do not sort by tags
        if (ICONCLASS_ATTRIBUTE == topLevelField
                || ICONOGRAPHY_ATTRIBUTE == topLevelField
                || KEYWORDS_ATTRIBUTE == topLevelField) {
            return null
        }

        // some special properties are of type keyword, there is no adjustment required
        if (isKeyword(field)) {
            return field
        }

        // range fields cannot be sorted - we have to use a scalar value
        if (DATE_RANGE_ATTRIBUTE == topLevelField) {
            return _ORIGINDATE
        }

        // for object-types we have to use a nested property
        if (OBJECT_FIELDS.contains(topLevelField)) {
            // check which adjustments are needed for nested fields
            val subLevelField = field.substringAfter('.', "")
            return when {
                subLevelField.isEmpty() -> {
                    // by default sort by formatted text - makes most sense as this is the one attribute which is displayed
                    val formatted = "$topLevelField.$FORMATTED_VALUE_ATTRIBUTE"
                    if (isKeyword(formatted)) formatted else "$formatted.keyword"
                }

                subLevelField.endsWith("id", true) -> {
                    // since all ids are of type long, sorting always works without adjustment
                    field
                }

                subLevelField == MARKUP_VALUE_ATTRIBUTE -> {
                    // do not sort by html
                    null
                }

                else -> {
                    // sort by given nested field - if we didn't miss anything in the earlier return statements,
                    // .keyword always works as only text-type fields are remaining here
                    "$field.keyword"
                }
            }
        }

        // for text fields, we have to use .keyword suffix because "Fielddata is disabled on text fields by default."
        return if (SORTABLE_TEXT_FIELDS.contains(topLevelField)) "$field.keyword" else field
    }

    private fun isBoolean(field: String): Boolean {
        return (field == HAS_ATTACHMENTS_ATTRIBUTE || field == IS_EXHIBIT_ATTRIBUTE || field == IS_HIGHLIGHT_ATTRIBUTE)
    }

    private fun isKeyword(field: String): Boolean {
        return (field == "$KEYWORDS_ATTRIBUTE.$FORMATTED_VALUE_ATTRIBUTE"
                || field == "$MATERIAL_AND_TECHNIQUE_ATTRIBUTE.name"
                || field == "$TECHNICAL_TERM_ATTRIBUTE.$FORMATTED_VALUE_ATTRIBUTE")
    }
}