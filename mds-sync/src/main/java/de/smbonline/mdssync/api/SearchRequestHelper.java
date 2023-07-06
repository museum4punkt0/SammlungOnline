package de.smbonline.mdssync.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.jaxb.search.request.And;
import de.smbonline.mdssync.jaxb.search.request.Application;
import de.smbonline.mdssync.jaxb.search.request.BetweenIncl;
import de.smbonline.mdssync.jaxb.search.request.Direction;
import de.smbonline.mdssync.jaxb.search.request.EqualsField;
import de.smbonline.mdssync.jaxb.search.request.ExpertSearchExpression;
import de.smbonline.mdssync.jaxb.search.request.IsNotNull;
import de.smbonline.mdssync.jaxb.search.request.Module;
import de.smbonline.mdssync.jaxb.search.request.Modules;
import de.smbonline.mdssync.jaxb.search.request.Not;
import de.smbonline.mdssync.jaxb.search.request.NotEqualsField;
import de.smbonline.mdssync.jaxb.search.request.ObjectFactory;
import de.smbonline.mdssync.jaxb.search.request.Or;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.request.Select;
import de.smbonline.mdssync.jaxb.search.request.SelectField;
import de.smbonline.mdssync.jaxb.search.request.Sort;
import de.smbonline.mdssync.jaxb.search.request.SortField;
import de.smbonline.mdssync.jaxb.search.request.TrashBinHandling;
import de.smbonline.mdssync.rest.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Validations.*;

