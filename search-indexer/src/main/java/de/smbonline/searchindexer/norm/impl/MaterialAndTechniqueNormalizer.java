package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class MaterialAndTechniqueNormalizer extends MultipleHitsSortedNormalizer<String> {

    public MaterialAndTechniqueNormalizer() {
        super(MATERIAL_AND_TECHNIQUE_ATTRIBUTE, "ObjMaterialTechniqueGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        Data[] filtered = Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, "ExportClb") && hasTypeVoc(item, "Ausgabe"))
                .toArray(Data[]::new);
        // 23.11.20: Ist "Ausgabe" nicht vorhanden werden für *jedes* Item ExportClb ausgegeben.
        return filtered.length == 0 ? items : filtered;
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(item -> StringUtils.trim(item.getTypedAttribute("ExportClb")))
                .toArray(String[]::new);
    }
}
