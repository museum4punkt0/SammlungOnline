package de.smbonline.mdssync.dto

import java.time.OffsetDateTime

class SyncCycleDTO {

    enum class Type {
        INCREMENTAL, HIGHLIGHTS, DELETIONS, MANUAL
    }

    lateinit var timestamp: OffsetDateTime
    lateinit var debugInformation: String
    lateinit var type: Type

    override fun toString(): String = "SyncCycle{type:$type, time:$timestamp}"
}