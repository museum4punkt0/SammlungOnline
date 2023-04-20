package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.PersonData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.PersonService;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.resolvers.PersonsResolver;
import de.smbonline.mdssync.exec.resolvers.ResolverContext;
import de.smbonline.mdssync.exec.resolvers.ResolverRegistry;
import de.smbonline.mdssync.exec.resolvers.ResolverResult;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.rest.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.Dates.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class PersonsSyncRunner implements PartialSyncRunner {

    private final PersonService personService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final MdsApiClientFactory clientFactory;
    private final ResolverRegistry registry;
    private final Data status;

    private MdsApiClient mdsClient;

    @Autowired
    public PersonsSyncRunner(
            final MdsApiClientFactory clientFactory,
            final PersonService personService,
            final DataQueue<WrapperDTO> dataQueue,
            final ResolverRegistry registry) {
        this.clientFactory = clientFactory;
        this.personService = personService;
        this.dataQueue = dataQueue;
        this.registry = registry;
        this.status = new Data()
                .setAttribute("instance", "PSR" + System.currentTimeMillis())
                .setAttribute(ATTR_STATUS, "not running");
    }

    /*
     * Lazy-init API client. Method is protected to allow overriding in test cases.
     * @return API client
     */
    protected MdsApiClient mdsClient() {
        if (this.mdsClient == null) {
            this.mdsClient = this.clientFactory.getApiClient(MODULE_PERSON);
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
    public SyncResult sync(final Long... ids) {
        SyncResult result = null;
        try {
            updateStatus("running");
            result = runSync(ids, SyncCycleType.MANUAL, true);
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
            Long[] ids = this.personService.getPersonIds();
            result = runSync(ids, SyncCycleType.INCREMENTAL, false);
            return result;
        } finally {
            updateResult(result);
        }
    }

    private SyncResult runSync(final Long[] ids, final SyncCycleType type, final boolean force) {

        ResolverContext ctx = ResolverContext.of("de", force);
        ResolverResult resolverResult = new ResolverResult();
        PersonsResolver resolver = this.registry.getResolver(MODULE_PERSON);
        OffsetDateTime start = OffsetDateTime.now(MDS_DATE_ZONE);

        try {

            List<Long> toBeDeleted = new ArrayList<>();

            // search in Person module lasts too long, we have to fetch each person separately
            for (Long id : ids) {
                ModuleItem person = findPersonInMDS(id);
                if (person == null) {
                    toBeDeleted.add(id);
                } else if (force || isUpdateRequired(person)) {
                    // we now fetch the full person-info via get()
                    // search() did not return all relevant fields because of select config in module-search-requests.json
                    person = mdsClient().get(id, ctx.language);
                    if (person != null) {
                        resolverResult.addAll(resolver.parseAndProcess(asModule(person), ctx));
                        // TODO search index update for related objects
                    } else {
                        // mark as skipped
                        resolverResult.processed(id);
                    }
                } else {
                    // mark as skipped
                    resolverResult.processed(id);
                }
            }

            if (!toBeDeleted.isEmpty()) {
                Module deletedItems = markAsDeleted(toBeDeleted.toArray(Long[]::new));
                resolverResult.addAll(resolver.parseAndProcess(deletedItems, ctx));
            }

            SyncResult result = createSyncResult(resolverResult, Duration.between(start, OffsetDateTime.now(MDS_DATE_ZONE)));
            saveSyncCycleSuccess(result, type, start);
            SYNC_LOGGER.info("Persons sync finished:{}{}", System.lineSeparator(), result);
            return result;

        } catch (MdsApiConnectionException exc) {
            ErrorHandling.capture(exc, "Persons sync failed.");
            return new SyncResult(SyncResult.Status.ERROR, Duration.between(start, OffsetDateTime.now(MDS_DATE_ZONE)));
        } finally {
            System.gc();
        }
    }

    /**
     * Check if sync needs to be performed for person.
     *
     * @param personItem (possible empty) person mds id with at least a modification timestamp field
     * @return true=perform sync, false=no update necessary
     */
    private boolean isUpdateRequired(final ModuleItem personItem) {
        // fetch existing person
        PersonData person = this.personService.getPerson(personItem.getId());
        if (person == null) {
            // person doesn't exist yet, needs to be synced
            return true;
        }
        OffsetDateTime created = OffsetDateTime.parse(person.getCreatedAt().toString());
        OffsetDateTime lastSynced = OffsetDateTime.parse(person.getUpdatedAt().toString());
        if (lastSynced.toEpochSecond() - created.toEpochSecond() < 5) {
            // person may not actually be synced yet - maybe it was created as dummy involved-party only
            return true;
        }
        // compare update timestamps
        String lastModifiedTime = extractValue(findSysField(personItem.getSystemField(), FIELD_LAST_MODIFIED));
        return lastModifiedTime == null || toOffsetDateTime(lastModifiedTime).isAfter(lastSynced);
    }

    /**
     * Try to find person by id in MDS.
     *
     * @param id requested person id
     * @return module item if found
     * @throws MdsApiConnectionException on connection problems
     */
    private @Nullable ModuleItem findPersonInMDS(final Long id) throws MdsApiConnectionException {
        // this is a non-heavyweight call due to select config in module-search-requests.json
        SearchRequestHelper helper = new SearchRequestHelper(mdsClient().getConfig(), MODULE_PERSON);
        Module check = mdsClient().search(helper.buildSearchPayload(id), null);
        return check.getModuleItem().isEmpty() ? null : check.getModuleItem().get(0);
    }

    private SyncResult createSyncResult(final ResolverResult resolverResult, final Duration duration) {
        Long[] successful = resolverResult.getSuccessfulIds().toArray(Long[]::new);
        Long[] failed = resolverResult.getFailedIds().toArray(Long[]::new);
        Long[] skipped = new Long[0];
        return new SyncResult(successful, failed, skipped, duration);
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param result    the result
     * @param type      MANUAL or INCREMENTAL
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncResult result, final SyncCycleType type, final OffsetDateTime timestamp) {
        WrapperDTO syncCycleWrapper = createSyncCycleWrapper(MODULE_PERSON, type, result, timestamp);
        this.dataQueue.add(syncCycleWrapper);
    }

}
