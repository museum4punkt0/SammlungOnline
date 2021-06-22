package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.springframework.lang.Nullable;

/**
 * Defines a converter to create attribute values from source object.
 * @param <VALUE> type of attribute value
 */
public interface Normalizer<VALUE> {

    /**
     * Returns the name of the attribute that this converter can create a value for
     * @return name of target attribute
     */
    String getAttributeKey();

    /**
     * Creates the value for an attribute. Business logic is applied to calculate
     * the best possible value from the given source object.
     * @param source source object providing input for calculation
     * @return attribute value
     */
    @Nullable VALUE resolveAttributeValue(final ObjectData source);

}
