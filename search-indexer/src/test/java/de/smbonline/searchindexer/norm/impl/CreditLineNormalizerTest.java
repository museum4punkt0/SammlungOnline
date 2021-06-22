package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class CreditLineNormalizerTest {

    @Test
    public void testAttributeKey() {
        CreditLineNormalizer normalizer = new CreditLineNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("creditLine");
    }

    @Test
    public void testResolveAttributeValue() {
        // given
        ObjectData obj = createObject(123L, Pair.of("ObjCreditLineVoc", "Gelber Schnee"));
        // when
        CreditLineNormalizer normalizer = new CreditLineNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("Gelber Schnee");
    }

    @Test
    public void testNoCreditLineInfo() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjCreditLineVoc", ""),
                Pair.of("blubb", "bla"));
        // when
        CreditLineNormalizer normalizer = new CreditLineNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
