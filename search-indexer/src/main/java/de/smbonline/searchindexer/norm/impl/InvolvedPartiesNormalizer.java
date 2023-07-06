package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.InvolvedPartyData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class InvolvedPartiesNormalizer extends ThesaurusResolvingNormalizer<Data[]> {

    private static final List<String> ROLES_BLACKLIST = Arrays.asList(
            null, "", "Leihgeber", "Mäzen", "Nachlasser", "Person", "Veräußerer", "Vorbesitzer"
    );

    public InvolvedPartiesNormalizer(final ObjectProvider<GraphQlService> graphQl) {
        super(INVOLVED_PARTIES_ATTRIBUTE, graphQl);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjPerAssociationRef",
                "ObjPerAssociationRef.PerDateGrp.PreviewVrt",
                "ObjPerAssociationRef.PerDateGrp.SortingLnu",
                "ObjPerAssociationRef.PerDateGrp.TypeVoc",
                "ObjPerAssociationRef.PerNennformTxt",
                "ObjPerAssociationRef.AttributionVoc",
                "ObjPerAssociationRef.RoleVoc",
                "ObjPerAssociationRef.SortLnu",
        };
    }

    private Function<List<InvolvedPartyData>, List<InvolvedPartyData>> getBusinessRuleFilter() {
        return (list) -> list.stream()
                .filter(ref -> ref.getRole() != null && !ROLES_BLACKLIST.contains(ref.getRole().getName()))
                .collect(Collectors.toList());
    }

    @Override
    public @Nullable Data[] resolveAttributeValue(final ObjectData source, final String language) {
        List<Data> refs = new ArrayList<>();
        List<InvolvedPartyData> involvedParties = fetchInvolvedParties(((Number) source.getId()).longValue());
        for (InvolvedPartyData party : getBusinessRuleFilter().apply(involvedParties)) {
            Data dto = resolveReference(party, language);
            refs.add(dto);
        }
        return refs.isEmpty() ? null : refs.toArray(Data[]::new);
    }

    private Data resolveReference(final InvolvedPartyData ref, final String language) {

        Long roleId = ref.getRole() == null ? null : ((Number) ref.getRole().getId()).longValue();
        Long attributionId = ref.getAttribution() == null ? null : ((Number) ref.getAttribution().getId()).longValue();
        String denomination = roleId == null ? null : resolveThesaurusLabel(roleId, language, true);
        String attribution = attributionId == null ? null : resolveThesaurusLabel(attributionId, language, false);
        String searchLink = Links.internal(INVOLVED_PARTIES_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + ref.getPerson().getId());

        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, ref.getPerson().getId())
                .setNonNullAttribute("name", ref.getPerson().getName())
                .setNonNullAttribute("dateRange", ref.getPerson().getDateRange())
                .setNonNullAttribute("denominationId", roleId)
                .setNonNullAttribute("attributionId", attributionId)
                .setNonNullAttribute("search", searchLink)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(ref, denomination, attribution, false))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, buildTextValue(ref, denomination, attribution, true));
    }

    private @Nullable String buildTextValue(
            final InvolvedPartyData ref,
            final @Nullable String denomination,
            final @Nullable String attribution,
            final boolean markup) {
        String personName = ref.getPerson().getName();
        String dateRange = ref.getPerson().getDateRange();

        boolean hasPerson = StringUtils.isNotBlank(personName);
        boolean hasDates = StringUtils.isNotBlank(dateRange);
        boolean hasDenomination = StringUtils.isNotBlank(denomination);
        boolean hasAttribution = StringUtils.isNotBlank(attribution);

        StringBuilder sb = new StringBuilder();
        if (hasPerson) {
            if (hasAttribution) {
                String template = markup ? "<span>%s:</span> " : "%s: ";
                sb.append(template.formatted(attribution));
            }
            if (markup) {
                String searchParam = INVOLVED_PARTIES_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + ref.getPerson().getId();
                sb.append(Links.internalHTML(searchParam, personName.trim()));
            } else {
                sb.append(personName.trim());
            }
            if (hasDates) {
                String template = markup ? " <span>(%s)</span>" : " (%s)";
                sb.append(template.formatted(dateRange));
            }
            if (hasDenomination) {
                String template = markup ? ", <span>%s</span>" : ", %s";
                sb.append(template.formatted(denomination.trim()));
            }
        }
        if (sb.length() == 0) {
            return null;
        }
        return markup ? "<div>%s</div>".formatted(sb) : sb.toString().trim();
    }

    private List<InvolvedPartyData> fetchInvolvedParties(final Long objectId) {
        return this.graphQl.getObject().fetchInvolvedParties(objectId);
    }
}