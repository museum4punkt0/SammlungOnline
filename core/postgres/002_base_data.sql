--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


--
-- Table: sync_triggers; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.sync_triggers (entity_type, keys, keys_type) VALUES
 ('objects', '{}', 'MDS IDs')
,('persons', '{}', 'MDS IDs')
,('exhibitions', '{}', 'MDS IDs')
,('attachments', '{}', 'MDS IDs')
,('thesaurus', '{}', 'IDs from thesaurus table')
,('collections', '{}', 'Keys from collections table')
,('compilations', '{}', 'MDS OrgUnit keys')
,('assortments', '{}', 'IDs from assortments table')
,('attribute_approval', '{}', 'IDs from attribute_approval table')
;


--
-- Table: language; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.language (id, lang, sync_enabled) VALUES 
 (1, 'de', true )
,(2, 'en', false)
;
SELECT setval('smb.language_id_seq', 3); -- MAX(id) + 1


--
-- Table: collections; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.collections (key, title, type) VALUES 
 ('AKu', 'Museum für Asiatische Kunst', 'SMB_COLLECTION')
,('AMP', 'Ägyptisches Museum und Papyrussammlung', 'SMB_COLLECTION')
,('ANT', 'Antikensammlung', 'SMB_COLLECTION')
,('EM',  'Ethnologisches Museum', 'SMB_COLLECTION')
,('GF',  'Gipsformerei', 'SMB_INSTITUTE')
,('GG',  'Gemäldegalerie', 'SMB_COLLECTION')
,('IFM', 'Institut für Museumsforschung', 'SMB_INSTITUTE')
,('ISL', 'Museum für Islamische Kunst', 'SMB_COLLECTION')
,('KB',  'Kunstbibliothek', 'SMB_COLLECTION')
,('KGM', 'Kunstgewerbemuseum', 'SMB_COLLECTION')
,('KK',  'Kupferstichkabinett', 'SMB_COLLECTION')
,('MEK', 'Museum Europäischer Kulturen', 'SMB_COLLECTION')
,('MIM', 'SIM | Musikinstrumenten-Museum', 'NATIONAL_INSTITUTE')
,('MK',  'Münzkabinett', 'SMB_COLLECTION')
,('MSB', 'Skulpturensammlung und Museum für Byzantinische Kunst', 'SMB_COLLECTION')
,('MVF', 'Museum für Vor- und Frühgeschichte', 'SMB_COLLECTION')
,('NG',  'Nationalgalerie', 'SMB_COLLECTION')
,('RaO', 'Rathgen Forschungslabor', 'SMB_INSTITUTE')
,('SBM', 'Skulpturensammlung und Museum für Byzantinische Kunst', 'SMB_COLLECTION')
,('SKS', 'Skulpturensammlung und Museum für Byzantinische Kunst', 'SMB_COLLECTION')
,('VAM', 'Vorderasiatisches Museum', 'SMB_COLLECTION')
,('ZA',  'Zentralarchiv', 'SMB_INSTITUTE')
;

--
-- Table: buildings; Schema: smb; Owner: smb-db-user
--


INSERT INTO smb.buildings (key, title) VALUES
 ('ANG', 'Alte Nationalgalerie')
,('AM', 'Altes Museum')
,('BM', 'Bode-Museum')
,('Bodemuseum', 'Bode-Museum')
,('FWK', 'Friedrichswerdersche Kirche')
,('FWK (NG)', 'Friedrichswerdersche Kirche')
,('GG', 'Gemäldegalerie')
,('HBF', 'Hamburger Bahnhof - Nationalgalerie der Gegenwart')
,('HUF', 'Humboldt Forum')
,('JSG', 'James-Simon-Galerie')
,('KB', 'Kunstbibliothek')
,('KGM', 'Kunstgewerbemuseum')
,('KGM##Tiergarten', 'Kunstgewerbemuseum')
,('KGM Köpenick', 'Schloss Köpenick')
,('KGM##Köpenick', 'Schloss Köpenick')
,('KGM Schloss Köpenick', 'Schloss Köpenick')
,('KGM im Schloss Köpenick', 'Schloss Köpenick')
,('KGM Schloß Köpenick', 'Schloss Köpenick')
,('KGM im Schloß Köpenick', 'Schloss Köpenick')
,('KGM/Köpenick', 'Schloss Köpenick')
,('KK', 'Kupferstichkabinett')
,('MB', 'Museum Berggruen')
,('MEK', 'Museum Europäischer Kulturen')
,('MIM', 'Musikinstrumenten-Museum')
,('MfF', 'Museum für Fotografie')
,('NNG', 'Neue Nationalgalerie')
,('NMU', 'Neues Museum')
,('PMU', 'Pergamonmuseum')
,('PMU vor GuE', 'Pergamonmuseum')
,('PMI', 'Pergamonmuseum. Das Panorama')
,('SMB - KGM/Köpenick', 'Schloss Köpenick')
,('SSG', 'Sammlung Scharf-Gerstenberg')
;

--
-- Table: org_unit; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.org_unit (name, title, is_compilation) VALUES 
 ('AKuArchiv', 'Fotoarchiv', true)
