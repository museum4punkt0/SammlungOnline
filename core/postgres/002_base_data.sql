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
-- Data for Name: language; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.language (id, lang) VALUES 
 (1, 'de')
;
SELECT setval('smb.language_id_seq', 2); -- MAX(id) + 1


--
-- Data for Name: sync_cycle_type; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.sync_cycle_type(value, comment) VALUES 
 ('INCREMENTAL', 'incremental update based on last-modified filter')
,('HIGHLIGHTS',  'highlights update based on object-groups')
,('DELETIONS',   'removing objects moved to trashbin')
,('MANUAL',      'manually triggered sync')
;


--
-- Data for Name: intro_text_module_type; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.intro_text_module_type (value, comment) VALUES 
 ('TEXT',     'Simple text module.')
,('RESEARCH', 'Module for Research platform.')
,('TOPIC',    'Module for Topics platform.')
,('GUIDE',    'Module for Guide platform.')
;


--
-- Data for Name: intro_text_modules; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.intro_text_modules (id, sequence, link, module_background_color, title_color, text_color, text_area_color, module_type) VALUES 
 (1, 1, 'https://smb-research.xailabs.dev/',    '#ffffff', '#000000', '#79a9f5', '#000000', 'RESEARCH')
,(2, 2, 'https://smb-topics.xailabs.dev/',      '#000000', '#f9ff04', '#f9ff04', '#6f7045',    'TOPIC')
,(3, 3, 'https://smb-guide.xailabs.dev/',       '#d3d3d3', '#f25b5b', '#ffffff', '#f25b5b',    'GUIDE')
,(4, 4, 'https://visualisierung.smb.museum/',   '#666666', '#d3d3d3', '#666666', '#ffffff',     'TEXT')
,(5, 5, 'mailto:smb-digital@smb.spk-berlin.de', '#ffffff', '#000000', '#000000', '#d3d3d3',     'TEXT')
;
SELECT setval('smb.intro_text_modules_id_seq', 6); -- MAX(id) + 1


