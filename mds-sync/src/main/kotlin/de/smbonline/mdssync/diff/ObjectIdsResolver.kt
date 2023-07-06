package de.smbonline.mdssync.diff

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.api.MdsApiClientFactory
import de.smbonline.mdssync.api.MdsApiConfig
import de.smbonline.mdssync.api.SearchRequestHelper
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchObjectIdsQuery
import de.smbonline.mdssync.index.SearchIndexerClient
import de.smbonline.mdssync.util.MdsConstants.*
import de.smbonline.mdssync.util.Validations.*
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component


@Component
class ObjectIdsResolver @Autowired constructor(
        private val graphQl: GraphQlClient,
        private val apiConfig: MdsApiConfig,
        private val elasticClient: SearchIndexerClient,
        private val apiClientFactory: MdsApiClientFactory) {

    class Result constructor(val mds: Set<Long>?, val hasura: Set<Long>?, val elastic: Set<Long>?) {
    }

    fun fetchAllObjectIds(startId: Long?, endId: Long?, lang: String): Result {
        val from = startId ?: 1L
        val to = endId ?: 999999999999999L
        val mds = getMdsObjectIds(from, to, lang)
        val hasura = getHasuraObjectIds(from, to)
        val elastic = getElasticObjectIds(from, to, lang)
        return Result(mds, hasura, elastic)
    }

    fun getMdsObjectIds(startId: Long, endId: Long, lang: String): Set<Long> {
        ensureLowerLessThanUpper(startId, endId)

        val result = sortedSetOf<Long>()

        // prepare search request
        val idRangeFilter = SearchRequestHelper.buildIdRangeFilter(startId, endId)
        val search = SearchRequestHelper(apiConfig, MODULE_OBJECTS).buildSearchPayload()
        search.offset = 0
        search.limit = 3000L
        search.sort = SearchRequestHelper.buildSortBy(FIELD_ID)
        search.select = SearchRequestHelper.buildSelectFields(FIELD_ID)
        search.expert.and.andOrOrOrNot.add(idRangeFilter)

        var nextId = startId
        while (true) {
            // adjust id-range in each loop
            idRangeFilter.operand1 = nextId.toString()
            var response = apiClientFactory.getApiClient(MODULE_OBJECTS).search(search, lang)
            val ids = response.moduleItem.map { it.id }
            // we are done when there are no mor objects
            if (ids.isEmpty() || nextId > 10000) {
                break
            }
            result.addAll(ids)
            nextId = ids.last() + 1
        }
        return result
    }

    fun getHasuraObjectIds(startId: Long, endId: Long): Set<Long> {
        ensureLowerLessThanUpper(startId, endId)

        val result = sortedSetOf<Long>()
        runBlocking {
            val limit = 10000
            var nextId = startId
            while (true) {
                val response = graphQl.client.query(FetchObjectIdsQuery(nextId, endId, Input.optional(limit))).await()
                val ids = response.data?.smb_objects?.map { (it.id as Number).toLong() }.orEmpty()
                if (ids.isEmpty()) {
                    break
                }
                result.addAll(ids)
                nextId = ids.last() + 1
            }
        }
        return result
    }

    fun getElasticObjectIds(startId: Long, endId: Long, lang: String): Set<Long> {
        ensureLowerLessThanUpper(startId, endId)
        return elasticClient.getIndexedObjectIds(startId, endId, lang)
    }
}