package de.smbonline.searchindexer.dto

import com.fasterxml.jackson.annotation.JsonInclude
import org.apache.commons.lang3.time.FastDateFormat
import java.util.Date
import java.util.Locale

@JsonInclude(JsonInclude.Include.NON_NULL)
data class DateRange(val gte: Long?, val lte: Long?) {

    override fun toString(): String {
        return Data()
                .setAttribute("gte", asDate(gte))
                .setAttribute("lte", asDate(lte))
                .toString()
    }

    private companion object {
        private val formatter = FastDateFormat.getInstance("y-MM-dd G", Locale.ENGLISH)
        fun asDate(seconds: Long?): String {
            return if (seconds != null) formatter.format(Date(seconds*1000)) else "N/A"
        }
    }
}