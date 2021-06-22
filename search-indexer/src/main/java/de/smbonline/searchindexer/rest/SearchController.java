package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
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

import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.*;
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
            final @PathVariable("id") Long objectId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang) {
        SearchObject object = this.service.get(objectId, lang);
        return object == null ? ResponseEntity.notFound().build() : handleDataResponse(object.getAttributes());
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> search(final @RequestParam Map<String, String> requestParams) {
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);
        Search search = Search.Companion.fromQueryParams(requestParams);
        Data result = this.service.search(search, language);
        return handleDataResponse(result);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> search(
            final @RequestParam Map<String, String> requestParams,
            final @RequestBody Data request) {
        String language = requestParams.getOrDefault(LANGUAGE_PARAMETER, DEFAULT_LANGUAGE);
        Search search = Search.Companion.fromQueryParams(requestParams);
        search = Search.Companion.merge(search, request);
        Data result = this.service.search(search, language);
        return handleDataResponse(result);
    }

    @GetMapping(path = "suggestions", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getSuggestions(
            final @RequestParam(value = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String language,
            final @RequestParam(value = LIMIT_PARAMETER, defaultValue = "15") int limit,
            final @RequestParam(SEARCHQUERY_PARAMETER) String searchTerm) {
        SearchSuggest suggestion = SearchSuggest.Companion.fromSearchTerm(searchTerm);
        suggestion.setLimit(limit);
        Data result = this.service.suggest(suggestion, language);
        return handleDataResponse(result);
    }
}
