package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class CollectionKeyNormalizerTest {

    @Test
    public void testAttributeKey() {
        CollectionKeyNormalizer normalizer = new CollectionKeyNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("collectionKey");
    }

    @Test
    public void testResolveAttributeValue() {
        // given
        ObjectData obj = createObject(123L, Pair.of("__orgUnit", "best-unit-ever"));
        // when
        CollectionKeyNormalizer normalizer = new CollectionKeyNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("best-unit-ever");
    }

    @Test
    public void testNoOrgUnit() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("__orgUnit", ""),
                Pair.of("blubb", "bla"));
        // when
        CollectionKeyNormalizer normalizer = new CollectionKeyNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value)
                // don't care about actual value here, but make sure the public constant is used
                .isEqualTo(CollectionKeyNormalizer.UNKNOWN_COLLECTION_KEY);
    }
}
