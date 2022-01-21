package de.smbonline.mdssync.dto

interface MdsObject {
    val mdsId: Long
    val type: String
    var attributes: List<AttributeDTO>
}