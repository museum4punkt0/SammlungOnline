package de.smbonline.searchindexer.dto

import de.smbonline.searchindexer.conf.DATE_RANGE_ATTRIBUTE
import de.smbonline.searchindexer.dto.JsonAttr.*
import de.smbonline.searchindexer.rest.Params.*
import org.apache.commons.lang3.StringUtils
import java.util.Calendar
import java.util.Date
import java.util.GregorianCalendar
import kotlin.math.max
import kotlin.math.min

class Search : Cloneable {

    var searchTerm: String = "*"
    var advancedSearch: Array<FieldSearch>? = null
    var sort: Array<Pair<String, Boolean>> = arrayOf(Pair("_score", false))
    var offset: Int = 0
    var limit: Int = 20

    companion object {

        private const val MAX_LIMIT = 100;

        fun fromQueryParams(params: Map<String, String>): Search {
            val search = Search()
            if (params.containsKey(SEARCHQUERY_PARAMETER)) {
                search.searchTerm = cleanupSearchTerm(params.getValue(SEARCHQUERY_PARAMETER))
                if (search.searchTerm.contains("$DATE_RANGE_ATTRIBUTE:")) {
                    search.searchTerm = adjustDateRangeSearch(search.searchTerm);
                }
            }
            if (params.containsKey(SORT_PARAMETER)) {
                search.sort = splitSorting(params.getValue(SORT_PARAMETER))
            }
            if (params.containsKey(OFFSET_PARAMETER)) {
                search.offset = max(0, params.getValue(OFFSET_PARAMETER).toInt())
            }
            if (params.containsKey(LIMIT_PARAMETER)) {
                search.limit = min(params.getValue(LIMIT_PARAMETER).toInt(), MAX_LIMIT)
            }
            return search
        }

        fun fromPayload(request: Data): Search {
            return merge(Search(), request);
        }

        fun merge(defaults: Search, overrides: Data): Search {
            val search = defaults.clone() as Search
            if (overrides.hasAttribute(ATTR_SEARCHQUERY)) {
                search.searchTerm = cleanupSearchTerm(overrides.getTypedAttribute(ATTR_SEARCHQUERY)!!)
                if (search.searchTerm.contains("$DATE_RANGE_ATTRIBUTE:")) {
                    search.searchTerm = adjustDateRangeSearch(search.searchTerm);
                }
            }
            if (overrides.hasAttribute(ATTR_ADVANCED_SEARCHQUERY)) {
                val advanced: Collection<Data> = overrides.getTypedAttribute(ATTR_ADVANCED_SEARCHQUERY)!!
                search.advancedSearch = if (advanced.isNotEmpty()) {
                    advanced.filter {
                        StringUtils.isNoneBlank(it.getTypedAttribute(ATTR_FIELD), it.getTypedAttribute(ATTR_SEARCHQUERY))
                    }.mapIndexed { idx, it ->
                        val field: String = it.getTypedAttribute(ATTR_FIELD)!!
                        var searchTerm: String = cleanupSearchTerm(it.getTypedAttribute(ATTR_SEARCHQUERY)!!)
                        if (field == DATE_RANGE_ATTRIBUTE) {
                            searchTerm = adjustDateRangeSearchValue(searchTerm)
                        }
                        val operator = if (it.hasAttribute(ATTR_OPERATOR)) {
                            FieldSearch.Operator.valueOf(it.getTypedAttribute<String>(ATTR_OPERATOR)!!.toUpperCase())
                        } else {
                            if (idx == 0) FieldSearch.Operator.AND else FieldSearch.Operator.OR
                        }
                        FieldSearch(field, searchTerm, operator)
                    }.toTypedArray()
                } else null
            }
            if (overrides.hasAttribute(ATTR_SORT)) {
                val sortings = overrides.getAttribute(ATTR_SORT)!!
                search.sort = if (sortings is String) convertSorting(listOf(sortings))
                else convertSorting(sortings as Collection<String>)
            }
            if (overrides.hasAttribute(ATTR_OFFSET)) {
                val offset: Number = overrides.getTypedAttribute(ATTR_OFFSET)!!
                search.offset = max(0, offset.toInt())
            }
            if (overrides.hasAttribute(ATTR_LIMIT)) {
                val limit: Number = overrides.getTypedAttribute(ATTR_LIMIT)!!
                search.limit = min(limit.toInt(), MAX_LIMIT)
            }
            return search
        }

        private fun adjustDateRangeSearch(searchTerm: String): String {
            val givenDateSearch = StringUtils.substringBetween(searchTerm, "$DATE_RANGE_ATTRIBUTE:", "]") + "]"
            return searchTerm.replace(givenDateSearch, adjustDateRangeSearchValue(givenDateSearch))
        }

        // given is some kind of date, we need to adjust it to millis
        private fun adjustDateRangeSearchValue(dateRangeString: String): String {
            val range = StringUtils.substringBetween(dateRangeString, "[", "]")
            var from = range.substringBefore("TO").trim()
            var to = range.substringAfter("TO").trim();
            if (from != "*") {
                from = (startDate(from).time/1000).toString()
            }
            if (to != "*") {
                to = (endDate(to).time/1000).toString()
            }
            return "[$from TO $to]"
        }

        private fun startDate(str: String): Date {
            val cal = GregorianCalendar()
            cal.set(Calendar.YEAR, 0);
            cal.set(Calendar.MONTH, 0)
            cal.set(Calendar.DAY_OF_MONTH, 1)
            cal.set(Calendar.HOUR_OF_DAY, 0)
            cal.set(Calendar.MINUTE, 0)
            cal.set(Calendar.SECOND, 0)
            cal.set(Calendar.MILLISECOND, 0)
            return setDateFields(cal, str)
        }

        private fun endDate(str: String): Date {
            val cal = GregorianCalendar()
            cal.set(Calendar.YEAR, 0)
            cal.set(Calendar.MONTH, 12)
            cal.set(Calendar.DAY_OF_MONTH, 31)
            cal.set(Calendar.HOUR_OF_DAY, 23)
            cal.set(Calendar.MINUTE, 59)
            cal.set(Calendar.SECOND, 59)
            cal.set(Calendar.MILLISECOND, 999)
            return setDateFields(cal, str)
        }

        private fun setDateFields(cal: Calendar, date: String): Date {
            val isBC = date.startsWith("-")
            val source = if (isBC) date.substring(1) else date
            val parts = source.split(Regex("[-]"))

            // year
            val year = Integer.parseInt(parts[0])
            cal.set(Calendar.YEAR, year);
            cal.set(Calendar.ERA, if (isBC) GregorianCalendar.BC else GregorianCalendar.AD)
            // month
            if (parts.size > 1) {
                cal.set(Calendar.MONTH, Integer.parseInt(parts[1]) - 1)
            }
            // day
            if (parts.size > 2) {
                cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(parts[2]))
            }
            return cal.time
        }

