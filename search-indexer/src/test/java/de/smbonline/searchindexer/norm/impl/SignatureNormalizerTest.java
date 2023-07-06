package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class SignatureNormalizerTest {

    @Test
    public void testAttributeKey() {
        SignatureNormalizer normalizer = new SignatureNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("signatures");
    }

    @Test
    public void testResolveAttributeValue() {
        // given
        ObjectData obj = TestData.createObject(
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalSortierungLLnu",
                        "[960558].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343311]._UserOalSortierungLLnu",
                        "7"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb",
                        "[960558].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343311]._UserOalTextMClb",
                        "Bez. rechts unten (am Pilastersockel): C.B.F.1850"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSVoc",
                        "[960558].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343311]._UserOalTextSVoc",
                        "Signaturen und Inschriften"),

                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalSortierungLLnu",
                        "[960558].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343312]._UserOalSortierungLLnu",
                        "1"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb",
                        "[960558].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343312]._UserOalTextMClb",
                        "C.Blechen 1825"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSVoc",
                        "[960558].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343312]._UserOalTextSVoc",
                        "Signaturen und Inschriften"),

                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalSortierungLLnu",
                        "[960558].ObjGeneralCre.compositeItem[#1]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343313]._UserOalSortierungLLnu",
                        "5"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb",
                        "[960558].ObjGeneralCre.compositeItem[#1]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343313]._UserOalTextMClb",
                        "Bez. rechts unten: Stolberg d. 16. Juni 18[…]"),

                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalSortierungLLnu",
                        "[960558].ObjGeneralCre.compositeItem[#1]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343314]._UserOalSortierungLLnu",
                        "10"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb",
                        "[960558].ObjGeneralCre.compositeItem[#1]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343314]._UserOalTextMClb",
                        "Beschriftet auf der Rückseite von fremder Hand: Adrian Ludwig Richter"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSVoc",
                        "[960558].ObjGeneralCre.compositeItem[#1]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[45343314]._UserOalTextSVoc",
                        "Fremde Beschriftungen")
                );

        // when
        SignatureNormalizer normalizer = new SignatureNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(value).isNotNull();
        assertThat(value.length).isEqualTo(2);
        assertThat(value).containsExactly(
                "C.Blechen 1825",
                "Bez. rechts unten (am Pilastersockel): C.B.F.1850"
        );
    }
}
