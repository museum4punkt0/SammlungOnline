package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class LiteratureNormalizerTest {

    @Test
    public void testAttributeKey() {
        LiteratureNormalizer normalizer = new LiteratureNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("literature");
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0]", "Anton von Werner: Erlebnisse und Eindrücke 1870-1890, 1913, Kat.-Nr. S. 130-131"),
                Triple.of("ObjLiteratureRef.LitCitationClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0].LitCitationClb", "CLB#0"),
                Triple.of("ObjLiteratureRef.LitReferenceShortTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0].LitReferenceShortTxt", "Erlebnisse und Eindrücke"),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0].CatalogueNumberTxt", "Bd. II, S. 134, Kat.-Nr. 277, Farbtaf. 44"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2]", "Hannelore Nützmann: Der Bilderrahmen als Kunstwerk, 1991, Kat.-Nr. S. 208"),
                Triple.of("ObjLiteratureRef.LitCitationClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2].LitCitationClb", "CLB#2"),
                Triple.of("ObjLiteratureRef.LitReferenceShortTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2].LitReferenceShortTxt", "Der Bilderrahmen als Kunstwerk"),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2].CatalogueNumberTxt", "Kat.-Nr. 277"),
                Triple.of("ObjLiteratureRef.LitPublicationDateLnu", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2].LitPublicationDateLnu", "2000"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[54541#5]", "Hannelore Nützmann: Der Bilderrahmen als Kunstwerk, 1991, Kat.-Nr. S. 208"),
                Triple.of("ObjLiteratureRef.LitCitationClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[54541#5].LitCitationClb", "CLB#5"),
                Triple.of("ObjLiteratureRef.LitReferenceShortTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[54541#5].LitReferenceShortTxt", "Der Bilderrahmen als Kunstwerk"),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[54541#5].CatalogueNumberTxt", "Kat.-Nr. 277"),
                Triple.of("ObjLiteratureRef.LitPublicationDateLnu", "[2260468].ObjLiteratureRef.moduleReferenceItem[54541#5].LitPublicationDateLnu", "1989"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1]", "Rolf H. Johannsen und Uta Barbara Ulrich: Staatliche Museen zu Berlin."),
                Triple.of("ObjLiteratureRef.LitCitationClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1].LitCitationClb", "CLB#1"),
                Triple.of("ObjLiteratureRef.LitReferenceShortTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1].LitReferenceShortTxt", "Staatliche Museen zu Berlin"),
                Triple.of("ObjLiteratureRef.PicturePageTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1].PicturePageTxt", "Farbtaf. 44"),
                Triple.of("ObjLiteratureRef.PageRefTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1].PageRefTxt", "Bd. II, S. 134"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3]", "Cella-Margaretha Girardet: Jüdische Mäzene für die Preußischen Museen zu Berlin."),
                Triple.of("ObjLiteratureRef.LitCitationClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].LitCitationClb", "CLB#3"),
                Triple.of("ObjLiteratureRef.LitReferenceShortTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].LitReferenceShortTxt", "Jüdische Mäzene"),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].CatalogueNumberTxt", "Kat.-Nr. 277"),
                Triple.of("ObjLiteratureRef.PicturePageTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].PicturePageTxt", "Farbtaf. 44"),
                Triple.of("ObjLiteratureRef.PageRefTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].PageRefTxt", "Bd. II, S. 134")
        );

        // when
        LiteratureNormalizer normalizer = new LiteratureNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);

        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(5);
        assertThat(value[0]).isEqualTo("Der Bilderrahmen als Kunstwerk: CLB#5, Kat.-Nr. 277");
        assertThat(value[1]).isEqualTo("Der Bilderrahmen als Kunstwerk: CLB#2, Kat.-Nr. 277");
        assertThat(value[2]).isEqualTo("Erlebnisse und Eindrücke: CLB#0, Bd. II, S. 134, Kat.-Nr. 277, Farbtaf. 44");
        assertThat(value[3]).isEqualTo("Jüdische Mäzene: CLB#3, Bd. II, S. 134, Farbtaf. 44, Kat.-Nr. 277");
        assertThat(value[4]).isEqualTo("Staatliche Museen zu Berlin: CLB#1, Bd. II, S. 134, Farbtaf. 44");
    }
}
