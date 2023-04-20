package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.AssortmentData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.AssortmentService;
import de.smbonline.mdssync.dto.AssortmentType;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.resolvers.AssortmentsResolver;
import de.smbonline.mdssync.exec.resolvers.ResolverContext;
import de.smbonline.mdssync.exec.resolvers.ResolverRegistry;
import de.smbonline.mdssync.exec.resolvers.ResolverResult;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.rest.Data;
import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class AssortmentsSyncRunner implements PartialSyncRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(AssortmentsSyncRunner.class);

    private final MdsApiConfig apiConfig;
    private final AssortmentService assortmentService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final MdsApiClientFactory clientFactory;
    private final ResolverRegistry registry;
    private final Data status;

    private MdsApiClient mdsClient;

    @Autowired
    public AssortmentsSyncRunner(
            final MdsApiConfig apiConfig,
            final MdsApiClientFactory clientFactory,
            final AssortmentService assortmentService,
            final DataQueue<WrapperDTO> dataQueue,
            final ResolverRegistry registry) {
        this.apiConfig = apiConfig;
        this.clientFactory = clientFactory;
        this.assortmentService = assortmentService;
        this.dataQueue = dataQueue;
        this.registry = registry;
        this.status = new Data()
                .setAttribute("instance", "ASR" + System.currentTimeMillis())
                .setAttribute(ATTR_STATUS, "not running");
    }

    /*
     * Lazy-init API client. Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected MdsApiClient mdsClient() {
        if (this.mdsClient == null) {
            this.mdsClient = this.clientFactory.getApiClient(MODULE_OBJECT_GROUPS);
        }
        return this.mdsClient;
    }

    private void updateResult(final @Nullable SyncResult result) {
        synchronized (this.status) {
            this.status.setAttribute(ATTR_RESULT, result == null ? null : result.toJson())
                    .setAttribute(ATTR_STATUS, result == null ? "aborted" : "done");
        }
    }

    private void updateStatus(final String value) {
        synchronized (this.status) {
            this.status.setAttribute(ATTR_STATUS, value);
        }
    }

    @Override
    public Data getStatusInfo() {
        synchronized (this.status) {
            return this.status;
        }
    }

    @Override
    public SyncResult sync(final Long... entityIds) {
        SyncResult result = null;
        try {

            updateStatus("running");

            List<String> keys = getAssortmentKeys(entityIds);
            if (keys.size() < entityIds.length) {
                LOGGER.warn("Can't sync all {} requested entities. Only {} are {} types.",
                        entityIds.length, keys.size(), AssortmentType.OBJECT_GROUP);
            }
            result = runSync(keys, true);
            // for each entity-id that we haven't found a group-id for, we add null to the skipped-array
            Long[] skipped = ArrayUtils.addAll(ArrayUtils.nullToEmpty(result.getSkippedIds()), new Long[keys.size() - entityIds.length]);
            result = new SyncResult(ArrayUtils.nullToEmpty(result.getSuccessfulIds()), ArrayUtils.nullToEmpty(result.getFailedIds()), skipped, result.getDuration());
            return result;

        } finally {
            updateResult(result);
        }
    }

    @Override
    public SyncResult sync() {
        SyncResult result = null;
        try {
            updateStatus("running");
            List<String> keys = getAssortmentKeys();
            result = runSync(keys, false);
            return result;
        } finally {
            updateResult(result);
        }
    }

    private SyncResult runSync(final List<String> keys, final boolean force) {

        OffsetDateTime start = OffsetDateTime.now(MDS_DATE_ZONE);
        List<Long> groupIds = keys.stream().map(AssortmentsSyncRunner::toGroupId).toList();

        if (!keys.isEmpty() && LOGGER.isDebugEnabled()) {
            String ids = groupIds.stream().map(String::valueOf).collect(Collectors.joining(","));
            LOGGER.debug("Assortments exist for the following groups: {}", ids);
        }

        try {

            SyncResult result;
            ResolverResult resolverResult = new ResolverResult();
            AssortmentsResolver resolver = this.registry.getResolver(MODULE_OBJECT_GROUPS);
            ResolverContext ctx = ResolverContext.of(null, force);

            for (String key : keys) {
                int sep = key.indexOf('.');
                ctx.whatever.put("parentId", sep > -1 ? toGroupId(key.substring(0, sep)) : null);
                Long id = toGroupId(key);
                Search search = buildAssortmentsPayload(id);
                Module module = mdsClient().search(search, ctx.language);
                resolverResult.addAll(resolver.parseAndProcess(module, ctx));
            }

            result = createSyncResult(resolverResult, groupIds, Duration.between(start, OffsetDateTime.now(MDS_DATE_ZONE)));
            saveSyncCycleSuccess(result, start);
            SYNC_LOGGER.info("Assortments sync finished:{}{}", System.lineSeparator(), result);
            return result;

        } catch (MdsApiConnectionException exc) {
            ErrorHandling.capture(exc, "Assortments sync failed.");
            return new SyncResult(SyncResult.Status.ERROR, Duration.between(start, OffsetDateTime.now(MDS_DATE_ZONE)));
        } finally {
            System.gc();
        }
    }

    private SyncResult createSyncResult(final ResolverResult resolverResult, final List<Long> requestedIds, final Duration duration) {
        Long[] successful = resolverResult.getSuccessfulIds().toArray(Long[]::new);
        Long[] failed = resolverResult.getFailedIds().toArray(Long[]::new);
        Long[] skipped = requestedIds.stream()
                .filter(id -> !resolverResult.getProcessedIds().contains(id))
                .toArray(Long[]::new);
        return new SyncResult(successful, failed, skipped, duration);
    }

    /**
     * Collect MDS group ids as modifiable list
     *
     * @return list of object group ids
     */
    private List<String> getAssortmentKeys() {
        String[] keys = this.assortmentService.getAssortmentKeys(AssortmentType.OBJECT_GROUP);
        return Arrays.stream(keys).sorted().collect(Collectors.toCollection(ArrayList::new));
    }

    /**
     * Collect MDS group ids as modifiable list.
     *
     * @param ids assortment entity ids that should be resolved
     * @return list of object group ids
     */
    private List<String> getAssortmentKeys(final Long[] ids) {
        List<AssortmentData> assortments = this.assortmentService.getAssortments(ids);
        return assortments.stream()
                .filter(a -> AssortmentType.OBJECT_GROUP.name().equals(a.getQueryType()))
                .map(AssortmentData::getKey)
                .sorted()
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private static Long toGroupId(final String key) {
        String numbers = key.trim();
        int parentSep = numbers.indexOf('.');
        return Long.valueOf(parentSep > -1 ? numbers.substring(parentSep + 1) : numbers);
    }

    private Search buildAssortmentsPayload(final Long... groupIds) {
        return new SearchRequestHelper(this.apiConfig, MODULE_OBJECT_GROUPS)
                .buildSearchPayload(groupIds);
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param result    the result
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncResult result, final OffsetDateTime timestamp) {
        WrapperDTO wrapper = createSyncCycleWrapper(MODULE_OBJECT_GROUPS, SyncCycleType.ASSORTMENTS, result, timestamp);
        this.dataQueue.add(wrapper);
    }
}
