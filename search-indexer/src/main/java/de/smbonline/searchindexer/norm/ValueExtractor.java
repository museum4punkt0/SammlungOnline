package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class ValueExtractor {

    public static @Nullable String extractPlaceVoc(final Data item) {
        String[] candidates = {
                "PlaceILSVoc",  // ISL - yes, ILS typo is correct here
                "PlaceEgyptVoc", // ÄMP
                "PlaceAntiqueVoc", // ANT
                "PlaceVoc"
        };
        return Arrays.stream(candidates)
                .map(c -> extractVoc(item, c))
                .filter(Objects::nonNull)
                .findFirst().orElse(null);
    }

    public static @Nullable String extractVoc(final Data item, final String voc) {
        if (NormalizerBase.hasAttributeValue(item, voc)) {
            Object value = item.getAttribute(voc);
            if (value == null) {
                return null;
            }
            if (value instanceof Data) {
                return ((Data) value).getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
            }
            return value.toString();
        }
        return null;
    }
}
