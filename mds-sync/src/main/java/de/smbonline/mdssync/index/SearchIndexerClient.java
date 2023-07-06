package de.smbonline.mdssync.index;

import de.smbonline.mdssync.rest.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.time.Duration;
import java.util.Collections;
import java.util.Arrays;

import static de.smbonline.mdssync.util.Validations.*;

import java.util.Set;
import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@Component
public class SearchIndexerClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchIndexerClient.class);

    private RestTemplate api;
    private final SearchIndexerConfig config;

    @Autowired
    public SearchIndexerClient(final SearchIndexerConfig config) {
        this.config = config;
    }

    public SearchIndexerConfig getConfig() {
        return this.config;
    }

    private synchronized RestTemplate api() {
        if (this.api == null) {
            this.api = initRestTemplate(this.config);
        }
        return this.api;
    }

    private static RestTemplate initRestTemplate(final SearchIndexerConfig config) {
        return new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(90))
                .rootUri(config.getBaseUrl())
                .build();
    }

    public Set<Long> getIndexedObjectIds(final Long startId, final Long endId, final String language) {
        ResponseEntity<String> response = api().getForEntity(
                "/listing?lang={lang}&startId={from}&endId={to}&sep={sep}",
                String.class,
                Map.of("lang", language, "from", startId, "to", endId, "sep", ","));
        if (response.getBody() == null) {
            return Collections.emptySet();
        }
        return Arrays.stream(response.getBody().split(","))
                .map(Long::valueOf)
                .sorted()
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    // TODO: Make this a debounced queue. Multiple invocations with the same object-id - with same or different fields
    //    may occur during person or thesaurus sync. It's preferred to reindex the object only once in such cases.
    public void notifyUpdated(final Long objectId, final @Nullable String... fields) {
        Data payload = new Data()
                .setNonNullAttribute("id", objectId)
                .setNonNullAttribute("fields", isVarArgsDefined(fields) ? fields : "*");
        ResponseEntity<Data> response = api().postForEntity("/", payload, Data.class);
        LOGGER.info("Update {}: {}", objectId, response.getStatusCode().getReasonPhrase());
    }

    public void notifyDeleted(final Long objectId) {
        ResponseEntity<Data> response = api().exchange(
                "/{id}", HttpMethod.DELETE, null, Data.class, Collections.singletonMap("id", objectId));
        LOGGER.info("Delete {}: {}", objectId, response.getStatusCode().getReasonPhrase());
    }
}
