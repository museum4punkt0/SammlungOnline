package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Arrays;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class AcquisitionNormalizer extends MultipleHitsSortedNormalizer<String> {

    public AcquisitionNormalizer() {
        super(ACQUISITION_ATTRIBUTE, "ObjAcquisitionNotesGrp");
    }

    @Override
    protected Data[] applyFilter(final Data[] repeatableGroupItems) {
        return Arrays.stream(repeatableGroupItems)
                .filter(item -> hasAttributeValue(item, "MemoClb") && hasTypeVoc(item, "Ausgabe"))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] repeatableGroupItems) {
        return Arrays.stream(repeatableGroupItems)
                .map(item -> StringUtils.trim(item.getTypedAttribute("MemoClb")))
                .toArray(String[]::new);
    }
}
