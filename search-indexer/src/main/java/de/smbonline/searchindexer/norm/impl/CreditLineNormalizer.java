package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.SimpleMappingNormalizer;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class CreditLineNormalizer extends SimpleMappingNormalizer {
    public CreditLineNormalizer() {
        super("ObjCreditLineVoc", CREDIT_LINE_ATTRIBUTE);
    }
}
