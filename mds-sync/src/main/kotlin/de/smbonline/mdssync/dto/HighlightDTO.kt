package de.smbonline.mdssync.dto

class HighlightDTO {

    lateinit var orgUnitName: String
    lateinit var objectIds: List<Long>

    override fun toString(): String = "Highlight{orgUnit:$orgUnitName, ids:$objectIds}"
}