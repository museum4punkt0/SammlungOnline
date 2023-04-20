package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.Normalizer;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class HighlightsNormalizer implements Normalizer<Boolean> {

    @Override
    public String getAttributeKey() {
        return IS_HIGHLIGHT_ATTRIBUTE;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjObjectGroupsRef.__id",
                "ObjObjectGroupsRef.OgrNameText",
        };
    }

    @Override
    public Boolean resolveAttributeValue(final ObjectData source, final String language) {
        return !source.getHighlights().isEmpty();
    }
}
