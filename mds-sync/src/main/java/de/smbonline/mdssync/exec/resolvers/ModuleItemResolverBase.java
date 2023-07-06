package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dto.AttributeValue;
import de.smbonline.mdssync.dto.MdsItem;
import de.smbonline.mdssync.dto.ObjRelation;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

public abstract class ModuleItemResolverBase<DTO extends MdsItem> implements ModuleItemResolver {

    protected final Logger LOGGER;

    private final String moduleName;
    private final SearchRequestHelper requestHelper;
    private final MdsApiConfig mdsConfig;
    private final MdsApiClientFactory clientFactory;
    private final MdsApiClient apiClient;
    private final SearchIndexerClient indexerClient;

    private final ResolverResult result;
    private final DataQueue<WrapperDTO> dataQueue;

    private final List<BeforeExecuteCommandListener> beforeListeners = new ArrayList<>();
    private final List<AfterExecuteCommandListener> afterListeners = new ArrayList<>();
    private final List<ErrorExecuteCommandListener> errorListeners = new ArrayList<>();

    protected ModuleItemResolverBase(
            final String module,
            final MdsApiConfig mdsConfig,
            final SearchIndexerClient indexerClient,
            final MdsApiClientFactory clientFactory,
            final DataQueue<WrapperDTO> dataQueue) {
        this.moduleName = module;
        this.mdsConfig = mdsConfig;
        this.requestHelper = new SearchRequestHelper(this.mdsConfig, this.moduleName);
        this.clientFactory = clientFactory;
        this.apiClient = clientFactory.getApiClient(this.moduleName);
        this.indexerClient = indexerClient;
        this.dataQueue = dataQueue;
        this.result = new ResolverResult();

        LOGGER = LoggerFactory.getLogger(getClass());
    }

    @Override
    public void addBeforeExecuteCommandListener(final BeforeExecuteCommandListener listener) {
        this.beforeListeners.add(listener);
    }

    @Override
    public void addAfterExecuteCommandListener(final AfterExecuteCommandListener listener) {
        this.afterListeners.add(listener);
    }

    @Override
    public void addOnErrorExecuteCommandListener(final ErrorExecuteCommandListener listener) {
        this.errorListeners.add(listener);
    }

    @Override
    public String getStatusInfo() {
        synchronized (this.result) {
            return this.result.toString();
        }
    }

    @Override
    public String getModuleName() {
        return this.moduleName;
    }

    protected MdsApiClient getMdsClient() {
        return this.apiClient;
    }

    protected MdsApiConfig getMdsApiConfig() {
        return this.mdsConfig;
    }

    protected SearchIndexerClient getIndexerClient() {
        return this.indexerClient;
    }

    protected MdsApiClientFactory getMdsClientFactory() {
        return this.clientFactory;
    }

    protected SearchRequestHelper getSearchRequestHelper() {
        return this.requestHelper;
    }

    // internals

    protected void logStatistics(final int expected, final ResolverResult actual) {
        if (!LOGGER.isInfoEnabled()) {
            return;
        }

        int successful = actual.getSuccessfulIds().size();
        int failed = actual.getFailedIds().size();
        int skipped = expected - (successful + failed);
        if (expected == 0) {
            LOGGER.debug("Nothing to sync.");
        } else if (expected != successful) {
            LOGGER.info("Synced {} {} - failed:{}, skipped:{}.", successful, itemType(successful == 1), failed, skipped);
        } else {
            LOGGER.info("Synced {} {}.", successful, itemType(successful == 1));
        }
    }

    protected void process(final DTO obj, final Operation op) {
        process(newWrapper(obj, op, state()));
    }

    protected void process(final WrapperDTO wrapper) {
        this.dataQueue.add(wrapper);
    }

