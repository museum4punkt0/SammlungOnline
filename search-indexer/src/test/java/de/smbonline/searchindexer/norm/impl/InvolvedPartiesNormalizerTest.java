package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class InvolvedPartiesNormalizerTest {

    @Test
    public void testAttributeKey() {
        InvolvedPartiesNormalizer normalizer = new InvolvedPartiesNormalizer(true);
        assertThat(normalizer.getAttributeKey()).isEqualTo("involvedParties");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[1]", "Remo, Superstar"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[2]", "Frank, Warmduscher"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[2].RoleVoc[2].item[2]", "Warmduscher"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[3]", "Mehmet, Zeichner"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[4]", "Üzgür, Maler"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[4].RoleVoc[4].item[4]", "Maler")
        );

        // when
        InvolvedPartiesNormalizer withRoleNormalizer = new InvolvedPartiesNormalizer(true);
        String[] withRole = withRoleNormalizer.resolveAttributeValue(obj);
        // then
        assertThat(withRole).isNotNull();
        assertThat(withRole).containsExactlyInAnyOrder("Remo", "Frank (Warmduscher)", "Mehmet", "Üzgür (Maler)");

        // when
        InvolvedPartiesNormalizer normalizer = new InvolvedPartiesNormalizer(false);
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNotNull();
        assertThat(value).containsExactlyInAnyOrder("Remo, Superstar", "Frank, Warmduscher", "Mehmet, Zeichner", "Üzgür, Maler");
    }

    @Test
    public void testMappingIgnoreAllFromBlacklist() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[2]", "Herr Brand"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[2].RoleVoc[1].item[1]", "Mäzen"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[1]", "Tante Erna"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[1].RoleVoc[2].item[2]", "Leihgeber"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[3]", "Edgar"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[3].RoleVoc[3].item[3]", ""),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[4]", "Bernd"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[4].RoleVoc[4].item[4]", "Nachlasser"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[5]", "Arno Nühm"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[5].RoleVoc[5].item[5]", "Person"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[6]", "Jim Panse"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[6].RoleVoc[6].item[6]", "Veräußerer"),
                Triple.of("ObjPerAssociationRef", "[123].ObjPerAssociationRef.item[7]", "Peter Lustig"),
                Triple.of("ObjPerAssociationRef.RoleVoc", "[123].ObjPerAssociationRef.item[7].RoleVoc[7].item[7]", "Vorbesitzer")
        );
        // when
        InvolvedPartiesNormalizer normalizer = new InvolvedPartiesNormalizer(true);
        String[] value = normalizer.resolveAttributeValue(obj);
        // then
        assertThat(value).isNull();
    }
}
