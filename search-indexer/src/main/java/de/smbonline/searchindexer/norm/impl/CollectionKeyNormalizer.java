package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.AttributeMappingNormalizer;
import org.apache.commons.lang3.StringUtils;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class CollectionKeyNormalizer extends AttributeMappingNormalizer<String> {

    public static final String UNKNOWN_COLLECTION_KEY = "default";

    public CollectionKeyNormalizer() {
        super("__orgUnit", COLLECTION_KEY_ATTRIBUTE,
                value -> StringUtils.isBlank(value) ? UNKNOWN_COLLECTION_KEY : value.trim());
    }
}