,('AKuErwerbungsbuch', 'Erwerbungsbücher', true)
,('AKuObjekteFremdbesitz', NULL, false)
,('AKuOstasiatischeKunst', 'Ostasien', true)
,('AKuSudSudostundZentralasien', 'Süd-, Südost- und Zentralasien', true)
,('AMPAgyptischesMuseum', 'Ägyptisches Museum', true)
,('AMPErwerbungsbuch', 'Erwerbungsbücher', true)
,('AMPFotografie', NULL, false)
,('AMPGipsabgusse', NULL, false)
,('AMPPapyrussammlung', 'Papyrussammlung', true)
,('ANTArchivalien', NULL, false)
,('ANTErwerbungsbuch', 'Erwerbungsbücher', true)
,('ANTFotografie', NULL, false)
,('ANTObjekte', NULL, false)
,('EMAfrika1', 'Afrika', true)
,('EMAllgemein', 'Allgemeiner Sammlungsbereich', true)
,('EMAmArchaologie', 'Amerika', true)
,('EMAmEthnologie', 'Amerika', true)
,('EMArchiv', 'Archiv', true)
,('EMAusstellungsobjekte', NULL, false)
,('EMErwerbungsbuch', 'Erwerbungsbücher', true)
,('EMIslamischerOrient', 'Nordafrika, West- und Zentralasien', true)
,('EMMedienarchiv', 'Medienarchiv', true)
,('EMMusikethnologie', 'Musikethnologie', true)
,('EMOstundNordasien', 'Ost- und Nordasien', true)
,('EMPhonogrammArchiv', 'Phonogramm-Archiv', true)
,('EMSudseeAustralien', 'Ozeanien', true)
,('EMSudundSudostasien', 'Süd- und Südostasien', true)
,('GGErwerbungsbuch', 'Erwerbungsbücher', true)
,('GGKFMV', NULL, false)
,('GGMalerei', NULL, false)
,('GGVerlust', NULL, false)
,('IFMSammlung', NULL, false)
,('ISLErwerbungsbuch', 'Erwerbungsbücher', true)
,('ISLFotos', NULL, false)
,('ISLObjekteFremdbesitz', NULL, false)
,('ISLObjekteNeu', NULL, false)
,('ISLObjekteRuB2', NULL, false)
,('KBArchitekturzeichnung', 'Sammlung Architektur', true)
,('KBBuchkunstundNeueMedien', 'Sammlung Buchkunst und Neue Medien', true)
,('KBErwerbungsbuch', 'Erwerbungsbücher', true)
,('KBModekarikatur', 'Sammlung Modebild', true)
,('KBMuseumfurFotografie', 'Sammlung Fotografie', true)
,('KBOSKatalog', 'Ornamentstichsammlung', true)
,('KBPlakat', 'Sammlung Grafikdesign', true)
,('KGMAlleInventare', NULL, false)
,('KGMErwerbungsbuch', 'Erwerbungsbücher', true)
,('KGMKeramik', NULL, false)
,('KK19JhDruckgraphik', NULL, false)
,('KK19JhZeichnung', NULL, false)
,('KKBucherMappennach1800', NULL, false)
,('KKBucherMappenvor1800', NULL, false)
,('KKBuchmalerei', NULL, false)
,('KKDDRKunst', NULL, false)
,('KKDeutscheDruckgraphik16Jh', NULL, false)
,('KKErwerbungsbuch', 'Erwerbungsbücher', true)
,('KKFranSpanEngDruckgraphik', NULL, false)
,('KKGrunewald', NULL, false)
,('KKItalienischeDruckgraphik', NULL, false)
,('KKItalZeichnung', NULL, false)
,('KKKlassischeModerne', NULL, false)
,('KKKunstseit1960', NULL, false)
,('KKNiederlandischeDruckgraphik', NULL, false)
,('KKPlattenarchiv', NULL, false)
,('KKVerlusteNiederlande', NULL, false)
,('KKWasserzeichen', NULL, false)
,('KKZusatzmagazin', NULL, false)
,('MEKArbeitundBeruf', NULL, false)
,('MEKBucherundDokumente', NULL, false)
,('MEKDiverse', NULL, false)
,('MEKErwerbungsbuch', 'Erwerbungsbücher', true)
,('MEKEuropabis1999', NULL, false)
,('MEKFotografie', NULL, false)
,('MEKHausundWohnen', NULL, false)
,('MEKMalereiGrafikPlastik', NULL, false)
,('MEKReligionundKult', NULL, false)
,('MEKSpielzeug', NULL, false)
,('MEKTextilienundSchmuck', NULL, false)
,('MIMBestand2', NULL, false)
,('MKAntikeGriechenArchaikundKlassik650bis336', 'Antike | Griechen, Archaik und Klassik (-650 bis -336)', true)
,('MKAntikeGriechenHellenismus336bis30', 'Antike | Griechen, Hellenismus (-336 bis -30)', true)
,('MKAntikeGriechenRomischeKaiserzeit30bis283', 'Antike | Griechen, Römische Kaiserzeit (-30 bis 283)', true)
,('MKAntikeRomischeKaiserzeit30bis283', 'Antike | Römische Kaiserzeit (-30 bis 283)', true)
,('MKAntikeRomischeRepublik280bis30', 'Antike | Römische Republik (-280 bis -30)', true)
,('MKAntikeRomischeSpatantike284bis476', 'Antike | Römische Spätantike (284 bis 476)', true)
,('MKErwerbungsbuch', 'Erwerbungsbücher', true)
,('MKMedaillen19Jhnach18301830bis1900', 'Medaillen | 19. Jh. nach 1830 (1830 bis 1900)', true)
,('MKMedaillen20Jhbisheute1900bisheute', 'Medaillen | 20. Jh. bis heute (1900 bis heute)', true)
,('MKMedaillenBarockundRokoko1600bis1770', 'Medaillen | Barock und Rokoko (1600 bis 1770)', true)
,('MKMedaillenBrandenburgPreuszen1500bis1918', 'Medaillen | Brandenburg-Preußen (1500 bis 1918)', true)
,('MKMedaillenKlassizismus1770bis1830', 'Medaillen | Klassizismus (1770 bis 1830)', true)
,('MKMedaillenRenaissance1435bis1550', 'Medaillen | Renaissance (1435 bis 1550)', true)
,('MKMittelalterFruhmittelalter476bis900', 'Mittelalter | Frühmittelalter (476 bis 900)', true)
,('MKMittelalterHochmittelalter900bis1250', 'Mittelalter | Hochmittelalter (900 bis 1250)', true)
,('MKMittelalterSpatmittelalter1251bis1500', 'Mittelalter | Spätmittelalter (1251 bis 1500)', true)
,('MKNeuzeit16Jh', 'Neuzeit | 16. Jh. (1501 bis 1600)', true)
,('MKNeuzeit17Jh', 'Neuzeit | 17. Jh. (1601 bis 1700)', true)
,('MKNeuzeit18Jh', 'Neuzeit | 18. Jh. (1701 bis 1800)', true)
,('MKNeuzeit19Jh', 'Neuzeit | 19. Jh. (1801 bis 1900)', true)
,('MKNeuzeitDeutschlandGedenkmunzen2021Jh1901bisheute', 'Neuzeit | Deutschland Gedenkmünzen 20.-21. Jh. (1901 bis heute)', true)
,('MKNeuzeitModerneseit19001900bisheute', 'Neuzeit | Moderne seit 1900 (1900 bis heute)', true)
,('MKPapiergeldAltdeutscheStaaten1700bis1871', 'Papiergeld | Altdeutsche Staaten (1700 bis 1871)', true)
,('MKPapiergeldAuslandischeGeldscheine1300bisheute', 'Papiergeld | Ausländische Geldscheine (1300 bis heute)', true)
,('MKPapiergeldAuslandischesNotgeld1800bisheute', 'Papiergeld | Ausländisches Notgeld (1800 bis heute)', true)
,('MKPapiergeldBundesrepublikDeutschland1948bisheute', 'Papiergeld | Bundesrepublik Deutschland (1948 bis 2011)', true)
,('MKPapiergeldDeutscheDemokratischeRepublik1948bis1990', 'Papiergeld | Deutsche Demokratische Republik (1948 bis 1990)', true)
,('MKPapiergeldDeutschesNotgeld1914bis1924', 'Papiergeld | Deutsches Notgeld (1914 bis 1924)', true)
,('MKPapiergeldDeutschesReich1871bis1948', 'Papiergeld | Deutsches Reich (1871 bis 1948)', true)
,('MSBNichtdefiniert', 'Museum für Byzantinische Kunst', true)
,('MVFArvBArchivischeSammlungen', 'Archiv', true)
,('MVFArvBHistorischesSchriftgut', NULL, false)
,('MVFArvBOrtsarchivPrussiaMuseum', 'Prussia-Ortsarchiv', true)
,('MVFArvBWissenschaftlicheNachlasse', NULL, false)
,('MVFErwerbungsbuch', 'Erwerbungsbücher', true)
,('MVFMusBAnthropologischosteologischeSammlung', NULL, false)
,('MVFMusBEuropa', 'Europa', true)
,('MVFMusBKaukasusundVordererOrient', 'Kaukasus und Vorderer Orient', true)
,('MVFMusSBerlinerBodenfunde', 'Berliner Bodenfunde', true)
,('MVFMusSMarkischesMuseum', 'Altbestand Märkisches Museum', true)
,('MVFMusSPrussia2', 'Prussia-Sammlung', true)
,('MVFMusSSchliemann', 'Schliemann-Sammlung', true)
,('NGAlteNationalgalerie', 'Alte Nationalgalerie', true)
,('NGehemSammlung', NULL, false)
,('NGErwerbungsbuch', 'Erwerbungsbücher', true)
,('NGHamburgerBahnhofMuseumfurGegenwart', 'Hamburger Bahnhof - Nationalgalerie der Gegenwart', true)
,('NGMuseumBerggruen', 'Museum Berggruen', true)
,('NGNeueNationalgalerie', 'Neue Nationalgalerie', true)
,('NGSammlungScharfGerstenberg', 'Sammlung Scharf-Gerstenberg', true)
,('SBMErwerbungsbuch', 'Erwerbungsbücher', true)
,('SBMKFMV', 'Skulpturensammlung', true)
,('SKSSkulpturen', 'Skulpturensammlung', true)
,('SKSSkulpturenVerluste', NULL, false)
,('VAMAbformungen', NULL, false)
,('VAMArchaologischeObjekte', NULL, false)
,('VAMErwerbungsbuch', 'Erwerbungsbücher', true)
,('VAMKunst', NULL, false)
,('VAMTontafelsammlung', NULL, false)
,('ZAFotosammlung2', 'Fotosammlung', true)
;