    /**
     * Create a new wrapper that is used for processing the DTO. Important note: In case of overriding,
     * {@link #state()}.processed(...) must be called beforeExecuteCommand,
     * {@link #state()}.successful(...) must be called afterExecuteCommand and
     * {@link #state()}.failed(...) must be called onError.
     *
     * @param obj dto
     * @param op  operation
     * @return operation wrapper for given DTO
     */
    protected WrapperDTO newWrapper(final DTO obj, final Operation op, final ResolverResult result) {
        WrapperDTO wrapper = new WrapperDTO(obj);
        wrapper.setOperation(op);

        // BEFORE: first others - then self
        this.beforeListeners.forEach(listener -> wrapper.getBeforeExecuteCommand().add(() -> {
            listener.onBeforeExecuteCommand(obj.getMdsId(), op);
            return null;
        }));
        wrapper.getBeforeExecuteCommand().add(() -> {
            result.processed(obj.getMdsId());
            if (obj instanceof ObjRelation) {
                LOGGER.debug("Linking {} {} to object {}...", obj.getType(), obj.getMdsId(), ((ObjRelation) obj).getObjectId());
            } else {
                LOGGER.debug("{} {} {}...", (op == Operation.DELETE ? "Deleting" : "Updating"), obj.getType(), obj.getMdsId());
            }
            return null;
        });

        // AFTER: first self - then others in reversed order
        wrapper.getAfterExecuteCommand().add(() -> {
            result.successful(obj.getMdsId());
            if (obj instanceof ObjRelation) {
                LOGGER.info("Linked {} {} to object {}.", obj.getType(), obj.getMdsId(), ((ObjRelation) obj).getObjectId());
                // TODO: notifyReindexObject(((ObjRelation) obj).getObjectId());
                //   This can only be implemented when we have a delayed index queue otherwise we run indexing
                //   too often any maybe even before the sync is fully done.
            } else {
                LOGGER.info("{} {} {}.", obj.getType(), obj.getMdsId(), (op == Operation.DELETE ? "deleted" : "updated"));
            }
            return null;
        });
        AfterExecuteCommandListener[] aListeners = this.afterListeners.toArray(AfterExecuteCommandListener[]::new);
        ArrayUtils.reverse(aListeners);
        Arrays.stream(aListeners).forEach(listener -> wrapper.getAfterExecuteCommand().add(() -> {
            listener.onAfterExecuteCommand(obj.getMdsId(), op);
            return null;
        }));

        // ERROR: first self - then others in reversed order
        wrapper.getOnError().add(exc -> {
            result.failed(obj.getMdsId());
            ErrorHandling.capture(exc, "Exception executing {} on {} {}", op, obj.getType(), obj.getMdsId());
            return null;
        });
        ErrorExecuteCommandListener[] eListeners = this.errorListeners.toArray(ErrorExecuteCommandListener[]::new);
        ArrayUtils.reverse(eListeners);
        Arrays.stream(eListeners).forEach(listener -> wrapper.getOnError().add((exc) -> {
            listener.onErrorExecuteCommand(obj.getMdsId(), op, exc);
            return null;
        }));
        return wrapper;
    }

    protected String itemType(final boolean singular) {
        return getModuleName() + (singular ? "Item" : "Items");
    }

    protected ResolverResult state() {
        return this.result;
    }

    protected void notifyReindexObject(final Long objectId, final @Nullable String... fields) {
        if (getIndexerClient().getConfig().isShouldUpdate()) {
            try {
                LOGGER.debug("Updating search index...");
                getIndexerClient().notifyUpdated(objectId, fields);
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Exception updating search-index for MDS object {}", objectId);
            }
        }
    }

    // helpers

    protected boolean isDeleted(final ModuleItem item) {
        SystemField orgUnitField = findSysField(item.getSystemField(), FIELD_ORG_UNIT);
        return ORGUNIT_TRASHBIN.equals(extractValue(orgUnitField));
    }

    protected boolean isDeleted(final MdsItem obj) {
        return ORGUNIT_TRASHBIN.equals(extractOrgUnit(obj));
    }

    protected @Nullable String extractOrgUnit(final MdsItem obj) {
        AttributeValue orgUnit = findOne(obj.getAttributes(), attr -> FIELD_ORG_UNIT.equals(attr.getKey()));
        return orgUnit == null ? null : orgUnit.getValue();
    }

    protected Module fetchReferencedModule(final ModuleReference moduleRef, final String language)
            throws MdsApiConnectionException {
        // prepare search in referenced module
        Long[] itemIds = moduleRef.getModuleReferenceItem()
                .stream()
                .map(ModuleReferenceItem::getModuleItemId)
                .distinct()
                .toArray(Long[]::new);
        // run the search
        return fetchModule(moduleRef.getTargetModule(), language, itemIds);
    }

    protected Module fetchModule(final String moduleName, final String language, final Long... itemIds)
            throws MdsApiConnectionException {

        MdsApiClient client = getMdsClientFactory().getApiClient(moduleName);
        SearchRequestHelper helper = new SearchRequestHelper(getMdsApiConfig(), client.getModuleName());

        // for performance reasons, we run loops here; especially searches in
        // Person, Registrar, Exhibition and Literature have a heavy impact on the MDS
        Module module = emptyModule(moduleName);
        for (int offset = 0, limit = 2; offset < itemIds.length; offset += limit) {
            Long[] partialIds = ArrayUtils.subarray(itemIds, offset, offset + limit);
            Search search = helper.buildSearchPayload(partialIds);
            Module partial = client.search(search, language);
            module.getModuleItem().addAll(partial.getModuleItem());
            module.setTotalSize(module.getTotalSize() + partial.getTotalSize());
        }
        return module;
    }
}
