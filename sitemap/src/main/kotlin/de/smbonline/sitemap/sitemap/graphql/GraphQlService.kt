package de.smbonline.sitemap.sitemap.graphql

import de.smbonline.sitemap.graphql.queries.fragment.ObjectData
import de.smbonline.sitemap.graphql.queries.fragment.TopicData
import de.smbonline.sitemap.graphql.queries.fragment.TourData
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class GraphQlService @Autowired constructor(private val repo: GraphQlRepository) {

    fun fetchObjects(offset: Int, limit: Int): Page<ObjectData> {
        var response: Page<ObjectData>
        runBlocking {
            response = repo.fetchObjects(offset, limit)
        }
        return response
    }

    fun fetchTours(offset: Int, limit: Int): Page<TourData> {
        var response: Page<TourData>
        runBlocking {
            response = repo.fetchTours(offset, limit)
        }
        return response
    }

    fun fetchTopics(offset: Int, limit: Int): Page<TopicData> {
        var response: Page<TopicData>
        runBlocking {
            response = repo.fetchTopics(offset, limit)
        }
        return response
    }

}