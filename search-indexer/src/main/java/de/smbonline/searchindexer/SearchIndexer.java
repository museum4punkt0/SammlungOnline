package de.smbonline.searchindexer;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.SearchObject;
import de.smbonline.searchindexer.service.ElasticSearchService;
import de.smbonline.searchindexer.service.GraphQlDataResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.Arrays;

import static de.smbonline.searchindexer.dto.JsonAttr.ATTR_FIELDS;
import static de.smbonline.searchindexer.dto.JsonAttr.ATTR_STATUS;
import static de.smbonline.searchindexer.util.Validations.isVarArgsDefined;

public class SearchIndexer {

    protected final Logger LOGGER;
    protected final ElasticSearchService elasticSearch;
    protected final GraphQlDataResolver dataResolver;

    public SearchIndexer(
            final ElasticSearchService elasticSearchService,
            final GraphQlDataResolver dataResolver) {
        this.elasticSearch = elasticSearchService;
        this.dataResolver = dataResolver;
        LOGGER = LoggerFactory.getLogger(getClass());
    }

    public Data handlePushIds(final Long[] ids, final String lang, final boolean force, @Nullable final String... fields) {
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

    public Data handlePushId(final Long id, final String lang, final boolean force, @Nullable final String... fields) {

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
}
