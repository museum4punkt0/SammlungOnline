package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class MaterialAndTechniqueNormalizerTest {

    @Test
    public void testAttributeKey() {
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("materialAndTechnique");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[1].ExportClb", "Wasser und Brot"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[1].TypeVoc", "Ausgabe")
        );
        // when
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("Wasser und Brot");
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[1].ExportClb", "Sand"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[1].TypeVoc", "Ausgabe"),
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[2].ExportClb", "Ketchup"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[2].TypeVoc", "Ausgabe"),
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[3].ExportClb", "Gummibärchen"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[3].TypeVoc", "Keine-Ausgabe")
        );
        // when
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).containsExactlyInAnyOrder("Sand", "Ketchup");
    }

    @Test
    public void testMappingAllSorted() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[1].ExportClb", "Sand"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[1].SortLnu", "3"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[1].TypeVoc", "Keine-Ausgabe"),
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[2].ExportClb", "Ketchup"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[2].SortLnu", "1"),
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[3].ExportClb", "Gummibärchen"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[3].SortLnu", "2")
        );

        // when
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);

        // then
        assertThat(value).isNotNull();
        // special case, if there is no "Ausgabe" we should show all sorted by SortLnu
        assertThat(value).containsExactly("Ketchup", "Gummibärchen", "Sand");
    }
}
