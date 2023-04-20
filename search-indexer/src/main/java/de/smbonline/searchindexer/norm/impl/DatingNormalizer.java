package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.ValueExtractor.*;

public class DatingNormalizer extends MultipleHitsSortedNormalizer<String> {

    public DatingNormalizer() {
        super(DATING_ATTRIBUTE, "ObjDateGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[] {
                "ObjDateGrp.PreviewVrt",
                "ObjDateGrp.TypeVoc",
                "ObjDateGrp.DateTxt",
                "ObjDateGrp.SortLnu",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "PreviewVrt"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(DatingNormalizer::extractDateInfo)
                .toArray(String[]::new);
    }

    private static String extractDateInfo(final Data item) {
        String dateTxt = Objects.requireNonNull(item.getTypedAttribute("PreviewVrt"));
        String typeVoc = extractVoc(item, "TypeVoc");
        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(typeVoc)) {
            sb.append(typeVoc.trim()).append(": ");
        }
        sb.append(dateTxt.trim());
        return sb.toString();
    }
}
