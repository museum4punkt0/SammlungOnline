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
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[2].SortLnu", "1"),
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[5].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[5].SortLnu", "5"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[5].TypeVoc", "Online Beschreibung"),
                // expected hit "Online Beschreibung", SortLnu=3
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[3].TextClb", "richtig"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[3].SortLnu", "3"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[3].TypeVoc", "Online Beschreibung"),
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[4].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[4].SortLnu", "2")
        );
        // when
        LongDescriptionNormalizer normalizer = new LongDescriptionNormalizer();
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isEqualTo("richtig");
    }

    @Test
    public void testNoDesciptionInfo() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[1].TextClb", ""),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[1].TypeVoc", "Online Beschreibung")
        );
        // when
        LongDescriptionNormalizer normalizer = new LongDescriptionNormalizer();
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }
}
