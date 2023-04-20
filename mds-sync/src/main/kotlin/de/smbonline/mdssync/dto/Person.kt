package de.smbonline.mdssync.dto

import de.smbonline.mdssync.util.MdsConstants
import java.time.LocalDate

open class Person(override val mdsId: Long) : ParsedMdsItem(mdsId, MdsConstants.MODULE_PERSON) {

    var name: String? = null
    var dateOfBirth: LocalDate? = null
    var dateOfDeath: LocalDate? = null
    var biographicalDates: String? = null
    var normdata1: String? = null
    var normdata2: String? = null
    var normdata3: String? = null

}