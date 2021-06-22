package de.smbonline.searchindexer.dto

data class SearchSuggest(val searchTerm: String) {

    var field: String? = null
    var limit: Int = 15

    companion object {

        /**
         * Build a suggestion request from a search term with default limit.
         * If the argument contains a colon, uses the prefix as field and only the suffix as search term
         */
        fun fromSearchTerm(q: String): SearchSuggest {
            val suggest: SearchSuggest
            val separator = q.indexOf(':')
            if (separator > 0) {
                suggest = SearchSuggest(Search.cleanupSearchTerm(q.substring(separator + 1)))
                suggest.field = q.substring(0, separator)
            } else {
                suggest = SearchSuggest(Search.cleanupSearchTerm(q))
            }
            return suggest
        }
    }
}