package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class GeographicalReferenceNormalizerTest {

    @Test
    public void testAttributeKey() {
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("geographicalReferences");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.item[1].DetailsTxt", "details"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[1].TypeVoc", "type"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[1].PlaceVoc", "place"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.item[1].GeopolVoc", "geopol")
        );
        // when
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("type: place, details (geopol)");
    }

    @Test
    public void testSpecificPlaceVovPreferredOverCommonPlaceVoc() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjGeograficGrp.PlaceILSVoc", "[123].ObjGeograficGrp.item[1].PlaceILSVoc", "ISL"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[1].PlaceVoc", "PlaceVoc"),
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc", "[123].ObjGeograficGrp.item[2].PlaceEgyptVoc", "ÄMP"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[2].PlaceVoc", "PlaceVoc"),
                Triple.of("ObjGeograficGrp.PlaceAntiqueVoc", "[123].ObjGeograficGrp.item[3].PlaceAntiqueVoc", "ANT"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[3].PlaceVoc", "PlaceVoc"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[4].PlaceVoc", "Default")
        );
        // when
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).containsExactlyInAnyOrder(
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
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.item[1].DetailsTxt", "Seestr"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[1].PlaceVoc", "Berlin"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[1].TypeVoc", "Wohnsitz"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.item[1].GeopolVoc", "nebenan"),
                // nur details
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.item[2].DetailsTxt", "Hönow"),
                // 3, kein geopol
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[3].TypeVoc", "Region"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.item[3].DetailsTxt", "Ostküste"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[3].PlaceVoc", "Mexico"),
                // nur geopol - soll ignoriert werden
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.item[4].GeopolVoc", "egal"),
                // nur type - soll ignoriert werden
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[5].TypeVoc", "egal"),
                // type und place
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[6].TypeVoc", "Land"),
                Triple.of("ObjGeograficGrp.PlaceILSVoc", "[123].ObjGeograficGrp.item[6].PlaceILSVoc", "China"),
                // type und details
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[7].TypeVoc", "Stadt"),
                Triple.of("ObjGeograficGrp.DetailsTxt", "[123].ObjGeograficGrp.item[7].DetailsTxt", "Frankfurt"),
                // place und geopol
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc", "[123].ObjGeograficGrp.item[8].PlaceEgyptVoc", "London"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.item[8].GeopolVoc", "Stadt")
        );
        // when
        GeographicalReferenceNormalizer normalizer = new GeographicalReferenceNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).containsExactlyInAnyOrder(
                "Wohnsitz: Berlin, Seestr (nebenan)", // 1
                "Hönow", // 2
                "Region: Mexico, Ostküste", // 3
                "Land: China", // 6
                "Stadt: Frankfurt",  // 7
                "London (Stadt)" // 8
        );
    }
}
