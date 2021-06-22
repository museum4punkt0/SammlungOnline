package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class AttachmentsNormalizer implements Normalizer<Boolean> {

    @Override
    public String getAttributeKey() {
        return HAS_ATTACHMENTS_ATTRIBUTE;
    }

    @Override
    public Boolean resolveAttributeValue(final ObjectData source) {
        return !source.getAttachments().isEmpty();
    }
}
