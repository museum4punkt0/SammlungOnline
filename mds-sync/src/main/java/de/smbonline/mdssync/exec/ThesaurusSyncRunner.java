package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.MdsSessionHandler;
import de.smbonline.mdssync.api.RestTemplateFactory;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ThesaurusData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.ThesaurusService;
import de.smbonline.mdssync.dto.SyncCycleType;
import de.smbonline.mdssync.dto.Thesaurus;
import de.smbonline.mdssync.dto.ThesaurusExt;
import de.smbonline.mdssync.dto.ThesaurusTranslation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.resolvers.ResolverResult;
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

import java.math.BigDecimal;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.Callable;

import static de.smbonline.mdssync.log.Loggers.*;
import static de.smbonline.mdssync.rest.JsonAttr.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

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
    private final DataQueue<WrapperDTO> dataQueue;
    private final Data status;

    private final RestTemplate vocabularyClient;

    @Autowired
    public ThesaurusSyncRunner(
            final MdsApiConfig mdsConfig,
            final MdsSessionHandler sessionHandler,
            final ThesaurusService thesaurusService,
            final DataQueue<WrapperDTO> dataQueue) {
        this.thesaurusService = thesaurusService;
        this.dataQueue = dataQueue;
        this.status = new Data()
                .setAttribute("instance", "TSR" + System.currentTimeMillis())
                .setAttribute(ATTR_STATUS, "not running");
        this.vocabularyClient = RestTemplateFactory.INSTANCE.getRestTemplate(mdsConfig, sessionHandler);
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
                    // TODO update related objects
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
            return null;
        }

        boolean success = true;
        for (Thesaurus update : updates) {
            boolean next = process(update);
            success = success && next;
        }
        return success;
    }

    private List<? extends Thesaurus> resolveThesaurusUpdates(final ThesaurusData thesaurus) throws MdsApiConnectionException {
        List<Thesaurus> updates = new ArrayList<>();
        ThesaurusUpdate update = resolveThesaurus(((BigDecimal) thesaurus.getMdsId()).longValueExact(), thesaurus.getType(), thesaurus.getInstance());
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

        // sort terms by "order" and pick the first "preferred" term
        List<Term> terms = node.getTerms() == null ? Collections.emptyList() : node.getTerms().getTerm().stream()
                .filter(t -> t.getCategory() == null || "preferred".equals(t.getCategory().getLogicalName()))
                .sorted(Comparator.comparing(Term::getOrder))
                .toList();

        for (Term term : terms) {
            String cleanContent = cleanupThesaurusValue(term.getContent());
            if (isNotBlacklisted(cleanContent) && "de".equals(term.getIsoLanguageCode())) {
                update.translations.add(Pair.of(term.getIsoLanguageCode(), cleanContent));
                break;
            }
        }

        LOGGER.debug("Resolved thesaurus entry {}", update.thesaurus);
        return update;
    }

    private @Nullable String cleanupThesaurusValue(final @Nullable String content) {
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
        ResponseEntity<Node> response = invokeWithRetries(() -> this.vocabularyClient.getForEntity(
                "/ria-ws/application/vocabulary/instances/{instanceName}/nodes/{id}",
                Node.class,
                Map.of("instanceName", instance, "id", mdsId)
        ), 3);
        if (response.getStatusCode().isError()) {
            return null;
        }
        return response.getBody();
    }

    private boolean process(final Thesaurus dto) {
        boolean[] result = {false};
        WrapperDTO wrapper = new WrapperDTO(dto);
        wrapper.getAfterExecuteCommand().add(() -> {
            result[0] = true;
            return null;
        });
        this.dataQueue.add(wrapper);
        return result[0];
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

    private static <T> ResponseEntity<T> invokeWithRetries(final Callable<ResponseEntity<T>> apiCall, final int maxRetries) throws MdsApiConnectionException {
        MdsApiConnectionException connectionError = null;
        for (int i = 1; i <= maxRetries; i++) {
            try {
                return apiCall.call();
            } catch (Exception exc) {
                if (exc instanceof HttpStatusCodeException httpExc && httpExc.getStatusCode() == HttpStatus.NOT_FOUND) {
                    return ResponseEntity.notFound().build();
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
