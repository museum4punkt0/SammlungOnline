package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.SearchIndexer;
import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.service.ElasticSearchService;
import de.smbonline.searchindexer.service.GraphQlDataResolver;
import io.sentry.Sentry;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Responses.handleDataResponse;
import static java.util.Objects.requireNonNull;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("triggers")
public class EventController extends SearchIndexer {

    @Autowired
    public EventController(
            final ElasticSearchService elasticSearchService,
            final GraphQlDataResolver graphQlService) {
        super(elasticSearchService, graphQlService);
    }

    @GetMapping
    public String check() {
        Sentry.captureMessage("EventController invoked");
        return "Hello from EventController!";
    }

    @PostMapping(value = "index-event", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> indexTrigger(final @RequestBody Data event) {
        IndexData data = extractIndexData(event);
        LOGGER.info("Index event received for object: {}", data.id);
        LOGGER.debug("Indexing with extracted info: {}", data);
        Data response = handlePushId(data.id, data.lang, data.force, data.fields);
        return handleDataResponse(response);
    }

    @PostMapping(value = "delete-event", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> deleteTrigger(final @RequestBody Data event) {
        IndexData data = extractIndexData(event);
        LOGGER.info("Delete event received for object: {}", data.id);
        LOGGER.debug("Indexing with extracted info: {}", data);
        Data response = this.elasticSearch.delete(data.id, data.lang);
        return handleDataResponse(response);
    }

    private static IndexData extractIndexData(final Data event) {
        IndexData data = new IndexData();
        data.id = extractId(event);
        data.lang = extractLanguage(event);
        data.fields = extractField(event);
        data.force = true;
        return data;
    }

    private static long extractId(final Data event) {
        String operation = event.getNestedTypedAttribute("event.op");
        String pathTemplate = "DELETE".equals(operation) ? "event.data.old.{id-attribute}" : "event.data.new.{id-attribute}";
        String dbTable = event.getNestedTypedAttribute("table.name");
        String path = pathTemplate.replace("{id-attribute}", "objects".equals(dbTable) ? "id" : "object_id");
        Number id = event.getNestedTypedAttribute(path);
        return requireNonNull(id).longValue();
    }

    private static @Nullable String[] extractField(final Data event) {
        String operation = event.getNestedTypedAttribute("event.op");
        String dbTable = event.getNestedTypedAttribute("table.name");
        if ("DELETE".equals(operation) || "objects".equals(dbTable) || "attribute_translations".equals(dbTable)) {
            return null; // all fields
        }
        String field = switch (requireNonNull(dbTable)) {
            case "assortments_objects" -> ASSORTMENTS_ATTRIBUTE;
            case "attachments" -> HAS_ATTACHMENTS_ATTRIBUTE;
            case "cultural_references" -> CULTURAL_REFERENCES_ATTRIBUTE;
            case "exhibitions_objects" -> EXHIBITIONS_ATTRIBUTE;
            case "geographical_references" -> GEOGRAPHICAL_REFERENCES_ATTRIBUTE;
            case "highlights" -> IS_HIGHLIGHT_ATTRIBUTE;
            case "material_references" -> MATERIAL_AND_TECHNIQUE_ATTRIBUTE;
            case "persons_objects" -> INVOLVED_PARTIES_ATTRIBUTE;
            default -> "*"; // all fields
        };
        return "*".equals(field) ? null : new String[]{field};
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

    private static class IndexData {
        private long id;
        private String[] fields;
        private String lang = DEFAULT_LANGUAGE;
        private boolean force = true;

        @Override
        public String toString() {
            return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                    .append("id", this.id)
                    .append("fields", this.fields == null ? "*" : Arrays.toString(this.fields))
                    .append("force", this.force)
                    .append("language", this.lang)
                    .build();
        }
    }
}
