package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.FirstHitSortedNormalizer;
import de.smbonline.searchindexer.norm.ValueExtractor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class FindSpotNormalizer extends FirstHitSortedNormalizer<String> {

    public FindSpotNormalizer() {
        super(FINDSPOT_ATTRIBUTE, "ObjGeograficGrp", FindSpotNormalizer::extractFindSpot);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjGeograficGrp.DetailsTxt",
                "ObjGeograficGrp.PlaceILSVoc",
                "ObjGeograficGrp.PlaceEgyptVoc",
                "ObjGeograficGrp.PlaceAntiqueVoc",
                "ObjGeograficGrp.PlaceVoc",
                "ObjGeograficGrp.SortLnu",
                "ObjGeograficGrp.TypeVoc",
        };
    }

    public static @Nullable String extractFindSpot(final List<ObjectData.Attribute> group) {
        Optional<ObjectData.Attribute> itemAttribute = group
                .stream()
                .filter(a -> StringUtils.substringAfterLast(a.getKey(), '.').equals("TypeVoc"))
                .filter(a -> "Fundort".equals(a.getValue()))
                .findFirst();
        return itemAttribute.map(attr -> toItemFqKey(attr.getFqKey())).orElse(null);
    }

    @Override
    protected String pickValue(final Data item) {
        String place = ValueExtractor.extractPlaceVoc(item);
        String details = item.getTypedAttribute("DetailsTxt");

        boolean hasPlace = StringUtils.isNotBlank(place);
        boolean hasDetails = StringUtils.isNotBlank(details);

        StringBuilder sb = new StringBuilder();
        if (hasPlace) {
            sb.append(place.trim());
            if (hasDetails) {
                sb.append(", ");
            }
        }
        if (hasDetails) {
            sb.append(details.trim());
        }
        return sb.toString();
    }
}
