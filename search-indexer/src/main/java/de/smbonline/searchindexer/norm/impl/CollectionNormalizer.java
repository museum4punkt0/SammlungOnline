package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.AttributeMappingNormalizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;

public class CollectionNormalizer extends AttributeMappingNormalizer<String> {

    private static final Logger LOGGER = LoggerFactory.getLogger(CollectionNormalizer.class);

    public CollectionNormalizer() {
        super("__orgUnit", COLLECTION_ATTRIBUTE, orgUnit -> {
            for (Map.Entry<String, String> entry : collectionMapping().entrySet()) {
                if (orgUnit.startsWith(entry.getKey())) {
                    return entry.getValue();
                }
            }
            LOGGER.warn("No collection mapping found for org-unit {}", orgUnit);
            return orgUnit; // whatever we have here, we use it
        });
    }
}
