package de.smbonline.sitemap.graphql

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "graphql")
class GraphQlConfig {

    lateinit var endpoint: String
    lateinit var headers: HashMap<String, String>
    lateinit var inMemoryCacheSize: Number

}
