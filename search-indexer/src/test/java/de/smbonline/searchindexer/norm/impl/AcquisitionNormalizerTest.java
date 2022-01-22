package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class AcquisitionNormalizerTest {

    @Test
    public void testAttributeKey() {
        AcquisitionNormalizer normalizer = new AcquisitionNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("acquisition");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[123].ObjAcquisitionNotesGrp.item[1].MemoClb", "memo"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[123].ObjAcquisitionNotesGrp.item[1].TypeVoc", "Ausgabe")
        );
        // when
        AcquisitionNormalizer normalizer = new AcquisitionNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("memo");
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[123].ObjAcquisitionNotesGrp.item[1#1].MemoClb", "memo1"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[123].ObjAcquisitionNotesGrp.item[1#1].TypeVoc", "Ausgabe"),
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[123].ObjAcquisitionNotesGrp.item[2#2].MemoClb", "memo2"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[123].ObjAcquisitionNotesGrp.item[2#2].TypeVoc", "Ausgabe"),
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[123].ObjAcquisitionNotesGrp.item[3#3].MemoClb", "memo3"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[123].ObjAcquisitionNotesGrp.item[3#3].TypeVoc", "Ausgabe")
        );
        // when
        AcquisitionNormalizer normalizer = new AcquisitionNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).containsExactly("memo1", "memo2", "memo3");
    }

    @Test
    public void testMappingSingle_MemoOnly() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[123].ObjAcquisitionNotesGrp.item[1].MemoClb", "memo"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[123].ObjAcquisitionNotesGrp.item[1].TypeVoc", "Keine-Ausgabe"),
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[123].ObjAcquisitionNotesGrp.item[2].MemoClb", "memo2")
        );
        // when
        AcquisitionNormalizer normalizer = new AcquisitionNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