--
-- Table: attributes; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.attributes (key, datatype) VALUES
 ('__id', 'Long')
,('__orgUnit', 'Varchar')
,('ObjAcquisitionNotesGrp.MemoClb', 'Varchar')
,('ObjAcquisitionNotesGrp.SortLnu', 'Long')
,('ObjAcquisitionNotesGrp.TypeVoc', 'Varchar')
,('ObjCreditLineVoc', 'Varchar')
,('ObjCulturalContextGrp.DenominationVoc', 'Varchar')
,('ObjCulturalContextGrp.NameVoc', 'Varchar')
,('ObjCulturalContextGrp.SortLnu', 'Long')
,('ObjCulturalContextGrp.TypeVoc', 'Varchar')
,('ObjCurrentLocationGrpVrt', 'Varchar')
,('ObjCurrentLocationVoc', 'Varchar')
,('ObjCurrentLocationVrt', 'Varchar')
,('ObjDateGrp.DateFromTxt', 'Varchar')
,('ObjDateGrp.DateToTxt', 'Varchar')
,('ObjDateGrp.DateTxt', 'Varchar')
,('ObjDateGrp.PreviewVrt', 'Varchar')
,('ObjDateGrp.SortLnu', 'Long')
,('ObjDateGrp.TypeVoc', 'Varchar')
,('ObjDimAllGrp.PreviewVrt', 'Varchar')
,('ObjDimAllGrp.SortLnu', 'Long')
,('ObjDimAllGrp.TypeDimRef', 'Varchar')
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalSortierungLLnu', 'Long')
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSTxt', 'Varchar')
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSVoc', 'Varchar')
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb', 'Varchar')
,('ObjGeograficGrp.DetailsTxt', 'Varchar')
,('ObjGeograficGrp.GeopolVoc', 'Varchar')
,('ObjGeograficGrp.PlaceAntiqueVoc', 'Varchar')
,('ObjGeograficGrp.PlaceEgyptVoc', 'Varchar')
,('ObjGeograficGrp.PlaceILSVoc', 'Varchar')
,('ObjGeograficGrp.PlaceVoc', 'Varchar')
,('ObjGeograficGrp.SortLnu', 'Long')
,('ObjGeograficGrp.TypeVoc', 'Varchar')
,('ObjIconographyGrp.KeywordANTVoc', 'Varchar')
,('ObjIconographyGrp.KeywordEMVoc', 'Varchar')
,('ObjIconographyGrp.KeywordProjectVoc', 'Varchar')
,('ObjIconographyGrp.KeywordVoc', 'Varchar')
,('ObjIconographyGrp.SortLnu', 'Long')
,('ObjKeyWordsGrp.KeyWordVoc', 'Varchar')
,('ObjKeyWordsGrp.NotationTxt', 'Varchar')
,('ObjKeyWordsGrp.SortLnu', 'Long')
,('ObjLabelObjectGrp.CategoryVoc', 'Varchar')
,('ObjLabelObjectGrp.LabelClb', 'Varchar')
,('ObjLabelObjectGrp.LanguageVoc', 'Varchar')
,('ObjLabelObjectGrp.MethodTxt', 'Varchar')
,('ObjLabelObjectGrp.OrientationTxt', 'Varchar')
,('ObjLabelObjectGrp.PositionTxt', 'Varchar')
,('ObjLabelObjectGrp.SortLnu', 'Long')
,('ObjLabelObjectGrp.TranslationClb', 'Varchar')
,('ObjLabelObjectGrp.TransliterationClb', 'Varchar')
,('ObjLabelObjectGrp.TypeVoc', 'Varchar')
,('ObjLiteratureRef.CatalogueNumberTxt', 'Varchar')
,('ObjLiteratureRef.LitCitationClb', 'Varchar')
,('ObjLiteratureRef.LitPublicationDateLnu', 'Long')
,('ObjLiteratureRef.LitReferenceShortTxt', 'Varchar')
,('ObjLiteratureRef.PageRefTxt', 'Varchar')
,('ObjLiteratureRef.PicturePageTxt', 'Varchar')
,('ObjMaterialTechniqueGrp.ExportClb', 'Varchar')
,('ObjMaterialTechniqueGrp.MaterialVoc', 'Varchar')
,('ObjMaterialTechniqueGrp.MatTechVoc', 'Varchar')
,('ObjMaterialTechniqueGrp.PhotographyVoc', 'Varchar')
,('ObjMaterialTechniqueGrp.PresentationVoc', 'Varchar')
,('ObjMaterialTechniqueGrp.SortLnu', 'Long')
,('ObjMaterialTechniqueGrp.TechniqueVoc', 'Varchar')
,('ObjMaterialTechniqueGrp.TypeVoc', 'Varchar')
,('ObjMultimediaRef.__id', 'Long')
,('ObjMultimediaRef.ThumbnailBoo', 'Varchar')
,('ObjNormalLocationVoc', 'Varchar')
,('ObjNormalLocationVrt', 'Varchar')
,('ObjCategoryVoc','Varchar')
,('ObjObjectArchiveContentVrt', 'Varchar')
,('ObjObjectGroupsRef.__id', 'Long')
,('ObjObjectGroupsRef.OgrNameText', 'Varchar')
,('ObjObjectNumberGrp.NumberVrt', 'Varchar')
,('ObjObjectNumberGrp.SortLnu', 'Long')
,('ObjObjectTitleGrp.SortLnu', 'Long')
,('ObjObjectTitleGrp.TypeVoc', 'Varchar')
,('ObjObjectTitleGrp.TitleTxt', 'Varchar')
,('ObjOwnership001Ref.OwnApprovalVoc', 'Varchar')
,('ObjOwnership001Ref.OwnCertaintyVoc', 'Varchar')
,('ObjOwnership001Ref.OwnDatePreviewVrt', 'Varchar')
,('ObjOwnership001Ref.OwnDocumentsGrp.DocumentsClb', 'Varchar')
,('ObjOwnership001Ref.OwnDocumentsGrp.SortLnu', 'Long')
,('ObjOwnership001Ref.OwnDocumentsGrp.TypeVoc', 'Varchar')
,('ObjOwnership001Ref.OwnExchangeMethodVoc', 'Varchar')
,('ObjOwnership001Ref.OwnLocation001Voc', 'Varchar')
,('ObjOwnership001Ref.OwnLocationDetailsTxt', 'Varchar')
,('ObjOwnership001Ref.OwnOwnerTxt', 'Varchar')
,('ObjOwnership001Ref.OwnPersonMNRef.PerNennformTxt', 'Varchar')
,('ObjOwnership001Ref.SortLnu', 'Long')
,('ObjPerAssociationRef', 'Varchar')
,('ObjPerAssociationRef.PerDateGrp.DateFromDat', 'Date')
,('ObjPerAssociationRef.PerDateGrp.DateFromTxt', 'Varchar')
,('ObjPerAssociationRef.PerDateGrp.DateToDat', 'Date')
,('ObjPerAssociationRef.PerDateGrp.DateToTxt', 'Varchar')
,('ObjPerAssociationRef.PerDateGrp.SortingLnu', 'Long')
,('ObjPerAssociationRef.PerDateGrp.TypeVoc', 'Varchar')
,('ObjPerAssociationRef.PerNennformTxt', 'Varchar')
,('ObjPerAssociationRef.AttributionVoc', 'Varchar')
,('ObjPerAssociationRef.RoleVoc', 'Varchar')
,('ObjPerAssociationRef.SortLnu', 'Long')
,('ObjProvenanceEvaluationClb', 'Varchar')
,('ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat', 'Varchar')
,('ObjRegistrarRef.RegExhibitionRef.ExhDateTxt', 'Varchar')
,('ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat', 'Varchar')
,('ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb', 'Varchar')
,('ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TypeVoc', 'Varchar')
,('ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt', 'Varchar')
,('ObjSWDGrp.Sort001Lnu', 'Long')
,('ObjSWDGrp.SWDVoc', 'Varchar')
,('ObjTechnicalTermClb', 'Varchar')
,('ObjTextOnlineGrp.SortLnu', 'Long')
,('ObjTextOnlineGrp.TextClb', 'Varchar')
,('ObjTextOnlineGrp.TextHTMLClb', 'Varchar')
,('ObjTextOnlineGrp.TypeVoc', 'Varchar')
ON CONFLICT DO NOTHING;

