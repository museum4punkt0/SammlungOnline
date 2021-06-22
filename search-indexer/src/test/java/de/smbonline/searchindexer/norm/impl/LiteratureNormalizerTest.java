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
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0].CatalogueNumberTxt", "S. 130-131"),
                Triple.of("ObjLiteratureRef.NotesClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0].NotesClb", "(zur Miniaturensammlung Loewe)"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2]", "Hannelore Nützmann: Der Bilderrahmen als Kunstwerk, 1991, Kat.-Nr. S. 208"),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2].CatalogueNumberTxt", "S. S. 208"),
                Triple.of("ObjLiteratureRef.NotesClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2].NotesClb", "(zur Miniaturensammlung Loewe)"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1]", "Rolf H. Johannsen und Uta Barbara Ulrich: Staatliche Museen zu Berlin."),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1].CatalogueNumberTxt", "S. 55-56, F.B. 90  "),
                Triple.of("ObjLiteratureRef.NotesClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1].NotesClb", "(Miniaturensammlung Loewe dort fälschlich als Fremdbesitz unbekannter Herkunft erfaßt)"),

                Triple.of("ObjLiteratureRef", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3]", "Cella-Margaretha Girardet: Jüdische Mäzene für die Preußischen Museen zu Berlin."),
                Triple.of("ObjLiteratureRef.CatalogueNumberTxt", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].CatalogueNumberTxt", "S. 184"),
                Triple.of("ObjLiteratureRef.NotesClb", "[2260468].ObjLiteratureRef.moduleReferenceItem[269286#3].NotesClb", "(zur Miniaturensammlung Loewe)")
        );

        // when
        LiteratureNormalizer normalizer = new LiteratureNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);

        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(4);
        assertThat(value[0]).isEqualTo("Anton von Werner: Erlebnisse und Eindrücke 1870-1890, 1913, Kat.-Nr. S. 130-131");
        assertThat(value[1]).isEqualTo("Rolf H. Johannsen und Uta Barbara Ulrich: Staatliche Museen zu Berlin.");
        assertThat(value[2]).isEqualTo("Hannelore Nützmann: Der Bilderrahmen als Kunstwerk, 1991, Kat.-Nr. S. 208");
        assertThat(value[3]).isEqualTo("Cella-Margaretha Girardet: Jüdische Mäzene für die Preußischen Museen zu Berlin.");
    }
}
