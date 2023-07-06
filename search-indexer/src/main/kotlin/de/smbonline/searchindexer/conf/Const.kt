package de.smbonline.searchindexer.conf

const val DEFAULT_LANGUAGE = "de"

const val SORTING_FIELDNAME = "SortLnu"
const val NESTED_ITEMS_ATTRIBUTE_NAME = "items"
const val VIRTUAL_ATTRIBUTE_NAME = "@vrt"


// How to add a new attribute:
//  1) add const here
//  2) add const to ALL_RELEVANT_ATTRIBUTES array
//  3) update graph-ql schema
//  4) implement Normalizer in de.smbonline.searchindexer.norm.impl
//  5) register Normalizer in de.smbonline.searchindexer.conf.NormalizerConfigurer
//  6) if attribute is of type "text", extend de.smbonline.searchindexer.api.ElasticSearchAPI#sortable (exclude or add to SORTABLE_TEXT_FIELDS)
//     else if attribute is of type object, add to de.smbonline.searchindexer.api.ElasticSearchAPI#OBJECT_FIELDS
//  7) to enable/disable autocomplete search suggestions, extend de.smbonline.searchindexer.api.ElasticSearchAPI#FULLTEXT_SUGGESTION_FIELDS and NO_SUGGESTION_FIELDS
//     check if de.smbonline.searchindexer.api.ElasticSearchAPI#suggestableField needs extension too
//  8) add test case for Normalizer
//  9) extend documentation: https://collaboration.xailabs.com/wiki/x/2ABjB

const val ACQUISITION_ATTRIBUTE = "acquisition"
const val ARCHIVE_CONTENT = "archiveContent"
const val ASSETS_ATTRIBUTE = "assets"
const val ASSORTMENTS_ATTRIBUTE = "assortments"
const val COLLECTION_ATTRIBUTE = "collection"
const val COLLECTION_KEY_ATTRIBUTE = "collectionKey"
const val COMPILATION_ATTRIBUTE = "compilation"
const val CREDIT_LINE_ATTRIBUTE = "creditLine"
const val CULTURAL_REFERENCES_ATTRIBUTE = "culturalReferences"
// TODO make this field type:object instead of type:date_range to bypass all the custom code related to that field
const val DATE_RANGE_ATTRIBUTE = "dateRange"
const val _ORIGINDATE = "@originDate" // not public, used internally as scalar dataRange value to allow sorting by date
const val DATING_ATTRIBUTE = "dating"
const val DESCRIPTION_ATTRIBUTE = "description"
const val DIMENSIONS_AND_WEIGHT_ATTRIBUTE = "dimensionsAndWeight"
const val EXHIBITIONS_ATTRIBUTE = "exhibitions"
const val EXHIBITION_SPACE_ATTRIBUTE = "exhibitionSpace"
const val FINDSPOT_ATTRIBUTE = "findSpot"
const val GEOGRAPHICAL_REFERENCES_ATTRIBUTE = "geographicalReferences"
const val HAS_ATTACHMENTS_ATTRIBUTE = "attachments";
const val ICONCLASS_ATTRIBUTE = "iconclasses"
const val ICONOGRAPHY_ATTRIBUTE = "iconography"
const val IDENT_NUMBER_ATTRIBUTE = "identNumber"
const val ID_ATTRIBUTE = "id"
const val INSCRIPTION_ATTRIBUTE = "inscriptions"
const val INVOLVED_PARTIES_ATTRIBUTE = "involvedParties"
const val IS_EXHIBIT_ATTRIBUTE = "exhibit"
const val IS_HIGHLIGHT_ATTRIBUTE = "highlight"
const val KEYWORDS_ATTRIBUTE = "keywords"
const val LITERATURE_ATTRIBUTE = "literature"
const val LOCATION_ATTRIBUTE = "location"
const val MATERIAL_AND_TECHNIQUE_ATTRIBUTE = "materialAndTechnique"
const val PROVENANCE_ATTRIBUTE = "provenance"
const val PROVENANCE_EVALUATION_ATTRIBUTE = "provenanceEvaluation"
const val SIGNATURES_ATTRIBUTE = "signatures"
const val TECHNICAL_TERM_ATTRIBUTE = "technicalTerm"
const val TITLES_ATTRIBUTE = "titles"
const val TITLE_ATTRIBUTE = "title"

const val FORMATTED_VALUE_ATTRIBUTE = "formatted"
const val MARKUP_VALUE_ATTRIBUTE = "markup"

/*const*/ val ALL_RELEVANT_ATTRIBUTES = arrayOf(
        ACQUISITION_ATTRIBUTE,
        ARCHIVE_CONTENT,
        ASSETS_ATTRIBUTE,
        ASSORTMENTS_ATTRIBUTE,
        COLLECTION_ATTRIBUTE, COLLECTION_KEY_ATTRIBUTE, COMPILATION_ATTRIBUTE, CREDIT_LINE_ATTRIBUTE,
        CULTURAL_REFERENCES_ATTRIBUTE,
        DATE_RANGE_ATTRIBUTE, DATING_ATTRIBUTE, DESCRIPTION_ATTRIBUTE, DIMENSIONS_AND_WEIGHT_ATTRIBUTE,
        EXHIBITIONS_ATTRIBUTE,
        EXHIBITION_SPACE_ATTRIBUTE,
        FINDSPOT_ATTRIBUTE,
        GEOGRAPHICAL_REFERENCES_ATTRIBUTE,
        HAS_ATTACHMENTS_ATTRIBUTE,
        ICONCLASS_ATTRIBUTE, ICONOGRAPHY_ATTRIBUTE, ID_ATTRIBUTE, IDENT_NUMBER_ATTRIBUTE, INSCRIPTION_ATTRIBUTE, INVOLVED_PARTIES_ATTRIBUTE,
        IS_EXHIBIT_ATTRIBUTE, IS_HIGHLIGHT_ATTRIBUTE,
        KEYWORDS_ATTRIBUTE,
        LITERATURE_ATTRIBUTE, LOCATION_ATTRIBUTE,
        MATERIAL_AND_TECHNIQUE_ATTRIBUTE,
        PROVENANCE_ATTRIBUTE, PROVENANCE_EVALUATION_ATTRIBUTE,
        SIGNATURES_ATTRIBUTE,
        TECHNICAL_TERM_ATTRIBUTE, TITLE_ATTRIBUTE, TITLES_ATTRIBUTE
)