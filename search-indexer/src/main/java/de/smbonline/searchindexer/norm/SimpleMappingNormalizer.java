package de.smbonline.searchindexer.norm;

import org.apache.commons.lang3.StringUtils;

/**
 * Simple converter that retrieves a value assigned to a given attribute key. No conversion is applied except for trimming.
 * Treats blank source values as null.
 */
public class SimpleMappingNormalizer extends AttributeMappingNormalizer<String> {

    /**
     * Creates a "converter" that retrieves the value assigned to the given attribute key.
     *
     * @param sourceKey MDS attribute key
     * @param targetKey attribute key
     */
    public SimpleMappingNormalizer(final String sourceKey, final String targetKey) {
        super(sourceKey, targetKey, value -> StringUtils.isBlank(value) ? null : value.trim());
    }
}
