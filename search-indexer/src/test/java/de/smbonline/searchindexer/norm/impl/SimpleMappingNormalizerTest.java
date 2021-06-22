package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.SimpleMappingNormalizer;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class SimpleMappingNormalizerTest {

    @Test
    public void testAttributeKey() {
        SimpleMappingNormalizer normalizer = new SimpleMappingNormalizer("source", "target");
        assertThat(normalizer.getAttributeKey()).isEqualTo("target");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(123L, Pair.of("source", "value"));
        // when
        SimpleMappingNormalizer normalizer = new SimpleMappingNormalizer("source", "target");
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("value");
    }

    @Test
    public void testNoMapping() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"));
        // when
        SimpleMappingNormalizer normalizer = new SimpleMappingNormalizer("source", "target");
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
