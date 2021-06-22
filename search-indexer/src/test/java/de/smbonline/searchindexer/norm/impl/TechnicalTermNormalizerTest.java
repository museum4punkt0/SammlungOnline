package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class TechnicalTermNormalizerTest {

    @Test
    public void testAttributeKey() {
        TechnicalTermNormalizer normalizer = new TechnicalTermNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("technicalTerm");
    }

    @Test
    public void testResolveAttributeValue() {
        // given
        ObjectData obj = createObject(123L, Pair.of("ObjTechnicalTermClb", "Gelber Schnee"));
        // when
        TechnicalTermNormalizer normalizer = new TechnicalTermNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("Gelber Schnee");
    }

    @Test
    public void testNoTechnicalTermInfo() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjTechnicalTermClb", ""),
                Pair.of("blubb", "bla"));
        // when
        TechnicalTermNormalizer normalizer = new TechnicalTermNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
