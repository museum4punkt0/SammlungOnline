package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class IconclassNormalizerTest {

    @Test
    public void testAttributeKey() {
        IconclassNormalizer normalizer = new IconclassNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("iconclasses");
    }

    @Test
    public void testResolveIconclasses() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjKeyWordsGrp.NotationTxt", "[931641].ObjKeyWordsGrp.repeatableGroupItem[51194243#1].NotationTxt", "11800"),
                Triple.of("ObjKeyWordsGrp.SortLnu", "[931641].ObjKeyWordsGrp.repeatableGroupItem[51194243#1].SortLnu", "1"),
                Triple.of("ObjKeyWordsGrp.KeyWordVoc", "[931641].ObjKeyWordsGrp.repeatableGroupItem[51194243#1].KeyWordVoc", "1"),

                Triple.of("ObjKeyWordsGrp.NotationTxt", "[931641].ObjKeyWordsGrp.repeatableGroupItem[1194243#1].NotationTxt", "4711"),
                Triple.of("ObjKeyWordsGrp.SortLnu", "[931641].ObjKeyWordsGrp.repeatableGroupItem[1194243#1].SortLnu", "2"),
                Triple.of("ObjKeyWordsGrp.KeyWordVoc", "[931641].ObjKeyWordsGrp.repeatableGroupItem[1194243#1].KeyWordVoc", "2"),

                Triple.of("ObjKeyWordsGrp.SortLnu", "[931641].ObjKeyWordsGrp.repeatableGroupItem[5243#1].SortLnu", "3"),
                Triple.of("ObjKeyWordsGrp.KeyWordVoc", "[931641].ObjKeyWordsGrp.repeatableGroupItem[5243#1].KeyWordVoc", "3"),

                Triple.of("ObjKeyWordsGrp.SortLnu", "[931641].ObjKeyWordsGrp.repeatableGroupItem[5142#1].SortLnu", "4"),
                Triple.of("ObjKeyWordsGrp.KeyWordVoc", "[931641].ObjKeyWordsGrp.repeatableGroupItem[5142#1].KeyWordVoc", "4")
        );
        // when
        IconclassNormalizer normalizer = new IconclassNormalizer();
        Data[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNotNull();
        assertThat(values.length).isEqualTo(4);
        assertThat(Arrays.stream(values)
                .map(v -> v.<String>getTypedAttribute("formatted"))
                .toArray()
        ).containsExactly("[11800] 1", "[4711] 2", "3", "4");
    }

    @Test
    public void testNoIconclasses() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjKeyWordsGrp.SomethingVoc", "don't care"),
                Pair.of("ObjKeyWordsGrp.KeywordVoc", "typo with lower-case W -> ignore"),
                Pair.of("ObjKeyWordsGrp.KeyWordVoc", " "),
                Pair.of("blubb", "bla"));
        // when
        IconclassNormalizer normalizer = new IconclassNormalizer();
        Data[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNull();
    }
}