--
-- Table: attribute_approval; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.attribute_approval (attribute_key) VALUES
-- acquisition
 ('ObjAcquisitionNotesGrp.MemoClb')
,('ObjAcquisitionNotesGrp.TypeVoc')
,('ObjAcquisitionNotesGrp.SortLnu')
-- archiveContent
,('ObjCategoryVoc')
,('ObjObjectArchiveContentVrt')
-- assortments
,('ObjObjectGroupsRef.__id')
,('ObjObjectGroupsRef.OgrNameText')
-- attachments
,('ObjMultimediaRef.__id')
,('ObjMultimediaRef.ThumbnailBoo')
 -- collection
,('__orgUnit')
 -- collectionKey
,('__orgUnit')
 -- compilation
,('__orgUnit')
-- creditLine
,('ObjCreditLineVoc')
-- culturalReferences
,('ObjCulturalContextGrp.DenominationVoc')
,('ObjCulturalContextGrp.NameVoc')
,('ObjCulturalContextGrp.SortLnu')
,('ObjCulturalContextGrp.TypeVoc')
-- dateRange
,('ObjDateGrp.DateFromTxt')
,('ObjDateGrp.DateToTxt')
,('ObjDateGrp.DateTxt')
,('ObjDateGrp.SortLnu')
-- dating
,('ObjDateGrp.DateTxt')
,('ObjDateGrp.PreviewVrt')
,('ObjDateGrp.TypeVoc')
,('ObjDateGrp.SortLnu')
-- dimensionsAndWeight
,('ObjDimAllGrp.PreviewVrt')
,('ObjDimAllGrp.TypeDimRef')
,('ObjDimAllGrp.SortLnu')
-- exhibit/exhibitionSpace
,('ObjCurrentLocationVrt')
,('ObjNormalLocationVrt')
-- geographicalReferences
,('ObjGeograficGrp.PlaceVoc')
,('ObjGeograficGrp.PlaceILSVoc')
,('ObjGeograficGrp.PlaceEgyptVoc')
,('ObjGeograficGrp.PlaceAntiqueVoc')
,('ObjGeograficGrp.DetailsTxt')
,('ObjGeograficGrp.TypeVoc')
,('ObjGeograficGrp.GeopolVoc')
,('ObjGeograficGrp.SortLnu')
-- highlights
,('ObjObjectGroupsRef.__id')
,('ObjObjectGroupsRef.OgrNameText')
-- id
,('__id')
-- identNumber
,('ObjObjectNumberGrp.NumberVrt')
,('ObjObjectNumberGrp.SortLnu')
-- involvedParties
,('ObjPerAssociationRef')
,('ObjPerAssociationRef.PerDateGrp.DateFromDat')
,('ObjPerAssociationRef.PerDateGrp.DateFromTxt')
,('ObjPerAssociationRef.PerDateGrp.DateToDat')
,('ObjPerAssociationRef.PerDateGrp.DateToTxt')
,('ObjPerAssociationRef.PerDateGrp.SortingLnu')
,('ObjPerAssociationRef.PerDateGrp.TypeVoc')
,('ObjPerAssociationRef.PerNennformTxt')
,('ObjPerAssociationRef.AttributionVoc')
,('ObjPerAssociationRef.RoleVoc')
,('ObjPerAssociationRef.SortLnu')
-- inscriptions
,('ObjLabelObjectGrp.LabelClb')
,('ObjLabelObjectGrp.CategoryVoc')
,('ObjLabelObjectGrp.LanguageVoc')
,('ObjLabelObjectGrp.MethodTxt')
,('ObjLabelObjectGrp.OrientationTxt')
,('ObjLabelObjectGrp.PositionTxt')
,('ObjLabelObjectGrp.SortLnu')
,('ObjLabelObjectGrp.TranslationClb')
,('ObjLabelObjectGrp.TransliterationClb')
,('ObjLabelObjectGrp.TypeVoc')
-- location
,('ObjCurrentLocationGrpVrt')
,('ObjCurrentLocationVoc')
,('ObjNormalLocationVoc')
-- longDescription
,('ObjTextOnlineGrp.TextClb')
,('ObjTextOnlineGrp.TextHTMLClb')
,('ObjTextOnlineGrp.TypeVoc')
,('ObjTextOnlineGrp.SortLnu')
-- materialAndTechnique
,('ObjMaterialTechniqueGrp.ExportClb')
,('ObjMaterialTechniqueGrp.TypeVoc')
,('ObjMaterialTechniqueGrp.SortLnu')
,('ObjMaterialTechniqueGrp.MaterialVoc')
,('ObjMaterialTechniqueGrp.MatTechVoc')
,('ObjMaterialTechniqueGrp.PhotographyVoc')
,('ObjMaterialTechniqueGrp.PresentationVoc')
,('ObjMaterialTechniqueGrp.TechniqueVoc')
-- technicalTerm
,('ObjTechnicalTermClb')
-- titles
,('ObjObjectTitleGrp.TitleTxt')
,('ObjObjectTitleGrp.TypeVoc')
,('ObjObjectTitleGrp.SortLnu')
ON CONFLICT DO NOTHING;
UPDATE smb.attribute_approval SET 
    AKu = true, AMP = true, ANT = true, 
    EM = true, 
    GF = true, GG = true, 
    IFM = true, ISL = true, 
    KB = true, KGM = true, KK = true, 
    MEK = true, MIM = true, MK = true, MSB = true, MVF = true, 
    NG = true, 
    RaO = true, 
    SBM = true, SKS = true, 
    VAM = true, 
    ZA = true
