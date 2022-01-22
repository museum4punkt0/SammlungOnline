package de.smbonline.searchindexer.conf

const val DEFAULT_LANGUAGE = "de"

const val SORTING_FIELDNAME = "SortLnu"
const val NESTED_ITEMS_ATTRIBUTE_NAME = "items"
const val VIRTUAL_ATTRIBUTE_NAME = "@vrt"

// How to add a new attribute:
//  1) add const here
//  2) add const to ALL_RELEVANT_ATTRIBUTES array
//  3) implement Normalizer in de.smbonline.searchindexer.norm.impl
//  4) register Normalizer in de.smbonline.searchindexer.conf.NormalizerConfigurer
//  5) if attribute is of type "text", extend de.smbonline.searchindexer.api.ElasticSearchAPI#sortable (exclude or add to SORTABLE_TEXT_FIELDS)
//  6) if autocomplete search suggestions should be supported, extend de.smbonline.searchindexer.api.ElasticSearchAPI#SUGGESTION_FIELDS
//  7) add test case for Normalizer
//  8) extend documentation: https://collaboration.xailabs.com/wiki/display/SSO/Adapter+Implementierung
//      TODO old ProvenanceNormalizer is now AcquisitionNormalizer
//      TODO changed logic in LiteratureNormalizer
//      TODO changed logic in ProvenanceNormalizer
//      TODO new ExhibitionsNormalizer

const val ACQUISITION_ATTRIBUTE = "acquisition"
const val COLLECTION_ATTRIBUTE = "collection"
const val COLLECTION_KEY_ATTRIBUTE = "collectionKey"
const val COMPILATION_ATTRIBUTE = "compilation"
const val CREDIT_LINE = "creditLine"
const val DATE_RANGE_ATTRIBUTE = "dateRange"
const val DATING_ATTRIBUTE = "dating"
const val DIMENSIONS_AND_WEIGHT_ATTRIBUTE = "dimensionsAndWeight"
const val EXHIBITIONS_ATTRIBUTE = "exhibitions"
const val EXHIBITION_SPACE_ATTRIBUTE = "exhibitionSpace"
const val GEOGRAPHICAL_REFERENCES_ATTRIBUTE = "geographicalReferences"
const val HAS_ATTACHMENTS_ATTRIBUTE = "attachments";
const val IDENT_NUMBER_ATTRIBUTE = "identNumber"
const val ID_ATTRIBUTE = "id"
const val INVOLVED_PARTIES_ATTRIBUTE = "involvedParties"
const val IS_EXHIBIT_ATTRIBUTE = "exhibit"
const val IS_HIGHLIGHT_ATTRIBUTE = "highlight"
const val LITERATURE_ATTRIBUTE = "literature"
const val LOCATION_ATTRIBUTE = "location"
const val LONG_DESCRIPTION_ATTRIBUTE = "longDescription"
const val MATERIAL_AND_TECHNIQUE_ATTRIBUTE = "materialAndTechnique"
const val PROVENANCE_ATTRIBUTE = "provenance"
const val PROVENANCE_EVALUATION_ATTRIBUTE = "provenanceEvaluation"
const val SIGNATURES_ATTRIBUTE = "signatures"
const val TECHNICAL_TERM_ATTRIBUTE = "technicalTerm"
const val TITLES_ATTRIBUTE = "titles"

val ALL_RELEVANT_ATTRIBUTES = arrayOf(
        ACQUISITION_ATTRIBUTE,
        COLLECTION_ATTRIBUTE, COLLECTION_KEY_ATTRIBUTE, COMPILATION_ATTRIBUTE, CREDIT_LINE,
        DATE_RANGE_ATTRIBUTE, DATING_ATTRIBUTE, DIMENSIONS_AND_WEIGHT_ATTRIBUTE,
        EXHIBITIONS_ATTRIBUTE,
        EXHIBITION_SPACE_ATTRIBUTE,
        GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
        HAS_ATTACHMENTS_ATTRIBUTE,
        ID_ATTRIBUTE, IDENT_NUMBER_ATTRIBUTE, INVOLVED_PARTIES_ATTRIBUTE, IS_EXHIBIT_ATTRIBUTE, IS_HIGHLIGHT_ATTRIBUTE,
        LITERATURE_ATTRIBUTE, LOCATION_ATTRIBUTE, LONG_DESCRIPTION_ATTRIBUTE,
        MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
        PROVENANCE_ATTRIBUTE, PROVENANCE_EVALUATION_ATTRIBUTE,
        SIGNATURES_ATTRIBUTE,
        TECHNICAL_TERM_ATTRIBUTE, TITLES_ATTRIBUTE
)