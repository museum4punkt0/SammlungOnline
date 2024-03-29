package de.smbonline.searchindexer

import de.smbonline.searchindexer.conf.ElasticSearchConfig
import de.smbonline.searchindexer.conf.GraphQlConfig
import org.junit.jupiter.api.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringRunner

@SpringBootTest
@ActiveProfiles("test")
class SearchIndexerApplicationTest {

    @Autowired
    var elasticConfig: ElasticSearchConfig? = null

    @Autowired
    var graphQlConfig: GraphQlConfig? = null

    @Test
    fun contextLoads() {
    }

    @Test
    fun graphQlConfigLoaded() {
        assert(graphQlConfig != null)
    }

    @Test
    fun elasticSearchConfigLoaded() {
        assert(elasticConfig != null)
    }
}