;

INSERT INTO smb.attribute_approval (attribute_key, NG, EM, KB) VALUES
-- exhibitions NG
 ('ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt', true, NULL, NULL)
,('ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat', true, NULL, NULL)
,('ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat', true, NULL, NULL)
,('ObjRegistrarRef.RegExhibitionRef.ExhDateTxt', true, NULL, NULL)
,('ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb', true, NULL, NULL)
,('ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TypeVoc', true, NULL, NULL)
-- literature NG+KB
,('ObjLiteratureRef.LitReferenceShortTxt', true, NULL, true)
,('ObjLiteratureRef.LitPublicationDateLnu', true, NULL, true)
,('ObjLiteratureRef.LitCitationClb', true, NULL, true)
,('ObjLiteratureRef.PageRefTxt', true, NULL, true)
,('ObjLiteratureRef.PicturePageTxt', true, NULL, true)
,('ObjLiteratureRef.CatalogueNumberTxt', true, NULL, true)
-- keywords KB+EM
,('ObjIconographyGrp.KeywordEMVoc', NULL, true, NULL)
,('ObjIconographyGrp.KeywordProjectVoc', NULL, NULL, true)
,('ObjIconographyGrp.KeywordVoc', NULL, NULL, true)
,('ObjIconographyGrp.SortLnu', NULL, true, true)
,('ObjKeyWordsGrp.KeyWordVoc', NULL, NULL, true)
,('ObjKeyWordsGrp.NotationTxt', NULL, NULL, true)
,('ObjKeyWordsGrp.SortLnu', NULL, NULL, true)
,('ObjSWDGrp.Sort001Lnu', NULL, NULL, true)
,('ObjSWDGrp.SWDVoc', NULL, NULL, true)
-- provenance NG+EM
,('ObjOwnership001Ref.OwnApprovalVoc', true, true, NULL)
,('ObjOwnership001Ref.OwnDatePreviewVrt', true, true, NULL)
,('ObjOwnership001Ref.OwnCertaintyVoc', true, true, NULL)
,('ObjOwnership001Ref.OwnLocation001Voc', true, true, NULL)
,('ObjOwnership001Ref.OwnLocationDetailsTxt', true, true, NULL)
,('ObjOwnership001Ref.OwnExchangeMethodVoc', true, true, NULL)
,('ObjOwnership001Ref.OwnDocumentsGrp.TypeVoc', true, true, NULL)
,('ObjOwnership001Ref.OwnDocumentsGrp.DocumentsClb', true, true, NULL)
,('ObjOwnership001Ref.OwnDocumentsGrp.SortLnu', true, true, NULL)
,('ObjOwnership001Ref.OwnOwnerTxt', true, true, NULL)
,('ObjOwnership001Ref.SortLnu', true, true, NULL)
,('ObjOwnership001Ref.OwnPersonMNRef.PerNennformTxt', true, true, NULL)
-- provenanceEvaluation NG+EM
,('ObjProvenanceEvaluationClb', true, true, NULL)
-- signatures NG
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextMClb', true, NULL, NULL)
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSTxt', true, NULL, NULL)
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalTextSVoc', true, NULL, NULL)
,('ObjGeneralCre._UserObjGeneralNGBezeichnungenamObjekGrp._UserOalSortierungLLnu', true, NULL, NULL)
ON CONFLICT DO NOTHING;

