package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.service.GraphQlService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.LOCATION_ATTRIBUTE;

// TODO use this in favor of LocationNormalizer
public class LocationNormalizer2 extends ThesaurusResolvingNormalizer<String> {

    public LocationNormalizer2(final ObjectProvider<GraphQlService> graphQl) {
        super(LOCATION_ATTRIBUTE, graphQl);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjCurrentLocationVoc",
                "ObjNormalLocationVoc"
        };
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source, final String language) {
        // TODO only building - neither collection, sector, level, room nor appendix
        String label = resolveThesaurusLabel(source.getLocationVocId(), language, true);
        if (label == null) {
            return null;
        }
        return label;
    }
}
