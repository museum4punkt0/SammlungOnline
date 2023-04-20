package com.xailabs.microservices.hasura.auth.graphql.repo

import com.apollographql.apollo.coroutines.await
import com.xailabs.microservices.hasura.auth.graphql.GraphQlClient
import com.xailabs.microservices.hasura.auth.graphql.queries.FetchUserByTokenQuery
import com.xailabs.microservices.hasura.auth.graphql.queries.FetchUserByUsernameQuery
import com.xailabs.microservices.hasura.auth.graphql.queries.fragment.UserData
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class UserRepository @Autowired constructor(val graphQlClient: GraphQlClient) {

    suspend fun fetchUserByUsernameAsync(username: String): UserData? {
        val result = graphQlClient.client
                .query(FetchUserByUsernameQuery(username))
                .await()
        val users: List<FetchUserByUsernameQuery.User>? = result.data?.user
        return if (users.isNullOrEmpty()) null else users[0].fragments.userData
    }

    fun fetchUserByUsernameSync(username: String): UserData? {
        val result: UserData?
        runBlocking {
            result = fetchUserByUsernameAsync(username)
        }
        return result
    }

    // ---

    suspend fun fetchUserByTokenAsync(token: String): UserData? {
        val result = graphQlClient.client
                .query(FetchUserByTokenQuery(token))
                .await()
        val users: List<FetchUserByTokenQuery.User>? = result.data?.user
        return if (users.isNullOrEmpty()) null else users[0].fragments.userData
    }

    fun fetchUserByTokenSync(username: String): UserData? {
        val result: UserData?
        runBlocking {
            result = fetchUserByTokenAsync(username)
        }
        return result
    }
}