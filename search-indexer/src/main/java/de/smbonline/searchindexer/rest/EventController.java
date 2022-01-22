package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.SearchObject;
import de.smbonline.searchindexer.service.ElasticSearchService;
import de.smbonline.searchindexer.service.GraphQlService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Responses.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("triggers")
public class EventController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);

    private final ElasticSearchService elasticSearch;
    private final GraphQlService graphQl;

    @Autowired
    public EventController(
            final ElasticSearchService elasticSearchService,
            final GraphQlService graphQlService) {
        this.elasticSearch = elasticSearchService;
        this.graphQl = graphQlService;
    }

    @GetMapping
    public String check() {
        return "Hello from EventController!";
    }

    @PostMapping(value = "index-event", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> indexTrigger(final @RequestBody Data event) {
        LOGGER.info("Index event received: {}", event);

        long id = extractId(event);
        String lang = extractLanguage(event);
        SearchObject objectData = this.graphQl.resolveObjectById(id, lang);
        if (objectData == null) {
            return handleDataResponse(new Data().setAttribute("noop", "no such object"));
        }
        // make sure old fields are removed - a push will only upsert but not delete fields
        this.elasticSearch.delete(id, lang);
        Data response = this.elasticSearch.push(objectData);
        return handleDataResponse(response);
    }

    @PostMapping(value = "delete-event", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> deleteTrigger(final @RequestBody Data event) {
        LOGGER.info("Delete event received: {}", event);
        Data response = this.elasticSearch.delete(extractId(event), extractLanguage(event));
        return handleDataResponse(response);
    }

    private static long extractId(final Data event) {
        Number id = event.getNestedTypedAttribute("event.data.new.id");
        if (id == null) {
            id = event.getNestedTypedAttribute("event.data.old.id");
        }
        return Objects.requireNonNull(id).longValue();
    }

    private static String extractLanguage(final Data event) {
        Data languageCandidates = event.getNestedTypedAttribute("event.session_variables");
        if (languageCandidates != null) {
            for (Map.Entry<String, ?> attr : languageCandidates.getAttributes().entrySet()) {
                if (attr.getKey().equalsIgnoreCase("x-hasura-lang")) {
                    return (String) attr.getValue();
                }
            }
        }
        return DEFAULT_LANGUAGE;
    }
}
