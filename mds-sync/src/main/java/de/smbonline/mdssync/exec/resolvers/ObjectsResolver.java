package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.AttributeApprovalHelper;
import de.smbonline.mdssync.dataprocessor.service.IgnorableKeyService;
import de.smbonline.mdssync.dataprocessor.service.ObjectService;
import de.smbonline.mdssync.dto.AttributeValue;
import de.smbonline.mdssync.dto.GeographicalReference;
import de.smbonline.mdssync.dto.MaterialReference;
import de.smbonline.mdssync.dto.MdsItem;
import de.smbonline.mdssync.dto.ObjRelation;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.PrincipalObject;
import de.smbonline.mdssync.dto.Thesaurus;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.parsers.ModuleItemParser;
import de.smbonline.mdssync.exec.parsers.ModuleItemParserFactory;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import de.smbonline.mdssync.ruleset.ExhibitionSpaceRule;
import de.smbonline.mdssync.util.ValueExtractor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static de.smbonline.mdssync.exec.parsers.ParserUtils.*;
import static de.smbonline.mdssync.util.Dates.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ObjectsResolver extends ModuleItemResolverBase<PrincipalObject> {

    private final ObjectService objectService;

    private final ObjectProvider<AttachmentsResolver> attachmentsResolverProvider;
    private final ObjectProvider<PersonsResolver> involvedPartiesResolverProvider;
    private final ObjectProvider<ExhibitionsResolver> exhibitionsResolverProvider;
    private final IgnorableKeyService ignorableKeyService;

    private final AttributeApprovalHelper approvalHelper;
    private static final Comparator<ObjRelation> BY_SEQUENCE
            = Comparator.comparingInt(ObjRelation::getSequence);

    @Autowired
    public ObjectsResolver(
            final MdsApiConfig apiConfig,
            final SearchIndexerConfig indexerConfig,
            final MdsApiClientFactory factory,
            final ObjectService objectService,
            final IgnorableKeyService ignoreService,
            final DataQueue<WrapperDTO> dataQueue,
            final AttributeApprovalHelper approvalHelper,
            final ObjectProvider<AttachmentsResolver> attachmentsResolverProvider,
            final ObjectProvider<PersonsResolver> involvedPartiesResolverProvider,
            final ObjectProvider<ExhibitionsResolver> exhibitionsResolverProvider) {
        super(MODULE_OBJECTS, apiConfig, indexerConfig, factory, dataQueue);
        this.objectService = objectService;
        this.ignorableKeyService = ignoreService;
        this.approvalHelper = approvalHelper;
        this.attachmentsResolverProvider = attachmentsResolverProvider;
        this.involvedPartiesResolverProvider = involvedPartiesResolverProvider;
        this.exhibitionsResolverProvider = exhibitionsResolverProvider;
    }

    @Override
    public ResolverResult parseAndProcessReferences(final ModuleItem objectItem, final boolean linkToParent, final String language) {
        // not relevant for our business case - objects don't reference other objects directly
        return new ResolverResult();
    }

    @Override
    public ResolverResult parseAndProcess(final Module module, final ResolverContext ctx) {

        boolean includingAttachments = "de".equals(ctx.language); // default language means we want to sync attachments also
        ModuleItemParser<PrincipalObject> parser = newObjectParser(ctx.language);

        for (ModuleItem moduleItem : module.getModuleItem()) {

            // parse object and attributes
            PrincipalObject obj = parser.parseModuleItem(moduleItem);
            Long id = obj.getMdsId();

            // check if we need to delete or upsert the object
            boolean delete = isDeleted(obj) || !isApproved(obj);

            // don't actually start the processing if there is no need for it
            boolean needsProcessing = ctx.force || delete || !isUpToDate(obj);
            if (!needsProcessing) {
                state().processed(id); // in the end resolves to "skipped"
                continue;
            }

            if (delete) {
                // clean-up parsed attributes, only keep what is relevant
                obj.getAttributes().clear();
            } else {
                try {
                    // additional attributes calculation and cleanup is necessary
                    resolveAdditionalAttributes(moduleItem, obj, parser.getLanguage());
                } catch (MdsApiConnectionException exc) {
                    state().failed(id);
                    ErrorHandling.capture(exc, "Exception updating module references of MDS object {}", id);
                }
            }

            // do the processing
            if (!state().hasFailed(id)) {
                if (delete) {
                    process(obj, Operation.DELETE);
                } else {
                    // update visibility flag for all attributes according to collection approvals
                    String orgUnit = Objects.requireNonNull(extractOrgUnit(obj));
                    obj.getAttributes().forEach(attr -> {
                        attr.setVisible(this.approvalHelper.isApproved(attr, orgUnit));
                    });
                    process(obj, Operation.UPSERT);
                }
            }

            // if sync was ok, also sync attachment images if needed
            if (state().hasSucceeded(id) && includingAttachments && !delete && moduleItem.isHasAttachments()) {
                try {
                    resolveAttachments(moduleItem, ctx.language);
                } catch (MdsApiConnectionException exc) {
                    state().failed(id);
                    ErrorHandling.capture(exc, "Exception updating attachments of MDS object {}", id);
                }
            }

            // if sync was ok, also update referenced persons
            if (state().hasSucceeded(id) && !delete) {
                try {
                    resolveInvolvedParties(moduleItem, true, ctx.language);
                } catch (MdsApiConnectionException exc) {
                    state().failed(id);
                    ErrorHandling.capture(exc, "Exception updating involved parties of MDS object {}", id);
                }
            }

            // if sync was ok, also update referenced exhibitions
            if (state().hasSucceeded(id) && !delete) {
                try {
                    resolveExhibitions(moduleItem, ctx.language);
                } catch (MdsApiConnectionException exc) {
                    state().failed(id);
                    ErrorHandling.capture(exc, "Exception updating exhibitions of MDS object {}", id);
                }
            }

            // if sync was ok, also update search index if desired
            // index-update on delete not required, we do have a delete trigger on smb.objects table
            // TODO: handle all possible updates also with triggers - but collect changes over multiple tables
            if (state().hasSucceeded(id) && getIndexerConfig().isShouldUpdate() && !delete) {
                try {
                    LOGGER.debug("Updating search index...");
                    getIndexerClient().notifyUpdated(id);
                } catch (Exception exc) {
                    state().failed(id);
                    ErrorHandling.capture(exc, "Exception updating search-index for MDS object {}", id);
                }
            }
        }

        logStatistics(state().getProcessedIds().size(), state());
        return state();
    }

    protected static boolean isApproved(final PrincipalObject obj) {
        // TODO use constants, do not duplicate key-name logic here
        Map<String, String> approvedFilter = getSMBFilterValues(MODULE_OBJECTS);
        Map.Entry<String, String> typeFilter = findFirst(approvedFilter.entrySet(), e -> e.getKey().endsWith(".TypeVoc"));
        Map.Entry<String, String> publicationFilter = findFirst(approvedFilter.entrySet(), e -> e.getKey().endsWith(".PublicationVoc"));
        if (typeFilter == null || publicationFilter == null) {
            // no filter applies
            return true;
        }
        String typeKey = typeFilter.getKey() + ".id";
        AttributeValue typeAttr = findFirst(obj.getAttributes(), a -> typeKey.equals(a.getKey()) && typeFilter.getValue().equals(a.getValue()));
        if (typeAttr == null) {
            // object does not match the filter
            return false;
        }
        // determine key of repeatable group item - it's IMPORTANT that both filters apply on the same item
        String itemFqKey = StringUtils.substringBefore(typeAttr.getFqKey(), ".TypeVoc[");
        String publicationKey = publicationFilter.getKey() + ".id";
        AttributeValue publicationAttr = findFirst(obj.getAttributes(), a -> publicationKey.equals(a.getKey()) && a.getFqKey().startsWith(itemFqKey));
        // check if object matches the publication filter
        return publicationAttr != null && publicationFilter.getValue().equals(publicationAttr.getValue());
    }

    private void resolveAttachments(final ModuleItem objectItem, final String language) throws MdsApiConnectionException {
        this.attachmentsResolverProvider.getObject().parseAndProcessReferences(objectItem, true, language);
    }

    private void resolveExhibitions(final ModuleItem objectItem, final String language) throws MdsApiConnectionException {
        this.exhibitionsResolverProvider.getObject().parseAndProcessReferences(objectItem, true, language);
    }

    private void resolveInvolvedParties(final ModuleItem parentItem, final boolean isObjectItem, final String language) throws MdsApiConnectionException {
        this.involvedPartiesResolverProvider.getObject().parseAndProcessReferences(parentItem, isObjectItem, language);
    }

    private boolean isUpToDate(final MdsItem obj) {
        AttributeValue lastModifiedAttr = findFirst(obj.getAttributes(), a -> FIELD_LAST_MODIFIED.equals(a.getKey()));
        if (lastModifiedAttr == null || lastModifiedAttr.getValue() == null) {
            // no info available - we need to assume object is not up-to-date
            return false;
        }
        OffsetDateTime syncedTime = this.objectService.getLastUpdated(obj.getMdsId());
        if (syncedTime == null) {
            // never synced, hence not up-to-date
            return false;
        }

        // compare update and sync dates
        OffsetDateTime lastModified = toOffsetDateTime(Objects.requireNonNull(lastModifiedAttr.getValue()));
        boolean upToDate = !lastModified.isAfter(syncedTime);
        if (upToDate) {
            LOGGER.debug("Skipping sync of {}. Object is up-to-date ({} <= {})", obj.getMdsId(), lastModified, syncedTime);
        }
        return upToDate;
    }

    private void resolveAdditionalAttributes(final ModuleItem moduleItem, final PrincipalObject obj, final String language)
            throws MdsApiConnectionException {

        String exhibitionSpace = calculateExhibitionSpace(moduleItem);
        obj.setExhibitionSpace(exhibitionSpace);

        List<GeographicalReference> geoLocs = extractGeoRefs(moduleItem);
        obj.setGeoLocs(geoLocs);

        List<MaterialReference> materialRefs = extractMaterials(moduleItem);
        obj.setMaterials(materialRefs);

        List<AttributeValue> literature = resolveModuleReferences(moduleItem, "ObjLiteratureRef", language);
        obj.getAttributes().addAll(literature);

        // TODO remove this - we'll use resolveExhibitions only
        List<AttributeValue> exhibitions = resolveModuleReferences(moduleItem, "ObjRegistrarRef", language);
        obj.getAttributes().addAll(exhibitions);

        List<AttributeValue> provenance = resolveModuleReferences(moduleItem, "ObjOwnership001Ref", language);
        obj.getAttributes().addAll(provenance);

        // TODO remove this - we'll use resolveInvolvedParties only
        List<AttributeValue> involvedParties = resolveModuleReferences(moduleItem, "ObjPerAssociationRef", language);
        obj.getAttributes().addAll(involvedParties);
    }

    private List<AttributeValue> resolveModuleReferences(
            final ModuleItem moduleItem,
            final String moduleRefName,
            final String language) throws MdsApiConnectionException {

        // prepare response
        List<AttributeValue> attributes = new ArrayList<>();

        // find references
        ModuleReference moduleRef = findModuleRef(moduleItem.getModuleReference(), moduleRefName);
        if (moduleRef == null) {
            return attributes;
        }

        // fetch referenced module items and prepare parser
        Module module = fetchReferencedModule(moduleRef, language);
        ModuleItemParser<?> parser = ModuleItemParserFactory.getParser(moduleRef.getTargetModule(), language);

        // We keep our own list from where we remove found references. This is required because
        // there may be multiple references for the same id, and we want to make sure, we don't always
        // find the same sequence number in such case.
        List<ModuleReferenceItem> refItems = new ArrayList<>(moduleRef.getModuleReferenceItem());

        // parse nested module items
        for (ModuleItem nestedItem : module.getModuleItem()) {
            ModuleReferenceItem refItem = Objects.requireNonNull(findModuleRefItem(refItems, nestedItem.getId()));
            refItems.remove(refItem);
            int seqNo = ValueExtractor.extractSortInfo(refItem);
            List<AttributeValue> nestedAttributes = parser.parseModuleItem(nestedItem).getAttributes();
            if ("ObjRegistrarRef".equals(moduleRefName)) {
                // "Registrar" has yet another level of reference to "Exhibition"
                nestedAttributes.addAll(resolveModuleReferences(nestedItem, "RegExhibitionRef", language));
            }
            if ("ObjOwnership001Ref".equals(moduleRefName)) {
                // "Ownership" has yet another level of reference to "Person"
                nestedAttributes.addAll(resolveModuleReferences(nestedItem, "OwnPersonMNRef", language));
            }
            if ("OwnPersonMNRef".equals(moduleRefName)) {
                // the "moduleItem" is not actually an Object here but an Ownership. However, we are storing the referenced
                // persons in our DB, so we can offer search support also for these persons
                resolveInvolvedParties(moduleItem, false, language);
            }
            // we need to adjust the parsed keys by prepending parent info
            nestedAttributes.forEach(attr -> {
                String nestedFqKey = StringUtils.substringAfter(attr.getFqKey(), "].");
                String fqKey = String.format("[%d].%s.moduleReferenceItem[%s].%s",
                        moduleItem.getId(), moduleRefName, toItemId(nestedItem.getId(), seqNo), nestedFqKey);
                attr.setFqKey(fqKey);
                attr.setKey(toKey(fqKey));
            });
            attributes.addAll(nestedAttributes);
        }

        // done
        return attributes;
    }

    private @Nullable String calculateExhibitionSpace(final ModuleItem moduleItem) {
        return new ExhibitionSpaceRule().apply(moduleItem);
    }

    private List<GeographicalReference> extractGeoRefs(final ModuleItem moduleItem) {
        return findGroupItems(moduleItem, "ObjGeograficGrp").stream().map(groupItem -> {
            List<Thesaurus> thesauri = extractThesauri(groupItem);
            int sequence = ValueExtractor.extractSortInfo(groupItem);
            GeographicalReference ref = new GeographicalReference(groupItem.getId(), moduleItem.getId(), sequence);
            ref.setDetails(ValueExtractor.extractValue(findDataField(groupItem.getDataField(), "DetailsTxt")));
            ref.setThesauri(thesauri);
            return ref;
        }).sorted(BY_SEQUENCE).toList();
    }

    private List<MaterialReference> extractMaterials(final ModuleItem moduleItem) {
        return findGroupItems(moduleItem, "ObjMaterialTechniqueGrp").stream().map(groupItem -> {
            int sequence = ValueExtractor.extractSortInfo(groupItem);
            MaterialReference ref = new MaterialReference(groupItem.getId(), moduleItem.getId(), sequence);
            ref.setDetails(ValueExtractor.extractValue(findDataField(groupItem.getDataField(), "ExportClb")));
            ref.setThesauri(extractThesauri(groupItem));
            return ref;
        }).sorted(BY_SEQUENCE).toList();
    }

    private List<Thesaurus> extractThesauri(final RepeatableGroupItem groupItem) {
        return groupItem.getVocabularyReference().stream().map(vocRef -> {
            VocabularyReferenceItem vocRefItem = Objects.requireNonNull(vocRef.getVocabularyReferenceItem());
            Thesaurus thesaurus = new Thesaurus(Long.parseLong(vocRefItem.getId()), vocRef.getName());
            thesaurus.setName(nonNullVocName(vocRefItem));
            thesaurus.setInstance(vocRef.getInstanceName());
            return thesaurus;
        }).toList();
    }

    private List<RepeatableGroupItem> findGroupItems(final ModuleItem moduleItem, final String groupName) {
        RepeatableGroup group = findGroup(moduleItem.getRepeatableGroup(), groupName);
        return group == null ? Collections.emptyList() : group.getRepeatableGroupItem();
    }

    private <T extends MdsItem> ModuleItemParser<T> newObjectParser(final String language) {
        ModuleItemParser<T> parser = ModuleItemParserFactory.getParser(getModuleName(), language);
        parser.addIgnorableKeys(getIgnorableKeys());
        return parser;
    }

    private String[] getIgnorableKeys() {
        // get configured ignorable keys
        List<String> keys = new ArrayList<>(this.ignorableKeyService.getIgnorableKeys());
        // add certain module-references - we are going to resolve them additionally later
        keys.add("ObjLiteratureRef");
        keys.add("ObjRegistrarRef");
        keys.add("ObjOwnership001Ref");
        // put the keys in our cache
        return keys.toArray(String[]::new);
    }
}
