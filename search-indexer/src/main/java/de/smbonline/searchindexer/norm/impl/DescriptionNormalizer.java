package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.NormalizerBase;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class DescriptionNormalizer extends NormalizerBase<Data> {

    public DescriptionNormalizer() {
        super(DESCRIPTION_ATTRIBUTE);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjTextOnlineGrp.SortLnu",
                "ObjTextOnlineGrp.TextClb",
                "ObjTextOnlineGrp.TextHTMLClb",
                "ObjTextOnlineGrp.TypeVoc",
        };
    }

    @Override
    public @Nullable Data resolveAttributeValue(final ObjectData source, final String language) {
        Data[] items = findGroupItems(source, "ObjTextOnlineGrp");
        Optional<Data> data = Arrays.stream(items)
                .filter(item -> hasTypeVoc(item, "Online Beschreibung")
                        && hasAttributeValue(item, "TextClb") && hasAttributeValue(item, "TextHTMLClb")
                ).findFirst();
        return data.map(item -> {
            String plain = Objects.requireNonNull(item.getTypedAttribute("TextClb"));
            String html = Objects.requireNonNull(item.<String>getTypedAttribute("TextHTMLClb"))
                    // remove manual line-breaks and comments
                    .replaceAll("(\\\\r|\\\\n)", " ")
                    .replaceAll("<!--.+?-->\\s*", "")
                    // unescape quotes
                    .replaceAll("\\\\\"", "\"");
            html = StringUtils.appendIfMissing(StringUtils.prependIfMissing(html, "<div>"), "</div>");
            return new Data()
                    .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, plain)
                    .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, html);
        }).orElse(null);
    }
}
