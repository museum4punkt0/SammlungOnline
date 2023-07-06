package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.norm.ValueExtractor;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class TitlesNormalizer extends MultipleHitsSortedNormalizer<Data> {

    public TitlesNormalizer() {
        super(TITLES_ATTRIBUTE, "ObjObjectTitleGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjObjectTitleGrp.SortLnu",
                "ObjObjectTitleGrp.TitleTxt",
                "ObjObjectTitleGrp.TypeVoc",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "TitleTxt") && hasAttributeValue(item, SORTING_FIELDNAME))
                .toArray(Data[]::new);
    }

    @Override
    protected Data[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(TitlesNormalizer::convertToDTO)
                .toArray(Data[]::new);
    }

    private static Data convertToDTO(final Data item) {
        String type = StringUtils.trim(ValueExtractor.extractVoc(item, "TypeVoc"));
        String title = StringUtils.trim(item.getTypedAttribute("TitleTxt"));

        boolean hasType = StringUtils.isNotBlank(type);

        String plain = hasType ? type + ": " + title : title;
        String html = hasType ? "<span>%s</span>: <span>%s</span>".formatted(type, title) : "<span>%s</span>".formatted(title);

        return new Data()
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, plain)
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, "<div>%s</div>".formatted(html));
    }
}
