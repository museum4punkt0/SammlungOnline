package com.xailabs.microservices.hasura.auth.rest

import com.xailabs.microservices.hasura.auth.config.HasuraConfig
import com.xailabs.microservices.hasura.auth.config.X_HASURA_IS_OWNER
import com.xailabs.microservices.hasura.auth.config.X_HASURA_ROLE
import com.xailabs.microservices.hasura.auth.config.X_HASURA_ROLE_SCOPE
import com.xailabs.microservices.hasura.auth.config.X_HASURA_SESSION_TOKEN
import com.xailabs.microservices.hasura.auth.config.X_HASURA_USERNAME
import com.xailabs.microservices.hasura.auth.config.X_HASURA_USER_ID
import com.xailabs.microservices.hasura.auth.data.User
import com.xailabs.microservices.hasura.auth.handler.LoginAlternatives
import com.xailabs.microservices.hasura.auth.handler.SessionHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.WebRequest
import java.io.PrintWriter
import java.io.StringWriter
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.util.Collections
import javax.security.auth.login.CredentialException
import javax.security.auth.login.LoginException

/**
 * Hasura Auth Webhook, allows GET and POST authentication.
 */
@RestController
class AuthController @Autowired constructor(
        val sessionHandler: SessionHandler,
        val loginAlternatives: LoginAlternatives,
        val config: HasuraConfig) {

    val logger: Logger = LoggerFactory.getLogger(AuthController::class.java)

    @ExceptionHandler(LoginException::class)
    fun handleLoginException(exc: LoginException, req: WebRequest): ResponseEntity<Map<String, *>> {
        val data: MutableMap<String, Any?> = LinkedHashMap(2, 1f)
        data["message"] = exc.message
        data["status"] = HttpStatus.UNAUTHORIZED.value()
        data["timestamp"] = OffsetDateTime.now().withOffsetSameInstant(ZoneOffset.UTC)
        if ("true".equals(req.getHeader("X-Debug"), true)) {
            val sw = StringWriter()
            exc.printStackTrace(PrintWriter(sw))
            data["error"] = exc.javaClass.name
            data["stacktrace"] = sw.toString().lineSequence().filter { it.isNotEmpty() }
        }
        logger.error("Authentication failed: ${data["message"]}")
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(data)
    }

    // According to Hasura doc only 200 and 401 are allowed as response status

    @GetMapping(path = ["login"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun loginGET(@CookieValue(name = "JSESSIONID", required = false) sessionToken: String?,
                 @RequestHeader(name = HttpHeaders.AUTHORIZATION, required = false) authHeader: String?)
            : ResponseEntity<Map<String, String>> {
        val auth = authHeader ?: sessionToken
        return if (auth != null) handleLoginRequest(auth) else anonymousUser()
    }

    @PostMapping(path = ["login"], consumes = [MediaType.APPLICATION_JSON_VALUE], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun loginPOST(@CookieValue(name = "JSESSIONID", required = false) sessionToken: String?,
                  @RequestBody request: Map<String?, *>)
            : ResponseEntity<Map<String, String>> {

        // 'authorization' is either directly in the payload or nested in 'headers' block
        // if there is neither of both, let's try the session cookie
        val auth = if (request.containsKey("headers")) {
            val headers = request["headers"] as Map<String?, *>
            headers.entries.find { it.key.equals("authorization", true) }?.value
        } else {
            request.entries.find { it.key.equals("authorization", true) }?.value
        } ?: sessionToken

        if (auth == null) {
            return anonymousUser()
        }
        if (auth is String && auth.isNotEmpty()) {
            return handleLoginRequest(auth)
        }
        throw CredentialException("invalid value for ${HttpHeaders.AUTHORIZATION}")
    }

    @RequestMapping(method = [RequestMethod.GET, RequestMethod.POST], path = ["logout"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun logout(): ResponseEntity<Map<String, String>> {
        return anonymousUser()
    }

    /**
     * If no Authorization header given, the auth-webhook is supposed to return the "unauthenticated" role
     */
    private fun anonymousUser(): ResponseEntity<Map<String, String>> {
        val data = Collections.singletonMap(X_HASURA_ROLE, config.unauthorizedRole)
        logger.debug("Using anonymous role: ${data[X_HASURA_ROLE]}")
        return ResponseEntity.ok(data)
    }

    private fun handleLoginRequest(auth: String): ResponseEntity<Map<String, String>> {
        val user = loginAlternatives.authenticate(auth)
        val data = createUserData(user)
        logger.debug("Successfully authenticated: ${data[X_HASURA_USERNAME]} (${data[X_HASURA_ROLE]})")
        return ResponseEntity.ok(data)
    }

    private fun createUserData(user: User): Map<String, String> {
        val data: MutableMap<String, String> = LinkedHashMap(6, 1f)
        data[X_HASURA_USER_ID] = user.userId.toString()
        if (user.role != null) {
            data[X_HASURA_ROLE] = user.role!!
        }
        if (user.isOwner != null) {
            data[X_HASURA_IS_OWNER] = user.isOwner.toString()
        }
        if (user.roleScope != null) {
            data[X_HASURA_ROLE_SCOPE] = user.roleScope!!
        }
        if (user.username != null) {
            data[X_HASURA_USERNAME] = user.username!!
        }
        data[X_HASURA_SESSION_TOKEN] = sessionHandler.sessionId
        return data
    }
}