package com.xailabs.microservices.hasura.auth.data

class User(val userId: Any) {
    var isOwner: Boolean? = false
    var role: String? = null
    var username: String? = null
    var roleScope: String? = null
}