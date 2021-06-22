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
    public @Nullable String resolveAttributeValue(final ObjectData source) {
        String exhibitionSpace = source.getExhibitionSpace();
        if (!StringUtils.contains(exhibitionSpace, this.separator)) {
            return null;
        }
        String[] parts = StringUtils.splitByWholeSeparatorPreserveAllTokens(exhibitionSpace, this.separator);
        String building = StringUtils.defaultIfEmpty(parts[1].trim(), null);
        return buildingMapping().getOrDefault(building, building);
    }
}
