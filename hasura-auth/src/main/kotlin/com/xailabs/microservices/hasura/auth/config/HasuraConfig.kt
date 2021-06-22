package com.xailabs.microservices.hasura.auth.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "hasura")
class HasuraConfig {

    lateinit var endpoint: String
    lateinit var adminSecret: String
    lateinit var inMemoryCacheSize: Number
    lateinit var unauthorizedRole: String

}
