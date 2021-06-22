package de.smbonline.sitemap.sitemap.graphql

import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.sitemap.graphql.queries.FetchObjectsQuery
import de.smbonline.sitemap.graphql.queries.FetchTopicsQuery
import de.smbonline.sitemap.graphql.queries.FetchToursQuery
import de.smbonline.sitemap.graphql.queries.fragment.ObjectData
import de.smbonline.sitemap.graphql.queries.fragment.TopicData
import de.smbonline.sitemap.graphql.queries.fragment.TourData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class GraphQlRepository @Autowired constructor(private val graphQlClient: GraphQlAPI) {

    suspend fun fetchObjects(offset: Int, limit: Int): Page<ObjectData> {
        val result = graphQlClient.query(FetchObjectsQuery(offset, limit))
                .toDeferred()
                .await()
        val page = Page<ObjectData>()
        page.items = result.data?.smb_objects?.map { it.fragments.objectData }.orEmpty()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.smb_objects_aggregate?.aggregate?.count ?: 0
        return page
    }

    suspend fun fetchTours(offset: Int, limit: Int): Page<TourData> {
        val result = graphQlClient.query(FetchToursQuery(offset, limit))
                .toDeferred()
                .await()
        val page = Page<TourData>()
        page.items = result.data?.smb_tours?.map { it.fragments.tourData }.orEmpty()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.smb_tours_aggregate?.aggregate?.count ?: 0
        return page
    }

    suspend fun fetchTopics(offset: Int, limit: Int): Page<TopicData> {
        val result = graphQlClient.query(FetchTopicsQuery(offset, limit))
                .toDeferred()
                .await()
        val page = Page<TopicData>()
        page.items = result.data?.smb_topics?.map { it.fragments.topicData }.orEmpty()
        page.offset = offset
        page.limit = limit
        page.total = result.data?.smb_topics_aggregate?.aggregate?.count ?: 0
        return page
    }
}