package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;
import org.junit.jupiter.api.Test;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

public class NormalizerBaseTest {

    @Test
    public void testSortItemsBySortLnu() {
        Map<String, Data> items = new LinkedHashMap<>();
        items.put("Item1", new Data()
                .setAttribute("attribute1", "attribute1Value")
                .setAttribute("attribute2", "attribute2Value")
                .setAttribute("SortLnu", "1"));
        items.put("Item2", new Data()
                .setAttribute("attribute1", "attribute1Value")
                .setAttribute("attribute2", "attribute2Value")
                .setAttribute("SortLnu", "44"));
        items.put("Item3", new Data()
                .setAttribute("attribute1", "attribute1Value")
                .setAttribute("attribute2", "attribute2Value")
                .setAttribute("SortLnu", "4"));

        Data[] sorted = NormalizerBase.sortedItems(items);
        assertThat(sorted).isNotNull();
        assertThat(sorted).hasSize(3);
        assertThat(sorted[0].getAttribute("SortLnu")).isEqualTo("1");
        assertThat(sorted[1].getAttribute("SortLnu")).isEqualTo("4");
        assertThat(sorted[2].getAttribute("SortLnu")).isEqualTo("44");
    }

    @Test
    public void testSortItemsBySequenceNumber() {
        Map<String, Data> items = new LinkedHashMap<>();
        items.put("[2260468].ObjLiteratureRef.moduleReferenceItem[222263#0]", new Data()
                .setAttribute("ObjLiteratureRef", "Rolf H. Johannsen und Uta Barbara Ulrich")
                .setAttribute("CatalogueNumberTxt", "S. 130-131")
                .setAttribute("NotesClb", "(zur Miniaturensammlung Loewe)"));
        items.put("[2260468].ObjLiteratureRef.moduleReferenceItem[268795#2]", new Data()
                .setAttribute("ObjLiteratureRef", "Anton von Werner")
                .setAttribute("CatalogueNumberTxt", "S. 0-1")
                .setAttribute("NotesClb", "(zur Miniaturensammlung Loewe)"));
        items.put("[2260468].ObjLiteratureRef.moduleReferenceItem[249281#1]", new Data()
                .setAttribute("ObjLiteratureRef", "Cella-Margaretha Girardet")
                .setAttribute("CatalogueNumberTxt", "S. 30-31")
                .setAttribute("NotesClb", "(zur Miniaturensammlung Loewe)"));

        Data[] sorted = NormalizerBase.sortedItems(items);

        assertThat(sorted).isNotNull();
        assertThat(sorted).hasSize(3);
        assertThat(sorted[0].getAttribute("ObjLiteratureRef")).isEqualTo("Rolf H. Johannsen und Uta Barbara Ulrich");
        assertThat(sorted[1].getAttribute("ObjLiteratureRef")).isEqualTo("Cella-Margaretha Girardet");
        assertThat(sorted[2].getAttribute("ObjLiteratureRef")).isEqualTo("Anton von Werner");
    }
}
