package de.smbonline.mdssync.api;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;

import java.util.Objects;

@Configuration
@ConfigurationProperties(prefix = "mds-api")
public class MdsApiConfig {

    private String baseUrl = null;
    private String webservicePath = "/ria-ws/application/";
    private String modulePathTemplate = this.webservicePath + "/module/{moduleName}";
    private int tokenLifetime = 20; // minutes
    private final AuthConfig auth = new AuthConfig();
    private boolean sslValidationEnabled = true;
    private boolean approvalFilterEnabled = true;

    public String getBaseUrl() {
        return this.baseUrl;
    }

    public void setBaseUrl(final String baseUrl) {
        this.baseUrl = Objects.requireNonNull(baseUrl);
    }

    public String getWebservicePath() {
        return this.webservicePath;
    }

    public void setWebservicePath(final String path) {
        this.webservicePath = Objects.requireNonNull(path);
    }

    public String getModulePathTemplate() {
        return this.modulePathTemplate;
    }

    public void setModulePathTemplate(final String pathTemplate) {
        this.modulePathTemplate = Objects.requireNonNull(pathTemplate);
    }

    public AuthConfig getAuth() {
        return this.auth;
    }

    public boolean isSslValidationEnabled() {
        return this.sslValidationEnabled;
    }

    public void setSslValidationEnabled(final boolean enabled) {
        this.sslValidationEnabled = enabled;
    }

    public boolean isApprovalFilterEnabled() {
        return this.approvalFilterEnabled;
    }

    public void setApprovalFilterEnabled(final boolean enabled) {
        this.approvalFilterEnabled = enabled;
    }

    public void setTokenLifetime(final int minutes) {
        this.tokenLifetime = minutes;
    }

    public int getTokenLifetime() {
        return this.tokenLifetime;
    }

    public static class AuthConfig {

        private String user;
        private String pass;
        private String token;

        public @Nullable String getUser() {
            return this.user;
        }

        public void setUser(final @Nullable String user) {
            this.user = user;
        }

        public @Nullable String getPass() {
            return this.pass;
        }

        public void setPass(final @Nullable String pwd) {
            this.pass = pwd;
        }

        /**
         * Invoked by code at runtime, not used in application.yml
         *
         * @param token session token obtained from MDS
         */
        public void setSessionToken(final @Nullable String token) {
            this.token = token;
        }

        public @Nullable String getSessionToken() {
            return this.token;
        }
    }
}
