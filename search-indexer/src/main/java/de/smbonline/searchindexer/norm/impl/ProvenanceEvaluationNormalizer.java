package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.SimpleMappingNormalizer;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class ProvenanceEvaluationNormalizer extends SimpleMappingNormalizer {
    public ProvenanceEvaluationNormalizer() {
        super("ObjProvenanceEvaluationClb", PROVENANCE_EVALUATION_ATTRIBUTE);
    }
}
