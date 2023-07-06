package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.INSCRIPTION_ATTRIBUTE;
import static de.smbonline.searchindexer.conf.ConstKt.SORTING_FIELDNAME;
import static de.smbonline.searchindexer.norm.ValueExtractor.extractVoc;

public class InscriptionNormalizer extends MultipleHitsSortedNormalizer<String> {

    public InscriptionNormalizer() {
        super(INSCRIPTION_ATTRIBUTE, "ObjLabelObjectGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjLabelObjectGrp.CategoryVoc",
                "ObjLabelObjectGrp.LabelClb",
                "ObjLabelObjectGrp.LanguageVoc",
                "ObjLabelObjectGrp.MethodTxt",
                "ObjLabelObjectGrp.OrientationTxt",
                "ObjLabelObjectGrp.PositionTxt",
                "ObjLabelObjectGrp.SortLnu",
                "ObjLabelObjectGrp.TranslationClb",
                "ObjLabelObjectGrp.TransliterationClb",
                "ObjLabelObjectGrp.TypeVoc",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, SORTING_FIELDNAME))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items).map(InscriptionNormalizer::extractInscription).toArray(String[]::new);
    }

    private static String extractInscription(final Data item) {

        // TypeVoc (CategoryVoc): PositionTxt OrientationTxt; MethodTxt: TransliterationClb; LabelClb (LanguageVoc) [TranslationClb]

        String typeVoc = extractVoc(item, "TypeVoc");
        String categoryVoc = extractVoc(item, "CategoryVoc");
        String position = item.getTypedAttribute("PositionTxt");
        String orientation = item.getTypedAttribute("OrientationTxt");
        String method = item.getTypedAttribute("MethodTxt");
        String transliteration = item.getTypedAttribute("TransliterationClb");
        String label = item.getTypedAttribute("LabelClb");
        String lang = extractVoc(item, "LanguageVoc");
        String translation = item.getTypedAttribute("TranslationClb");

        boolean hasTypeVoc = StringUtils.isNotBlank(typeVoc);
        boolean hasCategoryVoc = StringUtils.isNotBlank(categoryVoc);
        boolean hasPosition = StringUtils.isNotBlank(position);
        boolean hasOrientation = StringUtils.isNotBlank(orientation);
        boolean hasMethod = StringUtils.isNotBlank(method);
        boolean hasTransliteration = StringUtils.isNotBlank(transliteration);
        boolean hasLabel = StringUtils.isNotBlank(label);
        boolean hasLanguage = StringUtils.isNotBlank(lang);
        boolean hasTranslation = StringUtils.isNotBlank(translation);

        StringBuilder sb = new StringBuilder();
        if (hasTypeVoc) {
            sb.append(typeVoc.trim());
            if (hasCategoryVoc) {
                sb.append(" (").append(categoryVoc.trim()).append(")");
            }
            sb.append(':');
        }
        if (hasPosition) {
            sb.append(' ').append(position.trim());
            if (!hasOrientation) {
                sb.append(';');
            }
        }
        if (hasOrientation) {
            sb.append(' ').append(orientation.trim()).append(';');
        }
        if (hasMethod) {
            sb.append(' ').append(method.trim());
            if (hasTransliteration || hasLabel) {
                sb.append(':');
            }
        }
        if (hasTransliteration) {
            sb.append(' ').append(transliteration.trim()).append(';');
        }
        if (hasLabel) {
            sb.append(' ').append(label.trim());
            if (hasLanguage) {
                sb.append(" (").append(lang.trim()).append(')');
            }
        }
        if (hasTranslation) {
            sb.append(" [").append(translation.trim()).append(']');
        }
        return StringUtils.strip(sb.toString(), " :;");
    }
}
