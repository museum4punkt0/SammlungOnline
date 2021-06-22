package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ExhibitionSpaceNormalizerTest {

    @Test
    public void testAttributeKey() {
        ExhibitionSpaceNormalizer normalizer = new ExhibitionSpaceNormalizer("-");
        assertThat(normalizer.getAttributeKey()).isEqualTo("exhibitionSpace");
    }

    @Test
    public void testNoLocationInfo() {
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"), Pair.of("key", "val"));
        assertMapping(obj, null);
    }

    @Test
    public void testMappingUses4Parts_IgnoresCollectionAndAppendixes() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ONE -> TWO -> THREE -> FOUR -> FIVE -> SIX -> SEVEN");
        assertMapping(obj, "TWO, THREE, FOUR, FIVE");
    }

    @Test
    public void testMapping_AMP() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ÄMP -> NMU -> -> Ebene 1 -> Raum 10");
        assertMapping(obj, "Neues Museum, Ebene 1, Raum 110");
    }

    @Test
    public void testMapping_ANT() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ANT -> Neues Museum -> -> -> R 3.02 (Eisenzeit) -> Vitrine: 4B");
        assertMapping(obj, "Neues Museum, Ebene 3, Raum 302");
    }

    @Test
    public void testMapping_MVF() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "MVF -> Neues Museum -> -> -> R 206 -> V. 06");
        assertMapping(obj, "Neues Museum, Ebene 2, Raum 206");
    }

    // TODO more assertions for other collections

    private void assertMapping(final /* given */ ObjectData source, final String expected) {
        // when
        ExhibitionSpaceNormalizer normalizer = new ExhibitionSpaceNormalizer("->");
        String value = normalizer.resolveAttributeValue(source);
        // then
        assertThat(value).isEqualTo(expected);
    }
}
