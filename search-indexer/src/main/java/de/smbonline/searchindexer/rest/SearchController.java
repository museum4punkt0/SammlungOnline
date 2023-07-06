package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.api.ElasticSearchAPI;
import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.Format;
import de.smbonline.searchindexer.dto.Projection;
import de.smbonline.searchindexer.dto.Search;
import de.smbonline.searchindexer.dto.SearchObject;
import de.smbonline.searchindexer.dto.SearchSuggest;
import de.smbonline.searchindexer.service.ElasticSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.dto.Format.*;
import static de.smbonline.searchindexer.dto.Projection.*;
import static de.smbonline.searchindexer.rest.Params.*;
import static de.smbonline.searchindexer.rest.Requests.*;
import static de.smbonline.searchindexer.rest.Responses.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("search")
public class SearchController {

    private final ElasticSearchService service;

    @Autowired
    public SearchController(final ElasticSearchService service) {
        this.service = service;
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getObject(
            final @PathVariable("id") String objectId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = PROJECTION_PARAMETER, defaultValue = DEFAULT_PROJECTION_NAME) String projection) {
        long id = requireNumericPathElement(objectId);
        SearchObject object = this.service.get(id, lang);
        if (object == null) {
            return ResponseEntity.notFound().build();
        }
        return handleDataResponse(object, Projection.getOrDefault(projection));
    }

    @GetMapping(path = "{id}/export", produces = APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<StreamingResponseBody> getFormattedObject(
            final @PathVariable("id") String objectId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = FORMAT_PARAMETER, defaultValue = DEFAULT_FORMAT_NAME) String format) {
        long id = requireNumericPathElement(objectId);
        SearchObject object = this.service.get(id, lang);
        return object == null
                ? ResponseEntity.notFound().build()
                : handleFilestreamResponse(object, Format.getOrDefault(format));
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> search(final @RequestParam Map<String, String> requestParams) {
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);
        String projection = requestParams.get(PROJECTION_PARAMETER);
        Search search = Search.Companion.fromQueryParams(requestParams);
        return handleSearch(search, language, Projection.getOrDefault(projection));
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> search(
            final @RequestParam Map<String, String> requestParams,
            final @RequestBody Data request) {
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);
        String projection = requestParams.get(PROJECTION_PARAMETER);
        Search search = Search.Companion.fromQueryParams(requestParams);
        search = Search.Companion.merge(search, request);
        return handleSearch(search, language, Projection.getOrDefault(projection));
    }

    private ResponseEntity<Data> handleSearch(final Search search, final String language, final Projection projection) {
        Data result = this.service.search(search, language);
        return handleDataResponse(result, projection);
    }

    @GetMapping(path = "suggestions", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getSuggestions(
            final @RequestParam(value = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String language,
            final @RequestParam(value = LIMIT_PARAMETER, defaultValue = "15") int limit,
            final @RequestParam(SEARCHQUERY_PARAMETER) String searchTerm) {
        SearchSuggest suggestion = SearchSuggest.Companion.fromSearchTerm(searchTerm);
        suggestion.setLimit(limit);
        Data result = this.service.suggest(suggestion, language);
        return handleDataResponse(result, Projection.FLAT);
    }

    @PostMapping(path = "suggestions", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getSuggestions(
            final @RequestParam Map<String, String> requestParams,
            final @RequestBody Data request) {
        String searchTerm = requestParams.getOrDefault(SEARCHQUERY_PARAMETER, "");
        int limit = Integer.parseInt(requestParams.getOrDefault(LIMIT_PARAMETER, "15"));
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);

        SearchSuggest suggestion = SearchSuggest.Companion.fromSearchTerm(searchTerm);
        suggestion.setLimit(limit);
        suggestion.setAdvancedSearch(Search.Companion.fromPayload(request).getAdvancedSearch());
        Data result = this.service.suggest(suggestion, language);

        return handleDataResponse(result, Projection.FLAT);
    }

    @GetMapping(path = "facets", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getFacets(final @RequestParam Map<String, String> requestParams) {
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);
        Search search = Search.Companion.fromQueryParams(requestParams);
        Data result = this.service.fetchFacets(search, language);
        return handleDataResponse(result);
    }

    @PostMapping(path = "facets", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getFacets(
            final @RequestParam Map<String, String> requestParams,
            final @RequestBody Data request) {
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);
        Search search = Search.Companion.fromQueryParams(requestParams);
        search = Search.Companion.merge(search, request);
        Data result = this.service.fetchFacets(search, language);
        return handleDataResponse(result);
    }
}
