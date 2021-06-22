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
                Triple.of("ObjDimAllGrp.TypeDimRef", "[123].ObjDimAllGrp.item[1].TypeDimRef", "Größe"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[1].SortLnu", "4"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[2].PreviewVrt", "5kg"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[2].SortLnu", "3"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[3].PreviewVrt", "2t"),
                Triple.of("ObjDimAllGrp.TypeDimRef", "[123].ObjDimAllGrp.item[3].TypeDimRef", "Gewicht"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[3].SortLnu", "2"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[123].ObjDimAllGrp.item[4].PreviewVrt", "30cm"),
                Triple.of("ObjDimAllGrp.SortLnu", "[123].ObjDimAllGrp.item[4].SortLnu", "1")
        );
        // when
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj);
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
        String[] values = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(values).containsOnly("300");
    }

    @Test
    public void testNoDimensionsInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"));
        // when
        DimensionsAndWeightNormalizer normalizer = new DimensionsAndWeightNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(values).isNull();
    }
}
