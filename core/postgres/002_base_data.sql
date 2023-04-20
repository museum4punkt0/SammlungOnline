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

INSERT INTO smb.collections (key, comment) VALUES 
 ('AKu', 'Museum für Asiatische Kunst')
,('AMP', 'Ägyptisches Museum und Papyrussammlung')
,('ANT', 'Antikensammlung')
,('EM',  'Ethnologisches Museum')
,('GF',  'Gipsformerei')
,('GG',  'Gemäldegalerie')
,('IFM', 'Institut für Museumsforschung')
,('ISL', 'Museum für Islamische Kunst')
,('KB',  'Kunstbibliothek')
,('KGM', 'Kunstgewerbemuseum')
,('KK',  'Kupferstichkabinett')
,('MEK', 'Museum Europäischer Kulturen')
,('MIM', 'SIM | Musikinstrumenten-Museum')
,('MK',  'Münzkabinett')
,('MSB', 'Skulpturensammlung und Museum für Byzantinische Kunst')
,('MVF', 'Museum für Vor- und Frühgeschichte')
,('NG',  'Nationalgalerie')
,('RaO', 'Rathgen Forschungslabor')
,('SBM', 'Skulpturensammlung und Museum für Byzantinische Kunst')
,('SKS', 'Skulpturensammlung und Museum für Byzantinische Kunst')
,('VAM', 'Vorderasiatisches Museum')
,('ZA',  'Zentralarchiv')
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
,('ObjGeograficGrp.RoleVoc', 'Varchar')
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
,('ObjLabelObjectGrp.LabelClb', 'Varchar')
,('ObjLabelObjectGrp.LanguageVoc', 'Varchar')
,('ObjLabelObjectGrp.MethodTxt', 'Varchar')
,('ObjLabelObjectGrp.OrientationTxt', 'Varchar')
,('ObjLabelObjectGrp.PositionTxt', 'Varchar')
,('ObjLabelObjectGrp.SortLnu', 'Long')
,('ObjLabelObjectGrp.TranslationClb', 'Varchar')
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
,('ObjObjectGroupsRef.__id', 'Long')
,('ObjObjectGroupsRef.OgrNameText', 'Varchar')
,('ObjObjectNumberGrp.NumberVrt', 'Varchar')
,('ObjObjectNumberGrp.SortLnu', 'Long')
,('ObjObjectTitleGrp.SortLnu', 'Long')
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
,('ObjGeograficGrp.RoleVoc')
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
,('ObjPerAssociationRef.RoleVoc')
,('ObjPerAssociationRef.SortLnu')
-- location
,('ObjCurrentLocationGrpVrt')
,('ObjCurrentLocationVoc')
,('ObjNormalLocationVoc')
-- longDescription
,('ObjTextOnlineGrp.TextClb')
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
-- inscriptions KB
,('ObjLabelObjectGrp.LabelClb', NULL, NULL, true)
,('ObjLabelObjectGrp.LanguageVoc', NULL, NULL, true)
,('ObjLabelObjectGrp.MethodTxt', NULL, NULL, true)
,('ObjLabelObjectGrp.OrientationTxt', NULL, NULL, true)
,('ObjLabelObjectGrp.PositionTxt', NULL, NULL, true)
,('ObjLabelObjectGrp.SortLnu', NULL, NULL, true)
,('ObjLabelObjectGrp.TranslationClb', NULL, NULL, true)
,('ObjLabelObjectGrp.TypeVoc', NULL, NULL, true)
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
-- standards
,( 10, 'Public Domain Mark 1.0',    'https://creativecommons.org/publicdomain/mark/1.0/deed.de')
,( 11, 'CC0',                       'https://creativecommons.org/publicdomain/zero/1.0')
,( 12, 'CC BY-NC-SA 4.0',           'https://creativecommons.org/licenses/by-nc-sa/4.0')
,( 13, 'CC-BY-NC-SA 4.0',           'https://creativecommons.org/licenses/by-nc-sa/4.0')
,( 14, 'CC BY-NC-ND 4.0',           'https://creativecommons.org/licenses/by-nc-nd/4.0')
,( 15, 'CC BY-NC 4.0',              'https://creativecommons.org/licenses/by-nc/4.0')
,( 16, 'CC BY-ND 4.0',              'https://creativecommons.org/licenses/by-nd/4.0')
,( 17, 'CC BY-SA 4.0',              'https://creativecommons.org/licenses/by-sa/4.0')
,( 18, 'CC BY 4.0',                 'https://creativecommons.org/licenses/by/4.0')
,( 21, 'VG Bild-Kunst, Bonn, 2016', 'https://www.bildkunst.de')
,( 22, 'VG Bild-Kunst, Bonn, 2017', 'https://www.bildkunst.de')
,( 23, 'VG Bild-Kunst, Bonn, 2018', 'https://www.bildkunst.de')
,( 24, 'VG Bild-Kunst, Bonn, 2019', 'https://www.bildkunst.de')
,( 25, 'VG Bild-Kunst, Bonn, 2020', 'https://www.bildkunst.de')
,( 26, 'VG Bild-Kunst, Bonn, 2021', 'https://www.bildkunst.de')
,( 27, 'VG Bild-Kunst, Bonn, 2022', 'https://www.bildkunst.de')
,( 28, 'VG Bild-Kunst, Bonn, 2023', 'https://www.bildkunst.de')
,( 29, 'VG Bild-Kunst, Bonn, 2024', 'https://www.bildkunst.de')
,( 30, 'VG Bild-Kunst, Bonn, 2025', 'https://www.bildkunst.de')
-- specifics
,(101, 'Vordemberge-Gildewart Foundation (Rapperswil/Switzerland)', null)
,(102, 'Roland Penrose, www.leemiller.co.uk', 'https://www.leemiller.co.uk/article/Artists/b4OcCNM2-8snMwHxWgoJ5Q..a#rp')
;
SELECT setval('smb.licenses_id_seq', 103); -- MAX(id) + 1


--
-- Table: licenses_translation; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.licenses_translation (id, license_id, language_id, content) VALUES
 (  1,   1, 1, 'CC BY-NC-SA 4.0')
,(  2,   2, 1, 'Public Domain Mark 1.0')
,(  3,   3, 1, 'CC BY-SA 4.0')
,( 11,  11, 1, 'Public Domain (CC0 1.0 Universal)')
,(101, 101, 1, 'Vordemberge-Gildewart Foundation (Rapperswil/Schweiz)')
,(102, 102, 1, 'Roland Penrose, www.leemiller.co.uk')
;
SELECT setval('smb.licenses_translation_id_seq', 103); -- MAX(id) + 1


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
 ( 1, 'SMB', 'https://stt-smb.xailabs.com/:lang/story/:slug', false, 20, true)
,( 2, 'HBF', 'https://stt-hbf.xailabs.com/:lang/story/:slug', false,  5, true)
,( 3, 'ISL', 'https://stt-isl.xailabs.com/:lang/story/:slug', false, 10, true)
,( 4, 'KGM', 'https://stt-kgm.xailabs.com/:lang/story/:slug', false,  3, true)
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