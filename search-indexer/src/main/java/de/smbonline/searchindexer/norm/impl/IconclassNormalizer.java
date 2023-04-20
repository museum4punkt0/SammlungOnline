package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class IconclassNormalizer extends MultipleHitsSortedNormalizer<String> {

    public IconclassNormalizer() {
        super(ICONCLASS_ATTRIBUTE, "ObjKeyWordsGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjKeyWordsGrp.SortLnu",
                "ObjKeyWordsGrp.KeyWordVoc",
                "ObjKeyWordsGrp.NotationTxt",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "KeyWordVoc"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(IconclassNormalizer::buildIconClassValue)
                .toArray(String[]::new);
    }

    private static String buildIconClassValue(final Data item) {
        Pair<String, String> idAndLabel = extractDataFromVoc(item.getAttribute("KeyWordVoc"));
        String externalId = StringUtils.defaultString(idAndLabel.getLeft(), item.getTypedAttribute("NotationTxt"));

        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(externalId)) {
            sb.append('[').append(externalId.replace(" ", "")).append(']').append(' ');
        }
        sb.append(idAndLabel.getRight());
        return sb.toString();
    }

    private static Pair<String, String> extractDataFromVoc(final Object voc) {

        String label = null;
        String externalId = null;

        if (voc instanceof Data) {
            label = ((Data) voc).getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
            String link = ((Data) voc).getTypedAttribute("name"); // yes, the name is the link
            if (link != null && StringUtils.startsWith(link, "http")) {
                externalId = link.substring(link.lastIndexOf('/') + 1);
            }
        } else {
            label = (String) voc;
        }

        return ImmutablePair.of(externalId, label);
    }
}
