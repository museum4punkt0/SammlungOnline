package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.urlDecode;
import static de.smbonline.searchindexer.rest.Params.urlEncode;
import static de.smbonline.searchindexer.util.Misc.wrapQuotes;
import static de.smbonline.searchindexer.util.Validations.requireId;
import static java.util.Objects.requireNonNull;

public class IconclassNormalizer extends MultipleHitsSortedNormalizer<Data> {

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
                .filter(item -> hasAttributeValue(item, "KeyWordVoc") && hasAttributeValue(item, SORTING_FIELDNAME))
                .toArray(Data[]::new);
    }

    @Override
    protected Data[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(IconclassNormalizer::convertToDTO)
                .toArray(Data[]::new);
    }

    private static Data convertToDTO(final Data item) {

        Data voc = requireNonNull(item.getTypedAttribute("KeyWordVoc"));
        Long id = requireId(voc.getAttribute("id"));

        String externalId = null;
        String label = voc.getTypedAttribute(VIRTUAL_ATTRIBUTE_NAME);
        String link = voc.getTypedAttribute("name"); // yes, the name is the link
        if (link != null && StringUtils.startsWith(link, "http")) {
            externalId = link.substring(link.lastIndexOf('/') + 1);
            externalId = urlDecode(externalId);
        }
        if (StringUtils.isBlank(externalId)) {
            externalId = item.getTypedAttribute("NotationTxt");
        }

        boolean hasExternalId = StringUtils.isNotBlank(externalId);

        String plain = hasExternalId ? label + " (" + externalId.replace(" ", "") + ")" : label;
        // TODO use id for searching instead
        String searchParams = ICONCLASS_ATTRIBUTE + ":" + wrapQuotes(urlEncode(label));
        String internalLink = Links.internalHTML(searchParams, label);
        String externalLink = hasExternalId ? Links.externalHTML("{iconclass-normdata-base-url}/" + urlEncode(externalId), externalId) : "";
        String html = hasExternalId ? internalLink + " <span>|</span> " + externalLink : internalLink;

        return new Data()
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, plain)
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute("key", externalId)
                .setNonNullAttribute("search", Links.internal(ICONCLASS_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + id))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, "<div>%s</div>".formatted(html));
    }
}
