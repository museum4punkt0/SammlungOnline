package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.Projection;
import de.smbonline.searchindexer.dto.Search;
import de.smbonline.searchindexer.dto.SearchObject;
import de.smbonline.searchindexer.service.ElasticSearchService;
import de.smbonline.searchindexer.service.GraphQlDataResolver;
import de.smbonline.searchindexer.service.GraphQlService;
import io.sentry.Sentry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.stream.LongStream;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.dto.JsonAttr.*;
import static de.smbonline.searchindexer.rest.Params.*;
import static de.smbonline.searchindexer.rest.Responses.*;
import static de.smbonline.searchindexer.util.Validations.*;
import static java.util.Objects.*;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping(path = "index")
public class IndexController {
    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);

    private final ElasticSearchService elasticSearch;
    private final GraphQlService graphQl;
    private final GraphQlDataResolver dataResolver;

    @Autowired
    public IndexController(
            final ElasticSearchService elasticSearchService,
            final GraphQlService graphQlService,
            final GraphQlDataResolver dataResolver) {
        this.elasticSearch = elasticSearchService;
        this.graphQl = graphQlService;
        this.dataResolver = dataResolver;
    }

    @GetMapping
    public String check() {
        Sentry.captureMessage("IndexController invoked");
        return "Hello from IndexController!";
    }

    @GetMapping(path = "/listing", produces = TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getAllIds(
            final @RequestParam(name = STARTID_PARAMETER, defaultValue = "1") Long startId,
            final @RequestParam(name = ENDID_PARAMETER, defaultValue = "999999999999999") Long endId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = "sep", defaultValue = "\n") String separator) {

        Search search = Search.Companion.fromQueryParams(Map.of(
                SORT_PARAMETER, ID_ATTRIBUTE,
                OFFSET_PARAMETER, "0",
                LIMIT_PARAMETER, "500!" // shouldn't be too high, anything greater than 10000 results in error
        ));

        StringBuilder sb = new StringBuilder();
        long nextId = startId;
        int size, total;
        do {
            String query = String.format("%s:[%d TO %d]", ID_ATTRIBUTE, nextId, endId);
            search = Search.Companion.merge(search, new Data().setAttribute(SEARCHQUERY_PARAMETER, query));
            Data response = elasticSearch.search(search, lang);
            Data[] results = Objects.requireNonNull(response.<Collection<Data>>getTypedAttribute(ATTR_RESULTS)).toArray(Data[]::new);
            size = results.length;
            if (size == 0) {
                break;
            }
            total = Objects.requireNonNull(response.<Number>getTypedAttribute(ATTR_TOTAL)).intValue();
            nextId = Objects.requireNonNull(results[results.length - 1].<Number>getTypedAttribute(ID_ATTRIBUTE)).longValue() + 1;
            Arrays.stream(results).map(obj -> obj.getAttribute(ID_ATTRIBUTE)).forEachOrdered(id -> sb.append(id).append(separator));
        } while (total > size);

        return ResponseEntity.ok(sb.toString());
    }

    @PostMapping(path = "/force-full-reindex", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> fullReindex(
            final @RequestParam(name = STARTID_PARAMETER, defaultValue = "1") Long startId,
            final @RequestParam(name = ENDID_PARAMETER, defaultValue = "999999999999999") Long endId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang) {

        CompletableFuture.runAsync(() -> {
            int pageSize = 1000;
            long nextId = startId;
            while (true) {
                // we always start at index 0 and change the id-range instead of the paging info
                // this is for performance reasons (id check is better than high offsets)
                Long[] ids = this.graphQl.fetchObjectIds(nextId, endId, 0, pageSize);
                for (Long id : ids) {
                    handlePushId(id, lang, true);
                }
                if (ids.length < pageSize) {
                    break;
                }
                nextId = ids[ids.length - 1] + 1;
            }
        }).whenComplete((success, failure) -> {
            if (failure != null) {
                LOGGER.error("Reindex failed: ", failure);
            }
        });
        return ResponseEntity.accepted().body(new Data().setAttribute("message", "reindexing started"));
    }

    /**
     * Pass an object id or an array of object ids and let this service resolve all relevant attributes.
     *
     * @param request json with "id":number or ids:[number] or ids:["id..id"] attribute
     * @param force   true (default) if indexed object should be removed before update
     * @param lang    desired language code for indexing
     * @return http response
     */
    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> pushObjectsById(
            final @RequestBody Data request,
            final @RequestParam(name = FORCED_UPDATE_PARAMETER, defaultValue = "true") boolean force,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang) {

        Data response = new Data();
        try {
            if (request.hasAttribute(ATTR_ID)) {
                Number id = requireNonNull(request.getTypedAttribute(ATTR_ID));
                LOGGER.info("Received search-index update request for {}", id);
                if (request.hasAttribute(ATTR_FIELDS) && !"*".equals(request.getTypedAttribute(ATTR_FIELDS))) {
                    String[] fields = requireNonNull(request.<Collection<String>>getTypedAttribute(ATTR_FIELDS)).toArray(String[]::new);
                    response = handlePushId(id.longValue(), lang, force, fields);
                } else {
                    response = handlePushId(id.longValue(), lang, force);
                }
            } else if (request.hasAttribute(ATTR_IDS)) {
                Collection<?> payloadIds = requireNonNull(request.getTypedAttribute(ATTR_IDS));
                Long[] ids = collectIdsAsLongArray(payloadIds);
                LOGGER.info("Received search-index update request for {} ids", ids.length);
                if (request.hasAttribute(ATTR_FIELDS) && !"*".equals(request.getTypedAttribute(ATTR_FIELDS))) {
                    String[] fields = requireNonNull(request.<Collection<String>>getTypedAttribute(ATTR_FIELDS)).toArray(String[]::new);
                    response = handlePushIds(ids, lang, force, fields);
                } else {
                    response = handlePushIds(ids, lang, force);
                }
            }
        } catch (Exception exc) {
            Sentry.captureException(exc);
            LOGGER.error("Failed: {}", exc.toString());
            if (LOGGER.isDebugEnabled()) {
                LOGGER.error("", exc);
            }
            response = new Data().setAttribute(ATTR_ERROR, exc.toString());
        }
        return handleDataResponse(response, Projection.ID);
    }

    private Data handlePushIds(final Long[] ids, final String lang, final boolean force, @Nullable final String... fields) {
        Data collectedResponse = new Data();
        Arrays.stream(ids).forEach(id -> {
            String idAttr = "" + id;
            Data partialResponse = handlePushId(id, lang, force, fields);
            // for partial responses change {"id":"<status>"} to {"status":"<status>"} and then put the adjusted
            // partial response into the collected response {"id": {<partial>}, ...}
            String status = partialResponse.getTypedAttribute(idAttr);
            collectedResponse.setAttribute(idAttr, partialResponse.setAttribute(ATTR_STATUS, status).removeAttribute(idAttr));
        });
        return collectedResponse;
    }

    private Data handlePushId(final Long id, final String lang, final boolean force, @Nullable final String... fields) {

        String idAttr = "" + id;
        Data result = new Data().setAttribute(idAttr, "NOOP");
        boolean cleared = false;
        boolean partial = isVarArgsDefined(fields);

        LOGGER.debug("Updating search-index for {}", id);

        if (force && this.elasticSearch.exists(id, lang)) {
            // make sure old fields are removed - a push will only upsert but not delete fields
            if (partial) {
                Arrays.stream(fields).forEach(field -> this.elasticSearch.deleteField(id, lang, field));
                result.setAttribute(idAttr, "FIELDS_REMOVED").setAttribute(ATTR_FIELDS, fields);
                cleared = true;
            } else {
                result = this.elasticSearch.delete(id, lang);
                cleared = "DELETED".equals(result.getTypedAttribute(idAttr));
            }
        }

        SearchObject objectData = partial
                ? this.dataResolver.resolveObjectAttributes(id, lang, fields)
                : this.dataResolver.resolveObjectById(id, lang);
        if (objectData == null && !force) {
            LOGGER.info("Skipped indexing of object {} - object not found.", id);
            result.setAttribute("message", "Object not found");
        }
        if (objectData != null) {
            result = this.elasticSearch.push(objectData);
            if (cleared) {
                // deleted + recreated = updated
                result.setAttribute(idAttr, "UPDATED");
            }
        }
        LOGGER.info("Search-index updated for {} (Status: {})", id, result.getAttribute(idAttr));

        return result;
    }

    /**
     * Pass a full object with all attributes that should be indexed.
     *
     * @param fullObjectData object that should be indexed
     * @param force          true if indexed object should be removed before update (default: false)
     * @param lang           language for attribute translation values contained in the payload
     * @return http response
     */
    @PutMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> pushObject(
            final @RequestBody Data fullObjectData,
            final @RequestParam(name = FORCED_UPDATE_PARAMETER, defaultValue = "false") boolean force,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang) {

        try {
            Long id = extractId(fullObjectData);
            LOGGER.info("Received search-index update request for {}", id);
            if (force) {
                // make sure old fields are removed - a push will only upsert but not delete fields
                this.elasticSearch.delete(id, lang);
            }
            Data response = this.elasticSearch.push(toSearchObject(fullObjectData, lang));
            return handleDataResponse(response, Projection.ID);
        } catch (Exception exc) {
            Sentry.captureException(exc);
            return handleDataResponse(new Data().setAttribute(ATTR_ERROR, exc.toString()), Projection.DEFAULT_PROJECTION);
        }
    }

    /**
     * Pass an id of an object that should be removed from the index.
     *
     * @param objectId id of object that should be removed
     * @return http response
     */
    @DeleteMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> deleteObject(final @PathVariable("id") Long objectId) {
        try {
            LOGGER.info("Received search-index delete request for {}", objectId);
            Data response = this.elasticSearch.delete(objectId);
            return handleDataResponse(response, Projection.ID);
        } catch (Exception exc) {
            Sentry.captureException(exc);
            return handleDataResponse(new Data().setAttribute(ATTR_ERROR, exc.toString()), Projection.DEFAULT_PROJECTION);
        }
    }

    private static SearchObject toSearchObject(final Data objectData, final String lang) {
        SearchObject searchObject = new SearchObject(extractId(objectData), lang);
        objectData.getAttributes().forEach(searchObject::setAttribute);
        return searchObject;
    }

    private static Long extractId(final Data objectData) {
        Object value = objectData.getAttribute(ATTR_ID);
        if (value instanceof Number) {
            return ((Number) value).longValue();
        }
        throw new HttpClientErrorException(
                BAD_REQUEST, value == null ? "missing " + ATTR_ID : ATTR_ID + " must be a number");
    }

    private static Long[] collectIdsAsLongArray(final Collection<?> payloadIds) {
        Collection<Long> collected = payloadIds.stream()
                .collect(LinkedHashSet::new, (result, str) -> {
                    String element = str.toString();
                    if (element.contains("..")) {
                        long start = Long.parseLong(element.substring(0, element.indexOf('.')));
                        long end = Long.parseLong(element.substring(element.lastIndexOf('.') + 1));
                        LongStream.rangeClosed(start, end).forEach(result::add);
                    } else {
                        result.add(Long.parseLong(element));
                    }
                }, LinkedHashSet::addAll);
        return collected.toArray(Long[]::new);
    }
}
