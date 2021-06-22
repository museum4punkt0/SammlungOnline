package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class TitlesNormalizerTest {

    @Test
    public void testAttributeKey() {
        TitlesNormalizer normalizer = new TitlesNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("titles");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjObjectTitleGrp.TitleTxt", "[123].ObjObjectTitleGrp.item[1].TitleTxt", "nummer 1"),
                Triple.of("ObjObjectTitleGrp.SortLnu", "[123].ObjObjectTitleGrp.item[1].SortLnu", "100"),
                Triple.of("ObjObjectTitleGrp.TitleTxt", "[123].ObjObjectTitleGrp.item[2].TitleTxt", "2. versuch"),
                Triple.of("ObjObjectTitleGrp.SortLnu", "[123].ObjObjectTitleGrp.item[2].SortLnu", "50"),
                Triple.of("ObjObjectTitleGrp.TitleTxt", "[123].ObjObjectTitleGrp.item[3].TitleTxt", "der dritte"),
                Triple.of("ObjObjectTitleGrp.SortLnu", "[123].ObjObjectTitleGrp.item[3].SortLnu", "77"),
                Triple.of("ObjObjectTitleGrp.TitleTxt", "[123].ObjObjectTitleGrp.item[4].TitleTxt", "vier gewinnt"),
                Triple.of("ObjObjectTitleGrp.SortLnu", "[123].ObjObjectTitleGrp.item[4].SortLnu", "12")
        );
        // when
        TitlesNormalizer normalizer = new TitlesNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).containsExactly("vier gewinnt", "2. versuch", "der dritte", "nummer 1");
    }

    @Test
    public void testNoTitleInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"));
        // when
        TitlesNormalizer normalizer = new TitlesNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
