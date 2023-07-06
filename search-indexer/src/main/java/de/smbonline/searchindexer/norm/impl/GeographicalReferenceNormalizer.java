package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.GeoData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import de.smbonline.searchindexer.service.GraphQlService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.urlEncode;
import static de.smbonline.searchindexer.util.Misc.wrapQuotes;
import static org.apache.commons.lang3.StringUtils.*;
import static de.smbonline.searchindexer.util.Validations.*;

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
            return isNotEmpty(geoData.getDetails()) || geoData.getPlaceVocId() != null;
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

        Long id = ref.getPlaceVocId() == null ? null : requireId(ref.getPlaceVocId());
        String place = id == null ? null : resolveThesaurusLabel(id, language, false);
        String placeHierarchical = id == null ? null : resolveThesaurusLabel(id, language, true);
        String type = resolveThesaurusLabel(ref.getTypeVocId(), language, false);
        String denomination = resolveThesaurusLabel(ref.getGeopolVocId(), language, true); // geopol ~ denomination
        String searchLink = Links.internal(buildSearchParams(id, ref.getDetails()));

        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute("typeId", ref.getTypeVocId())
                .setNonNullAttribute("denominationId", ref.getGeopolVocId())
                .setNonNullAttribute("location", place)
                .setNonNullAttribute("details", trimToNull(ref.getDetails()))
                .setNonNullAttribute("search", searchLink)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(ref, place, placeHierarchical, type, denomination, false))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, buildTextValue(ref, place, placeHierarchical, type, denomination, true));
    }

    private @Nullable String buildTextValue(
            final GeoData ref,
            final @Nullable String place,
            final @Nullable String placeHierarchical,
            final @Nullable String type,
            final @Nullable String denomination,
            final boolean markup) {

        String details = ref.getDetails();

        boolean hasPlace = isNotBlank(place);
        boolean isPlaceHierarchical = hasPlace && !equalsIgnoreCase(place, placeHierarchical);
        boolean hasDetails = isNotBlank(details);
        boolean hasType = isNotBlank(type);
        boolean hasDenomination = isNotBlank(denomination);

        StringBuilder sb = new StringBuilder();
        if (hasPlace || hasDetails) {
            if (hasType) {
                String template = markup ? "<span>%s:</span> " : "%s: ";
                sb.append(template.formatted(type.trim()));
            }
            if (hasPlace) {
                if (markup) {
                    String searchParam = buildSearchParams(requireId(ref.getPlaceVocId()), null);
                    sb.append(Links.internalHTML(searchParam, place.trim()));
                    if (isPlaceHierarchical) {
                        sb.append(" <span>%s</span>".formatted(substringAfter(placeHierarchical, place).trim()));
                    }
                } else {
                    sb.append(trim(placeHierarchical));
                }
                if (hasDetails) {
                    sb.append(", ");
                }
            }
            if (hasDetails) {
                details = details.trim();
                // if place is linked, we don't want to link details
                boolean link = markup && !hasPlace;
                if (link) {
                    String searchParam = buildSearchParams(null, details);
                    sb.append(Links.internalHTML(searchParam, details));
                } else {
                    String template = markup ? "<span>%s</span>" : "%s";
                    sb.append(template.formatted(details));
                }
            }
            if (hasDenomination) {
                String template = markup ? " <span>(%s)</span>" : " (%s)";
                sb.append(template.formatted(denomination.trim()));
            }
        }
        if (sb.length() == 0) {
            return null;
        }
        return markup ? "<div>%s</div>".formatted(sb) : sb.toString().trim();
    }

    private boolean isBlacklisted(final Long typeVocId) {
        ThesaurusData entry = fetchThesaurus(typeVocId);
        return entry != null && TYPES_BLACKLIST.contains(entry.getName());
    }

    /**
     * Builds search query term, uses id if given else the details.
     *
     * @param id      place voc id
     * @param details place string
     * @return query param
     */
    private String buildSearchParams(final @Nullable Long id, final @Nullable String details) {
        if (id == null) {
            return GEOGRAPHICAL_REFERENCES_ATTRIBUTE + ".details:" + wrapQuotes(urlEncode(details));
        } else {
            return GEOGRAPHICAL_REFERENCES_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + id;
        }
    }
}
