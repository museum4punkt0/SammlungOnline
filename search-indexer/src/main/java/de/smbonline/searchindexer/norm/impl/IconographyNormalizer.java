package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.norm.ValueExtractor;
import de.smbonline.searchindexer.dto.Data;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class IconographyNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String[] KEYWORD_VOC_CANDIDATES = {
            "KeywordProjectVoc",
            "KeywordANTVoc",
            "KeywordEMVoc",
            "KeywordVoc"
    };

    // marker attribute to prevent duplicate logic in applyFilter and pickValues
    // attribute value is set in applyFilter and used in pickValues
    private static final String CALCULATED_VALUE = "__iconography#calculatedValue";

    public IconographyNormalizer() {
        super(ICONOGRAPHY_ATTRIBUTE, "ObjIconographyGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjIconographyGrp.SortLnu",
                "ObjIconographyGrp.KeywordProjectVoc",
                "ObjIconographyGrp.KeywordANTVoc",
                "ObjIconographyGrp.KeywordEMVoc",
                "ObjIconographyGrp.KeywordVoc",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> {
                    for (String voc : KEYWORD_VOC_CANDIDATES) {
                        String value = ValueExtractor.extractVoc(item, voc);
                        if (value != null) {
                            item.setAttribute(CALCULATED_VALUE, value);
                            return true;
                        }
                    }
                    return false;
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(item -> item.<String>getTypedAttribute(CALCULATED_VALUE))
                .toArray(String[]::new);
    }
}
