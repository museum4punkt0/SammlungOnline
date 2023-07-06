package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.AssortmentData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.NormalizerBase;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class AssortmentsNormalizer extends NormalizerBase<String[]> {

    private static final Logger LOGGER = LoggerFactory.getLogger(AssortmentsNormalizer.class);

    private enum AssortmentType {

        OBJECT_GROUP,
        SEARCH,
        SPECIFIC;

        private static @Nullable AssortmentType of(final String something) {
            for (AssortmentType type : values()) {
                if (type.name().equalsIgnoreCase(something)) {
                    return type;
                }
            }
            return null;
        }
    }

    private final ObjectProvider<? extends MappingSupplier> graphQl;

    public AssortmentsNormalizer(final ObjectProvider<? extends MappingSupplier> graphQl) {
        super(ASSORTMENTS_ATTRIBUTE);
        this.graphQl = graphQl;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjObjectGroupsRef.__id",
                "ObjObjectGroupsRef.OgrNameText",
        };
    }

    @Override
    public @Nullable String[] resolveAttributeValue(final ObjectData source, final String language) {
        Set<String> assortmentKeys = new TreeSet<>();
        for (AssortmentData assortment : fetchAssortments(language)) {
            if (isLinked(assortment, ((Number) source.getId()).longValue())) {
                // In case we have a subgroup "1234.5678" we use "1234" as assortment key.
                // Reason is only the main assortments are available for searching - an API user does not know about subgroups.
                String key = StringUtils.substringBefore(assortment.getKey(), ".");
                assortmentKeys.add(key);
            }
        }
        return assortmentKeys.isEmpty() ? null : assortmentKeys.toArray(String[]::new);
    }

    private boolean isLinked(final AssortmentData assortment, final Long objectId) {
        AssortmentType type = AssortmentType.of(assortment.getQueryType());
        if (type != null) {
            switch (type) {
                case OBJECT_GROUP:
                case SPECIFIC:
                    List<Long> objectIds = assortment.getObjects().stream()
                            .map(obj -> ((Number) obj.getId()).longValue()).toList();
                    return objectIds.contains(objectId);
                case SEARCH:
                    String query = assortment.getSearchQuery();
                    // TODO check if object matches the query
                    return false;
                default:
                    LOGGER.warn("Unimplemented assortment-type mapping for {}", assortment.getQueryType());
            }
        }
        return false;
    }

    private List<AssortmentData> fetchAssortments(final String language) {
        return this.graphQl.getObject().fetchAssortments(language);
    }
}
