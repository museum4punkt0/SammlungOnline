package de.smbonline.sitemap.sitemap.graphql

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.ApolloQueryCall
import com.apollographql.apollo.api.Operation
import com.apollographql.apollo.api.Operation.Variables
import com.apollographql.apollo.api.Query
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
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

    fun <D : Operation.Data, T, V : Variables> query(query: Query<D, T, V>): ApolloQueryCall<T> {
        return client.query(query);
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
