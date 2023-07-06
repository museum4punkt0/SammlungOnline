package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.urlEncode;
import static de.smbonline.searchindexer.util.Misc.wrapQuotes;
import static de.smbonline.searchindexer.util.Validations.requireId;

public class IconographyNormalizer extends MultipleHitsSortedNormalizer<Data> {

    private static final String[] KEYWORD_VOC_CANDIDATES = {
            "KeywordProjectVoc",
            "KeywordANTVoc",
            "KeywordEMVoc",
            "KeywordVoc"
    };

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
                .filter(item -> hasAttributeValue(item, SORTING_FIELDNAME)
                        && Arrays.stream(KEYWORD_VOC_CANDIDATES).anyMatch(voc -> hasAttributeValue(item, voc))
                ).toArray(Data[]::new);
    }

    @Override
    protected Data[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(IconographyNormalizer::convertToDTO)
                .toArray(Data[]::new);
    }


    private static Data convertToDTO(final Data item) {

        Data voc = Objects.requireNonNull(extractVoc(item));
        Long id = requireId(voc.getAttribute("id"));
        String label = voc.getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
        if (StringUtils.isBlank(label)) {
            label = voc.getTypedAttribute("name");
        }

        // TODO use id for searching instead
        String searchParams = ICONOGRAPHY_ATTRIBUTE + ":" + wrapQuotes(urlEncode(label));
        String html = Links.internalHTML(searchParams, label);

        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute("search", Links.internal(ICONOGRAPHY_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + id))
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, label)
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, "<div>%s</div>".formatted(html));
    }

    private static Data extractVoc(final Data item) {
       return Arrays.stream(KEYWORD_VOC_CANDIDATES)
                .map(item::<Data>getTypedAttribute)
                .filter(Objects::nonNull)
                .findFirst().orElse(null);
    }
}
