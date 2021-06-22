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
                Triple.of("ObjGeograficGrp.DetailTxt", "[123].ObjGeograficGrp.item[1].DetailTxt", "details"),
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
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                // alle 4
                Triple.of("ObjGeograficGrp.DetailTxt", "[123].ObjGeograficGrp.item[1].DetailTxt", "Seestr"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[1].PlaceVoc", "Berlin"),
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[1].TypeVoc", "Wohnsitz"),
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.item[1].GeopolVoc", "nebenan"),
                // nur details
                Triple.of("ObjGeograficGrp.DetailTxt", "[123].ObjGeograficGrp.item[2].DetailTxt", "Hönow"),
                // 3, kein geopol
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[3].TypeVoc", "Region"),
                Triple.of("ObjGeograficGrp.DetailTxt", "[123].ObjGeograficGrp.item[3].DetailTxt", "Ostküste"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[3].PlaceVoc", "Mexico"),
                // nur geopol - soll ignoriert werden
                Triple.of("ObjGeograficGrp.GeopolVoc", "[123].ObjGeograficGrp.item[4].GeopolVoc", "egal"),
                // nur type - soll ignoriert werden
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[5].TypeVoc", "egal"),
                // type und place
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[6].TypeVoc", "Land"),
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[6].PlaceVoc", "China"),
                // type und details
                Triple.of("ObjGeograficGrp.TypeVoc", "[123].ObjGeograficGrp.item[7].TypeVoc", "Stadt"),
                Triple.of("ObjGeograficGrp.DetailTxt", "[123].ObjGeograficGrp.item[7].DetailTxt", "Frankfurt"),
                // place und geopol
                Triple.of("ObjGeograficGrp.PlaceVoc", "[123].ObjGeograficGrp.item[8].PlaceVoc", "London"),
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
                "London (Stadt)" // u
        );
    }
}
