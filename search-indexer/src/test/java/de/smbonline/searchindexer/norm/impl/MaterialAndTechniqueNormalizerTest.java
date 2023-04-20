package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.assertj.core.api.Assertions.*;
import static de.smbonline.searchindexer.norm.impl.Mockings.*;

// TODO: reimplement
public class MaterialAndTechniqueNormalizerTest {

    @Test
    public void testAttributeKey() {
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer(graphQlProvider(mockService()));
        assertThat(normalizer.getAttributeKey()).isEqualTo("materialAndTechnique");
    }
/*
    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[123].ObjMaterialTechniqueGrp.item[1].ExportClb", "Wasser und Brot"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[1].TypeVoc", "Ausgabe")
        );
        // when
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj, "de");
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
        String[] value = normalizer.resolveAttributeValue(obj, "de");
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
        String[] value = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(value).isNotNull();
        // special case, if there is no "Ausgabe" we should show all sorted by SortLnu
        assertThat(value).containsExactly("Ketchup", "Gummibärchen", "Sand");
    }


    @Test
    public void testMappingSpecificVocsSorted() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjMaterialTechniqueGrp.PresentationVoc", "[123].ObjMaterialTechniqueGrp.item[1].PresentationVoc", "Sand"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[1].TypeVoc", "Fotografisches Verfahren"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[1].SortLnu", "3"),

                Triple.of("ObjMaterialTechniqueGrp.MaterialVoc", "[123].ObjMaterialTechniqueGrp.item[2].MaterialVoc", "Ketchup"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[2].TypeVoc", "Material"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[2].SortLnu", "1"),

                Triple.of("ObjMaterialTechniqueGrp.TechniqueVoc", "[123].ObjMaterialTechniqueGrp.item[3].TechniqueVoc", "Gummibärchen"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[3].TypeVoc", "Technik"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[3].SortLnu", "2"),

                Triple.of("ObjMaterialTechniqueGrp.MatTechVoc", "[123].ObjMaterialTechniqueGrp.item[4].MatTechVoc", "Pizza"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[4].TypeVoc", "Nominal"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[4].SortLnu", "6"),

                Triple.of("ObjMaterialTechniqueGrp.PhotographyVoc", "[123].ObjMaterialTechniqueGrp.item[5].PhotographyVoc", "Apfel"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[5].TypeVoc", "Stempelstellung"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[5].SortLnu", "5"),

                Triple.of("ObjMaterialTechniqueGrp.LurchVoc", "[123].ObjMaterialTechniqueGrp.item[6].LurchVoc", "ignorier das"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[6].TypeVoc", "Sand"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[6].SortLnu", "4"),

                Triple.of("ObjMaterialTechniqueGrp.MatTechVoc", "[123].ObjMaterialTechniqueGrp.item[7].MatTechVoc", "Banane"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[7].TypeVoc", "Herstellungsart"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[7].SortLnu", "7"),

                Triple.of("ObjMaterialTechniqueGrp.MatTechVoc", "[123].ObjMaterialTechniqueGrp.item[8].MatTechVoc", "Kaffee"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[123].ObjMaterialTechniqueGrp.item[8].TypeVoc", "Präsentationsform"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[123].ObjMaterialTechniqueGrp.item[8].SortLnu", "8")
        );

        // when
        MaterialAndTechniqueNormalizer normalizer = new MaterialAndTechniqueNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(value).isNotNull();
        // special case, if there is no "Ausgabe"/"ExportClb" we should show specific vocs sorted by SortLnu
        assertThat(value).containsExactly(
                "Material: Ketchup",
                "Technik: Gummibärchen",
                "Fotografisches Verfahren: Sand",
                "Stempelstellung: Apfel",
                "Nominal: Pizza",
                "Herstellungsart: Banane",
                "Präsentationsform: Kaffee"
        );
    }
*/

    private static GraphQlService mockService() {
        GraphQlService service = Mockito.mock(GraphQlService.class);
        Mockito.doAnswer((invocation) -> {
            long id = invocation.getArgument(0);
            return new ThesaurusData("__thesaurus", id, id + "", null, "");
        }).when(service).fetchThesaurus(Mockito.anyLong());
        return service;
    }
}
