package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.springframework.lang.Nullable;

/**
 * Maps an attribute value from an MDS attribute to a target value.
 *
 * @param <TYPE>
 */
public class AttributeMappingNormalizer<TYPE> extends NormalizerBase<TYPE> {

    @FunctionalInterface
    public interface Mapper<TYPE> {
        @Nullable TYPE applyMapping(final String value);
    }

    private final String mdsAttribute;
    private final Mapper<TYPE> mapper;

    public AttributeMappingNormalizer(
            final String sourceAttr,
            final String targetAttr,
            final Mapper<TYPE> mapper) {
        super(targetAttr);
        this.mdsAttribute = sourceAttr;
        this.mapper = mapper;
    }

    @Override
    public @Nullable TYPE resolveAttributeValue(final ObjectData source) {
        String value = getAttributeValue(source, this.mdsAttribute);
        return value == null ? null : this.mapper.applyMapping(value);
    }
}
