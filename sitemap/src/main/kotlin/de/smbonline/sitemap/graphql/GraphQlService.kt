package de.smbonline.sitemap.graphql

import de.smbonline.sitemap.model.Page
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class GraphQlService @Autowired constructor(private val repo: GraphQlRepository) {

    fun fetchIslCategories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchIslCategories(offset, limit)
        }
        return response
    }

    fun fetchIslStories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchIslStories(offset, limit)
        }
        return response
    }

    fun fetchIslTopics(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchIslTopics(offset, limit)
        }
        return response
    }

    fun fetchSmbCategories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchSmbCategories(offset, limit)
        }
        return response
    }

    fun fetchSmbStories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchSmbStories(offset, limit)
        }
        return response
    }

    fun fetchSmbTopics(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchSmbTopics(offset, limit)
        }
        return response
    }

    fun fetchHbfCategories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchHbfCategories(offset, limit)
        }
        return response
    }

    fun fetchHbfStories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchHbfStories(offset, limit)
        }
        return response
    }

    fun fetchHbfTopics(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchHbfTopics(offset, limit)
        }
        return response
    }

    fun fetchKgmCategories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchKgmCategories(offset, limit)
        }
        return response
    }

    fun fetchKgmStories(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchKgmStories(offset, limit)
        }
        return response
    }

    fun fetchKgmTopics(offset: Int, limit: Int): Page<String> {
        var response: Page<String>
        runBlocking {
            response = repo.fetchKgmTopics(offset, limit)
        }
        return response
    }
}