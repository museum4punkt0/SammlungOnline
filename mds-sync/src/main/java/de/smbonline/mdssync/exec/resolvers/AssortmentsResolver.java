package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.AssortmentService;
import de.smbonline.mdssync.dto.Assortment;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exec.parsers.AssortmentsParser;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import static de.smbonline.mdssync.util.MdsConstants.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class AssortmentsResolver extends ModuleItemResolverBase<Assortment> {

    private final AssortmentService assortmentService;

    @Autowired
    public AssortmentsResolver(
            final MdsApiConfig mdsConfig,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerClient indexerClient,
            final AssortmentService assortmentService,
            final DataQueue<WrapperDTO> dataQueue) {
        super(MODULE_OBJECT_GROUPS, mdsConfig, indexerClient, clientFactory, dataQueue);
        this.assortmentService = assortmentService;
    }

    @Override
    public ResolverResult parseAndProcessReferences(final ModuleItem objectItem, final boolean linkToParent, final String language) {
        // not relevant for our business case - we are not interested in the general object-group references
        return new ResolverResult();
    }

    @Override
    public ResolverResult parseAndProcess(final Module module, final ResolverContext ctx) {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Updating assortments for {} groups...", module.getModuleItem().size());
        }

        Long parentId = (Long) ctx.whatever.get("parentId");
        int total = Math.toIntExact(module.getTotalSize());
        for (ModuleItem item : module.getModuleItem()) {
            String key = parentId == null ? item.getId().toString() : parentId + "." + item.getId();
            if (isDeleted(item)) {
                process(new Assortment(key, item.getId()), Operation.DELETE);
            } else {
                Assortment dto = new AssortmentsParser().parseModuleItem(item, key);
                if (dto != null) {
                    process(dto, Operation.UPSERT);
                }
            }
        }

        // Note: No need to call search-indexer here, we have an event-trigger in Hasura that handles it.

        logStatistics(total, state());
        return state();
    }

    @Override
    protected WrapperDTO newWrapper(final Assortment dto, final Operation op, final ResolverResult result) {
        WrapperDTO wrapper = super.newWrapper(dto, op, result);
        if (op == Operation.UPSERT && LOGGER.isInfoEnabled()) {
            wrapper.getAfterExecuteCommand().add(() -> {
                Long[] ids = this.assortmentService.getObjectIds(dto.getKey());
                LOGGER.info("{} MDS objects associated to assortment group {}.", ids.length, dto.getMdsId());
                return null;
            });
        }
        return wrapper;
    }
}
