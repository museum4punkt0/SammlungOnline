package de.smbonline.mdssync.dto

class Highlight {

    lateinit var orgUnitName: String
    lateinit var objectIds: Array<Long>

    override fun toString(): String = "Highlight{orgUnit:$orgUnitName, ids:$objectIds}"
}