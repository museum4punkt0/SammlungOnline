package de.smbonline.searchindexer.dto

import com.fasterxml.jackson.annotation.JsonInclude
import org.apache.commons.lang3.time.FastDateFormat
import java.util.Date
import java.util.Locale

@JsonInclude(JsonInclude.Include.NON_NULL)
data class DateRange(val gte: Long?, val lte: Long?) {

    companion object {
        fun toFormattedString(dateRange: Data, language: String): String {
            val gte = dateRange.getTypedAttribute<Number>("gte")
            val lte = dateRange.getTypedAttribute<Number>("lte")
            return if (language == "de") {
                "Von ${asDate(gte?.toLong(), "de")} bis ${asDate(lte?.toLong(), "de")}"
            } else {
                "From ${asDate(gte?.toLong(), language)} to ${asDate(lte?.toLong(), language)}"
            }
        }

        private val germanFormatter = FastDateFormat.getInstance("dd.MM.y G", Locale.GERMAN)
        private val defaultFormatter = FastDateFormat.getInstance("y-MM-dd G", Locale.ENGLISH)
        fun asDate(seconds: Long?, language: String): String {
            return if (seconds != null) {
                val formatter = if (language == "de") germanFormatter else defaultFormatter
                formatter.format(Date(seconds * 1000))
            } else {
                if (language == "de") "n.v." else "N/A"
            }
        }
    }

    override fun toString(): String {
        return Data()
                .setAttribute("gte", asDate(gte, "en"))
                .setAttribute("lte", asDate(lte, "en"))
                .toString()
    }
}