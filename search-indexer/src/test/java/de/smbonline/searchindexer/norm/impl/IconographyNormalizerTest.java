package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class IconographyNormalizerTest {

    @Test
    public void testAttributeKey() {
        IconographyNormalizer normalizer = new IconographyNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("iconography");
    }

    @Test
    public void testResolveIconographies() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjIconographyGrp.KeywordVoc", "[931641].ObjIconographyGrp.repeatableGroupItem[51194243#1].KeywordVoc", "1"),
                Triple.of("ObjIconographyGrp.SortLnu", "[931641].ObjIconographyGrp.repeatableGroupItem[51194243#1].SortLnu", "1"),

                Triple.of("ObjIconographyGrp.KeywordVoc", "[931641].ObjIconographyGrp.repeatableGroupItem[1194243#1].KeywordVoc", "2"),
                Triple.of("ObjIconographyGrp.SortLnu", "[931641].ObjIconographyGrp.repeatableGroupItem[1194243#1].SortLnu", "2"),

                Triple.of("ObjIconographyGrp.KeywordVoc", "[931641].ObjIconographyGrp.repeatableGroupItem[5243#1].KeywordVoc", "3"),
                Triple.of("ObjIconographyGrp.SortLnu", "[931641].ObjIconographyGrp.repeatableGroupItem[5243#1].SortLnu", "3"),

                Triple.of("ObjIconographyGrp.KeywordVoc", "[931641].ObjIconographyGrp.repeatableGroupItem[5142#1].KeywordVoc", "4"),
                Triple.of("ObjIconographyGrp.SortLnu", "[931641].ObjIconographyGrp.repeatableGroupItem[5142#1].SortLnu", "4"),

                Triple.of("ObjIconographyGrp.KeywordVoc", "[931641].ObjIconographyGrp.repeatableGroupItem[4673672#1].KeywordVoc", "5"),
                Triple.of("ObjIconographyGrp.SortLnu", "[931641].ObjIconographyGrp.repeatableGroupItem[4673672#1].SortLnu", "") // empty; ignored
        );
        // when
        IconographyNormalizer normalizer = new IconographyNormalizer();
        Data[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNotNull();
        assertThat(values.length).isEqualTo(4);
        assertThat(Arrays.stream(values).map(d -> d.getTypedAttribute("formatted"))).containsExactly("1", "2", "3", "4");
    }

    @Test
    public void testSpecificVocOverridesDefaultVoc() {
        ObjectData obj;
        Data[] values;
        IconographyNormalizer normalizer = new IconographyNormalizer();

        // Project
        obj = createObject(
                Triple.of("ObjIconographyGrp.KeywordProjectVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordProjectVoc", "project"),
                Triple.of("ObjIconographyGrp.KeywordANTVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordANTVoc", "ant"),
                Triple.of("ObjIconographyGrp.KeywordEMVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordEMVoc", "em"),
                Triple.of("ObjIconographyGrp.KeywordVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordVoc", "default")
        );
        values = normalizer.resolveAttributeValue(obj, "de");
        assertThat(values).isNotNull();
        assertThat(Arrays.stream(values).map(d -> d.getTypedAttribute("formatted"))).containsExactly("project");

        // ANT
        obj = createObject(
                Triple.of("ObjIconographyGrp.KeywordANTVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordANTVoc", "ant"),
                Triple.of("ObjIconographyGrp.KeywordEMVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordEMVoc", "em"),
                Triple.of("ObjIconographyGrp.KeywordVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordVoc", "default")
        );
        values = normalizer.resolveAttributeValue(obj, "de");
        assertThat(values).isNotNull();
        assertThat(Arrays.stream(values).map(d -> d.getTypedAttribute("formatted"))).containsExactly("ant");

        // EM
        obj = createObject(
                Triple.of("ObjIconographyGrp.KeywordEMVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordEMVoc", "em"),
                Triple.of("ObjIconographyGrp.KeywordVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordVoc", "default")
        );
        values = normalizer.resolveAttributeValue(obj, "de");
        assertThat(values).isNotNull();
        assertThat(Arrays.stream(values).map(d -> d.getTypedAttribute("formatted"))).containsExactly("em");

        // default
        obj = createObject(
                Triple.of("ObjIconographyGrp.KeywordProjectVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordProjectVoc", ""),
                Triple.of("ObjIconographyGrp.KeywordANTVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordANTVoc", ""),
                Triple.of("ObjIconographyGrp.KeywordEMVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordEMVoc", ""),
                Triple.of("ObjIconographyGrp.KeywordVoc", "[123].ObjIconographyGrp.repeatableGroupItem[1].KeywordVoc", "default")
        );
        values = normalizer.resolveAttributeValue(obj, "de");
        assertThat(values).isNotNull();
        assertThat(Arrays.stream(values).map(d -> d.getTypedAttribute("formatted"))).containsExactly("default");
    }

    @Test
    public void testNoIconographies() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjIconographyGrp.KeywordSomethingVoc", "don't care"),
                Pair.of("ObjIconographyGrp.KeywordVoc", " "),
                Pair.of("blubb", "bla"));
        // when
        IconographyNormalizer normalizer = new IconographyNormalizer();
        Data[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNull();
    }
}
