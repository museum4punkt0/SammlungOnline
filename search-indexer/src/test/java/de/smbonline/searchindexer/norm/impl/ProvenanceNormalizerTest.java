package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ProvenanceNormalizerTest {

    @Test
    public void testAttributeKey() {
        ProvenanceNormalizer normalizer = new ProvenanceNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("provenance");
    }

    @Test
    public void testMappingSingle() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjOwnership001Ref.OwnApprovalVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnApprovalVoc[62657].vocabularyReferenceItem[1813607]", "Provenienzschritt freigegeben für SMB-digital"),
                Triple.of("ObjOwnership001Ref.OwnDatePreviewVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDatePreviewVrt", "frühestens 28.4.1807 - 1855"),
                Triple.of("ObjOwnership001Ref.OwnDatestampFromFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDatestampFromFuzzySearchLnu", "771.713"),
                Triple.of("ObjOwnership001Ref.OwnDatestampToFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDatestampToFuzzySearchLnu", "772.095"),
                Triple.of("ObjOwnership001Ref.OwnDateToTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDateToTxt", "1855"),
                Triple.of("ObjOwnership001Ref.OwnDateTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDateTxt", "frühestens 28.4.1807 - 1855"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.DocumentsClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDocumentsGrp.repeatableGroupItem[1435026].DocumentsClb", "Inventarbuch A I"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDocumentsGrp.repeatableGroupItem[1435026].SortLnu", "1"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDocumentsGrp.repeatableGroupItem[1435026].TypeVoc[62662].vocabularyReferenceItem[1813660]", "Quelle extern"),
                Triple.of("ObjOwnership001Ref.OwnExchangeMethodVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnExchangeMethodVoc[62658].vocabularyReferenceItem[4407877]", "Nachlass/Vermächtnis"),
                Triple.of("ObjOwnership001Ref.OwnNotesGrp.NotesClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnNotesGrp.repeatableGroupItem[1263082].NotesClb", "Oberstleutnant August Karl Behrendt, Berlin, war der Neffe Jakob Philipp Hackerts (gest. 28.4.1807). Das 1851 niedergelegte Vermächtnis Behrendts (gestorben 1855) wurde erst nach dem Tod seiner Witwe 1905 wirksam"),
                Triple.of("ObjOwnership001Ref.OwnNotesGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnNotesGrp.repeatableGroupItem[1263082].TypeVoc[62665].vocabularyReferenceItem[1813659]", "Bemerkung intern"),
                Triple.of("ObjOwnership001Ref.OwnOwnershipVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnOwnershipVrt", "Nachlass/Vermächtnis: Oberstleutnant August Karl Behrendt, Berlin, frühestens 28.4.1807 - 1855"),
                Triple.of("ObjOwnership001Ref.OwnOwnerTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnOwnerTxt", "Oberstleutnant August Karl Behrendt, Berlin"),
                Triple.of("ObjOwnership001Ref.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].SortLnu", "0")
        );
        // when
        ProvenanceNormalizer normalizer = new ProvenanceNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(1);
        assertThat(value[0]).isEqualTo("frühestens 28.4.1807 - 1855 Oberstleutnant August Karl Behrendt, Berlin, (Nachlass/Vermächtnis)\r\nInventarbuch A I: Quelle extern");
    }

    @Test
    public void testMappingMultiple() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjOwnership001Ref.OwnApprovalVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnApprovalVoc[62657].vocabularyReferenceItem[1813607]", "Provenienzschritt freigegeben für SMB-digital"),
                Triple.of("ObjOwnership001Ref.OwnDatePreviewVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDatePreviewVrt", "frühestens 28.4.1807 - 1855"),
                Triple.of("ObjOwnership001Ref.OwnDatestampFromFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDatestampFromFuzzySearchLnu", "771.713"),
                Triple.of("ObjOwnership001Ref.OwnDatestampToFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDatestampToFuzzySearchLnu", "772.095"),
                Triple.of("ObjOwnership001Ref.OwnDateToTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDateToTxt", "1855"),
                Triple.of("ObjOwnership001Ref.OwnDateTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDateTxt", "frühestens 28.4.1807 - 1855"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.DocumentsClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDocumentsGrp.repeatableGroupItem[1435026].DocumentsClb", "Inventarbuch A I"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDocumentsGrp.repeatableGroupItem[1435026].SortLnu", "1"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnDocumentsGrp.repeatableGroupItem[1435026].TypeVoc[62662].vocabularyReferenceItem[1813660]", "Quelle intern"),
                Triple.of("ObjOwnership001Ref.OwnExchangeMethodVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnExchangeMethodVoc[62658].vocabularyReferenceItem[4407877]", "Nachlass/Vermächtnis"),
                Triple.of("ObjOwnership001Ref.OwnNotesGrp.NotesClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnNotesGrp.repeatableGroupItem[1263082].NotesClb", "Oberstleutnant August Karl Behrendt, Berlin, war der Neffe Jakob Philipp Hackerts (gest. 28.4.1807). Das 1851 niedergelegte Vermächtnis Behrendts (gestorben 1855) wurde erst nach dem Tod seiner Witwe 1905 wirksam"),
                Triple.of("ObjOwnership001Ref.OwnNotesGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnNotesGrp.repeatableGroupItem[1263082].TypeVoc[62665].vocabularyReferenceItem[1813659]", "Bemerkung intern"),
                Triple.of("ObjOwnership001Ref.OwnOwnershipVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnOwnershipVrt", "Nachlass/Vermächtnis: Oberstleutnant August Karl Behrendt, Berlin, frühestens 28.4.1807 - 1855"),
                Triple.of("ObjOwnership001Ref.OwnOwnerTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].OwnOwnerTxt", "Oberstleutnant August Karl Behrendt, Berlin"),
                Triple.of("ObjOwnership001Ref.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366838#0].SortLnu", "5"),

                Triple.of("ObjOwnership001Ref.OwnApprovalVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnApprovalVoc[62657].vocabularyReferenceItem[1813607]", "Provenienzschritt freigegeben für SMB-digital"),
                Triple.of("ObjOwnership001Ref.OwnDateFromTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDateFromTxt", "1855"),
                Triple.of("ObjOwnership001Ref.OwnDatePreviewVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDatePreviewVrt", "1855 - 1905"),
                Triple.of("ObjOwnership001Ref.OwnDatestampFromFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDatestampFromFuzzySearchLnu", "771.713"),
                Triple.of("ObjOwnership001Ref.OwnDatestampToFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDatestampToFuzzySearchLnu", "792.895"),
                Triple.of("ObjOwnership001Ref.OwnDateToTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDateToTxt", "1905"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.DocumentsClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDocumentsGrp.repeatableGroupItem[1435026].DocumentsClb", "Inventarbuch-111"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDocumentsGrp.repeatableGroupItem[1435026].SortLnu", "111"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDocumentsGrp.repeatableGroupItem[1435026].TypeVoc[626623].vocabularyReferenceItem[1813660]", "Quelle extern"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.DocumentsClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDocumentsGrp.repeatableGroupItem[14350].DocumentsClb", "Inventarbuch-000"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDocumentsGrp.repeatableGroupItem[14350].SortLnu", "000"),
                Triple.of("ObjOwnership001Ref.OwnDocumentsGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnDocumentsGrp.repeatableGroupItem[14350].TypeVoc[626623].vocabularyReferenceItem[1813660]", "Quelle extern"),
                Triple.of("ObjOwnership001Ref.OwnExchangeMethodVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnExchangeMethodVoc[62658].vocabularyReferenceItem[4407877]", "Nachlass/Vermächtnis"),
                Triple.of("ObjOwnership001Ref.OwnNotesGrp.NotesClb", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnNotesGrp.repeatableGroupItem[1263085].NotesClb", "Das 1851 niedergelegte Vermächtnis Behrendts (gestorben 1855) wurde erst nach dem Tod seiner Witwe 1905 wirksam"),
                Triple.of("ObjOwnership001Ref.OwnNotesGrp.TypeVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnNotesGrp.repeatableGroupItem[1263085].TypeVoc[62665].vocabularyReferenceItem[1813659]", "Bemerkung intern"),
                Triple.of("ObjOwnership001Ref.OwnOwnershipVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].OwnOwnershipVrt", "Nachlass/Vermächtnis: Witwe des Oberstleutnants August Karl Behrendt, Berlin, 1855 - 1905"),
                Triple.of("ObjOwnership001Ref.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[366849#1].SortLnu", "10"),

                Triple.of("ObjOwnership001Ref.OwnApprovalVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnApprovalVoc[62657].vocabularyReferenceItem[1813607]", "NICHT FREIGEGEBEN"),
                Triple.of("ObjOwnership001Ref.OwnDateFromTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnDateFromTxt", "egal"),
                Triple.of("ObjOwnership001Ref.OwnDatePreviewVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnDatePreviewVrt", "egal"),
                Triple.of("ObjOwnership001Ref.OwnDatestampFromFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnDatestampFromFuzzySearchLnu", "egal"),
                Triple.of("ObjOwnership001Ref.OwnDatestampToFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnDatestampToFuzzySearchLnu", "egal"),
                Triple.of("ObjOwnership001Ref.OwnDateToTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnDateToTxt", "egal"),
                Triple.of("ObjOwnership001Ref.OwnOwnershipVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnOwnershipVrt", "egal"),
                Triple.of("ObjOwnership001Ref.OwnOwnerTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].OwnOwnerTxt", "egal"),
                Triple.of("ObjOwnership001Ref.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[7656656#2].SortLnu", "6"),

                Triple.of("ObjOwnership001Ref.OwnApprovalVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnApprovalVoc[62657].vocabularyReferenceItem[1813607]", "Provenienzschritt freigegeben für SMB-digital"),
                Triple.of("ObjOwnership001Ref.OwnDateFromTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnDateFromTxt", "1905"),
                Triple.of("ObjOwnership001Ref.OwnDatePreviewVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnDatePreviewVrt", "1905 - 1907"),
                Triple.of("ObjOwnership001Ref.OwnCertaintyVoc", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnCertaintyVoc", "ganz sicher"),
                Triple.of("ObjOwnership001Ref.OwnDatestampFromFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnDatestampFromFuzzySearchLnu", "792.513"),
                Triple.of("ObjOwnership001Ref.OwnDatestampToFuzzySearchLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnDatestampToFuzzySearchLnu", "793.727"),
                Triple.of("ObjOwnership001Ref.OwnDateToTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnDateToTxt", "1907"),
                Triple.of("ObjOwnership001Ref.OwnOwnershipVrt", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnOwnershipVrt", "Nachlaß der Witwe des August Karl Behrendt, Berlin, 1905 - 1907"),
                Triple.of("ObjOwnership001Ref.OwnPersonMNRef.PerNennformTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnPersonMNRef.moduleReferenceItem[12].PerNennformTxt", "Person1"),
                Triple.of("ObjOwnership001Ref.OwnPersonMNRef.PerNennformTxt", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].OwnPersonMNRef.moduleReferenceItem[13].PerNennformTxt", "Person2"),
                Triple.of("ObjOwnership001Ref.SortLnu", "[965869].ObjOwnership001Ref.moduleReferenceItem[371556#2].SortLnu", "15")
        );
        // when
        ProvenanceNormalizer normalizer = new ProvenanceNormalizer();
        String[] value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value).hasSize(3);
        assertThat(value[0]).isEqualTo("frühestens 28.4.1807 - 1855 Oberstleutnant August Karl Behrendt, Berlin, (Nachlass/Vermächtnis)"); // SortLnu=5
        assertThat(value[1]).isEqualTo("1855 - 1905 (Nachlass/Vermächtnis)\r\nInventarbuch-000: Quelle extern\r\nInventarbuch-111: Quelle extern"); // SortLnu=10
        assertThat(value[2]).isEqualTo("1905 - 1907 (ganz sicher) Person1, Person2"); // SortLnu=15
    }
}