--
-- Data for Name: intro_text_module_translations; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.intro_text_module_translations (id, intro_text_module_id, language_id, title, subtitle, link_caption, content) VALUES 
 (1, 1, 1, 'Recherche',  'Suche in den Sammlungen',                     'Objekte suchen',     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.')
,(2, 2, 1, 'Themen',     'Die Sammlungen erleben',                      'Themen entdecken',   'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.')
,(3, 3, 1, 'Touren',     'Wege in die Sammlungen',                      'Touren finden',      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.')
,(4, 4, 1, 'Experiment', 'Experimenteller Sammlungszugang',             'Zur Visualisierung', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.')
,(5, 5, 1, 'Kontakt',    'Sammlungen der Staatlichen Museen zu Berlin', 'Fragen Sie uns',     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.')
;
SELECT setval('smb.intro_text_module_translations_id_seq', 6); -- MAX(id) + 1


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.user_role (id, role) VALUES 
 (1, 'authservice')
,(2, 'admin')
,(3, 'editor')
,(4, 'reader')
;
SELECT setval('smb.user_role_id_seq', 5); -- MAX(id) + 1


--
-- Data for Name: user; Type: TABLE DATA; Schema: smb; Owner: smb-db-user
--

INSERT INTO smb.user (email, password, role_id) VALUES ('authservice', public.crypt('authservice', public.gen_salt('bf', 10)), 1);
INSERT INTO smb.user (email, password, role_id) VALUES 
 ('landingpage', '$2a$10$dudDWUpSjhYGZqAk9ixGTuORmP6v3xOXCi4gj7F3Yp.QDcOdCorbC', 4)
,('topics',      '$2a$10$vsZGJtj2sKqW.B7OQoyexusgOX7NGdv4y/K8Kxi25jKUwjcU8ZrkS', 4)
,('research',    '$2a$10$.Mk16BD78IXDTUQzaOELfuTKvmSr24jvLFaWpTl0.hn7BkL3cWAeO', 4)
,('guide',       '$2a$10$3EXyLE2TyDt5rPrFUDpgo.24p4gn9itbLzrmIyqAzyt3K1Hs.zFzS', 4)
;

INSERT INTO smb.ignoreable_keys (key) VALUES
('ObjAccessoryRef.*'),
('ObjAcquisitionDateGrp.*'),
('ObjAcquisitionMethodGrp.*'),
('ObjAcquisitionReference*'),
('ObjAcquisitionSource*'),
('ObjArchive*'),
('ObjCollectionActivityRef.*'),
('ObjCompilation*'),
('ObjConditionGrp.DateDat'),
('ObjConditionGrp.ModifiedByTxt'),
('ObjConditionGrp.NotesClb'),
('ObjConservationTermsGrp.ContaminantVoc'),
('ObjConservationTermsGrp.DisplayClb'),
('ObjConservationTermsGrp.LoanNotesClb'),
('ObjConservationTermsGrp.ModifiedDateDat'),
('ObjConservationTermsGrp.NotesClb'),
('ObjConservationTermsGrp.PackingClb'),
('ObjConservationTermsGrp.SecurityClb'),
('ObjConservationTermsGrp.StorageClb'),
('ObjConservationTermsGrp.TransportClb'),
('ObjDimAllGrp.*'),
('ObjEditingGrp.*'),
('ObjEditorNotesGrp.NotesVoc'),
('ObjEditorNotesGrp.SortLnu'),
('ObjEditorNotesGrp.TypeVoc'),
('ObjGeograficGrp.ModifiedByTxt'),
('ObjGeograficGrp.ModifiedDateDat'),
('ObjGeograficGrp.NotesClb'),
('ObjGeograficGrp.SourceIDLnu'),
('ObjGeograficGrp.SourceTxt'),
('ObjIconclassGrp.DelimiterVoc'),
('ObjIconographyContent*'),
('ObjIlluminationGrp.NotesClb'),
('ObjInventory*'),
('ObjMaterialTechniqueGrp.EgyptVoc'),
('ObjMaterialTechniqueGrp.ISLVoc'),
('ObjMaterialTechniqueGrp.Modified*'),
('ObjMigration*'),
('ObjObjectArchiveContentGrp.ModifiedByTxt'),
('ObjObjectArchiveContentGrp.ModifiedDateDat'),
('ObjObjectArchiveContentGrp.NotesClb'),
('ObjObjectGroupsRef'),
('ObjObjectNumberGrp.InvDescriptionClb'),
('ObjObjectNumberGrp.InvNumberSchemeRef'),
('ObjObjectNumberGrp.ModifiedByDpl'),
('ObjObjectNumberGrp.ModifiedDateDpl'),
('ObjObjectNumberGrp.NotesClb'),
('ObjObjectNumberGrp.NumberMaxDpl'),
('ObjObjectNumberGrp.PreviewDpl'),
('ObjObjectNumberGrp.SortedDpl'),
('ObjObjectNumberGrp.SortLnu'),
('ObjObjectNumberGrp.SourceTxt'),
('ObjObjectTitleGrp.ModifiedByTxt'),
('ObjObjectTitleGrp.ModifiedDateDat'),
('ObjObjectTitleGrp.NotesClb'),
('ObjOtherNumberGrp.ModifiedByDpl'),
('ObjOtherNumberGrp.ModifiedDateDpl'),
('ObjOtherNumberGrp.NotesClb'),
('ObjOtherNumberGrp.SortLnu'),
('ObjOwnerMethodGrp.*'),
('ObjProvBewertung*'),
('ObjPublicationGrp.NotesClb'),
('ObjPublicationGrp.SortLnu'),
('ObjRecordCreated*'),
('ObjRecordingStatus*'),
('ObjResponsibleGrp.ResponsibleVoc'),
('ObjResponsibleGrp.SortLnu'),
('ObjResponsibleGrp.TypeVoc'),
('ObjRightsGrp.*'),
('ObjSystematic*'),
('ObjSystematicGrp.*'),
('ObjTechnicalTermGrp.TechnicalTermEgyptVoc'),
('ObjTechnicalTermGrp.TypeVoc'),
('ObjTextGrp.*'),
('ObjTypeGrp.*'),
('ObjValuationGrp.*');