package de.smbonline.searchindexer.dto

class SearchSuggest(val searchTerm: String) : Cloneable {

    var field: String? = null
    var limit: Int = 30
    var advancedSearch: Array<FieldSearch>? = null

    public override fun clone(): SearchSuggest {
        val clone = super.clone() as SearchSuggest
        clone.advancedSearch = clone.advancedSearch?.clone()
        return clone
    }

    companion object {

        /**
         * Build a suggestion request from a search term with default limit.
         * If the argument contains a colon, uses the prefix as field and only the suffix as search term
         */
        fun fromSearchTerm(q: String): SearchSuggest {
            val suggest: SearchSuggest
            val separator = q.indexOf(':')
            if (separator > 0) {
                suggest = SearchSuggest(Search.cleanupSearchTerm(q.substring(separator + 1), false))
                suggest.field = q.substring(0, separator)
            } else {
                suggest = SearchSuggest(Search.cleanupSearchTerm(q, false))
            }
            return suggest
        }
    }
}
