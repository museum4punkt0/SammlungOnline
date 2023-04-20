package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.norm.ValueExtractor;
import de.smbonline.searchindexer.dto.Data;

import java.util.Arrays;
import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class KeywordNormalizer extends MultipleHitsSortedNormalizer<String> {

    public KeywordNormalizer() {
        super(KEYWORDS_ATTRIBUTE, "ObjSWDGrp", KeywordNormalizer::sort);
    }

    private static Data[] sort(final Map<String, Data> items) {
        return sortByAttribute(items.values().toArray(Data[]::new), "Sort001Lnu");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[] {
                "ObjSWDGrp.Sort001Lnu",
                "ObjSWDGrp.SWDVoc",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "SWDVoc"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(item -> ValueExtractor.extractVoc(item, "SWDVoc"))
                .toArray(String[]::new);
    }
}

