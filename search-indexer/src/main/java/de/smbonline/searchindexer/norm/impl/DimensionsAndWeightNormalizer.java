package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class DimensionsAndWeightNormalizer extends MultipleHitsSortedNormalizer<String> {

    public DimensionsAndWeightNormalizer() {
        super(DIMENSIONS_AND_WEIGHT_ATTRIBUTE, "ObjDimAllGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[] {
                "ObjDimAllGrp.PreviewVrt",
                "ObjDimAllGrp.TypeDimRef",
                "ObjDimAllGrp.SortLnu"
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return  Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "PreviewVrt") && hasAttributeValue(item, SORTING_FIELDNAME))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] repeatableGroupItems) {
        return Arrays.stream(repeatableGroupItems)
                .map(DimensionsAndWeightNormalizer::extractDimensionsAndWeightInfo)
                .toArray(String[]::new);
    }

    private static String extractDimensionsAndWeightInfo(final Data item) {
        String type = item.getNestedTypedAttribute("TypeDimRef.item");
        String text = item.getTypedAttribute("PreviewVrt");

        boolean hasType = StringUtils.isNotBlank(type);
        boolean hasText = StringUtils.isNotBlank(text);

        StringBuilder sb = new StringBuilder();
        if (hasText) {
            if (hasType) {
                sb.append(type.trim()).append(": ");
            }
            sb.append(text.trim());
        }
        return sb.toString();
    }
}

