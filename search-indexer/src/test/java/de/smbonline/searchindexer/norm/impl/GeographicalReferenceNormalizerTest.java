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

import static de.smbonline.searchindexer.norm.impl.Mockings.*;
import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class GeographicalReferenceNormalizerTest {

    @Test
    public void testAttributeKey() {
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer(graphQlProvider(mockService()));
        assertThat(normalizer.getAttributeKey()).isEqualTo("geographicalReferences");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.repeatableGroupItem[1].DetailsTxt", "details"),
                Triple.of("ObjGeograficGrp.TypeVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].TypeVoc[1].vocabularyReferenceItem[9991].id", "9991"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].TypeVoc[1].vocabularyReferenceItem[9991]", "type"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceVoc[3].vocabularyReferenceItem[9992].id", "9992"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceVoc[3].vocabularyReferenceItem[9992]", "place"),
                Triple.of("ObjGeograficGrp.GeopolVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].GeopolVoc[5].vocabularyReferenceItem[9993].id", "9993"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].GeopolVoc[5].vocabularyReferenceItem[9993]", "geopol")
        );
        // when
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer(graphQlProvider(mockService()));
        Data[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0].getAttribute("formatted")).isEqualTo("type: place, details (geopol)");
    }

    @Test
    public void testSpecificPlaceVocPreferredOverCommonPlaceVoc() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjGeograficGrp.PlaceILSVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceILSVoc[04].vocabularyReferenceItem[100000004]", "ISL"),
                Triple.of("ObjGeograficGrp.PlaceILSVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceILSVoc[04].vocabularyReferenceItem[100000004].id", "100000004"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceVoc[05].vocabularyReferenceItem[100000005]", "PlaceVoc"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceVoc[05].vocabularyReferenceItem[100000005].id", "100000005"),
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc", "[123].ObjGeograficGrp.repeatableGroupItem[2].PlaceEgyptVoc[06].vocabularyReferenceItem[100000006]", "ÄMP"),
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[2].PlaceEgyptVoc[06].vocabularyReferenceItem[100000006].id", "100000006"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[2].PlaceVoc[07].vocabularyReferenceItem[100000007]", "PlaceVoc"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[2].PlaceVoc[07].vocabularyReferenceItem[100000007].id", "100000007"),
                Triple.of("ObjGeograficGrp.PlaceAntiqueVoc", "[123].ObjGeograficGrp.repeatableGroupItem[3].PlaceAntiqueVoc[08].vocabularyReferenceItem[100000008]", "ANT"),
                Triple.of("ObjGeograficGrp.PlaceAntiqueVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[3].PlaceAntiqueVoc[08].vocabularyReferenceItem[100000008].id", "100000008"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[3].PlaceVoc[09].vocabularyReferenceItem[100000009]", "PlaceVoc"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[3].PlaceVoc[09].vocabularyReferenceItem[100000009].id", "100000009"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[4].PlaceVoc[10].vocabularyReferenceItem[100000010]", "Default"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[4].PlaceVoc[10].vocabularyReferenceItem[100000010].id", "100000010")
        );
        // when
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer(graphQlProvider(mockService()));
        Data[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        String[] formattedValues = Arrays.stream(value).map(d -> d.<String>getTypedAttribute("formatted")).toArray(String[]::new);
        assertThat(formattedValues).containsExactlyInAnyOrder(
                "ISL", // item 1
                "ÄMP", // item 2
                "ANT", // item 3
                "Default" // item 4
        );
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                // alle 4
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.repeatableGroupItem[1].DetailsTxt", "Seestr"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceVoc[1].vocabularyReferenceItem[100000011]", "Berlin"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].PlaceVoc[1].vocabularyReferenceItem[100000011].id", "100000011"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].TypeVoc[1].vocabularyReferenceItem[100000012]", "Wohnsitz"),
                Triple.of("ObjGeograficGrp.TypeVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].TypeVoc[1].vocabularyReferenceItem[100000012].id", "100000012"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.repeatableGroupItem[1].GeopolVoc[1].vocabularyReferenceItem[100000013]", "nebenan"),
                Triple.of("ObjGeograficGrp.GeopolVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[1].GeopolVoc[1].vocabularyReferenceItem[100000013].id", "100000013"),
                // nur details
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.repeatableGroupItem[2].DetailsTxt", "Hönow"),
                // 3, kein geopol
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.repeatableGroupItem[3].TypeVoc[3].vocabularyReferenceItem[100000014]", "Region"),
                Triple.of("ObjGeograficGrp.TypeVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[3].TypeVoc[3].vocabularyReferenceItem[100000014].id", "100000014"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.repeatableGroupItem[3].DetailsTxt", "Ostküste"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.repeatableGroupItem[3].PlaceVoc[3].vocabularyReferenceItem[100000015]", "Mexico"),
                Triple.of("ObjGeograficGrp.PlaceVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[3].PlaceVoc[3].vocabularyReferenceItem[100000015].id", "100000015"),
                // nur geopol - soll ignoriert werden
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.repeatableGroupItem[4].GeopolVoc[4].vocabularyReferenceItem[100000016]", "egal"),
                Triple.of("ObjGeograficGrp.GeopolVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[4].GeopolVoc[4].vocabularyReferenceItem[100000016].id", "100000016"),
                // nur type - soll ignoriert werden
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.repeatableGroupItem[5].TypeVoc[5].vocabularyReferenceItem[100000017]", "egal"),
                Triple.of("ObjGeograficGrp.TypeVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[5].TypeVoc[5].vocabularyReferenceItem[100000017].id", "100000017"),
                // type und place
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.repeatableGroupItem[6].TypeVoc[6].vocabularyReferenceItem[100000018]", "Land"),
                Triple.of("ObjGeograficGrp.TypeVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[6].TypeVoc[6].vocabularyReferenceItem[100000018].id", "100000018"),
                Triple.of("ObjGeograficGrp.PlaceILSVoc", "[123].ObjGeograficGrp.repeatableGroupItem[6].PlaceILSVoc[6].vocabularyReferenceItem[100000019]", "China"),
                Triple.of("ObjGeograficGrp.PlaceILSVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[6].PlaceILSVoc[6].vocabularyReferenceItem[100000019].id", "100000019"),
                // type und details
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.repeatableGroupItem[7].TypeVoc[7].vocabularyReferenceItem[100000020]", "Stadt"),
                Triple.of("ObjGeograficGrp.TypeVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[7].TypeVoc[7].vocabularyReferenceItem[100000020].id", "100000020"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.repeatableGroupItem[7].DetailsTxt", "Frankfurt"),
                // place und geopol
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc", "[123].ObjGeograficGrp.repeatableGroupItem[8].PlaceEgyptVoc[8].vocabularyReferenceItem[100000021]", "London"),
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[8].PlaceEgyptVoc[8].vocabularyReferenceItem[100000021].id", "100000021"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.repeatableGroupItem[8].GeopolVoc[8].vocabularyReferenceItem[100000022]", "Stadt"),
                Triple.of("ObjGeograficGrp.GeopolVoc.id", "[123].ObjGeograficGrp.repeatableGroupItem[8].GeopolVoc[8].vocabularyReferenceItem[100000022].id", "100000022")
        );
        // when
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer(graphQlProvider(mockService()));
        Data[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        // then
        assertThat(value).isNotNull();
        String[] formattedValues = Arrays.stream(value).map(d -> d.<String>getTypedAttribute("formatted")).toArray(String[]::new);
        assertThat(formattedValues).containsExactlyInAnyOrder(
                "Wohnsitz: Berlin, Seestr (nebenan)", // 1
                "Hönow", // 2
                "Region: Mexico, Ostküste", // 3
                "Land: China", // 6
                "Stadt: Frankfurt",  // 7
                "London (Stadt)" // 8
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
            Map.entry(9991L, "type"),
            Map.entry(9992L, "place"),
            Map.entry(9993L, "geopol"),
            Map.entry(100000004L, "ISL"),
            Map.entry(100000005L, "PlaceVoc"),
            Map.entry(100000006L, "ÄMP"),
            Map.entry(100000007L, "PlaceVoc"),
            Map.entry(100000008L, "ANT"),
            Map.entry(100000009L, "PlaceVoc"),
            Map.entry(100000010L, "Default"),
            Map.entry(100000011L, "Berlin"),
            Map.entry(100000012L, "Wohnsitz"),
            Map.entry(100000013L, "nebenan"),
            Map.entry(100000014L, "Region"),
            Map.entry(100000015L, "Mexico"),
            Map.entry(100000016L, "egal"),
            Map.entry(100000017L, "egal"),
            Map.entry(100000018L, "Land"),
            Map.entry(100000019L, "China"),
            Map.entry(100000020L, "Stadt"),
            Map.entry(100000021L, "London"),
            Map.entry(100000022L, "Stadt")
    );
}
