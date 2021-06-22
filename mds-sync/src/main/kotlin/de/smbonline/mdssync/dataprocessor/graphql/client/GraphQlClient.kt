package de.smbonline.mdssync.dataprocessor.graphql.client

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import de.smbonline.mdssync.properties.GraphQlProperties
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.config.ConfigurableBeanFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
class GraphQlClient {

    @Autowired
    private lateinit var graphQlProperties: GraphQlProperties

    private var _client: ApolloClient? = null

    /**
     * Lazy initialized client
     */
    val client: ApolloClient
        get() {
            if (_client == null) {
                _client = initApolloClient()
            }
            return _client!!
        }

    private fun initApolloClient(): ApolloClient {
        return ApolloClient.builder()
                .serverUrl(graphQlProperties.endpoint)
                .normalizedCache(buildCacheFactory())
                .okHttpClient(buildHttpClient())
                .build()
    }

    private fun buildCacheFactory(): LruNormalizedCacheFactory {
        return LruNormalizedCacheFactory(EvictionPolicy.builder()
                .maxSizeBytes(graphQlProperties.inMemoryCacheSize.toLong())
                .build())
    }

    private fun buildHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
                .followRedirects(true)
                .followSslRedirects(true)
                .addInterceptor { chain: Interceptor.Chain ->
                    val requestBuilder = chain.request().newBuilder()
                    for (entry in graphQlProperties.headers.entries) {
                        requestBuilder.addHeader(entry.key, entry.value)
                    }
                    chain.proceed(requestBuilder.build())
                }
                .build()
    }
}
