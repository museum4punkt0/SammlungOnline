package de.smbonline.mdssync.dto

import de.smbonline.mdssync.util.MdsConstants
import java.time.LocalDate

open class Exhibition(override val mdsId: Long) : ParsedMdsItem(mdsId, MdsConstants.MODULE_EXHIBITIONS) {

    var startDate: LocalDate? = null
    var endDate: LocalDate? = null
    var title: String? = null
    var description: String? = null
    var location: String? = null

}