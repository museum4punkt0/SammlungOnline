package de.smbonline.mdssync.search;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;

import java.util.Objects;

import static de.smbonline.mdssync.util.Validations.*;

@Configuration
@ConfigurationProperties(prefix = "mds-api")
public class MdsApiConfig {

    private String baseUrl = null;
    private String modulePathTemplate = "/ria-ws/application/module/{moduleName}";
    private final AuthConfig auth = new AuthConfig();
    private final FieldConfig fields = new FieldConfig();
    private boolean sslValidationEnabled = true;
    private String orgUnitDeletedObjects = "SysTrashBinOrgUnit_global";

    public String getBaseUrl() {
        return this.baseUrl;
    }

    public void setBaseUrl(final String baseUrl) {
        this.baseUrl = Objects.requireNonNull(baseUrl);
    }

    public String getModulePathTemplate() {
        return this.modulePathTemplate;
    }

    public void setModulePathTemplate(final String modulePathTemplate) {
        this.modulePathTemplate = Objects.requireNonNull(modulePathTemplate);
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

    public String getOrgUnitDeletedObjects() {
        return this.orgUnitDeletedObjects;
    }

    public void setOrgUnitDeletedObjects(final String orgUnit) {
        this.orgUnitDeletedObjects = Objects.requireNonNull(orgUnit);
    }

    public FieldConfig getFields() {
        return this.fields;
    }

    public static class FieldConfig {

        // TODO make these global constants, accessible from everywhere, not configurable
        private String mdsIdFieldName = "__id";
        private String modifiedTimestampField = "__lastModified";
        private String orgUnitFieldName = "__orgUnit";
        private String highlightFieldName = "OgrNameTxt";
        private String[] deletedFilter = {"__orgUnit", "SysTrashBinOrgUnit_global"};

        public String getMdsIdFieldName() {
            return this.mdsIdFieldName;
        }

        public void setMdsIdFieldName(final String fieldName) {
            this.mdsIdFieldName = Objects.requireNonNull(fieldName);
        }

        public String getModifiedTimestampField() {
            return modifiedTimestampField;
        }

        public void setModifiedTimestampField(final String fieldName) {
            this.modifiedTimestampField = fieldName;
        }

        public String getOrgUnitFieldName() {
            return this.orgUnitFieldName;
        }

        public void setOrgUnitFieldName(final String fieldName) {
            this.orgUnitFieldName = Objects.requireNonNull(fieldName);
        }

        public String getHighlightFieldName() {
            return this.highlightFieldName;
        }

        public void setHighlightFieldName(final String fieldName) {
            this.highlightFieldName = Objects.requireNonNull(fieldName);
        }

        /**
         * Sets a filter expression.
         *
         * @param filter key,value
         */
        public void setDeletedFilter(final String[] filter) {
            this.deletedFilter = requireArrayLength(2, filter);
        }

        public String[] getDeletedFilter() {
            return this.deletedFilter;
        }
    }

    public static class AuthConfig {

        private String header = null;
        private String user = null;
        private String pass = null;

        public @Nullable String getHeader() {
            return this.header;
        }

        public void setHeader(final @Nullable String header) {
            this.header = header;
        }

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

        public String getValue() {
            if (StringUtils.isEmpty(this.header)) {
                this.header = "Basic " + HttpHeaders.encodeBasicAuth(user, pass, null);
            }
            return this.header;
        }
    }
}
