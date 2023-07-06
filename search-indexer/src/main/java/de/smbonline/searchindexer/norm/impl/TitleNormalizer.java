package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.FirstHitSortedNormalizer;
import org.apache.commons.lang3.StringUtils;

import static de.smbonline.searchindexer.conf.ConstKt.TITLE_ATTRIBUTE;

public class TitleNormalizer extends FirstHitSortedNormalizer<String> {

    public TitleNormalizer() {
        super(TITLE_ATTRIBUTE, "ObjObjectTitleGrp");
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjObjectTitleGrp.SortLnu",
                "ObjObjectTitleGrp.TitleTxt",
        };
    }

    @Override
    protected String pickValue(final Data item) {
        return StringUtils.trim(item.getTypedAttribute("TitleTxt"));
    }
}
