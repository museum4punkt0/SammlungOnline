package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public final class TestData {

    public static ObjectData createRichObject() {
        ObjectData object = createObject(
                Triple.of("__created", "[1513247].__created", "14.05.2010 00:00"),
                Triple.of("__createdUser", "[1513247].__createdUser", "ÄM_AM"),
                Triple.of("__id", "[1513247].__id", "1513247"),
                Triple.of("__lastModified", "[1513247].__lastModified", "10.11.2020 16:00"),
                Triple.of("__lastModifiedUser", "[1513247].__lastModifiedUser", "Zetcom_migration"),
                Triple.of("ObjAcquisitionDateGrp.DateTxt", "[1513247].ObjAcquisitionDateGrp.repeatableGroupItem[38023810].DateTxt", "[Unbekannt]"),
                Triple.of("ObjAcquisitionDateGrp.PreviewENVrt", "[1513247].ObjAcquisitionDateGrp.repeatableGroupItem[38023810].PreviewENVrt", "[Unbekannt]"),
                Triple.of("ObjAcquisitionDateGrp.PreviewVrt", "[1513247].ObjAcquisitionDateGrp.repeatableGroupItem[38023810].PreviewVrt", "[Unbekannt]"),
                Triple.of("ObjAcquisitionDateGrp.SortLnu", "[1513247].ObjAcquisitionDateGrp.repeatableGroupItem[38023810].SortLnu", "1"),
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[40129497].MemoClb", "[Unbekannt]"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[40129497].TypeVoc[62641].vocabularyReferenceItem[3570719]", "Erwerbung von"),
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[40723814].MemoClb", "lt. Inv.: \"Mumie 1926 (die im Herbst 1926 aufgelöste Cartonnage)\""),
                Triple.of("ObjAcquisitionNotesGrp.SortLnu", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[40723814].SortLnu", "5"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[40723814].TypeVoc[62641].vocabularyReferenceItem[1805535]", "Notiz"),
                Triple.of("ObjAcquisitionNotesGrp.MemoClb", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[4711].MemoClb", "unbekannt"),
                Triple.of("ObjAcquisitionNotesGrp.SortLnu", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[4711].SortLnu", "2"),
                Triple.of("ObjAcquisitionNotesGrp.TypeVoc", "[1513247].ObjAcquisitionNotesGrp.repeatableGroupItem[4711].TypeVoc[62641].vocabularyReferenceItem[1805535]", "Ausgabe"),
                Triple.of("ObjAcquisitionReferenceNrTxt", "[1513247].ObjAcquisitionReferenceNrTxt", "keine"),
                Triple.of("ObjCategoryVoc", "[1513247].ObjCategoryVoc[30349].vocabularyReferenceItem[3206609]", "Allgemein - ÄMP"),
                Triple.of("ObjCreditLineVoc", "[1513247].ObjCreditLineVoc[61642].vocabularyReferenceItem[4371208]", "Schenkung James Simon, 1920"),
                Triple.of("ObjCurrentLocationGrp.LocationVoc", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316598].LocationVoc[30283].vocabularyReferenceItem[3941412]", "Papyrus"),
                Triple.of("ObjCurrentLocationGrp.ModifiedByTxt", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316598].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjCurrentLocationGrp.ModifiedDateDat", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316598].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjCurrentLocationGrp.PreviewVrt", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316598].PreviewVrt", "Papyrus (ÄMP / AZ)"),
                Triple.of("ObjCurrentLocationGrp.StatusVoc", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316598].StatusVoc[30286].vocabularyReferenceItem[1813320]", "Definitiv"),
                Triple.of("ObjCurrentLocationGrp.TypeVoc", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316598].TypeVoc[30285].vocabularyReferenceItem[1813443]", "Aktueller Standort"),
                Triple.of("ObjCurrentLocationGrp.LocationVoc", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316599].LocationVoc[30283].vocabularyReferenceItem[3941412]", "Papyrus"),
                Triple.of("ObjCurrentLocationGrp.ModifiedByTxt", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316599].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjCurrentLocationGrp.ModifiedDateDat", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316599].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjCurrentLocationGrp.PreviewVrt", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316599].PreviewVrt", "Papyrus (ÄMP / AZ)"),
                Triple.of("ObjCurrentLocationGrp.StatusVoc", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316599].StatusVoc[30286].vocabularyReferenceItem[1813320]", "Definitiv"),
                Triple.of("ObjCurrentLocationGrp.TypeVoc", "[1513247].ObjCurrentLocationGrp.repeatableGroupItem[47316599].TypeVoc[30285].vocabularyReferenceItem[1813445]", "Ständiger Standort"),
                Triple.of("ObjCurrentLocationGrpVrt", "[1513247].ObjCurrentLocationGrpVrt", "ÄMP -> AZ -> Papyrus, ÄMP -> AZ -> Papyrus"),
                Triple.of("ObjCurrentLocationVoc", "[1513247].ObjCurrentLocationVoc[30283].vocabularyReferenceItem[3941412]", "Papyrus"),
                Triple.of("ObjCurrentLocationVrt", "[1513247].ObjCurrentLocationVrt", "Papyrus (ÄMP / AZ)"),
                Triple.of("ObjDateGrp.DateFromTxt", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].DateFromTxt", "12.2.-50"),
                Triple.of("ObjDateGrp.DatestampFromFuzzySearchLnu", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].DatestampFromFuzzySearchLnu", "-20.724"),
                Triple.of("ObjDateGrp.DatestampToFuzzySearchLnu", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].DatestampToFuzzySearchLnu", "-20.724"),
                Triple.of("ObjDateGrp.DateToTxt", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].DateToTxt", "12.2.-50"),
                Triple.of("ObjDateGrp.DateTxt", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].DateTxt", "1. Jh. v. Chr."),
                Triple.of("ObjDateGrp.PeriodEgyptVoc", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].PeriodEgyptVoc[61658].vocabularyReferenceItem[4021035]", "1. Jh. v. Chr."),
                Triple.of("ObjDateGrp.PreviewENVrt", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].PreviewENVrt", "1. Jh. v. Chr."),
                Triple.of("ObjDateGrp.PreviewVrt", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].PreviewVrt", "1. Jh. v. Chr. (Ptolemäerzeit -> Griechisch–Römische Zeit -> Ägypten)"),
                Triple.of("ObjDateGrp.SortLnu", "[1513247].ObjDateGrp.repeatableGroupItem[29157236].SortLnu", "1"),
                Triple.of("ObjDateGrp.DateFromTxt", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].DateFromTxt", "12.2.-50"),
                Triple.of("ObjDateGrp.DatestampFromFuzzySearchLnu", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].DatestampFromFuzzySearchLnu", "-20.724"),
                Triple.of("ObjDateGrp.DatestampToFuzzySearchLnu", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].DatestampToFuzzySearchLnu", "-20.724"),
                Triple.of("ObjDateGrp.DateToTxt", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].DateToTxt", "12.2.-50"),
                Triple.of("ObjDateGrp.DateTxt", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].DateTxt", "12. Februar 50 v.Chr."),
                Triple.of("ObjDateGrp.PreviewENVrt", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].PreviewENVrt", "12. Februar 50 v.Chr."),
                Triple.of("ObjDateGrp.PreviewVrt", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].PreviewVrt", "12. Februar 50 v.Chr."),
                Triple.of("ObjDateGrp.SortLnu", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].SortLnu", "7"),
                Triple.of("ObjDateGrp.TypeVoc", "[1513247].ObjDateGrp.repeatableGroupItem[29732237].TypeVoc[30361].vocabularyReferenceItem[4130523]", "Genauer"),
                Triple.of("ObjDimAllGrp.Delimiter1Vrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].Delimiter1Vrt", "to do"),
                Triple.of("ObjDimAllGrp.Delimiter2Vrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].Delimiter2Vrt", "to do"),
                Triple.of("ObjDimAllGrp.DenominationSpecific1ENVrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].DenominationSpecific1ENVrt", "to do"),
                Triple.of("ObjDimAllGrp.DenominationSpecific1Vrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].DenominationSpecific1Vrt", "to do"),
                Triple.of("ObjDimAllGrp.DenominationSpecific2ENVrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].DenominationSpecific2ENVrt", "to do"),
                Triple.of("ObjDimAllGrp.DenominationSpecific2Vrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].DenominationSpecific2Vrt", "to do"),
                Triple.of("ObjDimAllGrp.DenominationSpecific3ENVrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].DenominationSpecific3ENVrt", "to do"),
                Triple.of("ObjDimAllGrp.DenominationSpecific3Vrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].DenominationSpecific3Vrt", "to do"),
                Triple.of("ObjDimAllGrp.HeightNum", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].HeightNum", "34,9"),
                Triple.of("ObjDimAllGrp.PreviewENVrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].PreviewENVrt", "34.90 x 19.80 cm (lt. BerlPap)"),
                Triple.of("ObjDimAllGrp.PreviewVrt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].PreviewVrt", "34,90 x 19,80 cm (lt. BerlPap)"),
                Triple.of("ObjDimAllGrp.SortLnu", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].SortLnu", "0"),
                Triple.of("ObjDimAllGrp.SuffixTxt", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].SuffixTxt", "(lt. BerlPap)"),
                Triple.of("ObjDimAllGrp.UnitDdiVoc", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].UnitDdiVoc[79755].vocabularyReferenceItem[3582019]", "cm"),
                Triple.of("ObjDimAllGrp.WidthNum", "[1513247].ObjDimAllGrp.repeatableGroupItem[15593700].WidthNum", "19,8"),
                Triple.of("ObjEditorNotesGrp.NotesClb", "[1513247].ObjEditorNotesGrp.repeatableGroupItem[41918508].NotesClb", "BerlPap fertig"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb", "[1513247].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[22593700]._UserOalTextMClb", "unten links"),
                Triple.of("ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSTxt", "[1513247].ObjGeneralCre.compositeItem[#0]._UserObjGeneralNGBezeichnungenamObjekGrp.repeatableGroupItem[22593700]._UserOalTextSTxt", "Signatur"),
                Triple.of("ObjGeograficGrp.PlaceEgyptVoc", "[1513247].ObjGeograficGrp.repeatableGroupItem[32341110].PlaceEgyptVoc[61666].vocabularyReferenceItem[3980888]", "Abusir el-Meleq"),
                Triple.of("ObjGeograficGrp.SortLnu", "[1513247].ObjGeograficGrp.repeatableGroupItem[32341110].SortLnu", "5"),
                Triple.of("ObjGeograficGrp.DetailTxt", "[1513247].ObjGeograficGrp.repeatableGroupItem[32341110].DetailTxt", "Ägypten"),
                Triple.of("ObjInventoryDateDat", "[1513247].ObjInventoryDateDat", "14.05.2010"),
                Triple.of("ObjLabelObjectGrp.LabelClb", "[1513247].ObjLabelObjectGrp.repeatableGroupItem[37570891].LabelClb", "Sprache: Griechisch/ Schrift: Griechisch"),
                Triple.of("ObjLabelObjectGrp.SortLnu", "[1513247].ObjLabelObjectGrp.repeatableGroupItem[37570891].SortLnu", "1"),
                Triple.of("ObjLabelObjectGrp.TypeVoc", "[1513247].ObjLabelObjectGrp.repeatableGroupItem[37570891].TypeVoc[61675].vocabularyReferenceItem[1804323]", "Allg. Angabe Beschriftung"),
                Triple.of("ObjLiteratureRef", "[1513247].ObjLiteratureRef.moduleReferenceItem[270679]", "Schubart, Wilhelm: Spätptolemäische Papyri aus amtlichen Büros des Triple.of(Herakleopolites, 1933, Kat.-Nr. BGU VIII 1761"),
                Triple.of("ObjMaterialTechniqueGrp.ExportClb", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30676220].ExportClb", "Papyrus(Material); einseitig beschriftet(Technik)"),
                Triple.of("ObjMaterialTechniqueGrp.ModifiedByTxt", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30676220].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjMaterialTechniqueGrp.ModifiedDateDat", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30676220].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjMaterialTechniqueGrp.SortLnu", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30676220].SortLnu", "1"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30676220].TypeVoc[30401].vocabularyReferenceItem[4129970]", "Ausgabe"),
                Triple.of("ObjMaterialTechniqueGrp.ModifiedByTxt", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30912291].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjMaterialTechniqueGrp.ModifiedDateDat", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30912291].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30912291].TypeVoc[30401].vocabularyReferenceItem[4129980]", "Material"),
                Triple.of("ObjMaterialTechniqueGrp.ModifiedByTxt", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30912292].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjMaterialTechniqueGrp.ModifiedDateDat", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30912292].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjMaterialTechniqueGrp.TypeVoc", "[1513247].ObjMaterialTechniqueGrp.repeatableGroupItem[30912292].TypeVoc[30401].vocabularyReferenceItem[4129993]", "Technik"),
                Triple.of("ObjMaterialTechniqueVrt", "[1513247].ObjMaterialTechniqueVrt", "Papyrus(Material); einseitig, beschriftet(Technik), Papyrus, einseitig, beschriftet"),
                Triple.of("ObjMultimediaRef", "[1513247].ObjMultimediaRef.moduleReferenceItem[5425053]", "Scan, P_13818_R_001.jpg, Repro Digitalisat"),
                Triple.of("ObjNormalLocationVoc", "[1513247].ObjNormalLocationVoc[30283].vocabularyReferenceItem[3941412]", "Papyrus"),
                Triple.of("ObjNormalLocationVrt", "[1513247].ObjNormalLocationVrt", "Papyrus (ÄMP / AZ)"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[28498]", "IfM-euro_museu-20171123-SMB-ÄMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[28736]", "IfM-exp-20180302-SMB_ÄMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[29563]", "IfM-exp-20181121-SMB-ÄMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[29783]", "IfM-exp-20190318-SMB_ÄMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30416]", "IfM-exp-20190906-SMB_ÄMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30428]", "IfM-berlpap-online-smb-digital_20190912"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30653]", "IfM-exp-20200109-SMB-ÄMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30883]", "IfM-exp-20200306-AEMP"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30908]", "IfM-exp-2020008-SMB-ÄMP-minus ÄMP-Archaeology"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30921]", "IfM-exp-20200423-ÄMP_gesamt-Test"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30924]", "IfM-exp-20200423-ÄMP-Papyrus_gesamt-Test"),
                Triple.of("ObjObjectGroupsRef", "[1513247].ObjObjectGroupsRef.moduleReferenceItem[30966]", "IfM-exp-20200515-ÄMP_gesamt-Test"),
                Triple.of("ObjObjectIPTCVrt", "[1513247].ObjObjectIPTCVrt", "1513247:P 13818; Ägyptisches Museum und Papyrussammlung, Staatliche Museen zu Berlin, Berlin"),
                Triple.of("ObjObjectNumberGrp.DenominationVoc", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].DenominationVoc[41617].vocabularyReferenceItem[2737051]", "Ident. Nr."),
                Triple.of("ObjObjectNumberGrp.InventarNrSTxt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].InventarNrSTxt", "P 13818"),
                Triple.of("ObjObjectNumberGrp.ModifiedByTxt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjObjectNumberGrp.ModifiedDateDat", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjObjectNumberGrp.NumberSortedVrt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].NumberSortedVrt", "P 013818"),
                Triple.of("ObjObjectNumberGrp.NumberVrt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].NumberVrt", "P 13818"),
                Triple.of("ObjObjectNumberGrp.NumberWithoutSpecialCharactersVrt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].NumberWithoutSpecialCharactersVrt", "P13818"),
                Triple.of("ObjObjectNumberGrp.Part1Txt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].Part1Txt", "P"),
                Triple.of("ObjObjectNumberGrp.Part2Txt", "[1513247].ObjObjectNumberGrp.repeatableGroupItem[20827836].Part2Txt", "13818"),
                Triple.of("ObjObjectNumberPart1Vrt", "[1513247].ObjObjectNumberPart1Vrt", "P"),
                Triple.of("ObjObjectNumberPart2Vrt", "[1513247].ObjObjectNumberPart2Vrt", "13818"),
                Triple.of("ObjObjectNumberSorted02MEKVrt", "[1513247].ObjObjectNumberSorted02MEKVrt", "P 013818"),
                Triple.of("ObjObjectNumberSortedMEKVrt", "[1513247].ObjObjectNumberSortedMEKVrt", "P 013818"),
                Triple.of("ObjObjectNumberSortedVrt", "[1513247].ObjObjectNumberSortedVrt", "P 013818"),
                Triple.of("ObjObjectNumberTxt", "[1513247].ObjObjectNumberTxt", "P 13818"),
                Triple.of("ObjObjectNumberVrt", "[1513247].ObjObjectNumberVrt", "P 13818"),
                Triple.of("ObjObjectTitleGrp.SortLnu", "[1513247].ObjObjectTitleGrp.repeatableGroupItem[25530162].SortLnu", "1"),
                Triple.of("ObjObjectTitleGrp.TitleTxt", "[1513247].ObjObjectTitleGrp.repeatableGroupItem[25530162].TitleTxt", "Verfügung des Dioiketen zu einer Eingabe"),
                Triple.of("ObjObjectTitleVrt", "[1513247].ObjObjectTitleVrt", "Verfügung des Dioiketen zu einer Eingabe"),
                Triple.of("ObjObjectVrt", "[1513247].ObjObjectVrt", "P 13818, Blatt (Schriftträger), Verfügung des Dioiketen zu einer Eingabe, 1. Jh. v. Chr. (Ptolemäerzeit -> Griechisch–Römische Zeit -> Ägypten)"),
                Triple.of("ObjOrgGroupVoc", "[1513247].ObjOrgGroupVoc[61643].vocabularyReferenceItem[1632782]", "ÄMP-Papyrussammlung"),
                Triple.of("ObjOwnerMethodGrp.MethodVoc", "[1513247].ObjOwnerMethodGrp.repeatableGroupItem[39400022].MethodVoc[62647].vocabularyReferenceItem[1631005]", "Eigentum"),
                Triple.of("ObjOwnerRef", "[1513247].ObjOwnerRef.moduleReferenceItem[67668]", "Ägyptisches Museum und Papyrussammlung, Staatliche Museen zu Berlin, Berlin"),
                Triple.of("ObjPerAssociationRef", "[1513247].ObjPerAssociationRef.moduleReferenceItem[0815]", "Meister Propper, General"),
                Triple.of("ObjPublicationGrp.PublicationVoc", "[1513247].ObjPublicationGrp.repeatableGroupItem[42487286].PublicationVoc[62649].vocabularyReferenceItem[1810139]", "Ja"),
                Triple.of("ObjPublicationGrp.TypeVoc", "[1513247].ObjPublicationGrp.repeatableGroupItem[42487286].TypeVoc[62650].vocabularyReferenceItem[2600647]", "Daten freigegeben für SMB-digital"),
                Triple.of("ObjPublicationStatusVoc", "[1513247].ObjPublicationStatusVoc[30432].vocabularyReferenceItem[4129964]", "vorhanden"),
                Triple.of("ObjRecordCreatedByTxt", "[1513247].ObjRecordCreatedByTxt", "ÄM_AM"),
                Triple.of("ObjResponsibleGrp.ResposibleVoc", "[1513247].ObjResponsibleGrp.repeatableGroupItem[41320308].ResposibleVoc[61683].vocabularyReferenceItem[4121638]", "ÄMP_KK (admin)"),
                Triple.of("ObjTechnicalTermClb", "[1513247].ObjTechnicalTermClb", "Blatt (Schriftträger)"),
                Triple.of("ObjTechnicalTermGrp.ModifiedByTxt", "[1513247].ObjTechnicalTermGrp.repeatableGroupItem[22509054].ModifiedByTxt", "ZET_DÜ"),
                Triple.of("ObjTechnicalTermGrp.ModifiedDateDat", "[1513247].ObjTechnicalTermGrp.repeatableGroupItem[22509054].ModifiedDateDat", "10.10.2017"),
                Triple.of("ObjTechnicalTermGrp.SortLnu", "[1513247].ObjTechnicalTermGrp.repeatableGroupItem[22509054].SortLnu", "2"),
                Triple.of("ObjTechnicalTermGrp.TechnicalTermMultipleBoo", "[1513247].ObjTechnicalTermGrp.repeatableGroupItem[22509054].TechnicalTermMultipleBoo", "nein"),
                Triple.of("ObjTextOnlineGrp.TextClb", "[1513247].ObjTextOnlineGrp.repeatableGroupItem[44034421].TextClb", "Eingabe des Heroides, Sohn eines Katökenreiters, an den Dioketen Protarchos wegen Verdrängung aus dem Erbe seines verstorbenen Vaters durch eine Frau. Er bittet den Dioketen, ihm die Ernte zu sichern, die Frau zu verhaften, zu bestrafen und zu Schadensersatz zu zwingen und ihm zu helfen, wieder in sein Erbe zu kommen. In seinem darüber geschrieben Erlaß weist der Dioiket den Strategen Seleukos an, die Angaben zu prüfen und ggfs. die Frau vom Besitz des Heroides zu entfernen. Bearbeitungs- und Vorladungsvermerk vom 16. März 50 v. Chr. Nach BerlPap: http://berlpap.smb.museum/03868/"),
                Triple.of("ObjTextOnlineGrp.TextHTMLClb", "[1513247].ObjTextOnlineGrp.repeatableGroupItem[44034421].TextHTMLClb", "<div>Eingabe des Heroides, Sohn eines Katökenreiters, an den Dioketen Protarchos wegen Verdrängung aus dem Erbe seines verstorbenen Vaters durch eine Frau. Er bittet den Dioketen, ihm die Ernte zu sichern, die Frau zu verhaften, zu bestrafen und zu Schadensersatz zu zwingen und ihm zu helfen, wieder in sein Erbe zu kommen.<br></div><div>In seinem darüber geschrieben Erlaß weist der Dioiket den Strategen Seleukos an, die Angaben zu prüfen und ggfs. die Frau vom Besitz des Heroides zu entfernen.<br></div><div>Bearbeitungs- und Vorladungsvermerk vom 16. März 50 v. Chr.<br></div><div><br></div><div>Nach BerlPap: http://berlpap.smb.museum/03868/</div>"),
                Triple.of("ObjTextOnlineGrp.TypeVoc", "[1513247].ObjTextOnlineGrp.repeatableGroupItem[44034421].TypeVoc[66645].vocabularyReferenceItem[2899477]", "Online Beschreibung"),
                Triple.of("ObjUuidVrt", "[1513247].ObjUuidVrt", "1513247"),
                Triple.of("__orgUnit", "[1513247].__orgUnit", "AMPPapyrussammlung"),
                Triple.of("__uuid", "[1513247].__uuid", "1513247")
        );
        object.getAttachments().add(createAttachment("image_001.jpg"));
        object.getAttachments().add(createAttachment("image_002.jpg"));
        object.getAttachments().add(createAttachment("image_003.jpg"));
        object.getHighlights().add(createHighlight(23L));
        return withExhibitionSpace(object, "NG -> ANG -> ANG-Ausstellung -> ANG-1.AG -> Raum 1.04 -> Vitrine: 4B oben links");
    }

    public static ObjectData.Attachment createAttachment(final String filename) {
        return new ObjectData.Attachment("__attachment", filename);
    }

    public static ObjectData.Highlight createHighlight(final Long orgUnitId) {
        return new ObjectData.Highlight("__highlight", orgUnitId);
    }

    @SafeVarargs
    public static ObjectData createObject(final Triple<String, String, String>... def) {
        List<ObjectData.Attribute> attributes = Arrays
                .stream(def)
                .map(TestData::createAttribute)
                .collect(Collectors.toList());
        Long id = Long.parseLong(StringUtils.substringBetween(def[0].getMiddle(), "[", "]"));
        return createObject(id, attributes);
    }

    @SafeVarargs
    public static ObjectData createObject(final Long id, final Pair<String, String>... keyValues) {
        List<ObjectData.Attribute> attributes = Arrays
                .stream(keyValues)
                .map(pair -> createAttribute(Triple.of(pair.getLeft(), "[" + id + "]." + pair.getLeft(), pair.getRight())))
                .collect(Collectors.toList());
        return createObject(id, attributes);
    }

    public static ObjectData createObject(final Long id, final List<ObjectData.Attribute> attributes) {
        return new ObjectData(
                "__obj",
                id,
                LocalDateTime.now().minusDays(7),
                LocalDateTime.now(),
                null,
                attributes,
                new ArrayList<>(), // mutable
                new ArrayList<>()); // mutable
    }

    public static ObjectData withExhibitionSpace(final ObjectData obj, final String space) {
        return new ObjectData(
                obj.get__typename(),
                obj.getId(),
                obj.getCreatedAt(),
                obj.getUpdatedAt(),
                space,
                obj.getAttributes(),
                obj.getAttachments(),
                obj.getHighlights()
        );
    }

    /**
     * Create attribute from triple info.
     *
     * @param def key, fqkey, value
     * @return attribute
     */
    public static ObjectData.Attribute createAttribute(final Triple<String, String, String> def) {
        return new ObjectData.Attribute("__attr", def.getLeft(), def.getRight(), def.getMiddle());
    }

    private TestData() {
        // no instances
    }
}
