package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.tuple.Pair;

import java.util.Arrays;
import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class SignatureNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final Pair<String, String> SIGNATURES_DISTINGUISHER =
            Pair.of("_UserOalTextSTxt", "Signaturen und Inschriften");

    public SignatureNormalizer() {
        super(SIGNATURES_ATTRIBUTE, "ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp", SignatureNormalizer::sort);
    }

    private static Data[] sort(final Map<String, Data> items) {
        return sortByAttribute(items.values().toArray(Data[]::new), "_UserOalSortierungLLnu");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> {
                    String key = SIGNATURES_DISTINGUISHER.getKey();
                    String value = SIGNATURES_DISTINGUISHER.getValue();
                    return hasAttributeValue(item, "_UserOalTextMClb") && hasAttributeValue(item, key, value);
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(item -> item.<String>getTypedAttribute("_UserOalTextMClb"))
                .toArray(String[]::new);
    }
}
