package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.CollectionData;
import de.smbonline.searchindexer.norm.AttributeMappingNormalizer;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;

import java.util.List;

import static de.smbonline.searchindexer.conf.ConstKt.COLLECTION_ATTRIBUTE;

public class CollectionNormalizer extends AttributeMappingNormalizer<String> {

    private static final Logger LOGGER = LoggerFactory.getLogger(CollectionNormalizer.class);

    public CollectionNormalizer(final ObjectProvider<? extends MappingSupplier> graphQl) {
        super("__orgUnit", COLLECTION_ATTRIBUTE, (orgUnit) -> resolveCollection(orgUnit, graphQl));
    }

    private static String resolveCollection(final String orgUnit, final ObjectProvider<? extends MappingSupplier> graphQl) {
        CollectionData collection = graphQl.getObject().fetchCollection(orgUnit);
        if (collection == null) {
            LOGGER.warn("No collection mapping found for org-unit {}", orgUnit);
            return orgUnit; // whatever we have here, we use it
        }
        return collection.getTitle();
    }
}
