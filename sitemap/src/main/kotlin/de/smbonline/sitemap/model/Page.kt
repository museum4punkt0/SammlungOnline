package de.smbonline.sitemap.model

class Page<T> {
    var offset: Int = -1
    var limit: Int = -1
    var total: Int = -1
    var items: List<T> = emptyList()
}