package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;
import static org.assertj.core.api.Assertions.*;

public class LocationNormalizerTest {

    @Test
    public void testAttributeKey() {
        LocationNormalizer normalizer = new LocationNormalizer("->");
        assertThat(normalizer.getAttributeKey()).isEqualTo("location");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = withExhibitionSpace(createObject(123L), "AMP -> NMU -> -> Ebene 2 -> Raum 206");
        // when
        LocationNormalizer normalizer = new LocationNormalizer("->");
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("Neues Museum");
    }

    @Test
    public void testMappingNotFound() {
        // given
        ObjectData obj = withExhibitionSpace(createObject(123L), "PART1 # Gebäude # PART3 # PART4 # PART5");
        // when
        LocationNormalizer normalizer = new LocationNormalizer("#");
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("Gebäude");
    }

    @Test
    public void testMappings() {
        LocationNormalizer normalizer = new LocationNormalizer("-!-");

        // check if all building mappings are implemented
        Map<String, String> buildings = buildingMapping();
        for (Map.Entry<String, String> entry : buildings.entrySet()) {
            // given any building key
            ObjectData obj = withExhibitionSpace(createObject(123L), "PART1 -!- "+entry.getKey()+ " -!- PARTn...");
            // when building mapping is applied
            String value = normalizer.resolveAttributeValue(obj);
            // then check if the mapped value was retrieved from the building map
            assertThat(buildings).containsValue(value);
        }
    }

    @Test
    public void testNoLocationInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"), Pair.of("key", "val"));
        // when
        LocationNormalizer normalizer = new LocationNormalizer("->");
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
