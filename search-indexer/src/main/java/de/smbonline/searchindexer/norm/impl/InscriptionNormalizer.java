package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.ValueExtractor.*;

public class InscriptionNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String[] TYPE_VOC_WHITELIST = {
            "Text (Plakat)",
            "Signatur (Künstler)",
            "Vermerk (Drucker)",
            "Vermerk (Inventarnummer)",
            "Vermerk (Künstler)",
            "Vermerk (Nummerierung)"
    };

    public InscriptionNormalizer() {
        super(INSCRIPTION_ATTRIBUTE, "ObjLabelObjectGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjLabelObjectGrp.LabelClb",
                "ObjLabelObjectGrp.LanguageVoc",
                "ObjLabelObjectGrp.MethodTxt",
                "ObjLabelObjectGrp.OrientationTxt",
                "ObjLabelObjectGrp.PositionTxt",
                "ObjLabelObjectGrp.SortLnu",
                "ObjLabelObjectGrp.TranslationClb",
                "ObjLabelObjectGrp.TypeVoc",
        };
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(primaryItems(items).orElse(items))
                .filter(item -> hasAttributeValue(item, "LabelClb"))
                .filter(item -> {
                    String typeVoc = extractVoc(item, "TypeVoc");
                    return ArrayUtils.contains(TYPE_VOC_WHITELIST, typeVoc);
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items).map(InscriptionNormalizer::extractInscription).toArray(String[]::new);
    }

    private static String extractInscription(final Data item) {

        // TypeVoc: PositionTxt OrientationTxt; MethodTxt: LabelClb (LanguageVoc) [TranslationClb]

        String typeVoc = extractVoc(item, "TypeVoc");
        String position = item.getTypedAttribute("PositionTxt");
        String orientation = item.getTypedAttribute("OrientationTxt");
        String method = item.getTypedAttribute("MethodTxt");
        String label = item.getTypedAttribute("LabelClb"); // always non-empty because of applyFilter
        String translation = item.getTypedAttribute("TranslationClb");
        String lang = extractVoc(item, "LanguageVoc");

        boolean hasTypeVoc = StringUtils.isNotBlank(typeVoc);
        boolean hasPosition = StringUtils.isNotBlank(position);
        boolean hasOrientation = StringUtils.isNotBlank(orientation);
        boolean hasMethod = StringUtils.isNotBlank(method);
        boolean hasTranslation = StringUtils.isNotBlank(translation);
        boolean hasLanguage = StringUtils.isNotBlank(lang);

        StringBuilder sb = new StringBuilder();
        if (hasTypeVoc) {
            sb.append(typeVoc.trim()).append(": ");
        }
        if (hasPosition) {
            sb.append(position.trim()).append(hasOrientation ? " " : "; ");
        }
        if (hasOrientation) {
            sb.append(orientation.trim()).append("; ");
        }
        if (hasMethod) {
            sb.append(method.trim()).append(": ");
        }
        sb.append(label);
        if (hasTranslation) {
            sb.append(" [").append(translation.trim());
            if (hasLanguage) {
                sb.append(" (").append(lang.trim()).append(')');
            }
            sb.append(']');
        } else if (hasLanguage) {
            sb.append(" (").append(lang.trim()).append(')');
        }
        return sb.toString();
    }
}
