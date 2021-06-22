package com.xailabs.microservices.hasura.auth.graphql

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import com.xailabs.microservices.hasura.auth.config.HasuraConfig
import com.xailabs.microservices.hasura.auth.config.X_HASURA_ADMIN_SECRET
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.config.ConfigurableBeanFactory
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component

// Initialized from de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient, 2020/08/10

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
class GraphQlClient @Autowired constructor(val config: HasuraConfig) {

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
                .serverUrl(config.endpoint)
                .normalizedCache(buildCacheFactory())
                .okHttpClient(OkHttpClient.Builder()
                        .addInterceptor { chain: Interceptor.Chain ->
                            val requestBuilder = chain.request()
                                    .newBuilder()
                                    .addHeader(X_HASURA_ADMIN_SECRET, config.adminSecret)
                            chain.proceed(requestBuilder.build())
                        }.build()
                )
                .build()
    }

    private fun buildCacheFactory(): LruNormalizedCacheFactory {
        return LruNormalizedCacheFactory(
                EvictionPolicy.builder()
                        .maxSizeBytes(config.inMemoryCacheSize.toLong())
                        .build())
    }
}
