package de.smbonline.searchindexer.api

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.BigDecimal
import com.apollographql.apollo.api.Error
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.searchindexer.conf.GraphQlConfig
import de.smbonline.searchindexer.graphql.queries.FetchObjectQuery
import de.smbonline.searchindexer.graphql.queries.FetchObjectWithAttributesQuery
import de.smbonline.searchindexer.graphql.queries.FetchObjectsQuery
import de.smbonline.searchindexer.graphql.queries.PingQuery
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData
import de.smbonline.searchindexer.log.LogExecutionTime
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class GraphQlAPI @Autowired constructor(private val config: GraphQlConfig) {

    private val client: ApolloClient

    init {
        client = initApolloClient()
    }

    suspend fun ping(): List<Error> {
        val result = client.query(PingQuery()).toDeferred().await()
        return result.errors ?: emptyList()
    }

    /**
     * Check if Object with given id exists.
     * @param id of requested Object
     * @return whether Object exists
     */
    suspend fun existsObject(id: Long): Boolean {
        val result = client.query(FetchObjectQuery(id))
                .toDeferred()
                .await()
        return result.data?.smb_objects_by_pk?.id != null
    }

    /**
     * Fetch an Object with given id from database. The language specifies the desired AttributeTranslations.
     * @param id of requested Object
     * @param lang language key
     * @return Object if exists
     */
    @LogExecutionTime
    suspend fun loadObject(id: Long, lang: String): ObjectData? {
        val result = client.query(FetchObjectWithAttributesQuery(id, lang))
                .toDeferred()
                .await()
        return result.data?.smb_objects_by_pk?.fragments?.objectData
    }

    @LogExecutionTime
    suspend fun fetchObjectIds(startId:Long, endId:Long, offset: Int, limit: Int): Array<Long> {
        val result = client.query(FetchObjectsQuery(startId, endId, offset, limit))
                .toDeferred()
                .await()
        return result.data?.smb_objects?.map { (it.id as BigDecimal).longValueExact() }.orEmpty().toTypedArray()
    }

    private fun initApolloClient(): ApolloClient {
        return ApolloClient.builder()
                .serverUrl(config.endpoint)
                .normalizedCache(buildCacheFactory())
                .okHttpClient(buildHttpClient())
                .build()
    }

    private fun buildCacheFactory(): LruNormalizedCacheFactory {
        return LruNormalizedCacheFactory(EvictionPolicy.builder()
                .maxSizeBytes(config.inMemoryCacheSize.toLong())
                .build())
    }

    private fun buildHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
                .followRedirects(true)
                .followSslRedirects(true)
                .addInterceptor { chain: Interceptor.Chain ->
                    val requestBuilder = chain.request().newBuilder()
                    for (entry in config.headers.entries) {
                        requestBuilder.addHeader(entry.key, entry.value)
                    }
                    chain.proceed(requestBuilder.build())
                }
                .build()
    }
}
