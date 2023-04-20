package de.smbonline.sitemap.service;

import de.smbonline.sitemap.config.SearchConfig;
import de.smbonline.sitemap.model.SearchResult;
import de.smbonline.sitemap.model.SearchResultResponse;
import io.sentry.Sentry;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.client.RootUriTemplateHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ResearchDataService implements DataService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ResearchDataService.class);
    private static final String DETAIL_PATH = "detail/";

    private final RestTemplate searchClient;

    @Autowired
    public ResearchDataService(final SearchConfig config) {
        this.searchClient = initRestTemplate(config);
    }

    private RestTemplate initRestTemplate(final SearchConfig config) {
        RestTemplate client = new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(10))
                .rootUri(config.getEndpoint())
                .build();
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Initialized Search API Client with URI {}",
                    ((RootUriTemplateHandler) client.getUriTemplateHandler()).getRootUri());
        }
        return client;
    }

    @Override
    public List<String> getPathSegments() {
        List<String> segments = new ArrayList<>();

        int chunkSize = 250;
        Long nextChunkStartId = 0L;

        while (true) {

            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("Fetching next chunk [{}..*].", nextChunkStartId);
            }

            SearchResultResponse chunk = fetchChunk(nextChunkStartId, chunkSize);
            List<SearchResult> objects = chunk.getObjects();
            if (!objects.isEmpty()) {
                SearchResult first = objects.get(0);
                SearchResult last = objects.get(objects.size() - 1);

                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug("Fetched chunk [{}..{}] ({} items).", first.getId(), last.getId(), objects.size());
                }

                objects.stream().map(obj -> {
                    Long id = obj.getId();
                    String title = extractBestEffortTitleGuess(obj);
                    return buildPathSegments(id, title);
                }).forEach(segments::add);
                nextChunkStartId = last.getId() + 1;
            }

            if (objects.size() < chunkSize) {
                break;
            }
        }
        return segments;
    }

    private SearchResultResponse fetchChunk(final Long firstId, final int amount) {
        try {
            return Objects.requireNonNull(this.searchClient.getForObject(
                    "/?q=id:[{firstId} TO *]&sort=id&limit={limit}!&projection=flat",
                    SearchResultResponse.class,
                    Map.of("firstId", firstId, "limit", amount)));
        } catch (Exception exc) {
            LOGGER.error(exc.toString());
            Sentry.captureException(exc);
            return new SearchResultResponse();
        }
    }

    private String extractBestEffortTitleGuess(final SearchResult result) {
        // try titles[0]
        List<String> titles = result.getTitles();
        if (!titles.isEmpty()) {
            return titles.get(0);
        }
        // try technicalTerm
        String technicalTerm = result.getTechnicalTerm();
        if (StringUtils.isNotBlank(technicalTerm)) {
            return technicalTerm;
        }
        // try identNumber
        String identNumber = result.getIdentNumber();
        if (StringUtils.isNotBlank(identNumber)) {
            return identNumber;
        }
        return "Ohne Titel";
    }

    private String buildPathSegments(final Long id, final String title) {
        return DETAIL_PATH + id + '/' + DataService.toSlug(title);
    }
}
