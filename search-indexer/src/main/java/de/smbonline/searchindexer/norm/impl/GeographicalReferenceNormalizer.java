package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import io.reactivex.rxjava3.annotations.Nullable;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class GeographicalReferenceNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final List<String> TYPES_BLACKLIST = Arrays.asList(
            "",
            "Statistischer Bezug",
            "Fundort Ausgabe", "Fundort aktuell", "Fundort historisch 1800", "Fundort historisch 1900", "Fundort historisch 2000", "Fundort normiert", "Fundort Variante"
    );

    public GeographicalReferenceNormalizer() {
        super(GEOGRAPHICAL_REFERENCES_ATTRIBUTE, "ObjGeograficGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> {
                    String type = item.getTypedAttribute("TypeVoc");
                    if (TYPES_BLACKLIST.contains(type)) {
                        return false;
                    }
                    return hasAttributeValue(item, "DetailsTxt") || hasPlaceVoc(item);
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(GeographicalReferenceNormalizer::extractGeoInfo)
                .toArray(String[]::new);
    }

    private static String extractGeoInfo(final Data item) {
        String place = extractPlaceVoc(item);
        String details = item.getTypedAttribute("DetailsTxt");
        String type = item.getTypedAttribute("TypeVoc");
        String geopol = item.getTypedAttribute("GeopolVoc");

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
        return sb.toString().trim();
    }

    private static boolean hasPlaceVoc(final Data item) {
        return extractPlaceVoc(item) != null;
    }

    private static @Nullable String extractPlaceVoc(final Data item) {
        String[] candidates = {
                "PlaceILSVoc",  // ISL - yes, ILS typo is correct here
                "PlaceEgyptVoc", // ÄMP
                "PlaceAntiqueVoc", // ANT
                "PlaceVoc"
        };
        for (String candidate : candidates) {
            if (hasAttributeValue(item, candidate)) {
                return item.getTypedAttribute(candidate);
            }
        }
        return null;
    }
}
