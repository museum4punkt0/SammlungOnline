package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.MdsSessionHandler;
import de.smbonline.mdssync.api.RestTemplateFactory;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.InvolvedPartyData;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ThesaurusData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.ObjectService;
import de.smbonline.mdssync.dataprocessor.service.PersonService;
import de.smbonline.mdssync.dataprocessor.service.ThesaurusService;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.Thesaurus;
import de.smbonline.mdssync.dto.ThesaurusExt;
import de.smbonline.mdssync.dto.ThesaurusTranslation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.resolvers.ResolverResult;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.jaxb.vocabulary.Node;
import de.smbonline.mdssync.jaxb.vocabulary.ParentNodeReferenceItem;
import de.smbonline.mdssync.jaxb.vocabulary.Term;
import de.smbonline.mdssync.rest.Data;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import de.smbonline.mdssync.ruleset.Mappings;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.stream.Collectors;

import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;

import de.smbonline.mdssync.util.ValueExtractor;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ThesaurusSyncRunner implements PartialSyncRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(ThesaurusSyncRunner.class);

    private static class ThesaurusUpdate {
        private Node node;
        private ThesaurusExt thesaurus;
        private List<Pair<String, String>> translations = new ArrayList<>();
    }

    private final ThesaurusService thesaurusService;
    private final PersonService personService;
    private final ObjectService objectService;
    private final DataQueue<WrapperDTO> dataQueue;
    private final Data status;

    private RestTemplate restTemplate;
    private final MdsApiConfig mdsConfig;
    private final MdsSessionHandler sessionHandler;
    private final SearchIndexerClient indexerClient;

    @Autowired
    public ThesaurusSyncRunner(
            final MdsApiConfig mdsConfig,
            final MdsSessionHandler sessionHandler,
            final SearchIndexerClient indexerClient,
            final ThesaurusService thesaurusService,
            final PersonService personService,
            final ObjectService objectService,
            final DataQueue<WrapperDTO> dataQueue) {
        this.thesaurusService = thesaurusService;
        this.objectService = objectService;
        this.personService = personService;
        this.dataQueue = dataQueue;
        this.indexerClient = indexerClient;
        this.sessionHandler = sessionHandler;
        this.mdsConfig = mdsConfig;
        this.status = new Data()
                .setAttribute("instance", "TSR" + System.currentTimeMillis())
                .setAttribute(ATTR_STATUS, "not running");
    }

    private void updateResult(final @Nullable SyncResult result) {
        synchronized (this.status) {
            this.status.setAttribute(ATTR_RESULT, result == null ? null : result.toJson())
                    .setAttribute(ATTR_STATUS, result == null ? "failed" : "done");
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
    public SyncResult sync() {

        updateStatus("running");

        OffsetDateTime start = OffsetDateTime.now(MDS_DATE_ZONE);
        SyncResult result = null;
        String[] instances = this.thesaurusService.getAllInstances();

        try {
            ResolverResult aggregatedResult = new ResolverResult();
            for (String instance : instances) {
                ResolverResult partialResult = runSyncForInstance(instance);
                aggregatedResult.addAll(partialResult);
            }

            OffsetDateTime end = OffsetDateTime.now(MDS_DATE_ZONE);
            result = createSyncResult(aggregatedResult, aggregatedResult.getProcessedIds().toArray(new Long[0]), Duration.between(start, end));
            saveSyncCycleSuccess(result, start);

            SYNC_LOGGER.info("Thesaurus sync finished:{}{}", System.lineSeparator(), result);
            return result;

        } catch (MdsApiConnectionException exc) {
            ErrorHandling.capture(exc, "Thesaurus sync failed.");
            OffsetDateTime end = OffsetDateTime.now(MDS_DATE_ZONE);
            return new SyncResult(SyncResult.Status.ERROR, Duration.between(start, end));
        } finally {
            System.gc();
            updateResult(result);
        }
    }

    @Override
    public SyncResult sync(final Long... ids) {

        updateStatus("running");

        OffsetDateTime start = OffsetDateTime.now(MDS_DATE_ZONE);
        SyncResult result = null;
        ResolverResult aggregatedResult = new ResolverResult();

        try {

            for (Long id : ids) {
                aggregatedResult.processed(id);
                Boolean synced = runSyncFor(id);
                if (synced != null) {
                    if (synced) {
                        aggregatedResult.successful(id);
                    } else {
                        aggregatedResult.failed(id);
                    }
                }
            }

            OffsetDateTime end = OffsetDateTime.now(MDS_DATE_ZONE);
            result = createSyncResult(aggregatedResult, ids, Duration.between(start, end));
            saveSyncCycleSuccess(result, start);

            SYNC_LOGGER.info("Thesaurus sync finished:{}{}", System.lineSeparator(), result);
            return result;

        } catch (MdsApiConnectionException exc) {
            ErrorHandling.capture(exc, "Thesaurus sync failed.");
            OffsetDateTime end = OffsetDateTime.now(MDS_DATE_ZONE);
            return new SyncResult(SyncResult.Status.ERROR, Duration.between(start, end));
        } finally {
            System.gc();
            updateResult(result);
        }
    }

    private ResolverResult runSyncForInstance(final String instance) throws MdsApiConnectionException {
        ResolverResult instanceResult = new ResolverResult();
        Long[] ids = this.thesaurusService.getIdsForInstance(instance);
        for (Long id : ids) {
            instanceResult.processed(id);
            Boolean synced = runSyncFor(id);
            if (synced != null) {
                if (synced) {
                    instanceResult.successful(id);
                } else {
                    instanceResult.failed(id);
                }
            }
        }
        return instanceResult;
    }

    /**
     * Run sync and return success state
     *
     * @param id thesaurus id
     * @return null=skipped, false=failed, true=success
     */
    private @Nullable Boolean runSyncFor(final Long id) throws MdsApiConnectionException {

        ThesaurusData thesaurus = this.thesaurusService.getThesaurus(id);
        if (thesaurus == null) {
            return null;
        }

        List<? extends Thesaurus> updates = resolveThesaurusUpdates(thesaurus);
        if (updates.isEmpty()) {
            Thesaurus delete = new Thesaurus(((Number) thesaurus.getMdsId()).longValue(), thesaurus.getType());
            return process(delete, Operation.DELETE);
            // TODO reindex objects that used this voc earlier
        }

        boolean allSuccess = true;
        for (Thesaurus update : updates) {
            boolean partialSuccess = process(update, Operation.UPSERT);
            if (this.indexerClient.getConfig().isShouldUpdate()) {
                reindexRelatedObjects(update);
            }
            allSuccess = allSuccess && partialSuccess;
        }
        return allSuccess;
    }

    private List<? extends Thesaurus> resolveThesaurusUpdates(final ThesaurusData thesaurus) throws MdsApiConnectionException {
        List<Thesaurus> updates = new ArrayList<>();
        ThesaurusUpdate update = resolveThesaurus(((Number) thesaurus.getMdsId()).longValue(), thesaurus.getType(), thesaurus.getInstance());
        // resolve parents recursively
        for (ThesaurusUpdate next = update, parent; next != null; next = parent) {
            if (next.node.getParents() == null || next.node.getParents().getParent().isEmpty()) {
                parent = null;
            } else {
                ParentNodeReferenceItem parentRef = next.node.getParents().getParent().get(0);
                parent = resolveThesaurus(parentRef.getNodeId(), thesaurus.getType(), thesaurus.getInstance());
                if (parent != null) {
                    next.thesaurus.setParent(parent.thesaurus);
                    // insert parent thesaurus translations
                    updates.addAll(0, toDtos(parent));
                }
            }
        }
        // finally, add the actual thesaurus translations - we end up with:
        // [parentN, ..., parent2, parent1, actual]
        // if there are translations, the elements in updates list will contain these instead:
        // [parentN, ..., parent2-translation1, parent2-translation2, parent1-translation, actual]
        if (update != null) {
            updates.addAll(toDtos(update));
        }
        return updates;
    }

    private @Nullable ThesaurusUpdate resolveThesaurus(
            final Long mdsId, final String type, final String instance) throws MdsApiConnectionException {

        LOGGER.debug("Fetching thesaurus entry {}={} ({})", instance, mdsId, type);

        Node node = fetchThesaurus(mdsId, instance);
        if (node == null) {
            LOGGER.warn("Thesaurus entry {}={} ({}) not found in MDS", instance, mdsId, type);
            return null;
        }

        ThesaurusUpdate update = new ThesaurusUpdate();
        update.node = node;

        ThesaurusExt thesaurus = new ThesaurusExt(mdsId, type);
        thesaurus.setInstance(instance);
        thesaurus.setName(StringUtils.defaultString(node.getLogicalName(), String.valueOf(node.getId())));
        update.thesaurus = thesaurus;

        // sort valid terms by "order" group them by "language"
        Map<String, List<Term>> terms = node.getTerms() == null ? Collections.emptyMap() : node.getTerms().getTerm().stream()
                .filter(t -> t.getStatus() != null && "valid".equals(t.getStatus().getLogicalName()))
                .sorted(Comparator.comparing(Term::getOrder))
                .collect(Collectors.groupingBy(Term::getIsoLanguageCode));
        // for each language, pick the first "preferred" term
        for (String lang : terms.keySet()) {
            String cleanContent = extractPreferredTerm(terms.get(lang), instance);
            if (cleanContent != null) {
                update.translations.add(Pair.of(lang, cleanContent));
            }
        }

        LOGGER.debug("Resolved thesaurus entry {}", update.thesaurus);
        return update;
    }

    private @Nullable String extractPreferredTerm(final List<Term> terms, final String instance) {
        // find the first term marked for "Sammlungen Online"
        List<Term> primaryTerms = terms.stream()
                .filter(t -> t.getTermClass() != null && "Sammlungen Online".equals(t.getTermClass().getLogicalName()))
                .toList();
        for (Term term : primaryTerms) {
            String clean = cleanupThesaurusValue(term);
            if (ValueExtractor.isNotBlacklisted(clean)) {
                return clean;
            }
        }

        // check some special cases for which we have mappings
        if ("GenLocationVgr".equals(instance)) {
            //Mappings.roomMapping(), could use ExhibitionSpaceRule here
            return null;
        }

        // fallback to the first preferred term
        return terms.stream()
                .filter(t -> t.getCategory() != null && "preferred".equals(t.getCategory().getLogicalName()))
                .map(ThesaurusSyncRunner::cleanupThesaurusValue)
                .filter(ValueExtractor::isNotBlacklisted)
                .findFirst().orElse(null);
    }

    private static @Nullable String cleanupThesaurusValue(final Term term) {
        String content = term.getContent();
        return content == null ? null : StringUtils.stripStart(content.trim(), ";.");
    }

    private List<? extends Thesaurus> toDtos(final ThesaurusUpdate update) {
        if (update.translations.isEmpty()) {
            return Collections.singletonList(update.thesaurus);
        }
        List<ThesaurusTranslation> updates = new ArrayList<>();
        for (Pair<String, String> translates : update.translations) {
            ThesaurusTranslation translation = new ThesaurusTranslation(update.thesaurus);
            translation.setLanguage(translates.getKey());
            translation.setValue(translates.getValue());
            updates.add(translation);
        }
        return updates;
    }

    private @Nullable Node fetchThesaurus(final Long mdsId, final String instance) throws MdsApiConnectionException {
        ResponseEntity<Node> response = invokeWithRetries(() -> client().getForEntity(
                this.mdsConfig.getWebservicePath() + "/vocabulary/instances/{instanceName}/nodes/{id}",
                Node.class,
                Map.of("instanceName", instance, "id", mdsId)
        ), 3);
        if (response.getStatusCode().isError()) {
            return null;
        }
        return response.getBody();
    }

    private boolean process(final Thesaurus dto, final Operation op) {
        boolean[] result = {false};
        WrapperDTO wrapper = new WrapperDTO(dto);
        wrapper.setOperation(op);
        wrapper.getAfterExecuteCommand().add(() -> {
            result[0] = true;
            return null;
        });
        this.dataQueue.add(wrapper);
        return result[0];
    }

    private void reindexRelatedObjects(final Thesaurus dto) {
        ThesaurusData thesaurus = thesaurusService.getThesaurus(dto.getMdsId(), dto.getType());
        if (thesaurus != null) {
            reindexRelatedObjects(thesaurus);
        }
    }

    private void reindexRelatedObjects(final ThesaurusData thesaurus) {
        long vocId = ((Number) thesaurus.getId()).longValue();

        // "materialAndTechnique"
        if (thesaurus.getInstance().startsWith("ObjMaterialTechnique")) {
            Long[] relatedObjects = objectService.getIdsForMaterialReferencesVoc(vocId);
            reindexObjects(relatedObjects, "materialAndTechnique");
        }

        // "geographicalReferences"
        else if (thesaurus.getInstance().startsWith("ObjGeo") || thesaurus.getInstance().startsWith("GenPlace")) {
            Long[] relatedObjects = objectService.getIdsForGeographicalReferencesVoc(vocId);
            reindexObjects(relatedObjects, "geographicalReferences");
        }

        // "culturalReferences"
        else if (thesaurus.getInstance().startsWith("ObjCulturalContext")) {
            Long[] relatedObjects = objectService.getIdsForCulturalReferencesVoc(vocId);
            reindexObjects(relatedObjects, "culturalReferences");
        }

        // "involvedParties"
        else if (thesaurus.getInstance().startsWith("ObjPerAssociationRole")) {
            List<InvolvedPartyData> parties = personService.getInvolvedParties(vocId);
            Long[] relatedObjects = parties.stream()
                    .map(party -> ((Number) party.getObjectId()).longValue())
                    .distinct()
                    .sorted()
                    .toArray(Long[]::new);
            reindexObjects(relatedObjects, "involvedParties");
        }

        // "location" / "exhibitionSpace" / "exhibit"
        else if (thesaurus.getInstance().startsWith("GenLocation")) {
            Long[] relatedObjects = objectService.getIdsForLocationVoc(vocId);
            reindexObjects(relatedObjects, "exhibit", "exhibitionSpace", "location");
        }

        // TBD more?
    }

    private void reindexObjects(final Long[] objectIds, final String... fields) {
        if (objectIds.length == 0) {
            return;
        }

        LOGGER.debug("Updating search index of related objects...");
        for (Long objectId : objectIds) {
            try {
                this.indexerClient.notifyUpdated(objectId, fields);
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Exception updating search-index for MDS object {}", objectId);
            }
        }
    }

    private SyncResult createSyncResult(final ResolverResult resolverResult, final Long[] requestedIds, final Duration duration) {
        List<Long> tmp = new ArrayList<>(Arrays.asList(requestedIds));
        tmp.removeAll(resolverResult.getSuccessfulIds());
        tmp.removeAll(resolverResult.getFailedIds());

        Long[] skipped = tmp.toArray(Long[]::new);
        Long[] successful = resolverResult.getSuccessfulIds().toArray(Long[]::new);
        Long[] failed = resolverResult.getFailedIds().toArray(Long[]::new);
        return new SyncResult(successful, failed, skipped, duration);
    }

    /**
     * Stores a SyncCycle in the database. Given timestamp represents the time when the sync was started.
     *
     * @param result    the result
     * @param timestamp start time of sync
     */
    private void saveSyncCycleSuccess(final SyncResult result, final OffsetDateTime timestamp) {
        WrapperDTO syncCycleWrapper = createSyncCycleWrapper(VOCABULARY, SyncCycleType.INCREMENTAL, result, timestamp);
        this.dataQueue.add(syncCycleWrapper);
    }

    /**
     * lazy-init of RestTemplate
     *
     * @return preconfigured RestTemplate
     */
    private synchronized RestTemplate client() {
        if (this.restTemplate == null) {
            this.restTemplate = RestTemplateFactory.INSTANCE.getRestTemplate(this.mdsConfig, this.sessionHandler);
        }
        return this.restTemplate;
    }

    private <T> ResponseEntity<T> invokeWithRetries(final Callable<ResponseEntity<T>> apiCall, final int maxRetries) throws MdsApiConnectionException {
        MdsApiConnectionException connectionError = null;
        for (int i = 1; i <= maxRetries; i++) {
            try {
                return apiCall.call();
            } catch (Exception exc) {
                if (exc instanceof HttpStatusCodeException httpExc) {
                    if (httpExc.getStatusCode() == HttpStatus.NOT_FOUND) {
                        return ResponseEntity.notFound().build();
                    }
                    if (httpExc.getStatusCode() == HttpStatus.FORBIDDEN) {
                        this.sessionHandler.refreshSessionToken();
                    }
                }
                if (i < maxRetries) {
                    LOGGER.warn("Failed to communicate with MDS-API. Retrying...");
                } else {
                    LOGGER.error("Failed to communicate with MDS-API: {}", exc.toString());
                    connectionError = new MdsApiConnectionException("Communication failed", findRootCause(exc));
                }
            }
        }
        throw Objects.requireNonNull(connectionError);
    }
}
