package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.NormalizerBase;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.Optional;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class LongDescriptionNormalizer extends NormalizerBase<String> {

    public LongDescriptionNormalizer() {
        super(LONG_DESCRIPTION_ATTRIBUTE);
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source) {
        Data[] items = findGroupItems(source, "ObjTextOnlineGrp");
        Optional<Data> data = Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, "TextClb") && hasTypeVoc(item, "Online Beschreibung"))
                .findFirst();
        return data.map(value -> value.<String>getTypedAttribute("TextClb")).orElse(null);
    }
}
