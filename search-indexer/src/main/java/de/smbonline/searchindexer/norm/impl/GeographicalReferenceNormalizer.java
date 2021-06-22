package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class GeographicalReferenceNormalizer extends MultipleHitsSortedNormalizer<String> {

    public GeographicalReferenceNormalizer() {
        super(GEOGRAPHICAL_REFERENCES_ATTRIBUTE, "ObjGeograficGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> hasAttributeValue(item,"PlaceVoc") || hasAttributeValue(item,"DetailTxt"))
                .toArray(Data[]::new);
    }

    @Override
    protected @Nullable String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(GeographicalReferenceNormalizer::extractGeoInfo)
                .toArray(String[]::new);
    }

    private static String extractGeoInfo(final Data item) {
        String place = item.getTypedAttribute("PlaceVoc");
        String details = item.getTypedAttribute("DetailTxt");
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
}
