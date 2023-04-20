package de.smbonline.searchindexer.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import de.smbonline.searchindexer.conf.ID_ATTRIBUTE

/**
 * Describes an object that should be indexed. The language attribute defines
 * the common translation language for all attributes.
 */
class SearchObject constructor(@JsonIgnore val id: Long, @JsonIgnore val language: String) : Data() {
    init {
        setAttribute(ID_ATTRIBUTE, id)
    }
}