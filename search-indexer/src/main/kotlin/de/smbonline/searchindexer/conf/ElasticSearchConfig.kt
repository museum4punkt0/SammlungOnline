package de.smbonline.searchindexer.conf

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
}
