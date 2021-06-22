package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.search.response.ModuleItem;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.mdssync.test.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ExhibitionSpaceRuleTest {


    // R 104 (MVF / Neues Museum) / V. 05
    // R 311 (MVF / Neues Museum) / V. Marne-Golasecca
    // Ausleihe/Ausstellung (ÄMP) / MVF im Neuen Museum (10/2009-06/2019)
    // Prussia-Magazin (MVF / Depotbereich Langhans-Bau)
    // Archäologisches Zentrum (MVF)

    // Anorganik/Organik R 2.26 (ISL / MI / AZ / Restaurierungswerkstatt ISL)

    // PS (ÄMP / AZ / Papyrus / Schrank 105) / F 14

    @Test
    public void testMapping_AMP() {
        ModuleItem item;

        // given
        item = createModuleItem(123L,
                Pair.of("__orgUnit", "ÄMP-ÄgyptischesMuseum"),
                Pair.of("ObjNormalLocationVrt", "whatever"),
                Pair.of("ObjCurrentLocationVrt", "0. 02 / 221 (ÄMP / M 09 / Depot 02) / 01")
        );
        // then
        assertMapping(item, "UNKNOWN", null);

        // given
        item = createModuleItem(123L,
                Pair.of("__orgUnit", "ÄMP-ÄgyptischesMuseum"),
                Pair.of("ObjNormalLocationVrt", "whatever"),
                Pair.of("ObjCurrentLocationVrt", "1. 11 / 01 (ÄMP / NMU / Ebene 1 / Raum 11) / rechts")
        );
        // then
        assertMapping(item, "ÄMP -> NMU -> -> Ebene 1 -> Raum 11 -> rechts");

        // given
        item = createModuleItem(123L,
                Pair.of("__orgUnit", "ÄMP-ÄgyptischesMuseum"),
                Pair.of("ObjNormalLocationVrt", "whatever"),
                Pair.of("ObjCurrentLocationVrt", "ÄM (ÄMP / AZ / Kleinfunde / Schrank 049 - o) / 07")
        );
        // then
        assertMapping(item, "UNKNOWN", null);
    }

    @Test
    public void testMapping_ANT() {
        ModuleItem obj;

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "AZ R 0.48 Studiensammlung 2 Skulpturen (ANT / Archäologisches Zentrum / Magazine) / Schrank:4 Fach:2"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "UNKNOWN", null);

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "Kompartiment 4 (Ostsaal) (ANT / Altes Museum / Ausstellung / 1. Obergeschoss) / Vitrine 4. 3. 3"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "UNKNOWN", null);

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "Museumsshop (ANT / Altes Museum / Ausstellung / AM Obergeschoss) / Vitrine 7"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "UNKNOWN", null);

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "R 3.02 (Eisenzeit) (ANT / Neues Museum / Ausstellung) / Vitrine: 4B"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "ANT -> Neues Museum -> -> -> R 3.02 -> Vitrine: 4B");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "HG R 4 (ANT / Altes Museum / Ausstellung / AM Hauptgeschoss) / V 23b.5"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "ANT -> Altes Museum -> -> AM Hauptgeschoss -> HG R 4 -> V 23b.5");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "R 2.02 (Römischer Saal, Roms Provinzen) (ANT / Neues Museum / Ausstellung) / Vitrine: 4.2 Objekt: 12.a"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "ANT -> Neues Museum -> -> -> R 2.02 -> Vitrine: 4.2 Objekt: 12.a");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "Altarsaal (RuB ANT 2) (ANT / Pergamonmuseum / Ausstellung / Pergamon-Saal (RuB ANT 2))"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "UNKNOWN", null);

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVrt", "OG R 7 (ANT / Altes Museum / Ausstellung / AM Obergeschoss) / Tableau 5.8"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, "ANT -> Altes Museum -> -> AM Obergeschoss -> OG R 7 -> Tableau 5.8");
    }

    //    @Test
//    public void testMapping_MVF() {
//        // given
//        ModuleItem obj = createModuleItem(123L,
//                Pair.of("__orgUnit", "MVFMusBKaukasusundVordererOrient"),
//                Pair.of("ObjNormalLocationVrt", "whatever"),
//                Pair.of("ObjCurrentLocationVrt", "R 206 (MVF / Neues Museum) / V. 06"));
//        // then
//        assertMapping(obj, "Neues Museum, Ebene 2, Raum 206");
//    }
//
//    // TODO more assertions
//
    private void assertMapping(final ModuleItem source, final String... expected) {
        // when
        ExhibitionSpaceRule rule = new ExhibitionSpaceRule();
        String value = rule.apply(source);
        // then
        assertThat(value).isIn((Object[]) expected);
    }

}
