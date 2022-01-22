package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class TitlesNormalizer extends MultipleHitsSortedNormalizer<String> {

    public TitlesNormalizer() {
        super(TITLES_ATTRIBUTE, "ObjObjectTitleGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, "TitleTxt"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(item -> StringUtils.trim(item.getTypedAttribute("TitleTxt")))
                .toArray(String[]::new);
    }
}