-- keywords ANT
INSERT INTO smb.attribute_approval (attribute_key, ANT) VALUES ('ObjIconographyGrp.KeywordANTVoc', true);
UPDATE smb.attribute_approval SET ANT = true WHERE attribute_key = 'ObjIconographyGrp.SortLnu';


--
-- Table: licenses; Schema: smb; Owner: smb-db-user
--


INSERT INTO smb.licenses(id, key, link) VALUES
-- defaults
 (  1, 'CC_BY_NC_SA_40',            'https://creativecommons.org/licenses/by-nc-sa/4.0')
,(  2, 'PUBLIC_DOMAIN',             'https://creativecommons.org/publicdomain/mark/1.0/deed.de')
,(  3, 'CC_BY_SA_40',               'https://creativecommons.org/licenses/by-sa/4.0')
,(  4, 'BLOCKED_ETHICAL',           null)
,(  5, 'BLOCKED_MARTIAL_LOSS',      null)
,(  6, 'BLOCKED_LICENSE',           null)
-- standards
,( 10, 'Public Domain Mark 1.0',    'https://creativecommons.org/publicdomain/mark/1.0/deed.de')
,( 11, 'CC0',                       'https://creativecommons.org/publicdomain/zero/1.0')
,( 12, 'CC BY-NC-SA 4.0',           'https://creativecommons.org/licenses/by-nc-sa/4.0')
,( 13, 'CC BY-NC-ND 4.0',           'https://creativecommons.org/licenses/by-nc-nd/4.0')
,( 14, 'CC BY-NC 4.0',              'https://creativecommons.org/licenses/by-nc/4.0')
,( 15, 'CC BY-ND 4.0',              'https://creativecommons.org/licenses/by-nd/4.0')
,( 16, 'CC BY-SA 4.0',              'https://creativecommons.org/licenses/by-sa/4.0')
,( 17, 'CC BY 4.0',                 'https://creativecommons.org/licenses/by/4.0')
,( 20, 'VG Bild-Kunst, Bonn, 2016', 'https://www.bildkunst.de')
,( 21, 'VG Bild-Kunst, Bonn, 2017', 'https://www.bildkunst.de')
,( 22, 'VG Bild-Kunst, Bonn, 2018', 'https://www.bildkunst.de')
,( 23, 'VG Bild-Kunst, Bonn, 2019', 'https://www.bildkunst.de')
,( 24, 'VG Bild-Kunst, Bonn, 2020', 'https://www.bildkunst.de')
,( 25, 'VG Bild-Kunst, Bonn, 2021', 'https://www.bildkunst.de')
,( 26, 'VG Bild-Kunst, Bonn, 2022', 'https://www.bildkunst.de')
,( 27, 'VG Bild-Kunst, Bonn, 2023', 'https://www.bildkunst.de')
,( 28, 'VG Bild-Kunst, Bonn, 2024', 'https://www.bildkunst.de')
,( 29, 'VG Bild-Kunst, Bonn, 2025', 'https://www.bildkunst.de')
-- specifics
,(101, 'Vordemberge-Gildewart Foundation (Rapperswil/Switzerland)', null)
,(102, 'Roland Penrose, www.leemiller.co.uk', 'https://www.leemiller.co.uk/article/Artists/b4OcCNM2-8snMwHxWgoJ5Q..a#rp')
;
SELECT setval('smb.licenses_id_seq', 103); -- MAX(id) + 1


