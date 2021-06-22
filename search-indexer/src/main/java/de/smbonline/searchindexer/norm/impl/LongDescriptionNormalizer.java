package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.FirstHitSortedNormalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class LongDescriptionNormalizer extends FirstHitSortedNormalizer<String> {

    public LongDescriptionNormalizer() {
        super(LONG_DESCRIPTION_ATTRIBUTE, "ObjTextOnlineGrp");
    }

    @Override
    protected @Nullable String pickValue(final Data item) {
        return StringUtils.trimToNull(item.getTypedAttribute("TextClb"));
    }
}
