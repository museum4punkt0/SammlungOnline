package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class FindSpotNormalizerTest {

    @Test
    public void testAttributeKey() {
        FindSpotNormalizer normalizer = new FindSpotNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("findSpot");
    }

    @Test
    public void testResolveAttributeValue() {

        // given
        ObjectData obj = createObject(
                // not the find-spot
                Triple.of("ObjGeograficGrp.PlaceVoc", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].PlaceVoc[31].vocabularyReferenceItem[41]", "Abusir el-Meleq"),
                Triple.of("ObjGeograficGrp.SortLnu", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].SortLnu", "1"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].TypeVoc[32].vocabularyReferenceItem[42]", "Kein Fundort"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].DetailsTxt", "Ägypten"),
                // the find-spot
                Triple.of("ObjGeograficGrp.PlaceVoc", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].PlaceVoc[33].vocabularyReferenceItem[43]", "weit weg"),
                Triple.of("ObjGeograficGrp.SortLnu", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].SortLnu", "2"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].TypeVoc[34].vocabularyReferenceItem[44]", "Fundort"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].DetailsTxt", "am Arsch der Welt")
        );

        // when
        FindSpotNormalizer normalizer = new FindSpotNormalizer();
        String value = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(value).isEqualTo("weit weg, am Arsch der Welt");
    }

    @Test
    public void testPickValue() {
        FindSpotNormalizer normalizer = new FindSpotNormalizer();

        assertThat(normalizer.pickValue(new Data().setAttribute("DetailsTxt", "nur details ")))
                .isEqualTo("nur details");
        assertThat(normalizer.pickValue(new Data().setAttribute("PlaceVoc", "  Abu-Sar-Shi  ")))
                .isEqualTo("Abu-Sar-Shi");
        assertThat(normalizer.pickValue(new Data()
                        .setAttribute("PlaceVoc", " wird ignoriert ")
                        .setAttribute("PlaceEgyptVoc", " Prio1 ")
                        .setAttribute("DetailsTxt", "und Details sind auch dabei!")))
                .isEqualTo("Prio1, und Details sind auch dabei!");
    }

    @Test
    public void testNoFindSpotInfo() {

        // given
        ObjectData obj = createObject(
                Triple.of("foo", "[1].foo", "foo"),
                // missing TypeVoc
                Triple.of("ObjGeograficGrp.SortLnu", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].SortLnu", "1"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].PlaceVoc[31].vocabularyReferenceItem[41]", "blubb"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[1].ObjGeograficGrp.repeatableGroupItem[2#1].DetailsTxt", "bla"),
                // TypeVoc ist not "Fundort"
                Triple.of("ObjGeograficGrp.SortLnu", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].SortLnu", "2"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].TypeVoc[32].vocabularyReferenceItem[42]", "Fundort normiert"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[1].ObjGeograficGrp.repeatableGroupItem[2#2].DetailsTxt", "Ägypten")
        );

        // when
        FindSpotNormalizer normalizer = new FindSpotNormalizer();
        String value = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(value).isNull();
    }
}
