package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ExhibitionSpaceNormalizerTest {

    @Test
    public void testAttributeKey() {
        ExhibitionSpaceNormalizer normalizer = new ExhibitionSpaceNormalizer("-");
        assertThat(normalizer.getAttributeKey()).isEqualTo("exhibitionSpace");
    }

    @Test
    public void testNoLocationInfo() {
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"), Pair.of("key", "val"));
        assertMapping(obj, null);
    }

    @Test
    public void testMappingUses4Parts_IgnoresCollectionAndAppendixes() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ONE -> TWO -> THREE -> FOUR -> FIVE -> SIX -> SEVEN");
        assertMapping(obj, "TWO, THREE, FOUR, FIVE");
    }

    @Test
    public void testMapping_AMP_room00() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "AMP -> NMU -> -> Ebene 0 -> Raum 00");
        assertMapping(obj, "Neues Museum, Ebene 0, Raum 000");
    }

    @Test
    public void testMapping_AMP_leadingZeros() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "AMP -> NMU -> -> Ebene 0 -> Raum 06");
        assertMapping(obj, "Neues Museum, Ebene 0, Raum 006");
    }

    @Test
    public void testMapping_AMP() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ÄMP -> NMU -> -> Ebene 1 -> Raum 10");
        assertMapping(obj, "Neues Museum, Ebene 1, Raum 110");
    }

    @Test
    public void testMapping_ANT_NMU() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ANT -> Neues Museum -> -> -> R 3.02 (Eisenzeit) -> Vitrine: 4B");
        assertMapping(obj, "Neues Museum, Ebene 3, Raum 302");
    }

    @Test
    public void testMapping_ANT_AM() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ANT -> Altes Museum -> -> AM Obergeschoss -> OG R 3 -> Vitrine: 4B");
        assertMapping(obj, "Altes Museum, Obergeschoss, Raum 3");

        obj = withExhibitionSpace(createObject(123L), "ANT -> Altes Museum -> -> AM Hauptgeschoss -> HG R 2");
        assertMapping(obj, "Altes Museum, Hauptgeschoss, Raum 2");
    }

    @Test
    public void testMapping_ANT_PMU_IsOnFirstFloor() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ANT -> Pergamonmuseum -> -> -> Milet-Saal -> RuB ANT 1");
        assertMapping(obj, "Pergamonmuseum, Ebene 1, Antikensammlung, Raum 1");

        obj = withExhibitionSpace(createObject(123L), "ANT -> Pergamonmuseum -> -> Pergamon-Saal (RuB ANT 2) -> Altarsaal -> RuB ANT 2");
        assertMapping(obj, "Pergamonmuseum, Ebene 1, Antikensammlung, Raum 2");

        obj = withExhibitionSpace(createObject(123L), "ANT -> Pergamonmuseum -> -> -> R 05");
        assertMapping(obj, "Pergamonmuseum, Ebene 1, Antikensammlung, Raum 5");
    }

    @Test
    public void testMapping_MVF() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "MVF -> Neues Museum -> -> -> R 206 -> V. 06");
        assertMapping(obj, "Neues Museum, Ebene 2, Raum 206");
    }

    @Test
    public void testMapping_ANG() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "NG -> ANG -> -> 1.AG -> AG_1.04");
        assertMapping(obj, "Alte Nationalgalerie, 1. Ausstellungsgeschoss, Raum 104");
    }

    @Test
    public void testMapping_ANG_FWK() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "NG -> -> FWK (NG) -> -> ");
        assertMapping(obj, "Friedrichswerdersche Kirche, Dauerausstellung");
    }

    @Test
    public void testMapping_ANG_Stairs() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "NG -> ANG -> -> Treppenhaus -> Treppe-AG_2");
        assertMapping(obj, "Alte Nationalgalerie, 2. Ausstellungsgeschoss, Treppenhaus");
    }

    @Test
    public void testMapping_ANG_StairsBetweenLevels() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "NG -> ANG -> -> Treppenhaus -> Treppe-AG_2-3");
        assertMapping(obj, "Alte Nationalgalerie, 2. und 3. Ausstellungsgeschoss, Treppenhaus");
    }

    @Test
    public void testMapping_StairsOverMultipleLevels() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "WHATEVER -> Museum -> -> Treppenhaus -> Treppe-AG_1-9");
        assertMapping(obj, "Museum, 1. bis 9. Ausstellungsgeschoss, Treppenhaus");
    }

    @Test
    public void testMapping_NNG() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "NG -> NNG -> NNG-Ausstellung");
        assertMapping(obj, "in der Ausstellung");
    }

    @Test
    public void testMapping_GG() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "GG -> -> Kulturforum -> GG_2.OG_Ausstellung -> GG_461");
        assertMapping(obj, "Gemäldegalerie, Hauptgeschoss, Raum 39");
    }

    @Test
    public void testMapping_GG_BM() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "GG -> Bodemuseum -> -> -> GG_Bodemuseum_225");
        assertMapping(obj, "Bode-Museum, Ebene 2, Raum 225");
    }

    @Test
    public void testMapping_ISL_IsOnSecondFloor() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "ISL -> PMU -> -> -> R 05");
        assertMapping(obj, "Pergamonmuseum, Ebene 2, Museum für Islamische Kunst, Raum 5");

        obj = withExhibitionSpace(createObject(123L), "ISL -> PMU -> -> -> R 05 -> W 03##WV 01");
        assertMapping(obj, "Pergamonmuseum, Ebene 2, Museum für Islamische Kunst, Raum 5");
    }

    @Test
    public void testMapping_VAM_IsOnFirstFloor() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "VAM -> PMU -> -> -> Raum 11");
        assertMapping(obj, "Pergamonmuseum, Ebene 1, Vorderasiatisches Museum, Raum 11");
    }

    @Test
    public void testMapping_VAM_RemoveLeadingZerosFromRoom() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "VAM -> PMU -> -> -> Raum 0001");
        assertMapping(obj, "Pergamonmuseum, Ebene 1, Vorderasiatisches Museum, Raum 1");
    }

    @Test
    public void testMapping_VAM_PrivatgruftIs10b() {
        ObjectData obj = withExhibitionSpace(createObject(123L), "VAM -> PMU -> -> -> Privatgruft");
        assertMapping(obj, "Pergamonmuseum, Ebene 1, Vorderasiatisches Museum, Raum 10b");
    }

    // TODO more assertions for other collections

    private void assertMapping(final /* given */ ObjectData source, final String expected) {
        // when
        ExhibitionSpaceNormalizer normalizer = new ExhibitionSpaceNormalizer("->");
        String value = normalizer.resolveAttributeValue(source, "de");
        // then
        assertThat(value).isEqualTo(expected);
    }
}
