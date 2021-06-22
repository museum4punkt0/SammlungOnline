package com.xailabs.microservices.hasura.auth.handler;

import com.xailabs.microservices.hasura.auth.data.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.CredentialException;
import javax.security.auth.login.LoginException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class LoginAlternatives {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginAlternatives.class);

    private final TokenLogin tokenLogin;
    private final UsernameAndPasswordLogin userPassLogin;
    private final SessionHandler sessionHandler;

    @Autowired
    public LoginAlternatives(
            final TokenLogin tokenLogin,
            final UsernameAndPasswordLogin userPassLogin,
            final SessionHandler sessionHandler) {
        this.tokenLogin = tokenLogin;
        this.userPassLogin = userPassLogin;
        this.sessionHandler = sessionHandler;
    }

    public User authenticate(final String auth) throws LoginException {

        // check for session token
        if (auth.equals(this.sessionHandler.getSessionId())) {
            LOGGER.debug("Returning operator from session");
            return this.sessionHandler.getOperator();
        }

        // check for bearer token syntax
        if (auth.startsWith("Bearer ")) {
            LOGGER.debug("Trying token login...");
            return this.tokenLogin.login(auth.substring("Bearer ".length()));
        }

        // check for basic auth syntax
        if (auth.startsWith("Basic ")) {
            String base64 = auth.substring("Basic ".length());
            String usernameColonPassword = new String(Base64.getDecoder().decode(base64), StandardCharsets.ISO_8859_1);
            return authenticate(usernameColonPassword);
        }

        // if there is one colon, assume username:password in clear text
        int colonIdx;
        if ((colonIdx = auth.indexOf(':')) > -1 && colonIdx == auth.lastIndexOf(':')) {
            String username = auth.substring(0, colonIdx);
            String password = auth.substring(colonIdx + 1);
            LOGGER.debug("Trying username:password login...");
            return this.userPassLogin.login(username, password);
        }

        // We cannot handle it
        throw new CredentialException("unknown credentials format");
    }
}
