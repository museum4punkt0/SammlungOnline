package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.FirstHitSortedNormalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class IdentNumberNormalizer extends FirstHitSortedNormalizer<String> {

    public IdentNumberNormalizer() {
        super(IDENT_NUMBER_ATTRIBUTE, "ObjObjectNumberGrp");
    }

    @Override
    protected @Nullable String pickValue(final Data item) {
        return StringUtils.trimToNull(item.getTypedAttribute("InventarNrSTxt"));
    }
}
