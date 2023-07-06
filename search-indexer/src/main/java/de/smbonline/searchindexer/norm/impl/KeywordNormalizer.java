package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.urlEncode;
import static de.smbonline.searchindexer.util.Misc.wrapQuotes;
import static de.smbonline.searchindexer.util.Validations.requireId;

public class KeywordNormalizer extends MultipleHitsSortedNormalizer<Data> {

    public KeywordNormalizer() {
        super(KEYWORDS_ATTRIBUTE, "ObjSWDGrp", KeywordNormalizer::sort);
    }

    private static Data[] sort(final Map<String, Data> items) {
        return sortByAttribute(items.values().toArray(Data[]::new), "Sort001Lnu");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjSWDGrp.Sort001Lnu",
                "ObjSWDGrp.SWDVoc",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "SWDVoc") && hasAttributeValue(item, "Sort001Lnu"))
                .toArray(Data[]::new);
    }

    @Override
    protected Data[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(KeywordNormalizer::convertToDTO)
                .toArray(Data[]::new);
    }

    private static Data convertToDTO(final Data item) {

        Data voc = Objects.requireNonNull(item.getTypedAttribute("SWDVoc"));

        Long id = requireId(voc.getAttribute("id"));
        String label = voc.getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
        if (StringUtils.isBlank(label)) {
            label = voc.getTypedAttribute("name");
        }

        // TODO use id for searching instead
        String searchParams = KEYWORDS_ATTRIBUTE + ":" + wrapQuotes(urlEncode(label));
        String html = Links.internalHTML(searchParams, label);

        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute("search", Links.internal(KEYWORDS_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + id))
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, label)
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, "<div>%s</div>".formatted(html));
    }
}

