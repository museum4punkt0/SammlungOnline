package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class DatingNormalizerTest {

    @Test
    public void testAttributeKey() {
        DatingNormalizer normalizer = new DatingNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("dating");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDateGrp.DateTxt", "[123].ObjDateGrp.item[1].DateTxt", "text"),
                Triple.of("ObjDateGrp.TypeVoc", "[123].ObjDateGrp.item[1].TypeVoc", "type")
        );
        // when
        DatingNormalizer normalizer = new DatingNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("type text");
    }

    @Test
    public void testMappingSingle_TextOnly() {
        // given
        ObjectData obj = createObject(123L, Pair.of("ObjDateGrp.DateTxt", "text"));
        // when
        DatingNormalizer normalizer = new DatingNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("text");
    }

    @Test
    public void testMappingSingle_TypeOnly() {
        // given
        ObjectData obj = createObject(123L, Pair.of("ObjDateGrp.TypeVoc", "type"));
        // when
        DatingNormalizer normalizer = new DatingNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
