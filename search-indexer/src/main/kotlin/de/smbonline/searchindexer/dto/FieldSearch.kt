package de.smbonline.searchindexer.dto

data class FieldSearch(
        val field: String,
        val searchTerm: String,
        val operator: Operator = Operator.AND) {

    enum class Operator constructor(val value: String, val char: Char) {
        AND(" AND ", '+'),
        OR(" OR ", '|'),
        AND_NOT(" NOT ", '-')
    }
}