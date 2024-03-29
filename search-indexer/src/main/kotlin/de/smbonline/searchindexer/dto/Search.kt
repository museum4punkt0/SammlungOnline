package de.smbonline.searchindexer.dto

import de.smbonline.searchindexer.conf.ASSETS_ATTRIBUTE
import de.smbonline.searchindexer.conf.DATE_RANGE_ATTRIBUTE
import de.smbonline.searchindexer.conf.HAS_ATTACHMENTS_ATTRIBUTE
import de.smbonline.searchindexer.conf.ID_ATTRIBUTE
import de.smbonline.searchindexer.dto.JsonAttr.*
import de.smbonline.searchindexer.rest.Params.*
import de.smbonline.searchindexer.util.Misc.*
import org.apache.commons.lang3.StringUtils
import java.util.*
import kotlin.math.max
import kotlin.math.min

class Search : Cloneable {

    /** main search term, default "*" */
    var searchTerm: String = "*"

    /** additional filters, default null */
    var advancedSearch: Array<FieldSearch>? = null

    /** key=field, value=asc, default empty */
    var sort: Array<Pair<String, Boolean>> = emptyArray()

    /** start index, default=0 */
    var offset: Int = 0

    /** amount of results, default=20 */
    var limit: Int = 20

    public override fun clone(): Search {
        val clone = super.clone() as Search
        clone.advancedSearch = clone.advancedSearch?.clone()
        clone.sort = clone.sort.clone()
        return clone
    }

