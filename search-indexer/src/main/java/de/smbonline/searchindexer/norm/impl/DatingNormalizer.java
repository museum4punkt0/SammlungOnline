package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class DatingNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String DATE_TEXT_FIELD = "PreviewVrt";

    public DatingNormalizer() {
        super(DATING_ATTRIBUTE, "ObjDateGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, DATE_TEXT_FIELD))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(DatingNormalizer::extractDateInfo)
                .toArray(String[]::new);
    }

    private static String extractDateInfo(final Data item) {
        String dateTxt = Objects.requireNonNull(item.getTypedAttribute(DATE_TEXT_FIELD));
        String typeVoc = item.getTypedAttribute("TypeVoc");
        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(typeVoc)) {
            sb.append(typeVoc.trim()).append(": ");
        }
        sb.append(dateTxt.trim());
        return sb.toString();
    }
}
