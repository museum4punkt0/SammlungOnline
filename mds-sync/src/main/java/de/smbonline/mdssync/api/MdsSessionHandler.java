package de.smbonline.mdssync.api;

import de.smbonline.mdssync.jaxb.session.Application;
import de.smbonline.mdssync.jaxb.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Collections;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Component
public class MdsSessionHandler implements ClientHttpRequestInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(MdsSessionHandler.class);

    private long lastTokenRefreshedMillis = -1;
    private String sessionCookie;

    private final MdsApiConfig config;

    @Autowired
    public MdsSessionHandler(final MdsApiConfig config) {
        this.config = config;
    }

    @Override
    public ClientHttpResponse intercept(
            final HttpRequest request,
            final byte[] requestBody,
            final ClientHttpRequestExecution execution) throws IOException {

        // adjust request
        applySessionCookie(request);
        applySessionToken(request);

        // perform request
        ClientHttpResponse response = execution.execute(request, requestBody);

        // handle response
        checkSessionCookieChanged(response);
        return response;
    }

    /**
     * Sets http session cookie if available
     */
    private void applySessionCookie(final HttpRequest request) {
        if (this.sessionCookie != null) {
            request.getHeaders().set(HttpHeaders.COOKIE, this.sessionCookie);
        }
    }

    /**
     * Sets/updates user-session token if necessary
     */
    private synchronized void applySessionToken(final HttpRequest request) {
        if (!isSessionTokenValid()) {
            String token = tryRefreshSessionToken();
            this.config.getAuth().setSessionToken(token);
        }
        // override basic-auth header with user-session info
        applyAuthorizationHeader(request);
    }

    private void applyAuthorizationHeader(final HttpRequest request) {
        String userPart = String.format("user[%s]", this.config.getAuth().getUser());
        String sessionPart = String.format("session[%s]", this.config.getAuth().getSessionToken());
        request.getHeaders().setBasicAuth(userPart, sessionPart);
    }

    private boolean isSessionTokenValid() {
        // uninitialized check
        if (this.lastTokenRefreshedMillis == -1 || this.config.getAuth().getSessionToken() == null) {
            return false;
        }
        // expired check
        long tokenLifetime = TimeUnit.MINUTES.toMillis(this.config.getTokenLifetime());
        return System.currentTimeMillis() - this.lastTokenRefreshedMillis <= tokenLifetime;
    }

    private @Nullable String tryRefreshSessionToken() {
        // first invalidate old session if set
        if (this.config.getAuth().getSessionToken() != null) {
            deleteOldSessionToken();
        }
        // then try to obtain a fresh session key
        return obtainNewSessionToken();
    }

    private void deleteOldSessionToken() {
        try {
            RestTemplate client = RestTemplateFactory.INSTANCE.getRestTemplate(this.config);
            client.getInterceptors().add((request, body, execution) -> {
                applyAuthorizationHeader(request);
                return execution.execute(request, body);
            });
            client.delete(this.config.getWebservicePath() + "/session/{key}",
                    Collections.singletonMap("key", this.config.getAuth().getSessionToken()));
            this.config.getAuth().setSessionToken(null);
        } catch (Exception exc) {
            // session is probably already expired
            LOGGER.warn("Unable to invalidate old user session: {}", exc.toString());
        }
    }

    private @Nullable String obtainNewSessionToken() {
        String sessionKey = null;
        try {
            RestTemplate client = RestTemplateFactory.INSTANCE.getRestTemplate(this.config);
            ResponseEntity<Application> response = client.getForEntity(this.config.getWebservicePath() + "/session", Application.class);
            Session session = response.getBody() == null ? null : response.getBody().getSession();
            if (session == null || session.getKey() == null) {
                LOGGER.warn("Unable to initiate user session.");
            } else if (session.isPending()) {
                LOGGER.warn("Session is pending. Is 2-factor-authentication enabled?");
            } else {
                this.lastTokenRefreshedMillis = System.currentTimeMillis();
                sessionKey = session.getKey();
            }
        } catch (RestClientException exc) {
            LOGGER.error("Error initiating user session: ", exc);
        }
        return sessionKey;
    }

    private void checkSessionCookieChanged(final ClientHttpResponse response) {
        if (response.getHeaders().containsKey(HttpHeaders.SET_COOKIE)) {
            this.sessionCookie = Objects.requireNonNull(response.getHeaders().get(HttpHeaders.SET_COOKIE)).get(0);
        }
    }
}
