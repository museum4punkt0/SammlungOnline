package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.*;

/**
 * Calculates TRUE if object is exhibited, FALSE if object is not exhibited or NULL if exhibition state is unknown.
 */
public class ExhibitNormalizer implements Normalizer<Boolean> {

    private String unknownExhibitionSpace;

    public @Nullable String getUnknownExhibitionSpace() {
        return this.unknownExhibitionSpace;
    }

    public void setUnknownExhibitionSpace(final @Nullable String unknownExhibitionSpace) {
        this.unknownExhibitionSpace = unknownExhibitionSpace;
    }

    @Override
    public String getAttributeKey() {
        return IS_EXHIBIT_ATTRIBUTE;
    }

    /**
     * Returns true if exhibited, false if not exhibited and null if exhibition state is unknown.
     * @param source source object providing input for calculation
     * @return exhibition state
     */
    @Override
    public @Nullable Boolean resolveAttributeValue(final ObjectData source) {
        String space = source.getExhibitionSpace();
        if (StringUtils.isEmpty(space)) {
            return StringUtils.isEmpty(this.unknownExhibitionSpace) ? null : Boolean.FALSE;
        }
        return space.equals(this.unknownExhibitionSpace) ? null : Boolean.TRUE;
    }
}
