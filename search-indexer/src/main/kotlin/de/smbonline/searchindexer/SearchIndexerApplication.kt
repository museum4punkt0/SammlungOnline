package de.smbonline.searchindexer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SearchIndexerApplication

fun main(args: Array<String>) {
    runApplication<SearchIndexerApplication>(*args)
}