--
-- Table: licenses_translation; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.licenses_translation (id, license_id, language_id, content, license_text) VALUES
 (  1,   1, 1, 'CC BY-NC-SA 4.0', null)
,(  2,   2, 1, 'Public Domain Mark 1.0', null)
,(  3,   3, 1, 'CC BY-SA 4.0', null)
,(  4,   4, 1, 'Ohne Abbildungen', 'aus ethischen Gründen')
,(  5,   5, 1, 'Ohne Abbildungen', '- Kriegsverlust -')
,(  6,   6, 1, 'Ohne Abbildungen', 'aus lizenzrechtlichen Gründen')
,(  7,   4, 2, 'Without Image', 'due to ethical reasons')
,(  8,   5, 2, 'Without Image', '- martial loss -')
,(  9,   6, 2, 'Without Image', 'due to legal reasons')
,( 11,  11, 1, 'Public Domain (CC0 1.0 Universal)')
;
SELECT setval('smb.licenses_translation_id_seq', 103); -- MAX(licenses_id) + 1


--
-- Table: blocked_attachments; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.blocked_attachments (id, license_id) VALUES
 ( 5802648, 4)
,( 6545994, 5)
,( 6548841, 6)
;

--
-- Table: sync_cycle_type; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.sync_cycle_type(value, comment) VALUES 
 ('INCREMENTAL', 'incremental update based on last-modified filter')
,('HIGHLIGHTS',  'highlights update based on object-groups')
,('DELETIONS',   'removing objects moved to trashbin')
,('MANUAL',      'manually triggered sync')
,('ASSORTMENTS', 'search collections update')
;


--
-- Table: stt_platform; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.stt_platform(value, comment) VALUES 
 ('SMB', 'Sammlungen Online')
,('HBF', 'Hamburger Bahnhof')
,('ISL', 'Museum für Islamische Kunst')
,('KGM', 'Kunstgewerbemuseum')
;


--
-- Table: stt_platform_config; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.stt_platform_config(id, platform_key, link_template, hide_in_overview, hero_slider_limit, enable_story_filter) VALUES 
 ( 1, 'SMB', 'https://stt-smb.xaidev.net/:lang/story/:slug', false, 20, true)
,( 2, 'HBF', 'https://stt-hbf.xaidev.net/:lang/story/:slug', false,  5, true)
,( 3, 'ISL', 'https://stt-isl.xaidev.net/:lang/story/:slug', false, 10, true)
,( 4, 'KGM', 'https://stt-kgm.xaidev.net/:lang/story/:slug', false,  3, true)
;
SELECT setval('smb.stt_platform_config_id_seq', 5); -- MAX(id) + 1


--
-- Table: assortments; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.assortments (id, key, preview_image, search_query_type) VALUES 
 (1, '229396',      '6279135.jpg', 'OBJECT_GROUP')
