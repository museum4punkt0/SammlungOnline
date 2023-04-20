package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.GeoData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class GeographicalReferenceNormalizer extends ThesaurusResolvingNormalizer<Data[]> {

    private static final List<String> TYPES_BLACKLIST = List.of(
            "",
            "Statistischer Bezug",
            "Fundort Ausgabe",
            "Fundort aktuell", "Fundort (aktuell)", "Fundort (aktueller)",
            "Fundort normiert", "Fundort (normiert)",
            "Fundort Variante", "Fundort (Variante)",
            "Fundort historisch 1800", "Fundort (historisch 1800)",
            "Fundort historisch 1900", "Fundort (historisch 1900)",
            "Fundort historisch 2000", "Fundort (historisch 2000)"
    );

    public GeographicalReferenceNormalizer(final ObjectProvider<GraphQlService> graphQl) {
        super(GEOGRAPHICAL_REFERENCES_ATTRIBUTE, graphQl);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjGeograficGrp.DetailsTxt",
                "ObjGeograficGrp.GeopolVoc",
                "ObjGeograficGrp.PlaceILSVoc",
                "ObjGeograficGrp.PlaceEgyptVoc",
                "ObjGeograficGrp.PlaceAntiqueVoc",
                "ObjGeograficGrp.PlaceVoc",
                "ObjGeograficGrp.RoleVoc",
                "ObjGeograficGrp.SortLnu",
                "ObjGeograficGrp.TypeVoc",
        };
    }

    private Function<List<ObjectData.GeographicalReference>, List<ObjectData.GeographicalReference>> getBusinessRuleFilter() {
        return (list) -> list.stream().filter(ref -> {
            GeoData geoData = ref.getFragments().getGeoData();
            if (geoData.getTypeVocId() != null && isBlacklisted(((Number) geoData.getTypeVocId()).longValue())) {
                return false;
            }
            return StringUtils.isNotEmpty(geoData.getDetails()) || geoData.getPlaceVocId() != null;
        }).collect(Collectors.toList());
    }

    @Override
    public @Nullable Data[] resolveAttributeValue(final ObjectData source, final String language) {
        List<Data> refs = new ArrayList<>();
        for (ObjectData.GeographicalReference ref : getBusinessRuleFilter().apply(source.getGeographicalReferences())) {
            GeoData geoData = ref.getFragments().getGeoData();
            Data dto = resolveReference(geoData, language);
            refs.add(dto);
        }
        return refs.isEmpty() ? null : refs.toArray(Data[]::new);
    }

    private Data resolveReference(final GeoData ref, final String language) {
        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, ref.getId())
                .setNonNullAttribute("placeId", ref.getPlaceVocId())
                .setNonNullAttribute("typeId", ref.getTypeVocId())
                .setNonNullAttribute("geopolId", ref.getGeopolVocId())
                .setNonNullAttribute("roleId", ref.getRoleVocId())
                .setNonNullAttribute("details", StringUtils.trimToNull(ref.getDetails()))
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(ref, language));
    }

    private @Nullable String buildTextValue(final GeoData ref, final String language) {

        String place = resolveThesaurusLabel(ref.getPlaceVocId(), language);
        String details = ref.getDetails(); // already translated
        String type = resolveThesaurusLabel(ref.getTypeVocId(), language);
        String geopol = resolveThesaurusLabel(ref.getGeopolVocId(), language);

        boolean hasPlace = StringUtils.isNotBlank(place);
        boolean hasDetails = StringUtils.isNotBlank(details);
        boolean hasType = StringUtils.isNotBlank(type);
        boolean hasGeopol = StringUtils.isNotBlank(geopol);

        StringBuilder sb = new StringBuilder();
        if (hasType) {
            sb.append(type.trim()).append(':');
        }
        if (hasPlace) {
            sb.append(' ').append(place.trim());
            if (hasDetails) {
                sb.append(',');
            }
        }
        if (hasDetails) {
            sb.append(' ').append(details.trim());
        }
        if (hasGeopol) {
            sb.append(' ').append('(').append(geopol.trim()).append(')');
        }
        return sb.length() == 0 ? null : sb.toString().trim();
    }

    private boolean isBlacklisted(final Long typeVocId) {
        ThesaurusData entry = fetchThesaurus(typeVocId);
        return entry != null && TYPES_BLACKLIST.contains(entry.getName());
    }
}
