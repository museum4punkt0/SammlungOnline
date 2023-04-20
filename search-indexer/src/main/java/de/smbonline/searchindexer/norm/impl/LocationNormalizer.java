package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;

public class LocationNormalizer implements Normalizer<String> {

    @Override
    public String getAttributeKey() {
        return LOCATION_ATTRIBUTE;
    }

    private final String separator;

    public LocationNormalizer(final String separator) {
        this.separator = separator;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjCurrentLocationVrt",
                "ObjCurrentLocationVoc",
                "ObjCurrentLocationGrpVrt",
                "ObjNormalLocationVrt",
                "ObjNormalLocationVoc"
        };
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source, final String language) {
        String exhibitionSpace = source.getExhibitionSpace();
        if (!StringUtils.contains(exhibitionSpace, this.separator)) {
            return null;
        }
        String[] parts = StringUtils.splitByWholeSeparatorPreserveAllTokens(exhibitionSpace, this.separator);
        String buildingCandidate = StringUtils.defaultIfEmpty(parts[1].trim(), null);
        if (buildingCandidate == null) {
            // only if we don't have a building, the sector maybe used instead ("Friedrichswerdersche Kirche" is the case here)
            buildingCandidate = StringUtils.defaultIfEmpty(parts[2].trim(), null);
        }
        // TODO use language
        return buildingMapping().getOrDefault(buildingCandidate, buildingCandidate);
    }
}