        private fun splitSorting(sort: String): Array<Pair<String, Boolean>> {
            return convertSorting(sort.split(",").filter { it.isNotBlank() })
        }

        private fun convertSorting(sortings: Collection<String>): Array<Pair<String, Boolean>> {
            val pairs = ArrayList<Pair<String, Boolean>>()
            for (sort in sortings) {
                // we also allow " " to support common url issues where "+" is specified and decoded to " "
                // instead of "%2B" which is decoded to "+"
                val field = when (sort.first()) {
                    '-', '+', ' ' -> sort.substring(1)
                    else -> sort
                }
                // descending sort is specified by leading hyphen
                val desc = sort.first() == '-'
                pairs.add(Pair(field, !desc))
            }
            return pairs.toTypedArray()
        }

        fun cleanupSearchTerm(searchTerm: String): String {
            var cleaned = searchTerm
                    .replace("\\\"", "<ESCAPED_QUOTE>")
                    .replace(Regex("[()/]"), " ")
                    .replace(Regex("\\s+"), " ")
                    .trim()
            // ensure balanced quotes
            cleaned = balanced("<ESCAPED_QUOTE>", cleaned)
            cleaned = balanced("\"", cleaned)
            return cleaned.replace("<ESCAPED_QUOTE>", "\\\"")
        }

        private fun balanced(str: String, source: String): String {
            return if (StringUtils.countMatches(source, str) % 2 != 0) {
                return if (source.endsWith(str)) {
                    source.substring(0, source.length - 1);
                } else {
                    source.plus(str)
                }
            } else source
        }
    }
}