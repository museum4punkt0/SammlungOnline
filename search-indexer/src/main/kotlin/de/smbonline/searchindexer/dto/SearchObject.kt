package de.smbonline.searchindexer.dto

/**
 * Describes an object that should be indexed. The language attribute defines
 * the common translation language for all attributes.
 */
class SearchObject(val id: Long, val language: String) {
    val attributes: Data = Data()
}