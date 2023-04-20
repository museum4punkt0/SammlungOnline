package de.smbonline.searchindexer.dto

import org.assertj.core.api.Assertions.*
import org.assertj.core.data.Offset
import org.junit.jupiter.api.Test

class SearchTest {

    @Test
    fun testDefaultSearch() {
        val search = Search()
        assertThat(search.searchTerm).isEqualTo("*")
        assertThat(search.offset).isEqualTo(0)
        assertThat(search.limit).isCloseTo(20, Offset.offset(5))
        assertThat(search.sort).isEmpty()
        assertThat(search.advancedSearch).isNull()
    }

    @Test
    fun testCleanupSearchTerm() {
        val q1 = "one(()two / three (four five (six))"
        val cleaned1 = Search.cleanupSearchTerm(q1)
        assertThat(cleaned1).isEqualTo("one two three four five six")

        val q2 = "unbalanced quote \""
        val cleaned2 = Search.cleanupSearchTerm(q2)
        assertThat(cleaned2).isEqualTo("unbalanced quote")

        val q3 = "\"unbalanced quote (and brackets)"
        val cleaned3 = Search.cleanupSearchTerm(q3)
        assertThat(cleaned3).isEqualTo("\"unbalanced quote and brackets\"")
    }

    @Test
    fun testFromPayload() {
        val data = Data()
                .setAttribute("q", "search term")
                .setAttribute("q_advanced", listOf(
                        Data().setAttribute("operator", "AND")
                                .setAttribute("field", "field-1")
                                .setAttribute("q", "q-1"),
                        Data().setAttribute("operator", "OR")
                                .setAttribute("field", "field-2")
                                .setAttribute("q", "q-2"),
                        Data().setAttribute("operator", "AND_NOT")
                                .setAttribute("field", "field-3")
                                .setAttribute("q", "q-3"),
                        // default operator should be OR
                        Data().setAttribute("field", "field-4")
                                .setAttribute("q", "q-4"),
                        // missing q should be filtered out
                        Data().setAttribute("field", "field-5"),
                        // missing field should be filtered out
                        Data().setAttribute("q", "field-6")
                ))
                .setAttribute("sort", "-sortField")
                .setAttribute("offset", 5173)
                .setAttribute("limit", 69)

        val search = Search.fromPayload(data)

        assertThat(search.searchTerm).isEqualTo("search term")
        assertThat(search.offset).isEqualTo(5173)
        assertThat(search.limit).isEqualTo(69)
        assertThat(search.sort.size).isEqualTo(1)
        assertThat(search.sort[0]).isEqualTo(Pair("sortField", false))
        assertThat(search.advancedSearch).isNotNull
        assertThat(search.advancedSearch!!.size).isEqualTo(4)
        assertThat(search.advancedSearch!![0].searchTerm).isEqualTo("(q-1)")
        assertThat(search.advancedSearch!![0].field).isEqualTo("field-1")
        assertThat(search.advancedSearch!![0].operator).isEqualTo(FieldSearch.Operator.AND)
        assertThat(search.advancedSearch!![1].searchTerm).isEqualTo("(q-2)")
        assertThat(search.advancedSearch!![1].field).isEqualTo("field-2")
        assertThat(search.advancedSearch!![1].operator).isEqualTo(FieldSearch.Operator.OR)
        assertThat(search.advancedSearch!![2].searchTerm).isEqualTo("(q-3)")
        assertThat(search.advancedSearch!![2].field).isEqualTo("field-3")
        assertThat(search.advancedSearch!![2].operator).isEqualTo(FieldSearch.Operator.AND_NOT)
        assertThat(search.advancedSearch!![3].searchTerm).isEqualTo("(q-4)")
        assertThat(search.advancedSearch!![3].field).isEqualTo("field-4")
        assertThat(search.advancedSearch!![3].operator).isEqualTo(FieldSearch.Operator.OR)
    }

    @Test
    fun testEmptyAdvancedSearchIsConvertedToNull() {
        val data = Data().setAttribute("q_advanced", emptyList<Data>())
        val search = Search.fromPayload(data)
        assertThat(search.advancedSearch).isNull()
    }

    @Test
    fun testFromQueryParams() {
        val params = mapOf(
                Pair("q", "search term"),
                Pair("sort", "-sortField"),
                Pair("offset", "5173"),
                Pair("limit", "69"),
                Pair("whatever", "ignore")
        )

        val search = Search.fromQueryParams(params)

        assertThat(search.searchTerm).isEqualTo("search term")
        assertThat(search.offset).isEqualTo(5173)
        assertThat(search.limit).isEqualTo(69)
        assertThat(search.sort.size).isEqualTo(1)
        assertThat(search.sort[0]).isEqualTo(Pair("sortField", false))
        assertThat(search.advancedSearch).isNull()
    }

    @Test
    fun testMerge() {

        val search1 = Search();
        search1.searchTerm = "term1"
        search1.sort = arrayOf(Pair("sort1", true))
        search1.offset = 1
        search1.limit = 1
        search1.advancedSearch = arrayOf(FieldSearch("field1", "q1", FieldSearch.Operator.AND))

        val search2 = Data()
                .setAttribute("q", "term2")
                .setAttribute("offset", 2)
                .setAttribute("q_advanced", listOf(
                        Data().setAttribute("operator", "AND_NOT")
                                .setAttribute("field", "field2")
                                .setAttribute("q", "q2"),
                ))

        val merged = Search.merge(search1, search2)

        assertThat(merged.searchTerm).isEqualTo("term2")
        assertThat(merged.offset).isEqualTo(2)
        assertThat(merged.limit).isEqualTo(1)
        assertThat(merged.sort.size).isEqualTo(1)
        assertThat(merged.sort[0]).isEqualTo(Pair("sort1", true))
        assertThat(merged.advancedSearch).isNotNull
        assertThat(merged.advancedSearch!!.size).isEqualTo(1)
        assertThat(merged.advancedSearch!![0].searchTerm).isEqualTo("(q2)")
        assertThat(merged.advancedSearch!![0].field).isEqualTo("field2")
        assertThat(merged.advancedSearch!![0].operator).isEqualTo(FieldSearch.Operator.AND_NOT)
    }
}