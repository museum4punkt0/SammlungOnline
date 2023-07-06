package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.createObject;
import static org.assertj.core.api.Assertions.assertThat;

public class DescriptionNormalizerTest {

    @Test
    public void testAttributeKey() {
        DescriptionNormalizer normalizer = new DescriptionNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("description");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(
                // missing TypeVoc
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[1].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.TextHTMLClb", "[123].ObjTextOnlineGrp.item[1].TextHTMLClb", "<div font-size=\\\"12.5px\\\">falsch&amp;html</div>"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[1].SortLnu", "4"),
                // --

                // wrong TypeVoc
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[2].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.TextHTMLClb", "[123].ObjTextOnlineGrp.item[2].TextHTMLClb", "<div font-size=\\\"12.5px\\\">falsch&amp;html</div>"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[2].SortLnu", "1"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[2].TypeVoc", "Lurch"),
                // --

                // SortLnu too high
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[5].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.TextHTMLClb", "[123].ObjTextOnlineGrp.item[5].TextHTMLClb", "<div font-size=\\\"12.5px\\\">falsch&amp;html</div>"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[5].SortLnu", "5"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[5].TypeVoc", "Online Beschreibung"),
                // --

                // expected hit: TypeVoc="Online Beschreibung" + SortLnu=3
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[3].TextClb", "richtig"),
                Triple.of("ObjTextOnlineGrp.TextHTMLClb", "[123].ObjTextOnlineGrp.item[3].TextHTMLClb", "<div font-size=\\\"12.5px\\\">richtig&amp;html</div>"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[3].SortLnu", "3"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[3].TypeVoc", "Online Beschreibung"),
                // --

