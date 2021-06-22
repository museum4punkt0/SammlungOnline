package com.xailabs.microservices.hasura.auth

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HasuraAuthApplication

fun main(args: Array<String>) {
	runApplication<HasuraAuthApplication>(*args)
}
