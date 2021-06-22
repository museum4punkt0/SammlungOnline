package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class HighlightsNormalizer implements Normalizer<Boolean> {

    @Override
    public String getAttributeKey() {
        return IS_HIGHLIGHT_ATTRIBUTE;
    }

    @Override
    public Boolean resolveAttributeValue(final ObjectData source) {
        return !source.getHighlights().isEmpty();
    }
}
