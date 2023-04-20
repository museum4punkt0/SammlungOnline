package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class DimensionsAndWeightNormalizerTest {

    @Test
    public void testAttributeKey() {
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("dimensionsAndWeight");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[1].PreviewVrt", "1x2x3 cm"),
                Triple.of("ObjDimAllGrp.TypeDimRef", "[123].ObjDimAllGrp.item[1].TypeDimRef.moduleReferenceItem[5]", "Größe"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[1].SortLnu", "4"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[2].PreviewVrt", "5kg"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[2].SortLnu", "3"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[3].PreviewVrt", "2t"),
                Triple.of("ObjDimAllGrp.TypeDimRef", "[123].ObjDimAllGrp.item[3].TypeDimRef.moduleReferenceItem[6]", "Gewicht"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[3].SortLnu", "2"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[4].PreviewVrt", "30cm"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[4].SortLnu", "1")
        );
        // when
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).containsExactly("30cm", "Gewicht: 2t", "5kg", "Größe: 1x2x3 cm");
    }

    @Test
    public void testMappingWithPrimaryItem() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[1].PreviewVrt", "1x2x3 cm"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[1].SortLnu", "4"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[2].PreviewVrt", "5kg"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[2].SortLnu", "3"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[3].PreviewVrt", "2t"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[3].SortLnu", "2"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[4].PreviewVrt", "30cm"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[4].SortLnu", "1"),
                // expected primary hit, SortLnu=0
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[5].PreviewVrt", "300"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[5].SortLnu", "0")
        );
        // when
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).containsOnly("300");
    }

    @Test
    public void test965869() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDimAllGrp.DepthNum", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].DepthNum", "6,5"),
                Triple.of("ObjDimAllGrp.HeightNum", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].HeightNum", "83"),
                Triple.of("ObjDimAllGrp.PreviewENVrt", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].PreviewENVrt", "83.00 x 97.00 x 6.50 cm"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].PreviewVrt", "83,00 x 97,00 x 6,50 cm"),
                Triple.of("ObjDimAllGrp.SortLnu", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].SortLnu", "1"),
                Triple.of("ObjDimAllGrp.TypeDimRef", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].TypeDimRef.moduleReferenceItem[141]", "Rahmenmaß"),
                Triple.of("ObjDimAllGrp.UnitDdiVoc", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].UnitDdiVoc[79755].vocabularyReferenceItem[3582019]", "cm"),
                Triple.of("ObjDimAllGrp.WidthNum", "[965869].ObjDimAllGrp.repeatableGroupItem[15034940].WidthNum", "97"),
                // primary item 15034941
                Triple.of("ObjDimAllGrp.HeightNum", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].HeightNum", "63,4"),
                Triple.of("ObjDimAllGrp.PreviewENVrt", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].PreviewENVrt", "63.40 x 77.10 cm"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].PreviewVrt", "63,40 x 77,10 cm"),
                Triple.of("ObjDimAllGrp.SortLnu", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].SortLnu", "0"),
                Triple.of("ObjDimAllGrp.TypeDimRef", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].TypeDimRef.moduleReferenceItem[79]", "Höhe x Breite"),
                Triple.of("ObjDimAllGrp.UnitDdiVoc", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].UnitDdiVoc[79755].vocabularyReferenceItem[3582019]", "cm"),
                Triple.of("ObjDimAllGrp.WidthNum", "[965869].ObjDimAllGrp.repeatableGroupItem[15034941].WidthNum", "77,1")
        );
        // when
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNotNull();
        assertThat(values).hasSize(1);
        assertThat(values).containsOnly("Höhe x Breite: 63,40 x 77,10 cm");
    }

    @Test
    public void testNoDimensionsInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"));
        // when
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNull();
    }
}
