package de.smbonline.mdssync.api;

import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustAllStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.xml.Jaxb2RootElementHttpMessageConverter;
import org.springframework.lang.Nullable;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import java.time.Duration;

/**
 * Singleton factory that creates API request templates for MDS communication.
 */
public enum RestTemplateFactory {

    INSTANCE;

    public RestTemplate getRestTemplate(final MdsApiConfig config) {
        return getRestTemplate(config, null);
    }

    public RestTemplate getRestTemplate(final MdsApiConfig config, final @Nullable MdsSessionHandler sessionHandler) {
        RestTemplateBuilder builder = new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofMinutes(8)) // resolving of certain module-items lasts way too long... (see Person 204)
                .rootUri(config.getBaseUrl())
                .basicAuthentication(config.getAuth().getUser(), config.getAuth().getPass())
                .messageConverters(new Jaxb2RootElementHttpMessageConverter());
        if (sessionHandler != null) {
            builder = builder.interceptors(sessionHandler);
        }
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
    private ClientHttpRequestFactory trustingRequestFactory() {
        try {
            SSLContext context = SSLContexts.custom().loadTrustMaterial(TrustAllStrategy.INSTANCE).build();
            SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(context, NoopHostnameVerifier.INSTANCE);
            HttpClient httpClient = HttpClients.custom().setSSLSocketFactory(socketFactory).build();
            return new HttpComponentsClientHttpRequestFactory(httpClient);
        } catch (Exception exc) {
            return new SimpleClientHttpRequestFactory();
        }
    }
}
