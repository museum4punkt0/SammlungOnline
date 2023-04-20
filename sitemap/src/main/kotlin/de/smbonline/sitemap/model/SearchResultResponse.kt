package de.smbonline.sitemap.model

class SearchResultResponse {
    var offset: Int = -1
    var limit: Int = -1
    var total: Int = -1
    var objects: List<SearchResult> = emptyList()
}