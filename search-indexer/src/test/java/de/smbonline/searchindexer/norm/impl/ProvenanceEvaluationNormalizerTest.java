package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ProvenanceEvaluationNormalizerTest {

    @Test
    public void testAttributeKey() {
        ProvenanceEvaluationNormalizer normalizer = new ProvenanceEvaluationNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("provenanceEvaluation");
    }

    @Test
    public void testResolveAttributeValue() {
        // given
        ObjectData obj = createObject(123L, Pair.of("ObjProvenanceEvaluationClb", "Gelber Schnee"));
        // when
        ProvenanceEvaluationNormalizer normalizer = new ProvenanceEvaluationNormalizer();
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isEqualTo("Gelber Schnee");
    }

    @Test
    public void testNoTechnicalTermInfo() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjProvenanceEvaluationClb", ""),
                Pair.of("blubb", "bla"));
        // when
        ProvenanceEvaluationNormalizer normalizer = new ProvenanceEvaluationNormalizer();
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }
}
