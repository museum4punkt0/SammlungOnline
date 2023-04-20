package de.smbonline.mdssync.dto

interface MdsItem {
    val mdsId: Long
    val type: String
    var attributes: List<AttributeValue>
}