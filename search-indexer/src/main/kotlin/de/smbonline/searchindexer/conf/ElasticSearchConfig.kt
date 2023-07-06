package de.smbonline.searchindexer.conf

import org.elasticsearch.index.query.Operator
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "elastic")
class ElasticSearchConfig {

    enum class SuggestionSort {
        COUNTER, TERM
    }

    var objectIndex: String = "objects"
    var suggestionsSort: SuggestionSort = SuggestionSort.COUNTER
    var partialMatchSuggestions: Boolean = false
    var aggregateSameSuggestions: Boolean = false
    var aggregateSameFacets: Boolean = true
    var defaultOperator: Operator = Operator.OR
    var minimumMatch: String = "85%"
    var minimumScore: Float = 0.001f // keep low, exact hit on boolean fields is only "_score:0.00113443"
    var markupAllowed: Boolean = true
}
