package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class LiteratureNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String MODULE_REFERENCE = "ObjLiteratureRef";
    // super class uses the ref-key itself as attribute key
    private static final String VIRTUAL_NAME_ATTRIBUTE = "ObjLiteratureRef";

    public LiteratureNormalizer() {
        super(LITERATURE_ATTRIBUTE, MODULE_REFERENCE);
    }


    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, VIRTUAL_NAME_ATTRIBUTE))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] repeatableGroupItems) {
        return Arrays.stream(repeatableGroupItems).map(
                item -> StringUtils.trim(item.getTypedAttribute(VIRTUAL_NAME_ATTRIBUTE))
        ).toArray(String[]::new);
    }
}