                // missing TypeVoc
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[4].TextClb", "falsch"),
                Triple.of("ObjTextOnlineGrp.TextHTMLClb", "[123].ObjTextOnlineGrp.item[4].TextHTMLClb", "<div font-size=\\\"12.5px\\\">falsch&amp;html</div>"),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[4].SortLnu", "2")
                // --
        );
        // when
        DescriptionNormalizer normalizer = new DescriptionNormalizer();
        Data value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value.getAttribute("formatted")).isEqualTo("richtig");
        assertThat(value.getAttribute("markup")).isEqualTo("<div font-size=\"12.5px\">richtig&amp;html</div>");
    }

    @Test
    public void testHtml_960469() {
        // given
        String html = "<span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">Wer das Porträt malte, ist nicht ganz klar. Vermutlich hat es Corinth zumindesteigenhändig korrigiert und übermalt, vielleicht aber stammt es insgesamt vonihm. In einem nicht unterzeichneten, undatierten Dokument ist zu lesen: „Esverdankt seine Entstehung der Unzulänglichkeit eines Schülers (des MalersThiele), der […] seine malerische Technik bei Corinth auffrischen wollte. Th. hatteauf breiter Leinwand die Studie nach dem Modell begonnen, Corinth sah dasMißlingen, nahm dem Maler Pinsel und Palette aus der Hand und setzte mit denWorten ‚so mache man das‘ den […] Kopf in kürzester Frist von Grund aufeigenhändig daneben. Seine eigene Malerei schnitt Th. dann später ab“ (Bildaktein der Neuen Nationalgalerie). Wahrscheinlich ist der Maler <a style=\"mso-comment-reference:AO_2;mso-comment-date:20210531T1106;mso-comment-parent:1\"></a><a style=\"mso-comment-reference:EDE_1;mso-comment-date:20210517T1542\"><span style=\"mso-comment-continuation:2\">Thiele&nbsp;</span></a></span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">gemeint, der als Postbeamter gearbeitetund Unterricht bei verschiedenen Künstlern genommen hatte, bevor er an der BerlinerHochschule für die bildenden Künste die Porträtklasse von Corinth besuchte. </span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-ansi-language:DE;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">CharlotteBerend-Corinth, dessen Witwe, war 1952 anderer Meinung: </span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">„</span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-ansi-language:DE;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">Ich kenne das Modell!Sorgfältig habe ich [das] Foto studiert und meine Auffassung wärefolgendermassen. Ohne Zweifel sehe ich die Hand von Lovis Corinth innerhalbvieler Partien im Kopfe. […] Trotzdem aber, wäre es, meiner persönlichenAnsicht nach zu weit gegangen das Ganze als ein Werk von Corinth zu bezeichnen“(ebd.). Hätte Corinth hier nur flüchtig das Werk eines anderen korrigiert oder mitihm ein Lehrstück zur Wiedergabe bestimmter Gesichtspartien beabsichtigt, so wärenAbweichungen von dessen Stil erklärt. Ob Übung eines Schülers oderDemonstration des Professors: Das Bild kann als unvollendet gelten. </span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">| Emily Joyce Evans</span><div style=\"mso-element:comment-list\"><div style=\"mso-element:comment\"><div id=\"_com_2\" class=\"msocomtxt\" language=\"JavaScript\"><!--[if !supportAnnotations]--></div><!--[endif]--></div></div>";
        String commentsRemoved = "<span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">Wer das Porträt malte, ist nicht ganz klar. Vermutlich hat es Corinth zumindesteigenhändig korrigiert und übermalt, vielleicht aber stammt es insgesamt vonihm. In einem nicht unterzeichneten, undatierten Dokument ist zu lesen: „Esverdankt seine Entstehung der Unzulänglichkeit eines Schülers (des MalersThiele), der […] seine malerische Technik bei Corinth auffrischen wollte. Th. hatteauf breiter Leinwand die Studie nach dem Modell begonnen, Corinth sah dasMißlingen, nahm dem Maler Pinsel und Palette aus der Hand und setzte mit denWorten ‚so mache man das‘ den […] Kopf in kürzester Frist von Grund aufeigenhändig daneben. Seine eigene Malerei schnitt Th. dann später ab“ (Bildaktein der Neuen Nationalgalerie). Wahrscheinlich ist der Maler <a style=\"mso-comment-reference:AO_2;mso-comment-date:20210531T1106;mso-comment-parent:1\"></a><a style=\"mso-comment-reference:EDE_1;mso-comment-date:20210517T1542\"><span style=\"mso-comment-continuation:2\">Thiele&nbsp;</span></a></span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">gemeint, der als Postbeamter gearbeitetund Unterricht bei verschiedenen Künstlern genommen hatte, bevor er an der BerlinerHochschule für die bildenden Künste die Porträtklasse von Corinth besuchte. </span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-ansi-language:DE;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">CharlotteBerend-Corinth, dessen Witwe, war 1952 anderer Meinung: </span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">„</span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-ansi-language:DE;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">Ich kenne das Modell!Sorgfältig habe ich [das] Foto studiert und meine Auffassung wärefolgendermassen. Ohne Zweifel sehe ich die Hand von Lovis Corinth innerhalbvieler Partien im Kopfe. […] Trotzdem aber, wäre es, meiner persönlichenAnsicht nach zu weit gegangen das Ganze als ein Werk von Corinth zu bezeichnen“(ebd.). Hätte Corinth hier nur flüchtig das Werk eines anderen korrigiert oder mitihm ein Lehrstück zur Wiedergabe bestimmter Gesichtspartien beabsichtigt, so wärenAbweichungen von dessen Stil erklärt. Ob Übung eines Schülers oderDemonstration des Professors: Das Bild kann als unvollendet gelten. </span><span style=\"font-size:12.0pt;line-height:107%;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:black;mso-ansi-language:DE;mso-fareast-language:DE;mso-bidi-language:AR-SA\">| Emily Joyce Evans</span><div style=\"mso-element:comment-list\"><div style=\"mso-element:comment\"><div id=\"_com_2\" class=\"msocomtxt\" language=\"JavaScript\"></div></div></div>";
        ObjectData obj = createObject(
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[5].TextClb", "egal"),
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[5].TextHTMLClb", html),
                Triple.of("ObjTextOnlineGrp.SortLnu", "[123].ObjTextOnlineGrp.item[5].SortLnu", "1"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[5].TypeVoc", "Online Beschreibung")
        );
        // when
        DescriptionNormalizer normalizer = new DescriptionNormalizer();
        Data value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value.getAttribute("markup")).isEqualTo(commentsRemoved);
    }

    @Test
    public void testNoDesciptionInfo() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[1].TextClb", ""),
                Triple.of("ObjTextOnlineGrp.TextClb", "[123].ObjTextOnlineGrp.item[1].TextHTMLClb", ""),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[123].ObjTextOnlineGrp.item[1].TypeVoc", "Online Beschreibung")
        );
        // when
        DescriptionNormalizer normalizer = new DescriptionNormalizer();
        Data value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }
}
