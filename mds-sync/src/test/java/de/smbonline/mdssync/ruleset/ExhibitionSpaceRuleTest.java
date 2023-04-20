package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.mdssync.test.TestData.*;
import static org.assertj.core.api.Assertions.*;

class ExhibitionSpaceRuleTest {

    @Test
    void testMapping_AMP() {
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
        assertMapping(item, "AMP -> NMU -> -> Ebene 1 -> Raum 11 -> rechts");

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
    void testMapping_ANT() {
        ModuleItem obj;

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Pergamonmuseum##Magazine##Hellenistischer Saal (RuB ANT 3)"),
                Pair.of("ObjNormalLocationVrt", "don't care"),
                Pair.of("ObjCurrentLocationVrt", "whatever")
        );
        // then
        assertMapping(obj, (String) null);

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Pergamonmuseum##Kompartiment##Hellenistischer Saal (RuB ANT 3)")
        );
        // then
        assertMapping(obj, (String) null); // Kompartiment = "nicht ausgestellt"

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Pergamonmuseum##Museumsshop##Hellenistischer Saal (RuB ANT 3)")
        );
        // then
        assertMapping(obj, (String) null); // Museumsshop = "nicht ausgestellt"

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Neues Museum##Ausstellung##R 3.02 (Vitrine: 4B)")
        );
        // then
        assertMapping(obj, "ANT -> Neues Museum -> -> -> R 3.02 -> Vitrine: 4B");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Altes Museum##Ausstellung##AM Hauptgeschoss##HG R 4 (V 23b.5)")
        );
        // then
        assertMapping(obj, "ANT -> Altes Museum -> -> AM Hauptgeschoss -> HG R 4 -> V 23b.5");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Neues Museum##Ausstellung##2.OG##R 2.02 (Vitrine 4b)")
        );
        // then
        assertMapping(obj, "ANT -> Neues Museum -> -> 2.OG -> R 2.02 -> Vitrine 4b");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Pergamonmuseum##Ausstellung##Hellenistischer Saal (RuB ANT 3)")
        );
        // then
        assertMapping(obj, "ANT -> Pergamonmuseum -> -> -> Hellenistischer Saal -> RuB ANT 3");

        // given
        obj = createModuleItem(123L,
                Pair.of("__orgUnit", "ANT-Antikensammlung"),
                Pair.of("ObjNormalLocationVoc", "ANT##Altes Museum##Ausstellung##AM Obergeschoss##OG R 7 (Tableau 5.8)")
        );
        // then
        assertMapping(obj, "ANT -> Altes Museum -> -> AM Obergeschoss -> OG R 7 -> Tableau 5.8");
    }

    // TODO more assertions

    private void assertMapping(final ModuleItem source, final String... expected) {
        // when
        ExhibitionSpaceRule rule = new ExhibitionSpaceRule();
        String value = rule.apply(source);
        // then
        assertThat(value).isIn((Object[]) expected);
    }

}
