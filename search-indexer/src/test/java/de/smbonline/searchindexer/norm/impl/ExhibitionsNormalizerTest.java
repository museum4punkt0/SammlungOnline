package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ExhibitionsNormalizerTest {

    @Test
    public void testAttributeKey() {
        ExhibitionsNormalizer normalizer = new ExhibitionsNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("exhibitions");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhVenueDetailsTxt",
                        "Bei Ötzgür im Hof"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhBeginDateDat",
                        "1.1.2012"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhEndDateDat",
                        "31.12.2012"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhTitleGrp.moduleReferenceItem[41079].TitleClb",
                        "Super Ausstellung"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TypeVoc",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhTitleGrp.moduleReferenceItem[41079].TypeVoc",
                        "Ausstellungstitel")
        );
        // when
        ExhibitionsNormalizer normalizer = new ExhibitionsNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("Super Ausstellung, Bei Ötzgür im Hof, 1.1.2012-31.12.2012");
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                // second result
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhVenueDetailsTxt",
                        "Bei Ötzgür im Hof"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhDateTxt",
                        "2012"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhBeginDateDat",
                        "1.1.2012"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhEndDateDat",
                        "31.12.2012"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhTitleGrp.moduleReferenceItem[41079].TitleClb",
                        "Super Ausstellung"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[136897].RegExhibitionRef.moduleReferenceItem[36499].ExhTitleGrp.moduleReferenceItem[41079].TypeVoc",
                        "Ausstellungstitel"),

                // ignore
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[333].RegExhibitionRef.moduleReferenceItem[444].ExhVenueDetailsTxt",
                        "Zu Hause"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[333].RegExhibitionRef.moduleReferenceItem[444].ExhDateTxt",
                        "2372"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[333].RegExhibitionRef.moduleReferenceItem[444].ExhBeginDateDat",
                        "15.10.2372"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[333].RegExhibitionRef.moduleReferenceItem[444].ExhEndDateDat",
                        "18.10.2372"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[333].RegExhibitionRef.moduleReferenceItem[444].ExhTitleGrp.moduleReferenceItem[555].TitleClb",
                        "Zweite Ausstellung"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[333].RegExhibitionRef.moduleReferenceItem[444].ExhTitleGrp.moduleReferenceItem[555].TypeVoc",
                        "Ausstellungstitel"),

                // ignore
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[666].RegExhibitionRef.moduleReferenceItem[888].ExhTitleGrp.moduleReferenceItem[999].TitleClb",
                        "Dritte Ausstellung ohne Info"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[666].RegExhibitionRef.moduleReferenceItem[888].ExhTitleGrp.moduleReferenceItem[999].TypeVoc",
                        "Ausstellungstitel"),

                // ignore
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[9999999].RegExhibitionRef.moduleReferenceItem[123].ExhVenueDetailsTxt",
                        "Hauptstr. 5, 3. Etage"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[9999999].RegExhibitionRef.moduleReferenceItem[123].ExhTitleGrp.moduleReferenceItem[123465798].TitleClb",
                        "Vierte Ausstellung ohne Datum"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[9999999].RegExhibitionRef.moduleReferenceItem[123].ExhTitleGrp.moduleReferenceItem[123465798].TypeVoc",
                        "Ausstellungstitel"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[9999999].RegExhibitionRef.moduleReferenceItem[123].ExhTitleGrp.moduleReferenceItem[987654].TitleClb",
                        "Egal"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[9999999].RegExhibitionRef.moduleReferenceItem[123].ExhTitleGrp.moduleReferenceItem[987654].TypeVoc",
                        "Interner Titel"),

                // first result
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[345].RegExhibitionRef.moduleReferenceItem[9273].ExhVenueDetailsTxt",
                        "Lobeckstr. 36"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[345].RegExhibitionRef.moduleReferenceItem[9273].ExhDateTxt",
                        "1988"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[345].RegExhibitionRef.moduleReferenceItem[9273].ExhBeginDateDat",
                        "14.3.1988"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[345].RegExhibitionRef.moduleReferenceItem[9273].ExhEndDateDat",
                        "14.3.1991"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[345].RegExhibitionRef.moduleReferenceItem[9273].ExhTitleGrp.moduleReferenceItem[906353].TitleClb",
                        "3-Jahres-Ausstellung"),
                Triple.of("ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                        "[965869].ObjRegistrarRef.moduleReferenceItem[345].RegExhibitionRef.moduleReferenceItem[9273].ExhTitleGrp.moduleReferenceItem[906353].TypeVoc",
                        "Ausstellungstitel")
        );
        // when
        ExhibitionsNormalizer normalizer = new ExhibitionsNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(2);
        assertThat(value[0]).isEqualTo("3-Jahres-Ausstellung, Lobeckstr. 36, 14.3.1988-14.3.1991");
        assertThat(value[1]).isEqualTo("Super Ausstellung, Bei Ötzgür im Hof, 1.1.2012-31.12.2012");
        // ignore future: "Zweite Ausstellung, Zu Hause, 15.10.2372-18.10.2372"
        // ignore missing dates: "Dritte Ausstellung ohne Info", "Vierte Ausstellung ohne Datum, Hauptstr. 5, 3. Etage"
    }
}
