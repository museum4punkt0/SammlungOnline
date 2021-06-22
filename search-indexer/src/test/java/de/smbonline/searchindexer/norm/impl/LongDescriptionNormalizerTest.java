package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class LongDescriptionNormalizerTest {

    @Test
    public void testAttributeKey() {
        LongDescriptionNormalizer normalizer = new LongDescriptionNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("longDescription");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[1].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[1].SortLnu", "4"),
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[2].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[2].SortLnu", "3"),
                // expected hit, SortLnu=1
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[3].TextClb", "richtig"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[3].SortLnu", "1"),
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[4].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[4].SortLnu", "2")
        );
        // when
        LongDescriptionNormalizer normalizer = new LongDescriptionNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isEqualTo("richtig");
    }

    @Test
    public void testNoDesciptionInfo() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[1].TextClb", "")
        );
        // when
        LongDescriptionNormalizer normalizer = new LongDescriptionNormalizer();
        String value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
