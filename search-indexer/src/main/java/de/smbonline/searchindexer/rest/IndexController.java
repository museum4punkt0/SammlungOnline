package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.SearchObject;
import de.smbonline.searchindexer.service.ElasticSearchService;
import de.smbonline.searchindexer.service.GraphQlService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.stream.LongStream;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.dto.JsonAttr.*;
import static de.smbonline.searchindexer.rest.Params.*;
import static de.smbonline.searchindexer.rest.Responses.*;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping(path = "index")
public class IndexController {
    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);

    private final ElasticSearchService elasticSearch;
    private final GraphQlService graphQl;

    @Autowired
    public IndexController(
            final ElasticSearchService elasticSearchService,
            final GraphQlService graphQlService) {
        this.elasticSearch = elasticSearchService;
        this.graphQl = graphQlService;
    }

    @GetMapping
    public String check() {
        return "Hello from IndexController!";
    }

    @PostMapping(path = "/force-full-reindex", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> fullReindex(
            final @RequestParam(name = "startId", defaultValue = "1") Long startId,
            final @RequestParam(name = "endId", defaultValue = "999999999999999") Long endId,
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
                Number id = Objects.requireNonNull(request.getTypedAttribute(ATTR_ID));
                LOGGER.info("Received search-index update request for {}", id);
                response = handlePushId(id.longValue(), lang, force);
            } else if (request.hasAttribute(ATTR_IDS)) {
                Collection<?> payloadIds = Objects.requireNonNull(request.getTypedAttribute(ATTR_IDS));
                Long[] ids = collectIdsAsLongArray(payloadIds);
                LOGGER.info("Received search-index update request for {} ids", ids.length);
                response = handlePushIds(ids, lang, force);
            }
        } catch (Exception exc) {
            LOGGER.error("Failed: {}", exc.toString());
            if (LOGGER.isDebugEnabled()) {
                LOGGER.error("", exc);
            }
            response = new Data().setAttribute(ATTR_ERROR, exc.toString());
        }
        return handleDataResponse(response);
    }

    private Data handlePushIds(final Long[] ids, final String lang, final boolean force) {
        Data collectedResponse = new Data();
        Arrays.stream(ids).forEach(id -> {
            Data partialResponse = handlePushId(id, lang, force);
            collectedResponse.setAttribute("" + id, partialResponse);
        });
        return collectedResponse;
    }

    private Data handlePushId(final Long id, final String lang, final boolean force) {
        Data result = null;

        LOGGER.debug("Updating search-index for {}", id);
        if (force) {
            // make sure old fields are removed - a push will only upsert but not delete fields
            result = this.elasticSearch.delete(id, lang);
        }
        SearchObject objectData = this.graphQl.resolveObjectById(id, lang);
        if (objectData == null && !force) {
            LOGGER.info("Skipped indexing of object {} - object not found.", id);
            result = new Data()
                    .setAttribute("" + id, "NOOP")
                    .setAttribute("message", "Object not found");
        }
        if (objectData != null) {
            result = this.elasticSearch.push(objectData);
        }
        LOGGER.info("Search-index updated for {} (Status: {})", id, result.getAttribute("" + id));

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
            return handleDataResponse(response);
        } catch (Exception exc) {
            return handleDataResponse(new Data().setAttribute(ATTR_ERROR, exc.toString()));
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
            return handleDataResponse(response);
        } catch (Exception exc) {
            return handleDataResponse(new Data().setAttribute(ATTR_ERROR, exc.toString()));
        }
    }

    private static SearchObject toSearchObject(final Data objectData, final String lang) {
        SearchObject searchObject = new SearchObject(extractId(objectData), lang);
        objectData.getAttributes().forEach((key, value)
                -> searchObject.getAttributes().setAttribute(key, value));
        return searchObject;
    }

    private static Long extractId(final Data objectData) {
        Object value = objectData.getAttribute(ATTR_ID);
        if (value instanceof Number) {
            return ((Number) value).longValue();
        }
        throw new HttpClientErrorException(BAD_REQUEST, (value == null)
                ? "missing " + ATTR_ID
                : ATTR_ID + " must be a number");
    }

    private static Long[] collectIdsAsLongArray(final Collection<?> payloadIds) {
        if ((payloadIds.iterator().next() instanceof Number)) {
            return payloadIds.stream().map(id -> ((Number) id).longValue()).toArray(Long[]::new);
        }
        Collection<Long> collected = payloadIds.stream()
                .collect(ArrayList::new, (list, str) -> {
                    String element = str.toString();
                    if (element.contains("..")) {
                        long start = Long.parseLong(element.substring(0, element.indexOf('.')));
                        long end = Long.parseLong(element.substring(element.lastIndexOf('.') + 1));
                        LongStream.rangeClosed(start, end).forEach(list::add);
                    } else {
                        list.add(Long.parseLong(element));
                    }
                }, ArrayList::addAll);
        return collected.toArray(Long[]::new);
    }
}
