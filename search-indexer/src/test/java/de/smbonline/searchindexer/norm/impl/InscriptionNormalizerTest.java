package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class InscriptionNormalizerTest {

    @Test
    public void testAttributeKey() {
        InscriptionNormalizer normalizer = new InscriptionNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("inscriptions");
    }

    @Test
    public void testResolveInscriptions() {

        // given
        ObjectData obj = createObject(
                // 1
                Triple.of("ObjLabelObjectGrp.LabelClb", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194243#1].LabelClb", "BÜHNE / UND BRETTL / In allen / Buchhandlungen, / Trinkhallen, / bei allen / Zeitungshändlern. / 20 / Pf."),
                Triple.of("ObjLabelObjectGrp.SortLnu", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194243#1].SortLnu", "1"),
                Triple.of("ObjLabelObjectGrp.LanguageVoc", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194243#1].LanguageVoc[30281].vocabularyReferenceItem[30727]", "de"),
                Triple.of("ObjLabelObjectGrp.TypeVoc", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194243#1].TypeVoc[61675].vocabularyReferenceItem[4525686]", "Text (Plakat)"),
                // 3
                Triple.of("ObjLabelObjectGrp.MethodTxt", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194244#10].MethodTxt", "gedruckt"),
                Triple.of("ObjLabelObjectGrp.LabelClb", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194244#10].LabelClb", "JULIUS KLINGER"),
                Triple.of("ObjLabelObjectGrp.PositionTxt", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194244#10].PositionTxt", "Mitte rechts, im Bildfeld"),
                Triple.of("ObjLabelObjectGrp.SortLnu", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194244#10].SortLnu", "10"),
                Triple.of("ObjLabelObjectGrp.TypeVoc", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194244#10].TypeVoc[61675].vocabularyReferenceItem[4525674]", "Signatur (Künstler)"),
                // 2
                Triple.of("ObjLabelObjectGrp.MethodTxt", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].MethodTxt", "gedruckt"),
                Triple.of("ObjLabelObjectGrp.LabelClb", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].LabelClb", "KUNSTANST. HOLLERBAUM & SCHMIDT BERLIN N 65"),
                Triple.of("ObjLabelObjectGrp.PositionTxt", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].PositionTxt", "unten rechts"),
                Triple.of("ObjLabelObjectGrp.OrientationTxt", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].OrientationTxt", "links nach rechts"),
                Triple.of("ObjLabelObjectGrp.SortLnu", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].SortLnu", "5"),
                Triple.of("ObjLabelObjectGrp.TranslationClb", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].TranslationClb", "H&S Bln"),
                Triple.of("ObjLabelObjectGrp.TypeVoc", "[931641].ObjLabelObjectGrp.repeatableGroupItem[51194242#5].TypeVoc[61675].vocabularyReferenceItem[4525704]", "Vermerk (Drucker)")
        );

        // when
        InscriptionNormalizer normalizer = new InscriptionNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(values).isNotNull();
        assertThat(values.length).isEqualTo(3);

        // TypeVoc: PositionTxt OrientationTxt; MethodTxt: LabelClb (LanguageVoc) [TranslationClb]
        assertThat(values[0]).isEqualTo("Text (Plakat): BÜHNE / UND BRETTL / In allen / Buchhandlungen, / Trinkhallen, / bei allen / Zeitungshändlern. / 20 / Pf. (de)");
        assertThat(values[1]).isEqualTo("Vermerk (Drucker): unten rechts links nach rechts; gedruckt: KUNSTANST. HOLLERBAUM & SCHMIDT BERLIN N 65 [H&S Bln]");
        assertThat(values[2]).isEqualTo("Signatur (Künstler): Mitte rechts, im Bildfeld; gedruckt: JULIUS KLINGER");
    }

    @Test
    public void testRussian2730462() {

        // given
        ObjectData obj = createObject(
        Triple.of("ObjLabelObjectGrp.NotesClb", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510468#1].NotesClb", "L. 4960"),
                Triple.of("ObjLabelObjectGrp.LabelClb", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510468#1].LabelClb", "NG Berlin"),
                Triple.of("ObjLabelObjectGrp.PositionTxt", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510468#1].PositionTxt", "Verso"),
                Triple.of("ObjLabelObjectGrp.SortLnu", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510468#1].SortLnu", "1"),
                Triple.of("ObjLabelObjectGrp.TypeVoc", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510468#1].TypeVoc[61675].vocabularyReferenceItem[4523669]", "Stempel"),
                Triple.of("ObjLabelObjectGrp.MethodTxt", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].MethodTxt", "Tinte"),
                Triple.of("ObjLabelObjectGrp.LabelClb", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].LabelClb", "Фогелер / 1940"),
                Triple.of("ObjLabelObjectGrp.PositionTxt", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].PositionTxt", "recto, u.l."),
                Triple.of("ObjLabelObjectGrp.TranslationClb", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].TranslationClb", "Fogeler 1940"),
                Triple.of("ObjLabelObjectGrp.SortLnu", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].SortLnu", "5"),
                Triple.of("ObjLabelObjectGrp.LanguageVoc", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].LanguageVoc[30281].vocabularyReferenceItem[1047665]", "ru"),
                Triple.of("ObjLabelObjectGrp.TypeVoc", "[2730462].ObjLabelObjectGrp.repeatableGroupItem[50510471#5].TypeVoc[61675].vocabularyReferenceItem[4525674]", "Signatur (Künstler)")
        );

        // when
        InscriptionNormalizer normalizer = new InscriptionNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");

        // then
        assertThat(values).isNotNull();
        assertThat(values.length).isEqualTo(1);
        assertThat(values[0]).isEqualTo("Signatur (Künstler): recto, u.l.; Tinte: Фогелер / 1940 [Fogeler 1940 (ru)]");
    }

    @Test
    public void testNoInscriptions() {
        // given
        ObjectData obj = createObject(123L,
                Pair.of("key", "val"),
                Pair.of("ObjLabelObjectGrp.TypeVoc", "falscher Typ"),
                Pair.of("ObjLabelObjectGrp.LabelClb", "wird ignoriert"),
                Pair.of("blubb", "bla"));
        // when
        InscriptionNormalizer normalizer = new InscriptionNormalizer();
        String[] values = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(values).isNull();
    }
}
