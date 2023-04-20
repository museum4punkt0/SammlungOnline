package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class KeywordsNormalizerTest {

    @Test
    public void testAttributeKey() {
        KeywordNormalizer normalizer = new KeywordNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("keywords");
    }

    @Test
    public void testResolveKeywords() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjSWDGrp.SWDVoc", "[931641].ObjSWDGrp.repeatableGroupItem[51194243#1].SWDVoc", "Wasser"),
                Triple.of("ObjSWDGrp.Sort001Lnu", "[931641].ObjSWDGrp.repeatableGroupItem[51194243#1].Sort001Lnu", "10"),
                Triple.of("ObjSWDGrp.SWDVoc", "[931641].ObjSWDGrp.repeatableGroupItem[514243#1].SWDVoc", "Meer"),
                Triple.of("ObjSWDGrp.Sort001Lnu", "[931641].ObjSWDGrp.repeatableGroupItem[514243#1].Sort001Lnu", "8")
        );
        // when
        KeywordNormalizer normalizer = new KeywordNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNotNull();
        assertThat(values.length).isEqualTo(2);
        assertThat(values[0]).isEqualTo("Meer");
        assertThat(values[1]).isEqualTo("Wasser");
    }

    @Test
    public void testNoKeywords() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjSWDGrp.SWDVoc", ""),
                Pair.of("blubb", "bla"));
        // when
        KeywordNormalizer normalizer = new KeywordNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNull();
    }
}