    @Suppress("UNCHECKED_CAST")
    companion object {

        private const val MAX_LIMIT = 100

        fun fromQueryParams(params: Map<String, String>): Search {
            val search = Search()
            if (params.containsKey(SEARCHQUERY_PARAMETER)) {
                search.searchTerm = cleanupSearchTerm(params.getValue(SEARCHQUERY_PARAMETER))
                if (search.searchTerm.contains("$DATE_RANGE_ATTRIBUTE:")) {
                    search.searchTerm = adjustDateRangeSearch(search.searchTerm)
                }
            }
            if (params.containsKey(SORT_PARAMETER)) {
                search.sort = splitSorting(params.getValue(SORT_PARAMETER))
            }
            if (params.containsKey(OFFSET_PARAMETER)) {
                search.offset = max(0, params.getValue(OFFSET_PARAMETER).toInt())
            }
            if (params.containsKey(LIMIT_PARAMETER)) {
                val limit = params.getValue(LIMIT_PARAMETER)
                // developer feature: allow exclamation mark to suppress limitation
                if (limit.endsWith('!')) {
                    search.limit = limit.substring(0, limit.length - 1).toInt()
                } else {
                    search.limit = min(limit.toInt(), MAX_LIMIT)
                }
            }
            return search
        }

        fun fromPayload(request: Data): Search {
            return merge(Search(), request)
        }

        fun merge(defaults: Search, overrides: Data): Search {
            val search = defaults.clone()
            if (overrides.hasAttribute(ATTR_SEARCHQUERY)) {
                search.searchTerm = cleanupSearchTerm(overrides.getTypedAttribute(ATTR_SEARCHQUERY)!!)
                if (search.searchTerm.contains("$DATE_RANGE_ATTRIBUTE:")) {
                    search.searchTerm = adjustDateRangeSearch(search.searchTerm)
                }
            }
            if (overrides.hasAttribute(ATTR_ADVANCED_SEARCHQUERY)) {
                val advanced: MutableCollection<Data> = overrides.getTypedAttribute(ATTR_ADVANCED_SEARCHQUERY)!!
                // FIXME workaround for placeholder images - fetch blocked_attachments from Hasura
                advanced.find { it.getAttribute(ATTR_FIELD) == HAS_ATTACHMENTS_ATTRIBUTE }?.let {
                    if (it.getAttribute(ATTR_SEARCHQUERY) == "true") {
                        it.setAttribute(ATTR_SEARCHQUERY, "true AND NOT ($ASSETS_ATTRIBUTE.$ID_ATTRIBUTE:(5802648 OR 6545994 OR 6548841))")
                    }
                }
                search.advancedSearch = if (advanced.isNotEmpty()) {
                    advanced.filter {
                        StringUtils.isNoneBlank(it.getTypedAttribute(ATTR_FIELD), it.getTypedAttribute(ATTR_SEARCHQUERY))
                    }.mapIndexed { idx, it ->
                        val field: String = it.getTypedAttribute(ATTR_FIELD)!!
                        var searchTerm = cleanupSearchTerm(it.getTypedAttribute(ATTR_SEARCHQUERY)!!)
                        searchTerm = if (field == DATE_RANGE_ATTRIBUTE) {
                            adjustDateRangeSearchValue(searchTerm)
                        } else {
                            wrapBrackets(searchTerm)
                        }
                        val operator = if (it.hasAttribute(ATTR_OPERATOR)) {
                            FieldSearch.Operator.valueOf(it.getTypedAttribute<String>(ATTR_OPERATOR)!!.uppercase())
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

        // given is some kind of date, we need to adjust it to seconds
        private fun adjustDateRangeSearchValue(dateRangeString: String): String {
            val range = StringUtils.substringBetween(dateRangeString, "[", "]")
            var from = range.substringBefore("TO").trim()
            var to = range.substringAfter("TO").trim()
            if (from != "*") {
                from = (startDate(from).time / 1000).toString() // seconds
            }
            if (to != "*") {
                to = (endDate(to).time / 1000).toString() // seconds
            }
            return "[$from TO $to]"
        }

        private fun startDate(str: String): Date {
            val cal = GregorianCalendar()
            cal.set(Calendar.ERA, GregorianCalendar.BC)
            cal.set(Calendar.YEAR, 200000) // far, far back in time
            cal.set(Calendar.MONTH, Calendar.JANUARY)
            cal.set(Calendar.DAY_OF_MONTH, 1)
            cal.set(Calendar.HOUR_OF_DAY, 0)
            cal.set(Calendar.MINUTE, 0)
            cal.set(Calendar.SECOND, 0)
            cal.set(Calendar.MILLISECOND, 0)
            return setDateFields(cal, str)
        }

        private fun endDate(str: String): Date {
            val cal = GregorianCalendar()
            cal.set(Calendar.YEAR, 3000) // good enough for the future
            cal.set(Calendar.MONTH, Calendar.DECEMBER)
            cal.set(Calendar.DAY_OF_MONTH, 31)
            cal.set(Calendar.HOUR_OF_DAY, 23)
            cal.set(Calendar.MINUTE, 59)
            cal.set(Calendar.SECOND, 59)
            cal.set(Calendar.MILLISECOND, 0) // don't care about millis, we do "x / 1000" anyway
            return setDateFields(cal, str)
        }

        private fun setDateFields(cal: GregorianCalendar, date: String): Date {
            val isBC = date.startsWith("-")
            val source = if (isBC) date.substring(1) else date
            val parts = source.split('-').map { it.trim() }.filter { it.isNotEmpty() }

            // year
            if (parts.isNotEmpty()) {
                cal.set(Calendar.ERA, if (isBC) GregorianCalendar.BC else GregorianCalendar.AD)
                cal.set(Calendar.YEAR, parts[0].toInt())
            }
            // month
            if (parts.size > 1) {
                // -1 because Calendar expects [0..11] and not [1..12]
                cal.set(Calendar.MONTH, parts[1].toInt() - 1)
            }
            // day
            if (parts.size > 2) {
                cal.set(Calendar.DAY_OF_MONTH, parts[2].toInt())
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

        fun cleanupSearchTerm(searchTerm: String, trim: Boolean = true): String {
            var cleaned = searchTerm
                    .replace("\\\"", "<ESCAPED_QUOTE>")
                    .replace(Regex("\\s+"), " ")
            if (trim) cleaned = cleaned.trim()
            cleaned = balanced("<ESCAPED_QUOTE>", cleaned)
            cleaned = balanced("\"", cleaned)
            if (trim) cleaned = cleaned.trim()
            return cleaned.replace("<ESCAPED_QUOTE>", "\\\"")
        }

        private fun balanced(str: String, source: String): String {
            return if (StringUtils.countMatches(source, str) % 2 != 0) {
                return if (source.endsWith(str)) {
                    source.substring(0, source.length - str.length)
                } else {
                    source.plus(str)
                }
            } else source
        }
    }
}