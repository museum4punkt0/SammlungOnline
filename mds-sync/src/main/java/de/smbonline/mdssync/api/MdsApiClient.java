package de.smbonline.mdssync.api;

import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.log.LogExecutionTime;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Application;
import de.smbonline.mdssync.jaxb.search.response.Attachment;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.Callable;

import static de.smbonline.mdssync.util.Lookup.*;

/**
 * Client to execute a search in MDS using <b>1</b> given module.
 * Instantiate with module name and invoke {@link #search(Search, String)} to execute the request.
 */
public class MdsApiClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(MdsApiClient.class);
    private static final int MAX_RETRY_ATTEMPTS = 3;
    private static final String MODULE_NAME_PATH_VARIABLE = "moduleName";

    private RestTemplate restTemplate;
    private final MdsApiConfig mdsConfig;
    private final String moduleName;
    private final MdsSessionHandler sessionHandler;

    /**
     * @param config     MDS-API config info
     * @param moduleName Module in which to search
     */
    public MdsApiClient(
            final MdsApiConfig config,
            final String moduleName,
            final @Nullable MdsSessionHandler sessionHandler) {
        this.moduleName = moduleName;
        this.mdsConfig = config;
        this.sessionHandler = sessionHandler;
    }

    public String getModuleName() {
        return this.moduleName;
    }

    /**
     * Fetches a particular module item by id.
     *
     * @param mdsId id
     * @param lang  optional language
     * @return found item or null
     */
    public @Nullable ModuleItem get(final Long mdsId, final @Nullable String lang) throws MdsApiConnectionException {
        HttpHeaders headers = new HttpHeaders();
        if (StringUtils.isNotEmpty(lang)) {
            headers.set(HttpHeaders.ACCEPT_LANGUAGE, lang);
        }
        HttpEntity<?> request = new HttpEntity<>(headers);
        ResponseEntity<Application> response = invokeWithRetries(() -> client().exchange(
                this.mdsConfig.getModulePathTemplate() + "/" + mdsId,
                HttpMethod.GET,
                request,
                Application.class,
                Collections.singletonMap(MODULE_NAME_PATH_VARIABLE, this.moduleName))
        );
        List<ModuleItem> results = extractResponseBody(response).getModuleItem();
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * Fetches the attachment of a particular module item by id.
     *
     * @param mdsId id
     * @return found attachment or null
     */
    public @Nullable Attachment getAttachment(final Long mdsId) throws MdsApiConnectionException {
        ResponseEntity<Application> response = invokeWithRetries(() -> client().getForEntity(
                this.mdsConfig.getModulePathTemplate() + "/" + mdsId + "/attachment",
                Application.class,
                Collections.singletonMap(MODULE_NAME_PATH_VARIABLE, this.moduleName))
        );
        List<ModuleItem> results = extractResponseBody(response).getModuleItem();
        return results.isEmpty() ? null : results.get(0).getAttachment();
    }

    /**
     * Executes given search and returns the search result.
     *
     * @param search search request
     * @param lang   language string (see Smb_language.lang)
     * @return search result
     */
    @LogExecutionTime
    public Module search(final Search search, final @Nullable String lang) throws MdsApiConnectionException {
        HttpHeaders headers = new HttpHeaders();
        if (StringUtils.isNotEmpty(lang)) {
            headers.set(HttpHeaders.ACCEPT_LANGUAGE, lang);
        }
        HttpEntity<?> request = new HttpEntity<>(SearchRequestHelper.createEnvelope(this.moduleName, search), headers);
        ResponseEntity<Application> response = invokeWithRetries(() -> client().exchange(
                this.mdsConfig.getModulePathTemplate() + "/search",
                HttpMethod.POST,
                request,
                Application.class,
                Collections.singletonMap(MODULE_NAME_PATH_VARIABLE, this.moduleName))
        );
        return extractResponseBody(response);
    }

    private Module extractResponseBody(final ResponseEntity<Application> response) {
        if (response.getBody() == null) {
            LOGGER.warn("No response body returned {}", response.getStatusCode());
            Module dummy = new Module();
            dummy.setName(this.moduleName);
            dummy.setTotalSize(0L);
            return dummy;
        }
        return response.getBody().getModules().getModule().get(0);
    }

    /**
     * lazy-init of RestTemplate
     *
     * @return preconfigured RestTemplate
     */
    private synchronized RestTemplate client() {
        if (this.restTemplate == null) {
            this.restTemplate = RestTemplateFactory.INSTANCE.getRestTemplate(this.mdsConfig, this.sessionHandler);
        }
        return this.restTemplate;
    }

    private <T> T invokeWithRetries(final Callable<T> apiCall) throws MdsApiConnectionException {
        MdsApiConnectionException connectionError = null;
        for (int i = 1; i <= MAX_RETRY_ATTEMPTS; i++) {
            try {
                return apiCall.call();
            } catch (Exception exc) {
                if (i < MAX_RETRY_ATTEMPTS) {
                    LOGGER.warn("Failed to communicate with MDS-API. Retrying...");
                } else {
                    LOGGER.error("Failed to communicate with MDS-API (module={}): {}", this.moduleName, exc.toString());
                    connectionError = new MdsApiConnectionException("Communication failed", findRootCause(exc));
                }
            }
        }
        throw Objects.requireNonNull(connectionError);
    }
}
