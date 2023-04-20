package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class IdNormalizer implements Normalizer<Long> {

    @Override
    public String getAttributeKey() {
        return ID_ATTRIBUTE;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "__id"
        };
    }

    @Override
    public Long resolveAttributeValue(final ObjectData source, final String language) {
        return ((Number) source.getId()).longValue();
    }
}