,(2, '37607',       '6272559.jpg', 'OBJECT_GROUP')
,(3, '261396',      '1264265.jpg', 'OBJECT_GROUP')
,(4, '266398',      '1216502.jpg', 'OBJECT_GROUP')
,(5, '64396',       '6279136.jpg', 'OBJECT_GROUP')
,(6, '37607.36727',          null, 'OBJECT_GROUP')
,(7, '28677',       '5838952.jpg', 'OBJECT_GROUP')
;
SELECT setval('smb.assortments_id_seq', 8); -- MAX(id) + 1


--
-- Table: assortments_translation; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.assortments_translation(assortment_id, language_id, subtitle, title) VALUES
 (1, 1, 'Kunstbibliothek',       'Frühe Plakate, gestaltet von Frauen (1894-1914)')
,(2, 1, 'Antikensammlung',       'Antike Bronzen in Berlin')
,(3, 1, 'Ethnologisches Museum', 'Benin Bronzen')
,(4, 1, 'Ethnologisches Museum', 'Sammlungen im Humboldt Forum')
,(5, 1, 'Kunstbibliothek',       'Frühe Plakate (1840-1914)')
,(7, 1, 'Nationalgalerie',       'Die Sammlung der Nationalgalerie 1905 – 1945')
;
SELECT setval('smb.assortments_translation_id_seq', 8); -- MAX(id) + 1

--
-- Table: user_role; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.user_role (id, role) VALUES 
 (1, 'authservice')
,(2, 'admin')
,(3, 'editor')
;
SELECT setval('smb.user_role_id_seq', 4); -- MAX(id) + 1


--
-- Table: user; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.user (email, password, role_id) VALUES ('authservice', public.crypt('authservice', public.gen_salt('bf', 10)), 1);


--
-- Table: ignoreable_keys; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.ignoreable_keys (key) VALUES
 ('ObjAccessoryRef.*')
,('ObjAcquisitionDateGrp.*')
,('ObjAcquisitionMethodGrp.*')
,('ObjAcquisitionReference*')
,('ObjAcquisitionSource*')
,('ObjArchive*')
,('ObjCollectionActivityRef.*')
,('ObjCompilation*')
,('ObjConditionGrp.DateDat')
,('ObjConditionGrp.ModifiedByTxt')
,('ObjConditionGrp.NotesClb')
,('ObjConservationTermsGrp.ContaminantVoc')
,('ObjConservationTermsGrp.DisplayClb')
,('ObjConservationTermsGrp.LoanNotesClb')
,('ObjConservationTermsGrp.ModifiedDateDat')
,('ObjConservationTermsGrp.NotesClb')
,('ObjConservationTermsGrp.PackingClb')
,('ObjConservationTermsGrp.SecurityClb')
,('ObjConservationTermsGrp.StorageClb')
,('ObjConservationTermsGrp.TransportClb')
,('ObjEditingGrp.*')
,('ObjEditorNotesGrp.NotesVoc')
,('ObjEditorNotesGrp.SortLnu')
,('ObjEditorNotesGrp.TypeVoc')
,('ObjGeograficGrp.ModifiedByTxt')
,('ObjGeograficGrp.ModifiedDateDat')
,('ObjGeograficGrp.NotesClb')
,('ObjGeograficGrp.SourceIDLnu')
,('ObjGeograficGrp.SourceTxt')
,('ObjIconclassGrp.DelimiterVoc')
,('ObjIconographyContent*')
,('ObjIlluminationGrp.NotesClb')
,('ObjInventory*')
,('ObjMaterialTechniqueGrp.EgyptVoc')
,('ObjMaterialTechniqueGrp.ISLVoc')
,('ObjMaterialTechniqueGrp.Modified*')
,('ObjMigration*')
,('ObjObjectArchiveContentGrp.ModifiedByTxt')
,('ObjObjectArchiveContentGrp.ModifiedDateDat')
,('ObjObjectArchiveContentGrp.NotesClb')
,('ObjObjectGroupsRef')
,('ObjObjectNumberGrp.InvDescriptionClb')
,('ObjObjectNumberGrp.InvNumberSchemeRef')
,('ObjObjectNumberGrp.ModifiedByDpl')
,('ObjObjectNumberGrp.ModifiedDateDpl')
,('ObjObjectNumberGrp.NotesClb')
,('ObjObjectNumberGrp.NumberMaxDpl')
,('ObjObjectNumberGrp.PreviewDpl')
,('ObjObjectNumberGrp.SortedDpl')
,('ObjObjectNumberGrp.SortLnu')
,('ObjObjectNumberGrp.SourceTxt')
,('ObjObjectTitleGrp.ModifiedByTxt')
,('ObjObjectTitleGrp.ModifiedDateDat')
,('ObjObjectTitleGrp.NotesClb')
,('ObjOtherNumberGrp.ModifiedByDpl')
,('ObjOtherNumberGrp.ModifiedDateDpl')
,('ObjOtherNumberGrp.NotesClb')
,('ObjOtherNumberGrp.SortLnu')
,('ObjOwnerMethodGrp.*')
,('ObjProvBewertung*')
,('ObjPublicationGrp.NotesClb')
,('ObjPublicationGrp.SortLnu')
,('ObjRecordCreated*')
,('ObjRecordingStatus*')
,('ObjResponsibleGrp.ResponsibleVoc')
,('ObjResponsibleGrp.SortLnu')
,('ObjResponsibleGrp.TypeVoc')
,('ObjRightsGrp.*')
,('ObjSystematic*')
,('ObjSystematicGrp.*')
,('ObjTechnicalTermGrp.TechnicalTermEgyptVoc')
,('ObjTechnicalTermGrp.TypeVoc')
,('ObjTextGrp.*')
,('ObjTypeGrp.*')
,('ObjValuationGrp.*')
;