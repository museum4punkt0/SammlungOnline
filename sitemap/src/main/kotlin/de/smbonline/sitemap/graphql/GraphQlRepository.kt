package de.smbonline.sitemap.graphql

import com.apollographql.apollo.coroutines.await
import de.smbonline.sitemap.graphql.queries.FetchHbfCategoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchHbfStoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchHbfTopicsQuery
import de.smbonline.sitemap.graphql.queries.FetchIslCategoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchIslStoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchIslTopicsQuery
import de.smbonline.sitemap.graphql.queries.FetchKgmCategoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchKgmStoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchKgmTopicsQuery
import de.smbonline.sitemap.graphql.queries.FetchSmbCategoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchSmbStoriesQuery
import de.smbonline.sitemap.graphql.queries.FetchSmbTopicsQuery
import de.smbonline.sitemap.model.Page
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class GraphQlRepository @Autowired constructor(private val graphQlClient: GraphQlAPI) {

    suspend fun fetchIslCategories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchIslCategoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_isl?.categories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_isl?.categories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchIslStories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchIslStoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_isl?.stories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_isl?.stories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchIslTopics(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchIslTopicsQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_isl?.topics?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_isl?.topics?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchSmbCategories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchSmbCategoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_smb?.categories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_smb?.categories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchSmbStories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchSmbStoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_smb?.stories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_smb?.stories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchSmbTopics(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchSmbTopicsQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_smb?.topics?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_smb?.topics?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchHbfCategories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchHbfCategoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_hbf?.categories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_hbf?.categories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchHbfStories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchHbfStoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_hbf?.stories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_hbf?.stories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchHbfTopics(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchHbfTopicsQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_hbf?.topics?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_hbf?.topics?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchKgmCategories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchKgmCategoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_kgm?.categories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_kgm?.categories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchKgmStories(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchKgmStoriesQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_kgm?.stories?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_kgm?.stories?.meta?.pagination?.total ?: 0
        return page
    }

    suspend fun fetchKgmTopics(offset: Int, limit: Int): Page<String> {
        val result = graphQlClient.query(FetchKgmTopicsQuery(offset, limit)).await()
        val page = Page<String>()
        page.items = result.data?.strapi_kgm?.topics?.data?.map { it.attributes?.slug }.orEmpty().filterNotNull()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.strapi_kgm?.topics?.meta?.pagination?.total ?: 0
        return page
    }
}