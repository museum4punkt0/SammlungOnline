package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class DatingNormalizer extends MultipleHitsSortedNormalizer<String> {

    public DatingNormalizer() {
        super(DATING_ATTRIBUTE, "ObjDateGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] repeatableGroupItems) {
        return Arrays.stream(repeatableGroupItems)
                .filter(item -> hasAttributeValue(item, "DateTxt"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] repeatableGroupItems) {
        return Arrays.stream(repeatableGroupItems)
                .map(DatingNormalizer::extractDateInfo)
                .toArray(String[]::new);
    }

    private static String extractDateInfo(final Data item) {
        String dateTxt = item.getTypedAttribute("DateTxt");
        assert dateTxt != null; // null values already filtered out
        String dateTypeVgr = item.getTypedAttribute("TypeVoc");
        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(dateTypeVgr)) {
            sb.append(dateTypeVgr.trim()).append(' ');
        }
        sb.append(dateTxt.trim());
        return sb.toString();
    }
}
