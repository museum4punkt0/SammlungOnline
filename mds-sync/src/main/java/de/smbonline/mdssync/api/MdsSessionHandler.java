package de.smbonline.mdssync.api;

import de.smbonline.mdssync.jaxb.session.Application;
import de.smbonline.mdssync.jaxb.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import static java.util.Objects.*;

@Component
public class MdsSessionHandler implements ClientHttpRequestInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(MdsSessionHandler.class);

    private long lastTokenRefreshedMillis = -1;

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
        applySessionToken(request);
        ClientHttpResponse response = execution.execute(request, requestBody);
        if (!response.getStatusCode().isError()) {
            this.lastTokenRefreshedMillis = System.currentTimeMillis();
        }
        return response;
    }

    /**
     * Sets/updates user-session token if necessary
     */
    private void applySessionToken(final HttpRequest request) {
        synchronized (this.config.getAuth()) {
            if (!isSessionTokenValid()) {
                LOGGER.trace("Refreshing session token...");
                tryRefreshSessionToken();
            }
            // override basic-auth header with user-session info
            LOGGER.trace("Applying auth header to request: {}", request.getURI());
            applyAuthorizationHeader(request);
        }
    }

    private void applyAuthorizationHeader(final HttpRequest request) {
        if (this.config.getAuth().getSessionToken() != null) {
            String userPart = String.format("user[%s]", this.config.getAuth().getUser());
            String sessionPart = String.format("session[%s]", this.config.getAuth().getSessionToken());
            LOGGER.trace("Using token {}", sessionPart);
            request.getHeaders().setBasicAuth(userPart, sessionPart);
        } else {
            // reset auth-header with user/pass
            String user = requireNonNull(this.config.getAuth().getUser());
            String pass = requireNonNull(this.config.getAuth().getPass());
            LOGGER.trace("Using user/pass");
            request.getHeaders().setBasicAuth(user, pass);
        }
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

    /**
     * Obtains a new session token; calls delete upfront in case a (old) token is currently stored.
     * @return new token if call succeeded
     * @see MdsApiConfig.AuthConfig#getSessionToken()
     */
    private @Nullable String tryRefreshSessionToken() {
        // first invalidate old session if set
        if (this.config.getAuth().getSessionToken() != null) {
            deleteOldSessionToken();
        }
        // then try to obtain a fresh session key
        refreshSessionToken();
        return this.config.getAuth().getSessionToken();
    }

    /**
     * Only invoked if a session token is currently available.
     */
    private void deleteOldSessionToken() {
        RestTemplate client = RestTemplateFactory.INSTANCE.getRestTemplate(this.config);
        client.setErrorHandler(
                new DefaultResponseErrorHandler() {
                    @Override
                    public void handleError(final ClientHttpResponse response) throws IOException {
                        LOGGER.warn("Unable to invalidate old user session: {}", response.getStatusCode());
                    }
                }
        );
        LOGGER.trace("Apply header to request: DELETE token");
        client.getInterceptors().add((request, body, execution) -> {
            applyAuthorizationHeader(request);
            return execution.execute(request, body);
        });
        LOGGER.trace("CALL DELETE TOKEN");
        client.delete(this.config.getWebservicePath() + "/session/" + this.config.getAuth().getSessionToken());
        this.config.getAuth().setSessionToken(null);
    }

    public void refreshSessionToken() {
        synchronized (this.config.getAuth()) {
            String token = obtainNewSessionToken();
            this.config.getAuth().setSessionToken(token);
        }
    }

    private @Nullable String obtainNewSessionToken() {
        String sessionKey = null;
        try {
            RestTemplate client = RestTemplateFactory.INSTANCE.getRestTemplate(this.config);
            LOGGER.trace("CALL FETCH TOKEN...");
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
            // something's weird, but we assume it works on next try - no error
            LOGGER.warn("Error initiating new user session: {}", exc.toString());
        }
        return sessionKey;
    }
}
