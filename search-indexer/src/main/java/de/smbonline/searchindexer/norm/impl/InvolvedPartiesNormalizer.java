package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.InvolvedPartyData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
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
        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, ref.getPerson().getId())
                .setNonNullAttribute("name", ref.getPerson().getName())
                .setNonNullAttribute("dateRange", ref.getPerson().getDateRange())
                .setNonNullAttribute("roleId", ref.getRole() == null ? null : ref.getRole().getId())
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(ref, language));
    }

    private @Nullable String buildTextValue(final InvolvedPartyData ref, final String language) {
        String personName = ref.getPerson().getName();
        String dateRange = ref.getPerson().getDateRange();
        String role = resolveThesaurusLabel(ref.getRole() == null ? null : ref.getRole().getId(), language);

        boolean hasPerson = StringUtils.isNotBlank(personName);
        boolean hasDates = StringUtils.isNotBlank(dateRange);
        boolean hasRole = StringUtils.isNotBlank(role);

        StringBuilder sb = new StringBuilder();
        if (hasPerson) {
            sb.append(personName.trim());
            if (hasDates) {
                sb.append(" (").append(dateRange).append(")");
            }
            if (hasRole) {
                sb.append(", ").append(role);
            }
        }
        return sb.length() == 0 ? null : sb.toString();
    }

    private List<InvolvedPartyData> fetchInvolvedParties(final Long objectId) {
        return graphQl.getObject().fetchInvolvedParties(objectId);
    }
}