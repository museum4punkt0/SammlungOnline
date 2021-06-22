package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class SignatureNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String SORT_ATTRIBUTE = "_UserOalSortierungLLnu";
    private static final String DISPLAY_ATTRIBUTE = "_UserOalTextMClb";
    private static final String TYPE_ATTRIBUTE = "_UserOalTextSTxt";

    public SignatureNormalizer() {
        super(SIGNATURES_ATTRIBUTE, "ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, DISPLAY_ATTRIBUTE))
                // it's a bit weird to do the sorting here, but...
                .sorted((a, b) -> {
                    int sortA = a.hasAttribute(SORT_ATTRIBUTE)
                            ? Integer.parseInt(Objects.requireNonNull(a.getTypedAttribute(SORT_ATTRIBUTE)))
                            : Integer.MAX_VALUE;
                    int sortB = b.hasAttribute(SORT_ATTRIBUTE)
                            ? Integer.parseInt(Objects.requireNonNull(b.getTypedAttribute(SORT_ATTRIBUTE)))
                            : Integer.MAX_VALUE;
                    return sortA - sortB;
                }).toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(SignatureNormalizer::buildAttributeValue)
                .toArray(String[]::new);
    }

    private static String buildAttributeValue(final Data item) {
        String type = item.getTypedAttribute(TYPE_ATTRIBUTE);
        String value = item.getTypedAttribute(DISPLAY_ATTRIBUTE);
        assert value != null; // null values already filtered out
        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(type)) {
            sb.append(type.trim()).append(": ");
        }
        sb.append(value.trim());
        return sb.toString();
    }
}
