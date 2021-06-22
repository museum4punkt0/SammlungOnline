package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.SimpleMappingNormalizer;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class TechnicalTermNormalizer extends SimpleMappingNormalizer {
    public TechnicalTermNormalizer() {
        super("ObjTechnicalTermClb", TECHNICAL_TERM_ATTRIBUTE);
    }
}
