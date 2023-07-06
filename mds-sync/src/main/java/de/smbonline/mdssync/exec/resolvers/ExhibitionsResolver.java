package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ExhibitData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.ExhibitionService;
import de.smbonline.mdssync.dto.Exhibition;
import de.smbonline.mdssync.dto.ObjExhibition;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.ParsedMdsItem;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.parsers.ModuleItemParser;
import de.smbonline.mdssync.exec.parsers.ModuleItemParserFactory;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ExhibitionsResolver extends ModuleItemResolverBase<ParsedMdsItem> {

    private final ExhibitionService exhibitionService;

    @Autowired
    public ExhibitionsResolver(
            final MdsApiConfig mdsConfig,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerClient indexerClient,
            final ExhibitionService exhibitionService,
            final DataQueue<WrapperDTO> dataQueue) {
        super(MODULE_EXHIBITIONS, mdsConfig, indexerClient, clientFactory, dataQueue);
        this.exhibitionService = exhibitionService;
    }

    @Override
    public ResolverResult parseAndProcess(final Module module, final ResolverContext ctx) {
        return parseAndProcess(module, ctx.language, state(), null);
        // TODO reindex objects
    }

    @Override
    public ResolverResult parseAndProcessReferences(final ModuleItem parentItem, final boolean linkToParent, final String language) throws MdsApiConnectionException {

        int total = 0;
        int subtotal = 0;
        ResolverResult result = new ResolverResult();
        List<ExhibitData> oldExhibits = linkToParent ? this.exhibitionService.getExhibits(parentItem.getId()) : null;

        // "Exhibitions" are nested inside the "Registrar" Module
        // Step 1: fetch Registrar references for Object
        // Step 2: fetch Exhibition references for each Registrar

        // resolve new exhibitions
        ModuleReference registrarRef = findFirst(parentItem.getModuleReference(), ref -> MODULE_REGISTRAR.equals(ref.getTargetModule()));
        if (registrarRef != null && registrarRef.getSize() > 0) {
            Module registrar = fetchReferencedModule(registrarRef, language);
            for (ModuleItem registrarItem : registrar.getModuleItem()) {
                ModuleReference exhibitionRef = findFirst(registrarItem.getModuleReference(), ref -> MODULE_EXHIBITIONS.equals(ref.getTargetModule()));
                if (exhibitionRef != null && (subtotal = Math.toIntExact(exhibitionRef.getSize())) > 0) {
                    total += subtotal;
                    Module exhibitions = fetchReferencedModule(exhibitionRef, language);
                    parseAndProcess(exhibitions, language, result, linkToParent ? parentItem : null);
                }
            }
        }

        // delete obsolete exhibitions
        if (linkToParent) {
            Long[] newExhibitionIds = result.getSuccessfulIds().toArray(Long[]::new);
            List<ExhibitData> obsoleteExhibits = collectObsoleteExhibits(oldExhibits, newExhibitionIds);
            // TODO use DataQueue
            total += obsoleteExhibits.size();
            obsoleteExhibits.forEach(exhibit -> {
                long id = ((Number) exhibit.getExhibitionId()).longValue();
                try {
                    result.processed(id);
                    boolean deleted = this.exhibitionService.deleteExhibit(exhibit);
                    if (deleted) {
                        result.successful(id);
                    } else {
                        result.failed(id);
                    }
                } catch (Exception exc) {
                    ErrorHandling.capture(exc, "Failed to delete exhibit (object={}, exhibition={})",
                            exhibit.getObjectId(), exhibit.getExhibitionId());
                    result.failed(id);
                }
            });
        }

        logStatistics(total, result);
        return result;
    }

    private ResolverResult parseAndProcess(
            final Module module,
            final String language,
            final ResolverResult result,
            final @Nullable ModuleItem objectItem) {
        for (ModuleItem exhibitionItem : module.getModuleItem()) {
            try {
                if (isDeleted(exhibitionItem)) {
                    process(newWrapper(new Exhibition(exhibitionItem.getId()), Operation.DELETE, result));
                } else {
                    Exhibition dto = parseExhibitionData(exhibitionItem, objectItem, language);
                    process(newWrapper(dto, Operation.UPSERT, result));
                }
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Failed to sync exhibition {}", exhibitionItem.getId());
                result.failed(exhibitionItem.getId());
            }
        }
        return result;
    }

    private Exhibition parseExhibitionData(
            final ModuleItem item,
            final @Nullable ModuleItem objectItem,
            final String language) {

        ModuleItemParser<Exhibition> parser = ModuleItemParserFactory.getParser(MODULE_EXHIBITIONS, language);
        Exhibition exhibition = parser.parseModuleItem(item);
        resolveAdditionalAttributes(item, exhibition);
        if (objectItem != null) {
            // enrich exhibition DTO with relational info
            exhibition = new ObjExhibition(exhibition, objectItem.getId(), 0);
        }
        return exhibition;
    }

    private void resolveAdditionalAttributes(final ModuleItem moduleItem, final Exhibition dto) {
        dto.setTitle(extractTitle(moduleItem));
        dto.setDescription(extractDetails(moduleItem));
        dto.setLocation(extractLocation(moduleItem));
        dto.setStartDate(extractDate(moduleItem, "ExhBeginDateDat"));
        dto.setEndDate(extractDate(moduleItem, "ExhEndDateDat"));
    }

    private static @Nullable LocalDate extractDate(final ModuleItem moduleItem, final String fieldName) {
        DataField dateField = findDataField(moduleItem.getDataField(), fieldName);
        String date = extractValue(dateField);
        return date == null ? null : LocalDate.parse(date);
    }

    private static @Nullable String extractLocation(final ModuleItem item) {
        DataField locationField = findDataField(item.getDataField(), "ExhVenueDetailsTxt");
        return extractValue(locationField);
    }

    private static @Nullable String extractDetails(final ModuleItem item) {
        VirtualField detailsField = findVrtField(item.getVirtualField(), "ExhExhibitionVrt");
        String details = extractValue(detailsField);
        boolean hasDetails = StringUtils.isNotBlank(details);

        DataField organiserField = findNestedField(item, "ExhParticipantGrp", "NotesClb", Pair.of(VOC_ROLE, "organiser"));
        String organiser = extractValue(organiserField);
        boolean hasOrganiser = StringUtils.isNotEmpty(organiser);

        StringBuilder sb = new StringBuilder();
        if (hasDetails) {
            sb.append(details);
            if (hasOrganiser) {
                sb.append(", ");
            }
        }
        if (hasOrganiser) {
            sb.append("Veranstalter: ").append(organiser);
        }
        return sb.length() == 0 ? null : sb.toString();
    }

    private static @Nullable String extractTitle(final ModuleItem item) {
        DataField titleField = findNestedField(item, "ExhTitleGrp", "TitleClb", Pair.of(VOC_TYPE, "AusstTitel"));
        return extractValue(titleField);
    }

    private static @Nullable DataField findNestedField(
            final ModuleItem item,
            final String groupName,
            final String fieldName,
            final Pair<String, String> condition) {
        RepeatableGroup group = findGroup(item.getRepeatableGroup(), groupName);
        if (group != null) {
            RepeatableGroupItem groupItem = findGroupItem(group.getRepeatableGroupItem(), condition.getKey(), condition.getValue());
            if (groupItem != null) {
                return findDataField(groupItem.getDataField(), fieldName);
            }
        }
        return null;
    }

    private List<ExhibitData> collectObsoleteExhibits(final List<ExhibitData> oldExhibits, final Long[] newExhibitionIds) {
        return oldExhibits.stream().filter(oldExh -> {
            // if exhibition-ref is not found anymore, the exhibit-entry is obsolete
            return findFirst(newExhibitionIds, id -> oldExh.getExhibitionId().equals(id)) == null;
        }).toList();
    }
}
