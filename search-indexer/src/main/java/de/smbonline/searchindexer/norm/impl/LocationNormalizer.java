package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.BuildingData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.LOCATION_ATTRIBUTE;

public class LocationNormalizer implements Normalizer<String> {

    @Override
    public String getAttributeKey() {
        return LOCATION_ATTRIBUTE;
    }

    private final String separator;
    private final ObjectProvider<? extends MappingSupplier> mappings;

    public LocationNormalizer(final ObjectProvider<? extends MappingSupplier> supplier, final String separator) {
        this.mappings = supplier;
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
        BuildingData building = this.mappings.getObject().fetchBuilding(buildingCandidate);
        return building == null ? buildingCandidate : building.getTitle();
    }
}
