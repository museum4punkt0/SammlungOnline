package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class IdentNumberNormalizerTest {

    @Test
    public void testAttributeKey() {
        IdentNumberNormalizer normalizer = new IdentNumberNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("identNumber");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjObjectNumberGrp.NumberVrt", "[123].ObjObjectNumberGrp.item[1].NumberVrt", "123"),
                Triple.of("ObjObjectNumberGrp.NumberVrt", "[123].ObjObjectNumberGrp.item[2].NumberVrt", "ABC"),
                Triple.of("ObjObjectNumberGrp.NumberVrt", "[123].ObjObjectNumberGrp.item[3].NumberVrt", "XYZ"),
                Triple.of("ObjObjectNumberGrp.NumberVrt", "[123].ObjObjectNumberGrp.item[4].NumberVrt", "000")
        );
        // when
        IdentNumberNormalizer normalizer = new IdentNumberNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isIn("123", "ABC", "XYZ", "000");
    }

    @Test
    public void testNoIdentNumber() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"));
        // when
        IdentNumberNormalizer normalizer = new IdentNumberNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