public class SearchRequestHelper {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchRequestHelper.class);
    private static final ObjectFactory REQUEST_FACTORY = new ObjectFactory();
    private static final Data CONFIG = loadRequestConfig();

    private static Data loadRequestConfig() {
        try (InputStream stream = SearchRequestHelper.class.getResourceAsStream("/module-search-requests.json")) {
            return new ObjectMapper().readValue(stream, Data.class);
        } catch (IOException exc) {
            ErrorHandling.capture(exc, "Can't load module-search-requests.json");
            LOGGER.warn("!!! Absence of module-search-requests.json can have massive performance impact on the API requests !!!");
            return new Data();
        }
    }

    private final MdsApiConfig apiConfig;
    private final String module;

    public SearchRequestHelper(final MdsApiConfig apiConfig, final String moduleName) {
        this.apiConfig = apiConfig;
        this.module = moduleName;
    }

    /**
     * Convenience method to build a simple search payload with default pagination and no filters.
     *
     * @return search payload
     */
    public Search buildSearchPayload() {
        return buildSearchPayload(0, 20, null, null, null);
    }

    /**
     * Convenience method to build a search payload for a set of ids.
     *
     * @param mdsIds ids to resolve
     * @return search payload
     */
    public Search buildSearchPayload(final Long... mdsIds) {
        Search search = REQUEST_FACTORY.createSearch();

        // sorting
        Sort sort = buildSortBy(FIELD_ID);
        search.setSort(sort);

        // select fields
        Select select = buildSelect(this.module);
        search.setSelect(select);

        // filters
        And expression = this.apiConfig.isApprovalFilterEnabled() ? buildSMBFilter(this.module) : REQUEST_FACTORY.createAnd();
        expression.getAndOrOrOrNot().add(buildIncludeFilter(mdsIds));
        ExpertSearchExpression expert = REQUEST_FACTORY.createExpertSearchExpression();
        expert.setAnd(expression);
        search.setExpert(expert);
        search.setTrashBin(TrashBinHandling.INCLUDED);

        // pagination
        search.setOffset((long) 0);
        search.setLimit((long) mdsIds.length);

        // only load attachments when we are explicitly syncing the Multimedia module
        search.setLoadAttachment(this.apiConfig.isAutoLoadAttachments() && MODULE_MULTIMEDIA.equals(this.module));

        return search;
    }

    /**
     * Convenience method to build frequently used search payload.
     *
     * @param offset           pagination offset, min 0
     * @param limit            pagination limit
     * @param lastModifiedFrom start of time filter for last-modified
     * @param lastModifiedTo   end of time filter for last-modified
     * @param sorting          sorting instructions, field name with optional leading "+" (ASC) or "-" (DESC)
     * @param filters          additional filters that should be applied
     * @return search payload
     */
    public Search buildSearchPayload(
            final int offset,
            final int limit,
            final @Nullable OffsetDateTime lastModifiedFrom,
            final @Nullable OffsetDateTime lastModifiedTo,
            final @Nullable String sorting,
            final @Nullable Object... filters) {

        Search search = REQUEST_FACTORY.createSearch();

        // sorting
        if (sorting != null) {
            Sort sort = buildSortBy(sorting);
            search.setSort(sort);
        }

        // selections
        Select select = buildSelect(this.module);
        search.setSelect(select);

        // filtering
        And expression = this.apiConfig.isApprovalFilterEnabled() ? buildSMBFilter(this.module) : REQUEST_FACTORY.createAnd();
        if (lastModifiedFrom != null || lastModifiedTo != null) {
            BetweenIncl between = buildModifiedRangeFilter(lastModifiedFrom, lastModifiedTo);
            expression.getAndOrOrOrNot().add(between);
        }
        if (isVarArgsDefined(filters)) {
            Arrays.stream(filters).forEach(expression.getAndOrOrOrNot()::add);
        }
        ExpertSearchExpression expert = REQUEST_FACTORY.createExpertSearchExpression();
        expert.setAnd(expression);
        search.setExpert(expert);

        // pagination
        search.setOffset((long) offset);
        search.setLimit((long) limit);

        // only load attachments when we are explicitly syncing the Multimedia module
        search.setLoadAttachment(this.apiConfig.isAutoLoadAttachments() && MODULE_MULTIMEDIA.equals(this.module));

        return search;
    }

    /**
     * Build a payload to search for items that are not approved for publishing anymore. This is basically the
     * inversion of the default approved-filter that is applied for all searches.
     *
     * @return payload to search for unapproved items - items where the approved flag has been revoked
     */
    public Search buildSearchNotApprovedPayload() {
        Search search = REQUEST_FACTORY.createSearch();

        // select id
        Select select = REQUEST_FACTORY.createSelect();
        select.getField().add(buildSelectField(FIELD_ID));
        search.setSelect(select);

        // sort by id
        Sort sort = buildSortBy(FIELD_ID);
        search.setSort(sort);

        // add inverted approval filters
        Map<String, String> approvedFilters = getSMBFilterValues(this.module);
        Object[] notApprovedFilters = approvedFilters.entrySet().stream().map(entry -> {
            if (entry.getKey().endsWith(".TypeVoc")) {
                EqualsField equal = REQUEST_FACTORY.createEqualsField();
                equal.setFieldPath(entry.getKey());
                equal.setOperand(entry.getValue());
                return new Object[]{equal};
            } else {
                NotEqualsField notEqual = REQUEST_FACTORY.createNotEqualsField();
                notEqual.setFieldPath(entry.getKey());
                notEqual.setOperand(entry.getValue());
                IsNotNull notNull = REQUEST_FACTORY.createIsNotNull();
                notNull.setFieldPath(entry.getKey());
                return new Object[]{notEqual, notNull};
            }
        }).flatMap(Stream::of).toArray();
        ExpertSearchExpression expert = REQUEST_FACTORY.createExpertSearchExpression();
        expert.setAnd(and(notApprovedFilters));
        search.setExpert(expert);

        // done
        return search;
    }

    /**
     * Build a payload to search for deleted items.
     *
     * @return payload to search for deleted items (items in trash bin)
     */
    public Search buildSearchDeletedPayload() {
        Select select = REQUEST_FACTORY.createSelect();
        select.getField().add(buildSelectField(FIELD_ID));
        select.getField().add(buildSelectField(FIELD_ORG_UNIT)); // required for SyncExecuter to check if object is deleted
        select.getField().add(buildSelectField(FIELD_LAST_MODIFIED)); // required for SyncExecuter to check if synced object is up-to-date

        Search search = REQUEST_FACTORY.createSearch();
        search.setTrashBin(TrashBinHandling.EXCLUSIVE);
        search.setSelect(select);
        search.setSort(buildSortBy(FIELD_ID));
        return search;
    }

    /**
     * Builds a date-time filter for last-modified field from given values. Arguments may be null,
     * then "from" defaults to epoch time and "to" defaults to current time.
     *
     * @param lastModifiedFrom from range or null
     * @param lastModifiedTo   to range or null
     * @return search filter
     */
    public static BetweenIncl buildModifiedRangeFilter(
            final @Nullable OffsetDateTime lastModifiedFrom,
            final @Nullable OffsetDateTime lastModifiedTo) {

        OffsetDateTime from = Optional.ofNullable(lastModifiedFrom).orElse(OffsetDateTime.ofInstant(Instant.EPOCH, MDS_DATE_ZONE));
        OffsetDateTime to = Optional.ofNullable(lastModifiedTo).orElse(OffsetDateTime.now(MDS_DATE_ZONE));

        BetweenIncl between = REQUEST_FACTORY.createBetweenIncl();
        between.setFieldPath(FIELD_LAST_MODIFIED);
        between.setOperand1(from.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        between.setOperand2(to.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        return between;
    }

    public static BetweenIncl buildIdRangeFilter(final Long startId, final Long endId) {
        BetweenIncl between = REQUEST_FACTORY.createBetweenIncl();
        between.setFieldPath(FIELD_ID);
        between.setOperand1(startId.toString());
        between.setOperand2(endId.toString());
        return between;
    }

    /**
     * Method to build an search filter for a set of ids.
     *
     * @param mdsIds ids to resolve
     * @return search payload
     */
    public static Or buildIncludeFilter(final Long... mdsIds) {
        return combine(mdsIds);
    }

    /**
     * Method to build an inverted search filter for ids.
     *
     * @param mdsIds ids to <b>not</b> resolve
     * @return search filter
     */
    public static Not buildExcludeFilter(final Long... mdsIds) {
        Not not = REQUEST_FACTORY.createNot();
        not.setOr(combine(mdsIds));
        return not;
    }

    /**
     * Creates an OR expression object that contains an {@link EqualsField} expression object for every id given.
     *
     * @param mdsIds item ids from MDS
     * @return OR expression combining all given ids
     */
    private static Or combine(final Long... mdsIds) {
        return or(Arrays.stream(mdsIds).map(id -> {
            EqualsField equal = REQUEST_FACTORY.createEqualsField();
            equal.setFieldPath(FIELD_ID);
            equal.setOperand(String.valueOf(id));
            return equal;
        }).toArray());
    }

    /**
     * Create a default filter that should always be applied when searching items in MDS.
     * It ensures we are allowed to use the returned data. The filter differs depending on the module to search in.
     *
     * @param module module to search in
     * @return search filter
     */
    private static And buildSMBFilter(final String module) {
        Map<String, String> filters = getSMBFilterValues(module);
        EqualsField[] fields = filters.entrySet().stream().map(entry -> {
            EqualsField equal = REQUEST_FACTORY.createEqualsField();
            equal.setFieldPath(entry.getKey());
            equal.setOperand(entry.getValue());
            return equal;
        }).toArray(EqualsField[]::new);
        return fields.length == 0 ? REQUEST_FACTORY.createAnd() : and((Object[]) fields);
    }

    public static Sort buildSortBy(final String sorting) {
        String fieldPath = sorting.charAt(0) == '+' || sorting.charAt(0) == '-' ? sorting.substring(1) : sorting;
        Direction direction = sorting.charAt(0) == '-' ? Direction.DESCENDING : Direction.ASCENDING;

        SortField field = REQUEST_FACTORY.createSortField();
        field.setFieldPath(fieldPath);
        field.setDirection(direction);
        Sort sort = REQUEST_FACTORY.createSort();
        sort.getField().add(field);
        return sort;
    }

    private static @Nullable Select buildSelect(final String module) {
        Data moduleConfig = CONFIG.getTypedAttribute(module);
        if (moduleConfig == null) {
            return null;
        }
        Collection<String> fieldPaths = moduleConfig.getTypedAttribute("select");
        if (fieldPaths == null) {
            return null;
        }
        Collection<SelectField> fields = fieldPaths.stream().map(SearchRequestHelper::buildSelectField).toList();
        Select select = REQUEST_FACTORY.createSelect();
        select.getField().addAll(fields);
        return select;
    }

    public static Select buildSelectFields(final String... fields) {
        Select select = REQUEST_FACTORY.createSelect();
        Arrays.stream(fields).map(SearchRequestHelper::buildSelectField).forEach(
                f -> select.getField().add(f)
        );
        return select;
    }

    public static SelectField buildSelectField(final String path) {
        SelectField field = REQUEST_FACTORY.createSelectField();
        field.setFieldPath(path);
        return field;
    }

    /**
     * Creates an AND expression object that combines all given expressions. See {@link And} for allowed types.
     *
     * @param expressions expressions
     * @return combined AND expression
     */
    public static And and(final Object... expressions) {
        And and = REQUEST_FACTORY.createAnd();
        and.getAndOrOrOrNot().addAll(Arrays.asList(expressions));
        return and;
    }

    /**
     * Creates an OR expression object that combines all given expressions. See {@link Or} for allowed types.
     *
     * @param expressions expressions
     * @return combined OR expression
     */
    public static Or or(final Object... expressions) {
        Or or = REQUEST_FACTORY.createOr();
        or.getAndOrOrOrNot().addAll(Arrays.asList(expressions));
        return or;
    }

    public static Application createEnvelope(final String moduleName, final Search search) {

        // Wrap the search into request payload:
        //   <application>
        //     <modules>
        //       <module>
        //         <search>
        //       </module>
        //     </modules>
        //   </application>

        Module module = REQUEST_FACTORY.createModule();
        module.setName(moduleName);
        module.setSearch(search);
        if (search.getExpert() != null) {
            search.getExpert().setModule(moduleName);
        }

        Modules modules = REQUEST_FACTORY.createModules();
        modules.getModule().add(module);

        Application application = REQUEST_FACTORY.createApplication();
        application.setModules(modules);
        return application;
    }
}
