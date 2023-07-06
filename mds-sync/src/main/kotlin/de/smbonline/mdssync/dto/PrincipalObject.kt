package de.smbonline.mdssync.dto

/**
 * Describes an object that should be synced. The language attribute defines the common translation language
 * for all attributes.
 */
data class PrincipalObject(override val mdsId: Long, var language: String) : ParsedMdsItem(mdsId, "Object") {

    var exhibitionSpace: String? = null
    var geoLocs: List<GeographicalReference> = mutableListOf()
    var materials: List<MaterialReference> = mutableListOf()
    var culturalRefs: List<CulturalReference> = mutableListOf()
    var locationVoc: Thesaurus? = null
}