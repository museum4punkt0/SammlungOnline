package de.smbonline.mdssync.dto

import java.time.OffsetDateTime

class SyncCycle {

    lateinit var timestamp: OffsetDateTime
    lateinit var debugInformation: String
    lateinit var type: SyncCycleType
    lateinit var module: String

    var succeeded: Array<Long>? = null
    var failed: Array<Long>? = null
    var skipped: Array<Long>? = null

    override fun toString(): String = "SyncCycle{type:$type, module:$module, time:$timestamp}"
}