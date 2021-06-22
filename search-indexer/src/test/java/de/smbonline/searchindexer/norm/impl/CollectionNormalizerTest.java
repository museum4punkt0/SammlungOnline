package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;
import static org.assertj.core.api.Assertions.*;

public class CollectionNormalizerTest {

    @Test
    public void testAttributeKey() {
        CollectionNormalizer normalizer = new CollectionNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("collection");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(123L, Pair.of("__orgUnit", "EMIslamischerOrient"));
        // when
        CollectionNormalizer normalizer = new CollectionNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("Ethnologisches Museum");
    }

    @Test
    public void testMappings() {
        CollectionNormalizer normalizer = new CollectionNormalizer();

        // check if all compilation mappings are implemented in the collection mapper
        Map<String, String> compilationMapping = compilationMapping();
        Map<String, String> collectionMapping = collectionMapping();
        for (Map.Entry<String, String> entry : compilationMapping.entrySet()) {
            // given any compilation key
            ObjectData obj = createObject(123L, Pair.of("__orgUnit", entry.getKey()));
            // when collection mapping is applied
            String value = normalizer.resolveAttributeValue(obj);
            // then check if the mapped value was retrieved from the collection map
            assertThat(collectionMapping).containsValue(value);
        }
    }

    @Test
    public void testMappingNotFound() {
        // given
        ObjectData obj = createObject(123L, Pair.of("__orgUnit", "fününününü"));
        // when
        CollectionNormalizer normalizer = new CollectionNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("fününününü");
    }

    @Test
    public void testNoCollectionInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"), Pair.of("key", "val"));
        // when
        CollectionNormalizer normalizer = new CollectionNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
