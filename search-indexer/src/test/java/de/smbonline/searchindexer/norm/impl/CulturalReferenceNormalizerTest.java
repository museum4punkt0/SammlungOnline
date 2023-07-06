package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.Map;

import static de.smbonline.searchindexer.norm.impl.Mockings.graphQlProvider;
import static de.smbonline.searchindexer.norm.impl.TestData.createObject;
import static org.assertj.core.api.Assertions.assertThat;

public class CulturalReferenceNormalizerTest {

    @Test
    public void testAttributeKey() {
        CulturalReferenceNormalizer normalizer = new CulturalReferenceNormalizer(graphQlProvider(mockService()));
        assertThat(normalizer.getAttributeKey()).isEqualTo("culturalReferences");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjCulturalContextGrp.TypeVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].TypeVoc[01].vocabularyReferenceItem[100000001].id", "100000001"),
                Triple.of("ObjCulturalContextGrp.TypeVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].TypeVoc[01].vocabularyReferenceItem[100000001]", "type"),
                Triple.of("ObjCulturalContextGrp.TypeVoc.name", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].TypeVoc[01].vocabularyReferenceItem[100000001].name", "type"),
                Triple.of("ObjCulturalContextGrp.NameVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].NameVoc[02].vocabularyReferenceItem[100000002].id", "100000002"),
                Triple.of("ObjCulturalContextGrp.NameVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].NameVoc[02].vocabularyReferenceItem[100000002]", "name"),
                Triple.of("ObjCulturalContextGrp.NameVoc.name", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].NameVoc[02].vocabularyReferenceItem[100000002].name", "name"),
                Triple.of("ObjCulturalContextGrp.DenominationVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].DenominationVoc[03].vocabularyReferenceItem[100000003].id", "100000003"),
                Triple.of("ObjCulturalContextGrp.DenominationVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].DenominationVoc[03].vocabularyReferenceItem[100000003]", "denomination"),
                Triple.of("ObjCulturalContextGrp.DenominationVoc.name", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].DenominationVoc[03].vocabularyReferenceItem[100000003].name", "denomination")
        );
        // when
        CulturalReferenceNormalizer normalizer = new CulturalReferenceNormalizer(graphQlProvider(mockService()));
        Data[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0].getAttribute("formatted")).isEqualTo("type: name (denomination)");
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                // item1: 3
                Triple.of("ObjCulturalContextGrp.TypeVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].TypeVoc[04].vocabularyReferenceItem[100000004]", "Type1"),
                Triple.of("ObjCulturalContextGrp.TypeVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].TypeVoc[04].vocabularyReferenceItem[100000004].id", "100000004"),
                Triple.of("ObjCulturalContextGrp.NameVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].NameVoc[05].vocabularyReferenceItem[100000005]", "Name1"),
                Triple.of("ObjCulturalContextGrp.NameVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].NameVoc[05].vocabularyReferenceItem[100000005].id", "100000005"),
                Triple.of("ObjCulturalContextGrp.DenominationVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].DenominationVoc[06].vocabularyReferenceItem[100000006]", "Denomination1"),
                Triple.of("ObjCulturalContextGrp.DenominationVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].DenominationVoc[06].vocabularyReferenceItem[100000006].id", "100000006"),
                Triple.of("ObjCulturalContextGrp.SortLnu", "[123].ObjCulturalContextGrp.repeatableGroupItem[1].SortLnu", "500"),
                // item2: 1
                Triple.of("ObjCulturalContextGrp.DenominationVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[2].DenominationVoc[07].vocabularyReferenceItem[100000007]", "Denomination2"),
                Triple.of("ObjCulturalContextGrp.DenominationVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[2].DenominationVoc[07].vocabularyReferenceItem[100000007].id", "100000007"),
                Triple.of("ObjCulturalContextGrp.NameVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[2].NameVoc[08].vocabularyReferenceItem[100000008]", "Name2"),
                Triple.of("ObjCulturalContextGrp.NameVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[2].NameVoc[08].vocabularyReferenceItem[100000008].id", "100000008"),
                Triple.of("ObjCulturalContextGrp.SortLnu", "[123].ObjCulturalContextGrp.repeatableGroupItem[2].SortLnu", "2"),
                // item3: 2
                Triple.of("ObjCulturalContextGrp.TypeVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[3].TypeVoc[09].vocabularyReferenceItem[100000009]", "Type3"),
                Triple.of("ObjCulturalContextGrp.TypeVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[3].TypeVoc[09].vocabularyReferenceItem[100000009].id", "100000009"),
                Triple.of("ObjCulturalContextGrp.NameVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[3].NameVoc[10].vocabularyReferenceItem[100000010]", "Name3"),
                Triple.of("ObjCulturalContextGrp.NameVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[3].NameVoc[10].vocabularyReferenceItem[100000010].id", "100000010"),
                Triple.of("ObjCulturalContextGrp.SortLnu", "[123].ObjCulturalContextGrp.repeatableGroupItem[3].SortLnu", "34"),
                // item4: ignore
                Triple.of("ObjCulturalContextGrp.TypeVoc", "[123].ObjCulturalContextGrp.repeatableGroupItem[4].TypeVoc[11].vocabularyReferenceItem[100000011]", "Type4"),
                Triple.of("ObjCulturalContextGrp.TypeVoc.id", "[123].ObjCulturalContextGrp.repeatableGroupItem[4].TypeVoc[11].vocabularyReferenceItem[100000011].id", "100000011"),
                Triple.of("ObjCulturalContextGrp.SortLnu", "[123].ObjCulturalContextGrp.repeatableGroupItem[4].SortLnu", "1")
        );
        // when
        CulturalReferenceNormalizer normalizer = new CulturalReferenceNormalizer(graphQlProvider(mockService()));
        Data[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        String[] formattedValues = Arrays.stream(value).map(d -> d.<String>getTypedAttribute("formatted")).toArray(String[]::new);
        assertThat(formattedValues).containsExactly(
                "Name2 (Denomination2)", // item2
                "Type3: Name3", // item3
                "Type1: Name1 (Denomination1)" // item1
        );
    }

    private static GraphQlService mockService() {
        GraphQlService service = Mockito.mock(GraphQlService.class);
        Mockito.doAnswer((invocation) -> {
            long id = invocation.getArgument(0);
            return new ThesaurusData("__thesaurus", id, THESAURUS_DB.get(id), null, "");
        }).when(service).fetchThesaurus(Mockito.anyLong());
        return service;
    }

    private static final Map<Long, String> THESAURUS_DB = Map.ofEntries(
            Map.entry(100000001L, "type"),
            Map.entry(100000002L, "name"),
            Map.entry(100000003L, "denomination"),
            Map.entry(100000004L, "Type1"),
            Map.entry(100000005L, "Name1"),
            Map.entry(100000006L, "Denomination1"),
            Map.entry(100000007L, "Denomination2"),
            Map.entry(100000008L, "Name2"),
            Map.entry(100000009L, "Type3"),
            Map.entry(100000010L, "Name3"),
            Map.entry(100000011L, "Type4")
    );
}
