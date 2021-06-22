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
    public Long resolveAttributeValue(final ObjectData source) {
        return ((Number) source.getId()).longValue();
    }
}
