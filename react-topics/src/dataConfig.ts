
export const DATA_CONFIG = {
    TOPIC_SLIDER_IMAGE_SIZE: 2500,
    COLLECTION_CARD_IMAGE_SIZE: 580,
    MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: 750,
    CAROUSEL_IMAGE_SIZE: 200,
    DETAILPAGE_IMAGE_SIZE: 2500,
    PREVIEW_IMAGE_SIZE: 86,

    // !! IMPORTANT: Due to convention it is important to use the OBJECT_ATTRIBUTE_KEY_ prefix for keys related to objects. Only
    // these keys will be queried to optimize network throughput.
    // Objektbezeichnung/Titel
    OBJECT_ATTRIBUTE_KEY_TITLE: 'ObjObjectTitleGrp.TitleTxt',
    // Sachbegriff
    OBJECT_ATTRIBUTE_KEY_TECHNICAL_TERM: 'ObjTechnicalTermClb',
    // Datierung
    OBJECT_ATTRIBUTE_KEY_DATING: 'ObjDateGrp.DateTxt',
    // Ident. Nr.
    OBJECT_ATTRIBUTE_KEY_IDENT_NR: 'ObjObjectNumberGrp.InventarNrSTxt',
    // Sammlung
    OBJECT_ATTRIBUTE_KEY_COLLECTION: '__orgUnit', // 'ObjOwnerRef',
    // Standort
    OBJECT_ATTRIBUTE_KEY_LOCATION: '', // V2 'ObjCurrentLocationGrpVrt'
    // Bildnachweis
    OBJECT_ATTRIBUTE_KEY_PICTURE_CREDITS: '',
    // Beteiligte
    OBJECT_ATTRIBUTE_KEY_INVOLVED_PARTIES: 'ObjPerAssociationMainParticipantVrt',
    // Objektbeschreibung
    OBJECT_ATTRIBUTE_KEY_DESCRIPTION: 'ObjTextOnlineGrp.TextClb',
    // Geografische Bezüge
    OBJECT_ATTRIBUTE_KEY_GEOGRAPHICAL_REFERENCES: 'ObjGeograficGrp.PlaceVoc',
    // Maße und Gewicht
    OBJECT_ATTRIBUTE_KEY_DIMENSIONS_AND_WEIGHT: 'ObjDimAllGrp.PreviewVrt',
    // Material und Technik
    OBJECT_ATTRIBUTE_KEY_MATERIAL_AND_TECHNIQUE: 'ObjMaterialTechniqueGrp.ExportClb',
    // Objektbeschriftungen
    OBJECT_ATTRIBUTE_KEY_LABELS: '', // V2
    // Provenienz und Erwerbung
    OBJECT_ATTRIBUTE_KEY_PROVENANCE: '', // V2
    // Ausstellungen
    OBJECT_ATTRIBUTE_KEY_EXHIBITION: '', // V2
    // Literatur
    OBJECT_ATTRIBUTE_KEY_LITERATURE: '', // V2
    // Normdaten
    OBJECT_ATTRIBUTE_KEY_NORM_DATA: '', // V2
};
