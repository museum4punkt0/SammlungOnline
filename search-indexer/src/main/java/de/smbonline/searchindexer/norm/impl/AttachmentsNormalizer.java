package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.Normalizer;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class AttachmentsNormalizer implements Normalizer<Boolean> {

    @Override
    public String getAttributeKey() {
        return HAS_ATTACHMENTS_ATTRIBUTE;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjMultimediaRef.__id",
                "ObjMultimediaRef.ThumbnailBoo",
        };
    }

    @Override
    public Boolean resolveAttributeValue(final ObjectData source, final String language) {
        return !source.getAttachments().isEmpty();
    }
}
