package de.smbonline.searchindexer.api

import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.actuate.health.Health
import org.springframework.boot.actuate.health.HealthIndicator
import org.springframework.stereotype.Component

/**
 * Checks the connection to the GraphQL-API.
 */
@Component
class GraphQlHealthIndicator @Autowired constructor(private val api: GraphQlAPI) : HealthIndicator {

    @Override
    override fun health(): Health {
        var health: Health
        try {
            runBlocking {
                val errors = api.ping()
                health = if (errors.isNullOrEmpty()) {
                    Health.up().build()
                } else {
                    val details = errors.map { it.message to it.customAttributes }.toMap()
                    Health.down().withDetails(details).build()
                }
            }
        } catch (e: Exception) {
            health = Health.down().withException(e).build()
        }
        return health
    }
}
