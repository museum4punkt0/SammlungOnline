package de.smbonline.mdssync.search;

import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.log.LogExecutionTime;
import de.smbonline.mdssync.search.request.Search;
import de.smbonline.mdssync.search.response.Application;
import de.smbonline.mdssync.search.response.Attachment;
import de.smbonline.mdssync.search.response.Module;
import de.smbonline.mdssync.search.response.ModuleItem;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustAllStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.lang.Nullable;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.Callable;

/**
 * Client to execute a search in MDS using <b>1</b> given module.
 * Instantiate with module name and invoke {@link #search(Search, String)} to execute the request.
 */
public class MdsApiClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(MdsApiClient.class);
    private static final int MAX_RETRY_ATTEMPTS = 5;
    private static final String MODULE_NAME_PATH_VARIABLE = "moduleName";

    private static String sessionCookie;

    private RestTemplate restTemplate;
    private final MdsApiConfig mdsConfig;
    private final String moduleName;

    /**
     * @param config     MDS-API config info
     * @param moduleName Module in which to search
     */
    public MdsApiClient(final @NotNull MdsApiConfig config, final @NotBlank String moduleName) {
        this.moduleName = moduleName;
        this.mdsConfig = config;
    }

    /**
     * Fetches a particular module item by id.
     *
     * @param mdsId id
     * @param lang  optional language
     * @return found item or null
     */
    public @Nullable ModuleItem get(final String mdsId, final String lang) throws MdsApiConnectionException {
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
        checkCookieChanged(response);
        List<ModuleItem> results = Objects.requireNonNull(response.getBody()).getModules().getModule().get(0).getModuleItem();
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * Fetches the attachment of a particular module item by id.
     *
     * @param mdsId id
     * @return found attachment or null
     */
    public @Nullable Attachment getAttachment(final String mdsId) throws MdsApiConnectionException {
        ResponseEntity<Application> response = invokeWithRetries(() -> client().getForEntity(
                this.mdsConfig.getModulePathTemplate() + "/" + mdsId + "/attachment",
                Application.class,
                Collections.singletonMap(MODULE_NAME_PATH_VARIABLE, this.moduleName))
        );
        checkCookieChanged(response);
        List<ModuleItem> results = Objects.requireNonNull(response.getBody()).getModules().getModule().get(0).getModuleItem();
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
        checkCookieChanged(response);
        return Objects.requireNonNull(response.getBody()).getModules().getModule().get(0);
    }

    private static void checkCookieChanged(final ResponseEntity<Application> response) {
        if (response.getHeaders().containsKey(HttpHeaders.SET_COOKIE)) {
            sessionCookie = response.getHeaders().get(HttpHeaders.SET_COOKIE).get(0);
        }
    }

    /**
     * lazy-init of RestTemplate
     *
     * @return preconfigured RestTemplate
     */
    private synchronized RestTemplate client() {
        if (this.restTemplate == null) {
            this.restTemplate = initRestTemplate(this.mdsConfig);
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
                    connectionError = new MdsApiConnectionException("Communication failed", exc);
                }
            }
        }
        throw Objects.requireNonNull(connectionError);
    }

    private static RestTemplate initRestTemplate(final MdsApiConfig config) {
        RestTemplateBuilder builder = new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofSeconds(10))
                .setReadTimeout(Duration.ofSeconds(60))
                .rootUri(config.getBaseUrl())
                .interceptors((request, body, execution) -> {
                    if (sessionCookie != null) {
                        request.getHeaders().set(HttpHeaders.COOKIE, sessionCookie);
                    }
                    String auth = config.getAuth().getValue();
                    request.getHeaders().set(HttpHeaders.AUTHORIZATION, auth);
                    return execution.execute(request, body);
                })
                .messageConverters(new Jaxb2RootElementHttpMessageConverter());
        if (config.getBaseUrl().startsWith("https") && !config.isSslValidationEnabled()) {
            ClientHttpRequestFactory trustingRequestFactory = trustingRequestFactory();
            builder = builder.requestFactory(() -> trustingRequestFactory);
        }
        return builder.build();
    }

    /**
     * Factory to create SSL requests without certificate validation.
     * Introduced because MDS certificate is only valid for DNS but not for the IP we are using.
     *
     * @return request factory
     */
    private static ClientHttpRequestFactory trustingRequestFactory() {
        try {
            SSLContext context = SSLContexts.custom().loadTrustMaterial(TrustAllStrategy.INSTANCE).build();
            SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(context, NoopHostnameVerifier.INSTANCE);
            HttpClient httpclient = HttpClients.custom().setSSLSocketFactory(socketFactory).build();
            return new HttpComponentsClientHttpRequestFactory(httpclient);
        } catch (Exception exc) {
            return new SimpleClientHttpRequestFactory();
        }
    }
}
