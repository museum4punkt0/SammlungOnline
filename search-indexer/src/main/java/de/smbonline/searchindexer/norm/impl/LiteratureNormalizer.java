package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.Objects;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class LiteratureNormalizer extends MultipleHitsSortedNormalizer<String> {

    public LiteratureNormalizer() {
        super(LITERATURE_ATTRIBUTE, "ObjLiteratureRef", LiteratureNormalizer::sort);
    }

    private static Data[] sort(final Map<String, Data> items) {
        return items.values().stream().sorted((a, b) -> {
            String shortTxtA = a.getTypedAttribute("LitReferenceShortTxt");
            String shortTxtB = b.getTypedAttribute("LitReferenceShortTxt");
            int c = Comparator.<String>nullsLast(Comparator.naturalOrder()).compare(shortTxtA, shortTxtB);
            if (c == 0) {
                String pubDateA = a.getTypedAttribute("LitPublicationDateLnu");
                String pubDateB = b.getTypedAttribute("LitPublicationDateLnu");
                c = Comparator.<String>nullsLast(Comparator.naturalOrder()).compare(pubDateA, pubDateB);
            }
            return c;
        }).toArray(Data[]::new);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjLiteratureRef.LitReferenceShortTxt",
                "ObjLiteratureRef.LitPublicationDateLnu",
                "ObjLiteratureRef.LitCitationClb",
                "ObjLiteratureRef.PageRefTxt",
                "ObjLiteratureRef.PicturePageTxt",
                "ObjLiteratureRef.CatalogueNumberTxt",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, "LitReferenceShortTxt"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(LiteratureNormalizer::extractLiteratureInfo)
                .toArray(String[]::new);
    }

    private static String extractLiteratureInfo(final Data item) {
        String shortTxt = Objects.requireNonNull(item.getTypedAttribute("LitReferenceShortTxt"));
        String citation = item.getTypedAttribute("LitCitationClb");
        String page = item.getTypedAttribute("PageRefTxt");
        String picture = item.getTypedAttribute("PicturePageTxt");
        String catalog = item.getTypedAttribute("CatalogueNumberTxt");

        boolean hasCitation = StringUtils.isNotBlank(citation);
        boolean hasPage = StringUtils.isNotBlank(page);
        boolean hasPicture = StringUtils.isNotBlank(picture);
        boolean hasCatalog = StringUtils.isNotBlank(catalog);

        StringBuilder sb = new StringBuilder(shortTxt.trim());
        if (hasCitation || hasPage || hasPicture || hasCatalog) {
            sb.append(": ");
        }
        if (hasCitation) {
            sb.append(citation.trim());
            if (hasPage || hasPicture || hasCatalog) {
                sb.append(", ");
            }
        }
        if (hasPage) {
            page = page.trim();
            if (StringUtils.isNumeric(page)) {
                sb.append("Erw.-Seite ");
            }
            sb.append(page);
            if (hasPicture || hasCatalog) {
                sb.append(", ");
            }
        }
        if (hasPicture) {
            picture = picture.trim();
            if (StringUtils.isNumeric(picture)) {
                sb.append("Abb. S. ");
            }
            sb.append(picture);
            if (hasCatalog) {
                sb.append(", ");
            }
        }
        if (hasCatalog) {
            catalog = catalog.trim();
            if (StringUtils.isNumeric(catalog)) {
                sb.append("Kat.Nr. ");
            }
            sb.append(catalog);
        }
        return sb.toString();
    }
}
