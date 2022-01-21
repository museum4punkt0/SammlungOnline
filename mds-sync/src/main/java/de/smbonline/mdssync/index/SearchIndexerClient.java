package de.smbonline.mdssync.index;

import de.smbonline.mdssync.rest.Any;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Collections;

public class SearchIndexerClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchIndexerClient.class);

    private final RestTemplate api;

    public SearchIndexerClient(final SearchIndexerConfig config) {
        this.api = initRestTemplate(config);
    }

    private static RestTemplate initRestTemplate(final SearchIndexerConfig config) {
        return new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(60))
                .rootUri(config.getBaseUrl())
                .build();
    }

    public void notifyUpdated(final Long objectId) {
        ResponseEntity<Any> response = this.api.postForEntity("/", new Any().setAttribute("id", objectId), Any.class);
        LOGGER.info("Update {}: {}", objectId, response.getStatusCode().getReasonPhrase());
    }

    public void notifyDeleted(final Long objectId) {
        ResponseEntity<Any> response = this.api.exchange("/{id}", HttpMethod.DELETE, null, Any.class, Collections.singletonMap("id", objectId));
        LOGGER.info("Delete {}: {}", objectId, response.getStatusCode().getReasonPhrase());
    }
}
