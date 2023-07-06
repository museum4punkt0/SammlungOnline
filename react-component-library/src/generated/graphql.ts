export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  timestamptz: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  IndexModulesDynamicZoneInput: any;
  SmbLandingpageModuleDynamicZoneInput: any;
  SmbSiteConfigLegalPagesDynamicZoneInput: any;
  StoryModulesDynamicZoneInput: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "smb.assortments" */
  smb_assortments: Array<SmbAssortments>;
  /** fetch data from the table: "smb.assortments_translation" */
  smb_assortments_translation: Array<SmbAssortmentsTranslation>;
  /** fetch data from the table: "smb.attachments" */
  smb_attachments: Array<SmbAttachments>;
  /** fetch data from the table: "smb.attribute_translations" */
  smb_attribute_translations: Array<SmbAttributeTranslations>;
  /** fetch data from the table: "smb.attributes" */
  smb_attributes: Array<SmbAttributes>;
  /** fetch data from the table: "smb.attributes" using primary key columns */
  smb_attributes_by_pk?: Maybe<SmbAttributes>;
  /** fetch data from the table: "smb.buildings" */
  smb_buildings: Array<SmbBuildings>;
  /** fetch data from the table: "smb.buildings" using primary key columns */
  smb_buildings_by_pk?: Maybe<SmbBuildings>;
  /** fetch data from the table: "smb.collections" */
  smb_collections: Array<SmbCollections>;
  /** fetch data from the table: "smb.collections" using primary key columns */
  smb_collections_by_pk?: Maybe<SmbCollections>;
  /** fetch data from the table: "smb.cultural_references" */
  smb_cultural_references: Array<SmbCulturalReferences>;
  /** fetch data from the table: "smb.exhibitions" */
  smb_exhibitions: Array<SmbExhibitions>;
  /** fetch data from the table: "smb.geographical_references" */
  smb_geographical_references: Array<SmbGeographicalReferences>;
  /** fetch data from the table: "smb.highlights" */
  smb_highlights: Array<SmbHighlights>;
  /** fetch aggregated fields from the table: "smb.highlights" */
  smb_highlights_aggregate: SmbHighlightsAggregate;
  /** fetch data from the table: "smb.language" */
  smb_language: Array<SmbLanguage>;
  /** fetch data from the table: "smb.licenses" */
  smb_licenses: Array<SmbLicenses>;
  /** fetch data from the table: "smb.licenses_translation" */
  smb_licenses_translation: Array<SmbLicensesTranslation>;
  /** fetch data from the table: "smb.material_references" */
  smb_material_references: Array<SmbMaterialReferences>;
  /** fetch data from the table: "smb.objects" */
  smb_objects: Array<SmbObjects>;
  /** fetch aggregated fields from the table: "smb.objects" */
  smb_objects_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.objects" using primary key columns */
  smb_objects_by_pk?: Maybe<SmbObjects>;
  /** fetch data from the table: "smb.org_unit" */
  smb_org_unit: Array<SmbOrgUnit>;
  /** fetch data from the table: "smb.persons" */
  smb_persons: Array<SmbPersons>;
  /** fetch data from the table: "smb.persons_objects" */
  smb_persons_objects: Array<SmbPersonsObjects>;
  /** fetch data from the table: "smb.stt_platform_config" */
  smb_stt_platform_config: Array<SmbSttPlatformConfig>;
  /** fetch data from the table: "smb.thesaurus" */
  smb_thesaurus: Array<SmbThesaurus>;
  /** fetch data from the table: "smb.thesaurus_translations" */
  smb_thesaurus_translations: Array<SmbThesaurusTranslations>;
  /** fetch data from the table: "smb.user" */
  smb_user: Array<SmbUser>;
  strapi_hbf?: Maybe<StrapiHbfQuery>;
  strapi_isl?: Maybe<StrapiIslQuery>;
  strapi_kgm?: Maybe<StrapiKgmQuery>;
  strapi_smb?: Maybe<StrapiSmbQuery>;
};


export type QueryRootSmbAssortmentsArgs = {
  distinct_on?: InputMaybe<Array<SmbAssortmentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAssortmentsOrderBy>>;
  where?: InputMaybe<SmbAssortmentsBoolExp>;
};


export type QueryRootSmbAssortmentsTranslationArgs = {
  distinct_on?: InputMaybe<Array<SmbAssortmentsTranslationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAssortmentsTranslationOrderBy>>;
  where?: InputMaybe<SmbAssortmentsTranslationBoolExp>;
};


export type QueryRootSmbAttachmentsArgs = {
  distinct_on?: InputMaybe<Array<SmbAttachmentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttachmentsOrderBy>>;
  where?: InputMaybe<SmbAttachmentsBoolExp>;
};


export type QueryRootSmbAttributeTranslationsArgs = {
  distinct_on?: InputMaybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: InputMaybe<SmbAttributeTranslationsBoolExp>;
};


export type QueryRootSmbAttributesArgs = {
  distinct_on?: InputMaybe<Array<SmbAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttributesOrderBy>>;
  where?: InputMaybe<SmbAttributesBoolExp>;
};


export type QueryRootSmbAttributesByPkArgs = {
  key: Scalars['String'];
};


export type QueryRootSmbBuildingsArgs = {
  distinct_on?: InputMaybe<Array<SmbBuildingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbBuildingsOrderBy>>;
  where?: InputMaybe<SmbBuildingsBoolExp>;
};


export type QueryRootSmbBuildingsByPkArgs = {
  key: Scalars['String'];
};


export type QueryRootSmbCollectionsArgs = {
  distinct_on?: InputMaybe<Array<SmbCollectionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbCollectionsOrderBy>>;
  where?: InputMaybe<SmbCollectionsBoolExp>;
};


export type QueryRootSmbCollectionsByPkArgs = {
  key: Scalars['String'];
};


export type QueryRootSmbCulturalReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbCulturalReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbCulturalReferencesOrderBy>>;
  where?: InputMaybe<SmbCulturalReferencesBoolExp>;
};


export type QueryRootSmbExhibitionsArgs = {
  distinct_on?: InputMaybe<Array<SmbExhibitionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbExhibitionsOrderBy>>;
  where?: InputMaybe<SmbExhibitionsBoolExp>;
};


export type QueryRootSmbGeographicalReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbGeographicalReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbGeographicalReferencesOrderBy>>;
  where?: InputMaybe<SmbGeographicalReferencesBoolExp>;
};


export type QueryRootSmbHighlightsArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


export type QueryRootSmbHighlightsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


export type QueryRootSmbLanguageArgs = {
  distinct_on?: InputMaybe<Array<SmbLanguageSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLanguageOrderBy>>;
  where?: InputMaybe<SmbLanguageBoolExp>;
};


export type QueryRootSmbLicensesArgs = {
  distinct_on?: InputMaybe<Array<SmbLicensesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLicensesOrderBy>>;
  where?: InputMaybe<SmbLicensesBoolExp>;
};


export type QueryRootSmbLicensesTranslationArgs = {
  distinct_on?: InputMaybe<Array<SmbLicensesTranslationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLicensesTranslationOrderBy>>;
  where?: InputMaybe<SmbLicensesTranslationBoolExp>;
};


export type QueryRootSmbMaterialReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbMaterialReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbMaterialReferencesOrderBy>>;
  where?: InputMaybe<SmbMaterialReferencesBoolExp>;
};


export type QueryRootSmbObjectsArgs = {
  distinct_on?: InputMaybe<Array<SmbObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbObjectsOrderBy>>;
  where?: InputMaybe<SmbObjectsBoolExp>;
};


export type QueryRootSmbObjectsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SmbObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbObjectsOrderBy>>;
  where?: InputMaybe<SmbObjectsBoolExp>;
};


export type QueryRootSmbObjectsByPkArgs = {
  id: Scalars['bigint'];
};


export type QueryRootSmbOrgUnitArgs = {
  distinct_on?: InputMaybe<Array<SmbOrgUnitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbOrgUnitOrderBy>>;
  where?: InputMaybe<SmbOrgUnitBoolExp>;
};


export type QueryRootSmbPersonsArgs = {
  distinct_on?: InputMaybe<Array<SmbPersonsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbPersonsOrderBy>>;
  where?: InputMaybe<SmbPersonsBoolExp>;
};


export type QueryRootSmbPersonsObjectsArgs = {
  distinct_on?: InputMaybe<Array<SmbPersonsObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbPersonsObjectsOrderBy>>;
  where?: InputMaybe<SmbPersonsObjectsBoolExp>;
};


export type QueryRootSmbSttPlatformConfigArgs = {
  distinct_on?: InputMaybe<Array<SmbSttPlatformConfigSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbSttPlatformConfigOrderBy>>;
  where?: InputMaybe<SmbSttPlatformConfigBoolExp>;
};


export type QueryRootSmbThesaurusArgs = {
  distinct_on?: InputMaybe<Array<SmbThesaurusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbThesaurusOrderBy>>;
  where?: InputMaybe<SmbThesaurusBoolExp>;
};


export type QueryRootSmbThesaurusTranslationsArgs = {
  distinct_on?: InputMaybe<Array<SmbThesaurusTranslationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbThesaurusTranslationsOrderBy>>;
  where?: InputMaybe<SmbThesaurusTranslationsBoolExp>;
};


export type QueryRootSmbUserArgs = {
  distinct_on?: InputMaybe<Array<SmbUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbUserOrderBy>>;
  where?: InputMaybe<SmbUserBoolExp>;
};

/** select columns of table "smb.assortments" */
export enum SmbAssortmentsSelectColumn {
  /** column name */
  KEY = 'key',
  /** column name */
  PREVIEW_IMAGE = 'preview_image'
}

/** Ordering options when selecting data from "smb.assortments". */
export type SmbAssortmentsOrderBy = {
  i18n_aggregate?: InputMaybe<SmbAssortmentsTranslationAggregateOrderBy>;
  key?: InputMaybe<OrderBy>;
  preview_image?: InputMaybe<OrderBy>;
  searchValue?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.assortments_translation" */
export type SmbAssortmentsTranslationAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbAssortmentsTranslationMaxOrderBy>;
  min?: InputMaybe<SmbAssortmentsTranslationMinOrderBy>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  ASC = 'asc',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST = 'asc_nulls_first',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST = 'asc_nulls_last',
  /** in descending order, nulls first */
  DESC = 'desc',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST = 'desc_nulls_first',
  /** in descending order, nulls last */
  DESC_NULLS_LAST = 'desc_nulls_last'
}

/** order by max() on columns of table "smb.assortments_translation" */
export type SmbAssortmentsTranslationMaxOrderBy = {
  abstract?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  subtitle?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.assortments_translation" */
export type SmbAssortmentsTranslationMinOrderBy = {
  abstract?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  subtitle?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.assortments". All fields are combined with a logical 'AND'. */
export type SmbAssortmentsBoolExp = {
  _and?: InputMaybe<Array<SmbAssortmentsBoolExp>>;
  _not?: InputMaybe<SmbAssortmentsBoolExp>;
  _or?: InputMaybe<Array<SmbAssortmentsBoolExp>>;
  i18n?: InputMaybe<SmbAssortmentsTranslationBoolExp>;
  key?: InputMaybe<StringComparisonExp>;
  preview_image?: InputMaybe<StringComparisonExp>;
  searchValue?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to filter rows from the table "smb.assortments_translation". All fields are combined with a logical 'AND'. */
export type SmbAssortmentsTranslationBoolExp = {
  _and?: InputMaybe<Array<SmbAssortmentsTranslationBoolExp>>;
  _not?: InputMaybe<SmbAssortmentsTranslationBoolExp>;
  _or?: InputMaybe<Array<SmbAssortmentsTranslationBoolExp>>;
  abstract?: InputMaybe<StringComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  subtitle?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "smb.language". All fields are combined with a logical 'AND'. */
export type SmbLanguageBoolExp = {
  _and?: InputMaybe<Array<SmbLanguageBoolExp>>;
  _not?: InputMaybe<SmbLanguageBoolExp>;
  _or?: InputMaybe<Array<SmbLanguageBoolExp>>;
  lang?: InputMaybe<StringComparisonExp>;
};

/** search-collections */
export type SmbAssortments = {
  __typename?: 'smb_assortments';
  /** An array relationship */
  i18n: Array<SmbAssortmentsTranslation>;
  key: Scalars['String'];
  preview_image?: Maybe<Scalars['String']>;
  /** A computed field, executes function "smb.build_search_value_a" */
  searchValue?: Maybe<Scalars['String']>;
};


/** search-collections */
export type SmbAssortmentsI18nArgs = {
  distinct_on?: InputMaybe<Array<SmbAssortmentsTranslationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAssortmentsTranslationOrderBy>>;
  where?: InputMaybe<SmbAssortmentsTranslationBoolExp>;
};

/** select columns of table "smb.assortments_translation" */
export enum SmbAssortmentsTranslationSelectColumn {
  /** column name */
  ABSTRACT = 'abstract',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  SUBTITLE = 'subtitle',
  /** column name */
  TITLE = 'title'
}

/** Ordering options when selecting data from "smb.assortments_translation". */
export type SmbAssortmentsTranslationOrderBy = {
  abstract?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  language?: InputMaybe<SmbLanguageOrderBy>;
  subtitle?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "smb.language". */
export type SmbLanguageOrderBy = {
  lang?: InputMaybe<OrderBy>;
};

/** columns and relationships of "smb.assortments_translation" */
export type SmbAssortmentsTranslation = {
  __typename?: 'smb_assortments_translation';
  abstract?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** An object relationship */
  language: SmbLanguage;
  subtitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

/** Multilanguage support */
export type SmbLanguage = {
  __typename?: 'smb_language';
  lang: Scalars['String'];
};

/** select columns of table "smb.attachments" */
export enum SmbAttachmentsSelectColumn {
  /** column name */
  ATTACHMENT = 'attachment',
  /** column name */
  CREDITS = 'credits',
  /** column name */
  ID = 'id',
  /** column name */
  MEDIA_TYPE = 'media_type',
  /** column name */
  PRIMARY = 'primary'
}

/** Ordering options when selecting data from "smb.attachments". */
export type SmbAttachmentsOrderBy = {
  attachment?: InputMaybe<OrderBy>;
  credits?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  license?: InputMaybe<SmbLicensesOrderBy>;
  media_type?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  primary?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "smb.licenses". */
export type SmbLicensesOrderBy = {
  i18n_aggregate?: InputMaybe<SmbLicensesTranslationAggregateOrderBy>;
  key?: InputMaybe<OrderBy>;
  link?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.licenses_translation" */
export type SmbLicensesTranslationAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbLicensesTranslationMaxOrderBy>;
  min?: InputMaybe<SmbLicensesTranslationMinOrderBy>;
};

/** order by max() on columns of table "smb.licenses_translation" */
export type SmbLicensesTranslationMaxOrderBy = {
  content?: InputMaybe<OrderBy>;
  license_text?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.licenses_translation" */
export type SmbLicensesTranslationMinOrderBy = {
  content?: InputMaybe<OrderBy>;
  license_text?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.attachments". All fields are combined with a logical 'AND'. */
export type SmbAttachmentsBoolExp = {
  _and?: InputMaybe<Array<SmbAttachmentsBoolExp>>;
  _not?: InputMaybe<SmbAttachmentsBoolExp>;
  _or?: InputMaybe<Array<SmbAttachmentsBoolExp>>;
  attachment?: InputMaybe<StringComparisonExp>;
  credits?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<BigintComparisonExp>;
  license?: InputMaybe<SmbLicensesBoolExp>;
  media_type?: InputMaybe<StringComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  primary?: InputMaybe<BooleanComparisonExp>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to filter rows from the table "smb.licenses". All fields are combined with a logical 'AND'. */
export type SmbLicensesBoolExp = {
  _and?: InputMaybe<Array<SmbLicensesBoolExp>>;
  _not?: InputMaybe<SmbLicensesBoolExp>;
  _or?: InputMaybe<Array<SmbLicensesBoolExp>>;
  i18n?: InputMaybe<SmbLicensesTranslationBoolExp>;
  key?: InputMaybe<StringComparisonExp>;
  link?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to filter rows from the table "smb.licenses_translation". All fields are combined with a logical 'AND'. */
export type SmbLicensesTranslationBoolExp = {
  _and?: InputMaybe<Array<SmbLicensesTranslationBoolExp>>;
  _not?: InputMaybe<SmbLicensesTranslationBoolExp>;
  _or?: InputMaybe<Array<SmbLicensesTranslationBoolExp>>;
  content?: InputMaybe<StringComparisonExp>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  license_text?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Attachments of SMB objects fetched from MDS */
export type SmbAttachments = {
  __typename?: 'smb_attachments';
  attachment: Scalars['String'];
  credits?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
  /** An object relationship */
  license?: Maybe<SmbLicenses>;
  media_type?: Maybe<Scalars['String']>;
  /** A computed field, executes function "smb.get_attachment_filename" */
  name?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
};

/** License deeds for attachments */
export type SmbLicenses = {
  __typename?: 'smb_licenses';
  /** An array relationship */
  i18n: Array<SmbLicensesTranslation>;
  key: Scalars['String'];
  link?: Maybe<Scalars['String']>;
};


/** License deeds for attachments */
export type SmbLicensesI18nArgs = {
  distinct_on?: InputMaybe<Array<SmbLicensesTranslationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLicensesTranslationOrderBy>>;
  where?: InputMaybe<SmbLicensesTranslationBoolExp>;
};

/** select columns of table "smb.licenses_translation" */
export enum SmbLicensesTranslationSelectColumn {
  /** column name */
  CONTENT = 'content',
  /** column name */
  LICENSE_TEXT = 'license_text'
}

/** Ordering options when selecting data from "smb.licenses_translation". */
export type SmbLicensesTranslationOrderBy = {
  content?: InputMaybe<OrderBy>;
  language?: InputMaybe<SmbLanguageOrderBy>;
  license_text?: InputMaybe<OrderBy>;
};

/** columns and relationships of "smb.licenses_translation" */
export type SmbLicensesTranslation = {
  __typename?: 'smb_licenses_translation';
  content: Scalars['String'];
  /** An object relationship */
  language: SmbLanguage;
  license_text?: Maybe<Scalars['String']>;
};

/** select columns of table "smb.attribute_translations" */
export enum SmbAttributeTranslationsSelectColumn {
  /** column name */
  ATTRIBUTE_KEY = 'attribute_key',
  /** column name */
  VALUE = 'value'
}

/** Ordering options when selecting data from "smb.attribute_translations". */
export type SmbAttributeTranslationsOrderBy = {
  attribute?: InputMaybe<SmbAttributesOrderBy>;
  attribute_key?: InputMaybe<OrderBy>;
  language?: InputMaybe<SmbLanguageOrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "smb.attributes". */
export type SmbAttributesOrderBy = {
  datatype?: InputMaybe<OrderBy>;
  key?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.attribute_translations". All fields are combined with a logical 'AND'. */
export type SmbAttributeTranslationsBoolExp = {
  _and?: InputMaybe<Array<SmbAttributeTranslationsBoolExp>>;
  _not?: InputMaybe<SmbAttributeTranslationsBoolExp>;
  _or?: InputMaybe<Array<SmbAttributeTranslationsBoolExp>>;
  attribute?: InputMaybe<SmbAttributesBoolExp>;
  attribute_key?: InputMaybe<StringComparisonExp>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to filter rows from the table "smb.attributes". All fields are combined with a logical 'AND'. */
export type SmbAttributesBoolExp = {
  _and?: InputMaybe<Array<SmbAttributesBoolExp>>;
  _not?: InputMaybe<SmbAttributesBoolExp>;
  _or?: InputMaybe<Array<SmbAttributesBoolExp>>;
  datatype?: InputMaybe<StringComparisonExp>;
  key?: InputMaybe<StringComparisonExp>;
};

/** Attribute values of SMB objects */
export type SmbAttributeTranslations = {
  __typename?: 'smb_attribute_translations';
  /** An object relationship */
  attribute: SmbAttributes;
  attribute_key: Scalars['String'];
  /** An object relationship */
  language: SmbLanguage;
  value?: Maybe<Scalars['String']>;
};

/** Attributes fetched from MDS */
export type SmbAttributes = {
  __typename?: 'smb_attributes';
  datatype: Scalars['String'];
  key: Scalars['String'];
};

/** select columns of table "smb.attributes" */
export enum SmbAttributesSelectColumn {
  /** column name */
  DATATYPE = 'datatype',
  /** column name */
  KEY = 'key'
}

/** select columns of table "smb.buildings" */
export enum SmbBuildingsSelectColumn {
  /** column name */
  KEY = 'key',
  /** column name */
  TITLE = 'title'
}

/** Ordering options when selecting data from "smb.buildings". */
export type SmbBuildingsOrderBy = {
  key?: InputMaybe<OrderBy>;
  searchValue?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.buildings". All fields are combined with a logical 'AND'. */
export type SmbBuildingsBoolExp = {
  _and?: InputMaybe<Array<SmbBuildingsBoolExp>>;
  _not?: InputMaybe<SmbBuildingsBoolExp>;
  _or?: InputMaybe<Array<SmbBuildingsBoolExp>>;
  key?: InputMaybe<StringComparisonExp>;
  searchValue?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** List of all Museum buildings */
export type SmbBuildings = {
  __typename?: 'smb_buildings';
  key: Scalars['String'];
  /** A computed field, executes function "smb.build_search_value_b" */
  searchValue?: Maybe<Scalars['String']>;
  /** Display title used for all languages */
  title: Scalars['String'];
};

/** select columns of table "smb.collections" */
export enum SmbCollectionsSelectColumn {
  /** column name */
  KEY = 'key',
  /** column name */
  TITLE = 'title',
  /** column name */
  TYPE = 'type'
}

/** Ordering options when selecting data from "smb.collections". */
export type SmbCollectionsOrderBy = {
  key?: InputMaybe<OrderBy>;
  searchValue?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.collections". All fields are combined with a logical 'AND'. */
export type SmbCollectionsBoolExp = {
  _and?: InputMaybe<Array<SmbCollectionsBoolExp>>;
  _not?: InputMaybe<SmbCollectionsBoolExp>;
  _or?: InputMaybe<Array<SmbCollectionsBoolExp>>;
  key?: InputMaybe<StringComparisonExp>;
  searchValue?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  type?: InputMaybe<StringComparisonExp>;
};

/** Enum type definition of MDS collection keys */
export type SmbCollections = {
  __typename?: 'smb_collections';
  key: Scalars['String'];
  /** A computed field, executes function "smb.build_search_value_c" */
  searchValue?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

/** select columns of table "smb.cultural_references" */
export enum SmbCulturalReferencesSelectColumn {
  /** column name */
  SEQUENCE = 'sequence'
}

/** Ordering options when selecting data from "smb.cultural_references". */
export type SmbCulturalReferencesOrderBy = {
  denomination_voc?: InputMaybe<SmbThesaurusOrderBy>;
  language?: InputMaybe<SmbLanguageOrderBy>;
  name_voc?: InputMaybe<SmbThesaurusOrderBy>;
  sequence?: InputMaybe<OrderBy>;
  type_voc?: InputMaybe<SmbThesaurusOrderBy>;
};

/** Ordering options when selecting data from "smb.thesaurus". */
export type SmbThesaurusOrderBy = {
  i18n_aggregate?: InputMaybe<SmbThesaurusTranslationsAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  parent_aggregate?: InputMaybe<SmbThesaurusAggregateOrderBy>;
};

/** order by aggregate values of table "smb.thesaurus_translations" */
export type SmbThesaurusTranslationsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbThesaurusTranslationsMaxOrderBy>;
  min?: InputMaybe<SmbThesaurusTranslationsMinOrderBy>;
};

/** order by max() on columns of table "smb.thesaurus_translations" */
export type SmbThesaurusTranslationsMaxOrderBy = {
  value?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.thesaurus_translations" */
export type SmbThesaurusTranslationsMinOrderBy = {
  value?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.thesaurus" */
export type SmbThesaurusAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbThesaurusMaxOrderBy>;
  min?: InputMaybe<SmbThesaurusMinOrderBy>;
};

/** order by max() on columns of table "smb.thesaurus" */
export type SmbThesaurusMaxOrderBy = {
  name?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.thesaurus" */
export type SmbThesaurusMinOrderBy = {
  name?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.cultural_references". All fields are combined with a logical 'AND'. */
export type SmbCulturalReferencesBoolExp = {
  _and?: InputMaybe<Array<SmbCulturalReferencesBoolExp>>;
  _not?: InputMaybe<SmbCulturalReferencesBoolExp>;
  _or?: InputMaybe<Array<SmbCulturalReferencesBoolExp>>;
  denomination_voc?: InputMaybe<SmbThesaurusBoolExp>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  name_voc?: InputMaybe<SmbThesaurusBoolExp>;
  sequence?: InputMaybe<IntComparisonExp>;
  type_voc?: InputMaybe<SmbThesaurusBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.thesaurus". All fields are combined with a logical 'AND'. */
export type SmbThesaurusBoolExp = {
  _and?: InputMaybe<Array<SmbThesaurusBoolExp>>;
  _not?: InputMaybe<SmbThesaurusBoolExp>;
  _or?: InputMaybe<Array<SmbThesaurusBoolExp>>;
  i18n?: InputMaybe<SmbThesaurusTranslationsBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
  parent?: InputMaybe<SmbThesaurusBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.thesaurus_translations". All fields are combined with a logical 'AND'. */
export type SmbThesaurusTranslationsBoolExp = {
  _and?: InputMaybe<Array<SmbThesaurusTranslationsBoolExp>>;
  _not?: InputMaybe<SmbThesaurusTranslationsBoolExp>;
  _or?: InputMaybe<Array<SmbThesaurusTranslationsBoolExp>>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  thesaurus?: InputMaybe<SmbThesaurusBoolExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** cultural references collected from repeatable group items */
export type SmbCulturalReferences = {
  __typename?: 'smb_cultural_references';
  /** An object relationship */
  denomination_voc?: Maybe<SmbThesaurus>;
  /** An object relationship */
  language: SmbLanguage;
  /** An object relationship */
  name_voc?: Maybe<SmbThesaurus>;
  sequence: Scalars['Int'];
  /** An object relationship */
  type_voc?: Maybe<SmbThesaurus>;
};

/** thesaurus */
export type SmbThesaurus = {
  __typename?: 'smb_thesaurus';
  /** An array relationship */
  i18n: Array<SmbThesaurusTranslations>;
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  parent: Array<SmbThesaurus>;
};


/** thesaurus */
export type SmbThesaurusI18nArgs = {
  distinct_on?: InputMaybe<Array<SmbThesaurusTranslationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbThesaurusTranslationsOrderBy>>;
  where?: InputMaybe<SmbThesaurusTranslationsBoolExp>;
};


/** thesaurus */
export type SmbThesaurusParentArgs = {
  distinct_on?: InputMaybe<Array<SmbThesaurusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbThesaurusOrderBy>>;
  where?: InputMaybe<SmbThesaurusBoolExp>;
};

/** select columns of table "smb.thesaurus_translations" */
export enum SmbThesaurusTranslationsSelectColumn {
  /** column name */
  VALUE = 'value'
}

/** Ordering options when selecting data from "smb.thesaurus_translations". */
export type SmbThesaurusTranslationsOrderBy = {
  language?: InputMaybe<SmbLanguageOrderBy>;
  thesaurus?: InputMaybe<SmbThesaurusOrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** language specific display values for thesaurus entries */
export type SmbThesaurusTranslations = {
  __typename?: 'smb_thesaurus_translations';
  /** An object relationship */
  language: SmbLanguage;
  /** An object relationship */
  thesaurus: SmbThesaurus;
  value?: Maybe<Scalars['String']>;
};

/** select columns of table "smb.thesaurus" */
export enum SmbThesaurusSelectColumn {
  /** column name */
  NAME = 'name'
}

/** select columns of table "smb.exhibitions" */
export enum SmbExhibitionsSelectColumn {
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  END_DATE = 'end_date',
  /** column name */
  LOCATION = 'location',
  /** column name */
  START_DATE = 'start_date',
  /** column name */
  TITLE = 'title'
}

/** Ordering options when selecting data from "smb.exhibitions". */
export type SmbExhibitionsOrderBy = {
  description?: InputMaybe<OrderBy>;
  end_date?: InputMaybe<OrderBy>;
  location?: InputMaybe<OrderBy>;
  start_date?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.exhibitions". All fields are combined with a logical 'AND'. */
export type SmbExhibitionsBoolExp = {
  _and?: InputMaybe<Array<SmbExhibitionsBoolExp>>;
  _not?: InputMaybe<SmbExhibitionsBoolExp>;
  _or?: InputMaybe<Array<SmbExhibitionsBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  end_date?: InputMaybe<StringComparisonExp>;
  location?: InputMaybe<StringComparisonExp>;
  start_date?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** exhibitions */
export type SmbExhibitions = {
  __typename?: 'smb_exhibitions';
  description?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** select columns of table "smb.geographical_references" */
export enum SmbGeographicalReferencesSelectColumn {
  /** column name */
  DETAILS = 'details',
  /** column name */
  SEQUENCE = 'sequence'
}

/** Ordering options when selecting data from "smb.geographical_references". */
export type SmbGeographicalReferencesOrderBy = {
  details?: InputMaybe<OrderBy>;
  geopol_voc?: InputMaybe<SmbThesaurusOrderBy>;
  language?: InputMaybe<SmbLanguageOrderBy>;
  place_voc?: InputMaybe<SmbThesaurusOrderBy>;
  sequence?: InputMaybe<OrderBy>;
  type_voc?: InputMaybe<SmbThesaurusOrderBy>;
};

/** Boolean expression to filter rows from the table "smb.geographical_references". All fields are combined with a logical 'AND'. */
export type SmbGeographicalReferencesBoolExp = {
  _and?: InputMaybe<Array<SmbGeographicalReferencesBoolExp>>;
  _not?: InputMaybe<SmbGeographicalReferencesBoolExp>;
  _or?: InputMaybe<Array<SmbGeographicalReferencesBoolExp>>;
  details?: InputMaybe<StringComparisonExp>;
  geopol_voc?: InputMaybe<SmbThesaurusBoolExp>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  place_voc?: InputMaybe<SmbThesaurusBoolExp>;
  sequence?: InputMaybe<IntComparisonExp>;
  type_voc?: InputMaybe<SmbThesaurusBoolExp>;
};

/** geographic locations collected from repeatable group items */
export type SmbGeographicalReferences = {
  __typename?: 'smb_geographical_references';
  details?: Maybe<Scalars['String']>;
  /** An object relationship */
  geopol_voc?: Maybe<SmbThesaurus>;
  /** An object relationship */
  language: SmbLanguage;
  /** An object relationship */
  place_voc?: Maybe<SmbThesaurus>;
  sequence: Scalars['Int'];
  /** An object relationship */
  type_voc?: Maybe<SmbThesaurus>;
};

/** select columns of table "smb.highlights" */
export enum SmbHighlightsSelectColumn {
  /** column name */
  OBJECT_ID = 'object_id'
}

/** Ordering options when selecting data from "smb.highlights". */
export type SmbHighlightsOrderBy = {
  object?: InputMaybe<SmbObjectsOrderBy>;
  object_id?: InputMaybe<OrderBy>;
  org_unit?: InputMaybe<SmbOrgUnitOrderBy>;
};

/** Ordering options when selecting data from "smb.objects". */
export type SmbObjectsOrderBy = {
  attachments_aggregate?: InputMaybe<SmbAttachmentsAggregateOrderBy>;
  attributes_aggregate?: InputMaybe<SmbAttributeTranslationsAggregateOrderBy>;
  collectionKey?: InputMaybe<OrderBy>;
  compilation?: InputMaybe<OrderBy>;
  cultural_references_aggregate?: InputMaybe<SmbCulturalReferencesAggregateOrderBy>;
  exhibition_space?: InputMaybe<OrderBy>;
  geographical_references_aggregate?: InputMaybe<SmbGeographicalReferencesAggregateOrderBy>;
  highlights_aggregate?: InputMaybe<SmbHighlightsAggregateOrderBy>;
  id?: InputMaybe<OrderBy>;
  involved_parties_aggregate?: InputMaybe<SmbPersonsObjectsAggregateOrderBy>;
  location?: InputMaybe<SmbThesaurusOrderBy>;
  materials_and_techniques_aggregate?: InputMaybe<SmbMaterialReferencesAggregateOrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.attachments" */
export type SmbAttachmentsAggregateOrderBy = {
  avg?: InputMaybe<SmbAttachmentsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbAttachmentsMaxOrderBy>;
  min?: InputMaybe<SmbAttachmentsMinOrderBy>;
  stddev?: InputMaybe<SmbAttachmentsStddevOrderBy>;
  stddev_pop?: InputMaybe<SmbAttachmentsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SmbAttachmentsStddevSampOrderBy>;
  sum?: InputMaybe<SmbAttachmentsSumOrderBy>;
  var_pop?: InputMaybe<SmbAttachmentsVarPopOrderBy>;
  var_samp?: InputMaybe<SmbAttachmentsVarSampOrderBy>;
  variance?: InputMaybe<SmbAttachmentsVarianceOrderBy>;
};

/** order by avg() on columns of table "smb.attachments" */
export type SmbAttachmentsAvgOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "smb.attachments" */
export type SmbAttachmentsMaxOrderBy = {
  attachment?: InputMaybe<OrderBy>;
  credits?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  media_type?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.attachments" */
export type SmbAttachmentsMinOrderBy = {
  attachment?: InputMaybe<OrderBy>;
  credits?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  media_type?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "smb.attachments" */
export type SmbAttachmentsStddevOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "smb.attachments" */
export type SmbAttachmentsStddevPopOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "smb.attachments" */
export type SmbAttachmentsStddevSampOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "smb.attachments" */
export type SmbAttachmentsSumOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "smb.attachments" */
export type SmbAttachmentsVarPopOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "smb.attachments" */
export type SmbAttachmentsVarSampOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "smb.attachments" */
export type SmbAttachmentsVarianceOrderBy = {
  id?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.attribute_translations" */
export type SmbAttributeTranslationsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbAttributeTranslationsMaxOrderBy>;
  min?: InputMaybe<SmbAttributeTranslationsMinOrderBy>;
};

/** order by max() on columns of table "smb.attribute_translations" */
export type SmbAttributeTranslationsMaxOrderBy = {
  attribute_key?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.attribute_translations" */
export type SmbAttributeTranslationsMinOrderBy = {
  attribute_key?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.cultural_references" */
export type SmbCulturalReferencesAggregateOrderBy = {
  avg?: InputMaybe<SmbCulturalReferencesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbCulturalReferencesMaxOrderBy>;
  min?: InputMaybe<SmbCulturalReferencesMinOrderBy>;
  stddev?: InputMaybe<SmbCulturalReferencesStddevOrderBy>;
  stddev_pop?: InputMaybe<SmbCulturalReferencesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SmbCulturalReferencesStddevSampOrderBy>;
  sum?: InputMaybe<SmbCulturalReferencesSumOrderBy>;
  var_pop?: InputMaybe<SmbCulturalReferencesVarPopOrderBy>;
  var_samp?: InputMaybe<SmbCulturalReferencesVarSampOrderBy>;
  variance?: InputMaybe<SmbCulturalReferencesVarianceOrderBy>;
};

/** order by avg() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesAvgOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesMaxOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesMinOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesStddevOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesStddevPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesStddevSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesSumOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesVarPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesVarSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "smb.cultural_references" */
export type SmbCulturalReferencesVarianceOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.geographical_references" */
export type SmbGeographicalReferencesAggregateOrderBy = {
  avg?: InputMaybe<SmbGeographicalReferencesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbGeographicalReferencesMaxOrderBy>;
  min?: InputMaybe<SmbGeographicalReferencesMinOrderBy>;
  stddev?: InputMaybe<SmbGeographicalReferencesStddevOrderBy>;
  stddev_pop?: InputMaybe<SmbGeographicalReferencesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SmbGeographicalReferencesStddevSampOrderBy>;
  sum?: InputMaybe<SmbGeographicalReferencesSumOrderBy>;
  var_pop?: InputMaybe<SmbGeographicalReferencesVarPopOrderBy>;
  var_samp?: InputMaybe<SmbGeographicalReferencesVarSampOrderBy>;
  variance?: InputMaybe<SmbGeographicalReferencesVarianceOrderBy>;
};

/** order by avg() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesAvgOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesMaxOrderBy = {
  details?: InputMaybe<OrderBy>;
  sequence?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesMinOrderBy = {
  details?: InputMaybe<OrderBy>;
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesStddevOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesStddevPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesStddevSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesSumOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesVarPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesVarSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "smb.geographical_references" */
export type SmbGeographicalReferencesVarianceOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.highlights" */
export type SmbHighlightsAggregateOrderBy = {
  avg?: InputMaybe<SmbHighlightsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbHighlightsMaxOrderBy>;
  min?: InputMaybe<SmbHighlightsMinOrderBy>;
  stddev?: InputMaybe<SmbHighlightsStddevOrderBy>;
  stddev_pop?: InputMaybe<SmbHighlightsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SmbHighlightsStddevSampOrderBy>;
  sum?: InputMaybe<SmbHighlightsSumOrderBy>;
  var_pop?: InputMaybe<SmbHighlightsVarPopOrderBy>;
  var_samp?: InputMaybe<SmbHighlightsVarSampOrderBy>;
  variance?: InputMaybe<SmbHighlightsVarianceOrderBy>;
};

/** order by avg() on columns of table "smb.highlights" */
export type SmbHighlightsAvgOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "smb.highlights" */
export type SmbHighlightsMaxOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.highlights" */
export type SmbHighlightsMinOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "smb.highlights" */
export type SmbHighlightsStddevOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "smb.highlights" */
export type SmbHighlightsStddevPopOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "smb.highlights" */
export type SmbHighlightsStddevSampOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "smb.highlights" */
export type SmbHighlightsSumOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "smb.highlights" */
export type SmbHighlightsVarPopOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "smb.highlights" */
export type SmbHighlightsVarSampOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "smb.highlights" */
export type SmbHighlightsVarianceOrderBy = {
  object_id?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.persons_objects" */
export type SmbPersonsObjectsAggregateOrderBy = {
  avg?: InputMaybe<SmbPersonsObjectsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbPersonsObjectsMaxOrderBy>;
  min?: InputMaybe<SmbPersonsObjectsMinOrderBy>;
  stddev?: InputMaybe<SmbPersonsObjectsStddevOrderBy>;
  stddev_pop?: InputMaybe<SmbPersonsObjectsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SmbPersonsObjectsStddevSampOrderBy>;
  sum?: InputMaybe<SmbPersonsObjectsSumOrderBy>;
  var_pop?: InputMaybe<SmbPersonsObjectsVarPopOrderBy>;
  var_samp?: InputMaybe<SmbPersonsObjectsVarSampOrderBy>;
  variance?: InputMaybe<SmbPersonsObjectsVarianceOrderBy>;
};

/** order by avg() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsAvgOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsMaxOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsMinOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsStddevOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsStddevPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsStddevSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsSumOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsVarPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsVarSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "smb.persons_objects" */
export type SmbPersonsObjectsVarianceOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "smb.material_references" */
export type SmbMaterialReferencesAggregateOrderBy = {
  avg?: InputMaybe<SmbMaterialReferencesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmbMaterialReferencesMaxOrderBy>;
  min?: InputMaybe<SmbMaterialReferencesMinOrderBy>;
  stddev?: InputMaybe<SmbMaterialReferencesStddevOrderBy>;
  stddev_pop?: InputMaybe<SmbMaterialReferencesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SmbMaterialReferencesStddevSampOrderBy>;
  sum?: InputMaybe<SmbMaterialReferencesSumOrderBy>;
  var_pop?: InputMaybe<SmbMaterialReferencesVarPopOrderBy>;
  var_samp?: InputMaybe<SmbMaterialReferencesVarSampOrderBy>;
  variance?: InputMaybe<SmbMaterialReferencesVarianceOrderBy>;
};

/** order by avg() on columns of table "smb.material_references" */
export type SmbMaterialReferencesAvgOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "smb.material_references" */
export type SmbMaterialReferencesMaxOrderBy = {
  details?: InputMaybe<OrderBy>;
  sequence?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "smb.material_references" */
export type SmbMaterialReferencesMinOrderBy = {
  details?: InputMaybe<OrderBy>;
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "smb.material_references" */
export type SmbMaterialReferencesStddevOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "smb.material_references" */
export type SmbMaterialReferencesStddevPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "smb.material_references" */
export type SmbMaterialReferencesStddevSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "smb.material_references" */
export type SmbMaterialReferencesSumOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "smb.material_references" */
export type SmbMaterialReferencesVarPopOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "smb.material_references" */
export type SmbMaterialReferencesVarSampOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "smb.material_references" */
export type SmbMaterialReferencesVarianceOrderBy = {
  sequence?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "smb.org_unit". */
export type SmbOrgUnitOrderBy = {
  collectionKey?: InputMaybe<OrderBy>;
  highlights_aggregate?: InputMaybe<SmbHighlightsAggregateOrderBy>;
  is_compilation?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  searchValue?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.highlights". All fields are combined with a logical 'AND'. */
export type SmbHighlightsBoolExp = {
  _and?: InputMaybe<Array<SmbHighlightsBoolExp>>;
  _not?: InputMaybe<SmbHighlightsBoolExp>;
  _or?: InputMaybe<Array<SmbHighlightsBoolExp>>;
  object?: InputMaybe<SmbObjectsBoolExp>;
  object_id?: InputMaybe<BigintComparisonExp>;
  org_unit?: InputMaybe<SmbOrgUnitBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.objects". All fields are combined with a logical 'AND'. */
export type SmbObjectsBoolExp = {
  _and?: InputMaybe<Array<SmbObjectsBoolExp>>;
  _not?: InputMaybe<SmbObjectsBoolExp>;
  _or?: InputMaybe<Array<SmbObjectsBoolExp>>;
  attachments?: InputMaybe<SmbAttachmentsBoolExp>;
  attributes?: InputMaybe<SmbAttributeTranslationsBoolExp>;
  collectionKey?: InputMaybe<StringComparisonExp>;
  compilation?: InputMaybe<StringComparisonExp>;
  cultural_references?: InputMaybe<SmbCulturalReferencesBoolExp>;
  exhibition_space?: InputMaybe<StringComparisonExp>;
  geographical_references?: InputMaybe<SmbGeographicalReferencesBoolExp>;
  highlights?: InputMaybe<SmbHighlightsBoolExp>;
  highlights_aggregate?: InputMaybe<SmbHighlightsAggregateBoolExp>;
  id?: InputMaybe<BigintComparisonExp>;
  involved_parties?: InputMaybe<SmbPersonsObjectsBoolExp>;
  location?: InputMaybe<SmbThesaurusBoolExp>;
  materials_and_techniques?: InputMaybe<SmbMaterialReferencesBoolExp>;
  updated_at?: InputMaybe<TimestamptzComparisonExp>;
};

export type SmbHighlightsAggregateBoolExp = {
  count?: InputMaybe<SmbHighlightsAggregateBoolExpCount>;
};

export type SmbHighlightsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<SmbHighlightsBoolExp>;
  predicate: IntComparisonExp;
};

/** Boolean expression to filter rows from the table "smb.persons_objects". All fields are combined with a logical 'AND'. */
export type SmbPersonsObjectsBoolExp = {
  _and?: InputMaybe<Array<SmbPersonsObjectsBoolExp>>;
  _not?: InputMaybe<SmbPersonsObjectsBoolExp>;
  _or?: InputMaybe<Array<SmbPersonsObjectsBoolExp>>;
  attribution_voc?: InputMaybe<SmbThesaurusBoolExp>;
  object?: InputMaybe<SmbObjectsBoolExp>;
  person?: InputMaybe<SmbPersonsBoolExp>;
  role_voc?: InputMaybe<SmbThesaurusBoolExp>;
  sequence?: InputMaybe<IntComparisonExp>;
};

/** Boolean expression to filter rows from the table "smb.persons". All fields are combined with a logical 'AND'. */
export type SmbPersonsBoolExp = {
  _and?: InputMaybe<Array<SmbPersonsBoolExp>>;
  _not?: InputMaybe<SmbPersonsBoolExp>;
  _or?: InputMaybe<Array<SmbPersonsBoolExp>>;
  date_of_birth?: InputMaybe<StringComparisonExp>;
  date_of_death?: InputMaybe<StringComparisonExp>;
  date_range?: InputMaybe<StringComparisonExp>;
  involved_parties?: InputMaybe<SmbPersonsObjectsBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to filter rows from the table "smb.material_references". All fields are combined with a logical 'AND'. */
export type SmbMaterialReferencesBoolExp = {
  _and?: InputMaybe<Array<SmbMaterialReferencesBoolExp>>;
  _not?: InputMaybe<SmbMaterialReferencesBoolExp>;
  _or?: InputMaybe<Array<SmbMaterialReferencesBoolExp>>;
  details?: InputMaybe<StringComparisonExp>;
  language?: InputMaybe<SmbLanguageBoolExp>;
  sequence?: InputMaybe<IntComparisonExp>;
  specific_type_voc?: InputMaybe<SmbThesaurusBoolExp>;
  type_voc?: InputMaybe<SmbThesaurusBoolExp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to filter rows from the table "smb.org_unit". All fields are combined with a logical 'AND'. */
export type SmbOrgUnitBoolExp = {
  _and?: InputMaybe<Array<SmbOrgUnitBoolExp>>;
  _not?: InputMaybe<SmbOrgUnitBoolExp>;
  _or?: InputMaybe<Array<SmbOrgUnitBoolExp>>;
  collectionKey?: InputMaybe<StringComparisonExp>;
  highlights?: InputMaybe<SmbHighlightsBoolExp>;
  highlights_aggregate?: InputMaybe<SmbHighlightsAggregateBoolExp>;
  is_compilation?: InputMaybe<BooleanComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  searchValue?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
};

/** SMB highlight objects */
export type SmbHighlights = {
  __typename?: 'smb_highlights';
  /** An object relationship */
  object: SmbObjects;
  object_id: Scalars['bigint'];
  /** An object relationship */
  org_unit: SmbOrgUnit;
};

/** SMB objects fetched from MDS */
export type SmbObjects = {
  __typename?: 'smb_objects';
  /** An array relationship */
  attachments: Array<SmbAttachments>;
  /** An array relationship */
  attributes: Array<SmbAttributeTranslations>;
  collectionKey?: Maybe<Scalars['String']>;
  compilation?: Maybe<Scalars['String']>;
  /** An array relationship */
  cultural_references: Array<SmbCulturalReferences>;
  exhibition_space?: Maybe<Scalars['String']>;
  /** An array relationship */
  geographical_references: Array<SmbGeographicalReferences>;
  /** An array relationship */
  highlights: Array<SmbHighlights>;
  /** An aggregate relationship */
  highlights_aggregate: SmbHighlightsAggregate;
  id: Scalars['bigint'];
  /** An array relationship */
  involved_parties: Array<SmbPersonsObjects>;
  /** An object relationship */
  location?: Maybe<SmbThesaurus>;
  /** An array relationship */
  materials_and_techniques: Array<SmbMaterialReferences>;
  updated_at: Scalars['timestamptz'];
};


/** SMB objects fetched from MDS */
export type SmbObjectsAttachmentsArgs = {
  distinct_on?: InputMaybe<Array<SmbAttachmentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttachmentsOrderBy>>;
  where?: InputMaybe<SmbAttachmentsBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsAttributesArgs = {
  distinct_on?: InputMaybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: InputMaybe<SmbAttributeTranslationsBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsCulturalReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbCulturalReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbCulturalReferencesOrderBy>>;
  where?: InputMaybe<SmbCulturalReferencesBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsGeographicalReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbGeographicalReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbGeographicalReferencesOrderBy>>;
  where?: InputMaybe<SmbGeographicalReferencesBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsHighlightsArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsHighlightsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsInvolvedPartiesArgs = {
  distinct_on?: InputMaybe<Array<SmbPersonsObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbPersonsObjectsOrderBy>>;
  where?: InputMaybe<SmbPersonsObjectsBoolExp>;
};


/** SMB objects fetched from MDS */
export type SmbObjectsMaterialsAndTechniquesArgs = {
  distinct_on?: InputMaybe<Array<SmbMaterialReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbMaterialReferencesOrderBy>>;
  where?: InputMaybe<SmbMaterialReferencesBoolExp>;
};

/** aggregated selection of "smb.highlights" */
export type SmbHighlightsAggregate = {
  __typename?: 'smb_highlights_aggregate';
  aggregate?: Maybe<SmbHighlightsAggregateFields>;
  nodes: Array<SmbHighlights>;
};

/** aggregate fields of "smb.highlights" */
export type SmbHighlightsAggregateFields = {
  __typename?: 'smb_highlights_aggregate_fields';
  avg?: Maybe<SmbHighlightsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<SmbHighlightsMaxFields>;
  min?: Maybe<SmbHighlightsMinFields>;
  stddev?: Maybe<SmbHighlightsStddevFields>;
  stddev_pop?: Maybe<SmbHighlightsStddevPopFields>;
  stddev_samp?: Maybe<SmbHighlightsStddevSampFields>;
  sum?: Maybe<SmbHighlightsSumFields>;
  var_pop?: Maybe<SmbHighlightsVarPopFields>;
  var_samp?: Maybe<SmbHighlightsVarSampFields>;
  variance?: Maybe<SmbHighlightsVarianceFields>;
};


/** aggregate fields of "smb.highlights" */
export type SmbHighlightsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type SmbHighlightsAvgFields = {
  __typename?: 'smb_highlights_avg_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type SmbHighlightsMaxFields = {
  __typename?: 'smb_highlights_max_fields';
  object_id?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type SmbHighlightsMinFields = {
  __typename?: 'smb_highlights_min_fields';
  object_id?: Maybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type SmbHighlightsStddevFields = {
  __typename?: 'smb_highlights_stddev_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type SmbHighlightsStddevPopFields = {
  __typename?: 'smb_highlights_stddev_pop_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type SmbHighlightsStddevSampFields = {
  __typename?: 'smb_highlights_stddev_samp_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type SmbHighlightsSumFields = {
  __typename?: 'smb_highlights_sum_fields';
  object_id?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type SmbHighlightsVarPopFields = {
  __typename?: 'smb_highlights_var_pop_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type SmbHighlightsVarSampFields = {
  __typename?: 'smb_highlights_var_samp_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type SmbHighlightsVarianceFields = {
  __typename?: 'smb_highlights_variance_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** select columns of table "smb.persons_objects" */
export enum SmbPersonsObjectsSelectColumn {
  /** column name */
  SEQUENCE = 'sequence'
}

/** Ordering options when selecting data from "smb.persons_objects". */
export type SmbPersonsObjectsOrderBy = {
  attribution_voc?: InputMaybe<SmbThesaurusOrderBy>;
  object?: InputMaybe<SmbObjectsOrderBy>;
  person?: InputMaybe<SmbPersonsOrderBy>;
  role_voc?: InputMaybe<SmbThesaurusOrderBy>;
  sequence?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "smb.persons". */
export type SmbPersonsOrderBy = {
  date_of_birth?: InputMaybe<OrderBy>;
  date_of_death?: InputMaybe<OrderBy>;
  date_range?: InputMaybe<OrderBy>;
  involved_parties_aggregate?: InputMaybe<SmbPersonsObjectsAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
};

/** involved parties; persons who are stakeholders on objects */
export type SmbPersonsObjects = {
  __typename?: 'smb_persons_objects';
  /** An object relationship */
  attribution_voc?: Maybe<SmbThesaurus>;
  /** An object relationship */
  object: SmbObjects;
  /** An object relationship */
  person: SmbPersons;
  /** An object relationship */
  role_voc?: Maybe<SmbThesaurus>;
  sequence: Scalars['Int'];
};

/** persons */
export type SmbPersons = {
  __typename?: 'smb_persons';
  date_of_birth?: Maybe<Scalars['String']>;
  date_of_death?: Maybe<Scalars['String']>;
  date_range?: Maybe<Scalars['String']>;
  /** An array relationship */
  involved_parties: Array<SmbPersonsObjects>;
  name?: Maybe<Scalars['String']>;
};


/** persons */
export type SmbPersonsInvolvedPartiesArgs = {
  distinct_on?: InputMaybe<Array<SmbPersonsObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbPersonsObjectsOrderBy>>;
  where?: InputMaybe<SmbPersonsObjectsBoolExp>;
};

/** select columns of table "smb.material_references" */
export enum SmbMaterialReferencesSelectColumn {
  /** column name */
  DETAILS = 'details',
  /** column name */
  SEQUENCE = 'sequence'
}

/** Ordering options when selecting data from "smb.material_references". */
export type SmbMaterialReferencesOrderBy = {
  details?: InputMaybe<OrderBy>;
  language?: InputMaybe<SmbLanguageOrderBy>;
  sequence?: InputMaybe<OrderBy>;
  specific_type_voc?: InputMaybe<SmbThesaurusOrderBy>;
  type_voc?: InputMaybe<SmbThesaurusOrderBy>;
};

/** materials and techniques collected from repeatable group items */
export type SmbMaterialReferences = {
  __typename?: 'smb_material_references';
  details?: Maybe<Scalars['String']>;
  /** An object relationship */
  language: SmbLanguage;
  sequence: Scalars['Int'];
  /** An object relationship */
  specific_type_voc?: Maybe<SmbThesaurus>;
  /** An object relationship */
  type_voc?: Maybe<SmbThesaurus>;
};

/** Org-units fetched from MDS, used to group SMB objects */
export type SmbOrgUnit = {
  __typename?: 'smb_org_unit';
  collectionKey?: Maybe<Scalars['String']>;
  /** An array relationship */
  highlights: Array<SmbHighlights>;
  /** An aggregate relationship */
  highlights_aggregate: SmbHighlightsAggregate;
  is_compilation?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  /** A computed field, executes function "smb.build_search_value_o" */
  searchValue?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


/** Org-units fetched from MDS, used to group SMB objects */
export type SmbOrgUnitHighlightsArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


/** Org-units fetched from MDS, used to group SMB objects */
export type SmbOrgUnitHighlightsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};

/** select columns of table "smb.language" */
export enum SmbLanguageSelectColumn {
  /** column name */
  LANG = 'lang'
}

/** select columns of table "smb.licenses" */
export enum SmbLicensesSelectColumn {
  /** column name */
  KEY = 'key',
  /** column name */
  LINK = 'link'
}

/** select columns of table "smb.objects" */
export enum SmbObjectsSelectColumn {
  /** column name */
  EXHIBITION_SPACE = 'exhibition_space',
  /** column name */
  ID = 'id',
  /** column name */
  UPDATED_AT = 'updated_at'
}

/** aggregated selection of "smb.objects" */
export type SmbObjectsAggregate = {
  __typename?: 'smb_objects_aggregate';
  aggregate?: Maybe<SmbObjectsAggregateFields>;
  nodes: Array<SmbObjects>;
};

/** aggregate fields of "smb.objects" */
export type SmbObjectsAggregateFields = {
  __typename?: 'smb_objects_aggregate_fields';
  avg?: Maybe<SmbObjectsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<SmbObjectsMaxFields>;
  min?: Maybe<SmbObjectsMinFields>;
  stddev?: Maybe<SmbObjectsStddevFields>;
  stddev_pop?: Maybe<SmbObjectsStddevPopFields>;
  stddev_samp?: Maybe<SmbObjectsStddevSampFields>;
  sum?: Maybe<SmbObjectsSumFields>;
  var_pop?: Maybe<SmbObjectsVarPopFields>;
  var_samp?: Maybe<SmbObjectsVarSampFields>;
  variance?: Maybe<SmbObjectsVarianceFields>;
};


/** aggregate fields of "smb.objects" */
export type SmbObjectsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SmbObjectsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type SmbObjectsAvgFields = {
  __typename?: 'smb_objects_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type SmbObjectsMaxFields = {
  __typename?: 'smb_objects_max_fields';
  exhibition_space?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type SmbObjectsMinFields = {
  __typename?: 'smb_objects_min_fields';
  exhibition_space?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type SmbObjectsStddevFields = {
  __typename?: 'smb_objects_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type SmbObjectsStddevPopFields = {
  __typename?: 'smb_objects_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type SmbObjectsStddevSampFields = {
  __typename?: 'smb_objects_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type SmbObjectsSumFields = {
  __typename?: 'smb_objects_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type SmbObjectsVarPopFields = {
  __typename?: 'smb_objects_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type SmbObjectsVarSampFields = {
  __typename?: 'smb_objects_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type SmbObjectsVarianceFields = {
  __typename?: 'smb_objects_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** select columns of table "smb.org_unit" */
export enum SmbOrgUnitSelectColumn {
  /** column name */
  IS_COMPILATION = 'is_compilation',
  /** column name */
  NAME = 'name',
  /** column name */
  TITLE = 'title'
}

/** select columns of table "smb.persons" */
export enum SmbPersonsSelectColumn {
  /** column name */
  DATE_OF_BIRTH = 'date_of_birth',
  /** column name */
  DATE_OF_DEATH = 'date_of_death',
  /** column name */
  DATE_RANGE = 'date_range',
  /** column name */
  NAME = 'name'
}

/** select columns of table "smb.stt_platform_config" */
export enum SmbSttPlatformConfigSelectColumn {
  /** column name */
  ENABLE_STORY_FILTER = 'enable_story_filter',
  /** column name */
  HERO_SLIDER_LIMIT = 'hero_slider_limit',
  /** column name */
  HIDE_IN_OVERVIEW = 'hide_in_overview',
  /** column name */
  LINK_TEMPLATE = 'link_template',
  /** column name */
  PLATFORM_KEY = 'platform_key'
}

/** Ordering options when selecting data from "smb.stt_platform_config". */
export type SmbSttPlatformConfigOrderBy = {
  enable_story_filter?: InputMaybe<OrderBy>;
  hero_slider_limit?: InputMaybe<OrderBy>;
  hide_in_overview?: InputMaybe<OrderBy>;
  link_template?: InputMaybe<OrderBy>;
  platform_key?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.stt_platform_config". All fields are combined with a logical 'AND'. */
export type SmbSttPlatformConfigBoolExp = {
  _and?: InputMaybe<Array<SmbSttPlatformConfigBoolExp>>;
  _not?: InputMaybe<SmbSttPlatformConfigBoolExp>;
  _or?: InputMaybe<Array<SmbSttPlatformConfigBoolExp>>;
  enable_story_filter?: InputMaybe<BooleanComparisonExp>;
  hero_slider_limit?: InputMaybe<IntComparisonExp>;
  hide_in_overview?: InputMaybe<BooleanComparisonExp>;
  link_template?: InputMaybe<StringComparisonExp>;
  platform_key?: InputMaybe<SmbSttPlatformEnumComparisonExp>;
};

/** Boolean expression to compare columns of type "smb_stt_platform_enum". All fields are combined with logical 'AND'. */
export type SmbSttPlatformEnumComparisonExp = {
  _eq?: InputMaybe<SmbSttPlatformEnum>;
  _in?: InputMaybe<Array<SmbSttPlatformEnum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<SmbSttPlatformEnum>;
  _nin?: InputMaybe<Array<SmbSttPlatformEnum>>;
};

export enum SmbSttPlatformEnum {
  /** Hamburger Bahnhof */
  HBF = 'HBF',
  /** Museum für Islamische Kunst */
  ISL = 'ISL',
  /** Kunstgewerbemuseum */
  KGM = 'KGM',
  /** Sammlungen Online */
  SMB = 'SMB'
}

/** STT platform configuration */
export type SmbSttPlatformConfig = {
  __typename?: 'smb_stt_platform_config';
  enable_story_filter?: Maybe<Scalars['Boolean']>;
  hero_slider_limit: Scalars['Int'];
  hide_in_overview?: Maybe<Scalars['Boolean']>;
  link_template: Scalars['String'];
  platform_key: SmbSttPlatformEnum;
};

/** select columns of table "smb.user" */
export enum SmbUserSelectColumn {
  /** column name */
  EMAIL = 'email'
}

/** Ordering options when selecting data from "smb.user". */
export type SmbUserOrderBy = {
  email?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.user". All fields are combined with a logical 'AND'. */
export type SmbUserBoolExp = {
  _and?: InputMaybe<Array<SmbUserBoolExp>>;
  _not?: InputMaybe<SmbUserBoolExp>;
  _or?: InputMaybe<Array<SmbUserBoolExp>>;
  email?: InputMaybe<StringComparisonExp>;
};

/** Users */
export type SmbUser = {
  __typename?: 'smb_user';
  email: Scalars['String'];
};

export type StrapiHbfQuery = {
  __typename?: 'strapi_hbfQuery';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  index?: Maybe<IndexEntityResponse>;
  me?: Maybe<UsersPermissionsMe>;
  qrReader?: Maybe<QrReaderEntityResponse>;
  room?: Maybe<RoomEntityResponse>;
  rooms?: Maybe<RoomEntityResponseCollection>;
  siteConfig?: Maybe<SiteConfigEntityResponse>;
  smbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  smbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  smbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  smbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  smbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  stories?: Maybe<StoryEntityResponseCollection>;
  story?: Maybe<StoryEntityResponse>;
  topic?: Maybe<TopicEntityResponse>;
  topics?: Maybe<TopicEntityResponseCollection>;
  tour?: Maybe<TourEntityResponse>;
  tours?: Maybe<TourEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type StrapiHbfQueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfQueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiHbfQueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQueryQrReaderArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQueryRoomArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfQueryRoomsArgs = {
  filters?: InputMaybe<RoomFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQuerySiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfQuerySmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQuerySmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQuerySmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQuerySmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQuerySmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiHbfQueryStoriesArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryStoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfQueryTopicArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfQueryTopicsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryTourArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfQueryToursArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiHbfQueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiHbfQueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiHbfQueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiHbfQueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiHbfQueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  hero?: InputMaybe<ComponentGlobalRichtextModuleFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isVisibleInListView?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  stories?: InputMaybe<StoryFiltersInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
  versions?: InputMaybe<CategoryFiltersInput>;
  vuid?: InputMaybe<StringFilterInput>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type ComponentGlobalRichtextModuleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGlobalRichtextModuleFiltersInput>>>;
  not?: InputMaybe<ComponentGlobalRichtextModuleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGlobalRichtextModuleFiltersInput>>>;
  richText?: InputMaybe<ComponentComponentsRichTextComponentFiltersInput>;
  showInMenu?: InputMaybe<BooleanFilterInput>;
  theme?: InputMaybe<ComponentConfigThemeFiltersInput>;
};

export type ComponentComponentsRichTextComponentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsRichTextComponentFiltersInput>>>;
  headline?: InputMaybe<StringFilterInput>;
  layout?: InputMaybe<StringFilterInput>;
  level?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentComponentsRichTextComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsRichTextComponentFiltersInput>>>;
  text?: InputMaybe<StringFilterInput>;
  textColumns?: InputMaybe<StringFilterInput>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentConfigThemeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentConfigThemeFiltersInput>>>;
  not?: InputMaybe<ComponentConfigThemeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentConfigThemeFiltersInput>>>;
  themes?: InputMaybe<StringFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type StoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<StoryFiltersInput>>>;
  category?: InputMaybe<CategoryFiltersInput>;
  config?: InputMaybe<ComponentConfigPageConfigFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayInHero?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isVisibleInListView?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<StoryFiltersInput>;
  not?: InputMaybe<StoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<StoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  room?: InputMaybe<RoomFiltersInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  topic?: InputMaybe<TopicFiltersInput>;
  tours?: InputMaybe<TourFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
  versions?: InputMaybe<StoryFiltersInput>;
  vuid?: InputMaybe<StringFilterInput>;
};

export type ComponentConfigPageConfigFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentConfigPageConfigFiltersInput>>>;
  author?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentConfigPageConfigFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentConfigPageConfigFiltersInput>>>;
  teaser_text?: InputMaybe<StringFilterInput>;
  year?: InputMaybe<StringFilterInput>;
};

export type RoomFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RoomFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  floor?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isVisibleInListView?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<RoomFiltersInput>;
  not?: InputMaybe<RoomFiltersInput>;
  objects?: InputMaybe<StoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RoomFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  text?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
  versions?: InputMaybe<RoomFiltersInput>;
  vuid?: InputMaybe<StringFilterInput>;
};

export type TopicFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TopicFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isVisibleInListView?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<TopicFiltersInput>;
  not?: InputMaybe<TopicFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TopicFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seperator_01?: InputMaybe<ComponentGlobalColorSeparatorModuleFiltersInput>;
  seperator_02?: InputMaybe<ComponentGlobalColorSeparatorModuleFiltersInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  stories?: InputMaybe<StoryFiltersInput>;
  tagCloud?: InputMaybe<ComponentGlobalTagCloudModuleFiltersInput>;
  text?: InputMaybe<StringFilterInput>;
  textCard?: InputMaybe<ComponentGlobalTextCardModuleFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
  versions?: InputMaybe<TopicFiltersInput>;
  vuid?: InputMaybe<StringFilterInput>;
};

export type ComponentGlobalColorSeparatorModuleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGlobalColorSeparatorModuleFiltersInput>>>;
  not?: InputMaybe<ComponentGlobalColorSeparatorModuleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGlobalColorSeparatorModuleFiltersInput>>>;
  theme?: InputMaybe<ComponentConfigThemeFiltersInput>;
};

export type ComponentGlobalTagCloudModuleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGlobalTagCloudModuleFiltersInput>>>;
  not?: InputMaybe<ComponentGlobalTagCloudModuleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGlobalTagCloudModuleFiltersInput>>>;
  primaryTags?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  quaternaryTags?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  secondaryTags?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  tagsSeparator?: InputMaybe<BooleanFilterInput>;
  tertiaryTags?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  theme?: InputMaybe<ComponentConfigThemeFiltersInput>;
};

export type ComponentComponentsTagComponentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsTagComponentFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsTagComponentFiltersInput>>>;
  story?: InputMaybe<StoryFiltersInput>;
  tag?: InputMaybe<StringFilterInput>;
  weight?: InputMaybe<StringFilterInput>;
};

export type ComponentGlobalTextCardModuleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGlobalTextCardModuleFiltersInput>>>;
  buttonLink?: InputMaybe<ComponentComponentsSimpleLinkFiltersInput>;
  cardHeadline?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGlobalTextCardModuleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGlobalTextCardModuleFiltersInput>>>;
  separatorHeadline?: InputMaybe<StringFilterInput>;
  text?: InputMaybe<StringFilterInput>;
  theme?: InputMaybe<ComponentConfigThemeFiltersInput>;
};

export type ComponentComponentsSimpleLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsSimpleLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsSimpleLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsSimpleLinkFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type TourFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TourFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isVisibleInListView?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<TourFiltersInput>;
  not?: InputMaybe<TourFiltersInput>;
  objects?: InputMaybe<StoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TourFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  text?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
  versions?: InputMaybe<TourFiltersInput>;
  vuid?: InputMaybe<StringFilterInput>;
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export enum PublicationState {
  LIVE = 'LIVE',
  PREVIEW = 'PREVIEW'
}

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']>;
  hero?: Maybe<ComponentGlobalRichtextModule>;
  isVisibleInListView?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CategoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  stories?: Maybe<StoryRelationResponseCollection>;
  subtitle?: Maybe<Scalars['String']>;
  teaser_image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  versionNumber?: Maybe<Scalars['Int']>;
  versions?: Maybe<CategoryRelationResponseCollection>;
  vuid?: Maybe<Scalars['String']>;
};


export type CategoryLocalizationsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CategoryStoriesArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CategoryVersionsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalRichtextModule = {
  __typename?: 'ComponentGlobalRichtextModule';
  id: Scalars['ID'];
  richText?: Maybe<ComponentComponentsRichTextComponent>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<ComponentConfigTheme>;
};

export type ComponentComponentsRichTextComponent = {
  __typename?: 'ComponentComponentsRichTextComponent';
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  layout?: Maybe<EnumComponentcomponentsrichtextcomponentLayout>;
  level?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  textColumns?: Maybe<EnumComponentcomponentsrichtextcomponentTextcolumns>;
};

export enum EnumComponentcomponentsrichtextcomponentLayout {
  COL = 'col',
  ROW = 'row'
}

export enum EnumComponentcomponentsrichtextcomponentTextcolumns {
  COL1 = 'col1',
  COL2 = 'col2',
  COL3 = 'col3'
}

export type ComponentConfigTheme = {
  __typename?: 'ComponentConfigTheme';
  id: Scalars['ID'];
  themes?: Maybe<EnumComponentconfigthemeThemes>;
};

export enum EnumComponentconfigthemeThemes {
  PRIMARY = 'primary',
  QUATERNARY = 'quaternary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection';
  data: Array<CategoryEntity>;
};

export type StoryRelationResponseCollection = {
  __typename?: 'StoryRelationResponseCollection';
  data: Array<StoryEntity>;
};

export type StoryEntity = {
  __typename?: 'StoryEntity';
  attributes?: Maybe<Story>;
  id?: Maybe<Scalars['ID']>;
};

export type Story = {
  __typename?: 'Story';
  category?: Maybe<CategoryEntityResponse>;
  config?: Maybe<ComponentConfigPageConfig>;
  createdAt?: Maybe<Scalars['DateTime']>;
  displayInHero?: Maybe<Scalars['Boolean']>;
  isVisibleInListView?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<StoryRelationResponseCollection>;
  modules?: Maybe<Array<Maybe<StoryModulesDynamicZone>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  room?: Maybe<RoomEntityResponse>;
  slug: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<TopicEntityResponse>;
  tours?: Maybe<TourRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  versionNumber?: Maybe<Scalars['Int']>;
  versions?: Maybe<StoryRelationResponseCollection>;
  vuid?: Maybe<Scalars['String']>;
};


export type StoryLocalizationsArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StoryToursArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StoryVersionsArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type ComponentConfigPageConfig = {
  __typename?: 'ComponentConfigPageConfig';
  author?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  teaser_image: UploadFileEntityResponse;
  teaser_text: Scalars['String'];
  year?: Maybe<Scalars['String']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type GenericMorph = Category | ComponentComponentsBannerCard | ComponentComponentsBreadcrumbsLink | ComponentComponentsButtonComponent | ComponentComponentsCardLinkComponent | ComponentComponentsContentCardComponent | ComponentComponentsCookie | ComponentComponentsEasyDbItems | ComponentComponentsEasyDbRef | ComponentComponentsHeadlineComponent | ComponentComponentsImageCard | ComponentComponentsImageMapCard | ComponentComponentsImageScrollCard | ComponentComponentsLegalPages | ComponentComponentsLinkComponent | ComponentComponentsMediaComponent | ComponentComponentsModelInfoPoints | ComponentComponentsNavigationLinkComponent | ComponentComponentsRichTextComponent | ComponentComponentsSimpleLink | ComponentComponentsSlug | ComponentComponentsSmbCollectionsBlock | ComponentComponentsSmbDownloadModule | ComponentComponentsSmbHeaderMenuItems | ComponentComponentsSmbHighlightsBlock | ComponentComponentsSmbLegalPagesBlock | ComponentComponentsSmbResearchModal | ComponentComponentsSmbSearchButtonBlock | ComponentComponentsSmbSection | ComponentComponentsSmbTextCard | ComponentComponentsSmbVideoBlock | ComponentComponentsSmbWebModule | ComponentComponentsStoryComponent | ComponentComponentsTagComponent | ComponentComponentsTextComponent | ComponentConfigHeroSwiperItem | ComponentConfigIndexConfig | ComponentConfigPageConfig | ComponentConfigTheme | ComponentGlobal3DModel | ComponentGlobal3DNewModel | ComponentGlobalCardImageModule | ComponentGlobalColorSeparatorModule | ComponentGlobalContentModule | ComponentGlobalEasyDbImageModule | ComponentGlobalFilterModule | ComponentGlobalHeroModule | ComponentGlobalImageBannerModule | ComponentGlobalImageMapModule | ComponentGlobalImagePlayerModule | ComponentGlobalImageScrollModule | ComponentGlobalLinkedStoriesModule | ComponentGlobalLinksModule | ComponentGlobalMediaModule | ComponentGlobalRichtextModule | ComponentGlobalRouteNavigationModule | ComponentGlobalSammlungOnlineAdapter | ComponentGlobalSeparatorModule | ComponentGlobalStoriesContainerModule | ComponentGlobalTagCarouselModule | ComponentGlobalTagCloudModule | ComponentGlobalTextCardModule | ComponentGlobalTextDrawerModule | ComponentGlobalVideoModule | I18NLocale | Index | QrReader | Room | SiteConfig | SmbGuidepage | SmbLandingpage | SmbResearchpage | SmbSiteConfig | SmbTopicspage | Story | Topic | Tour | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type ComponentComponentsBannerCard = {
  __typename?: 'ComponentComponentsBannerCard';
  headline: Scalars['String'];
  id: Scalars['ID'];
  subHeadline?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type ComponentComponentsBreadcrumbsLink = {
  __typename?: 'ComponentComponentsBreadcrumbsLink';
  collapseText?: Maybe<Scalars['String']>;
  expandText?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentComponentsButtonComponent = {
  __typename?: 'ComponentComponentsButtonComponent';
  closedState?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  openState?: Maybe<Scalars['String']>;
};

export type ComponentComponentsCardLinkComponent = {
  __typename?: 'ComponentComponentsCardLinkComponent';
  firstLinkHref?: Maybe<Scalars['String']>;
  firstLinkTitle?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  secondLinkHref?: Maybe<Scalars['String']>;
  secondLinkTitle?: Maybe<Scalars['String']>;
  thirdLinkHref?: Maybe<Scalars['String']>;
  thirdLinkTitle?: Maybe<Scalars['String']>;
};

export type ComponentComponentsContentCardComponent = {
  __typename?: 'ComponentComponentsContentCardComponent';
  backgroundColor?: Maybe<EnumComponentcomponentscontentcardcomponentBackgroundcolor>;
  backgroundStyle?: Maybe<EnumComponentcomponentscontentcardcomponentBackgroundstyle>;
  borderColor?: Maybe<EnumComponentcomponentscontentcardcomponentBordercolor>;
  borderWidth?: Maybe<EnumComponentcomponentscontentcardcomponentBorderwidth>;
  cardWidth?: Maybe<EnumComponentcomponentscontentcardcomponentCardwidth>;
  contentAlignment?: Maybe<EnumComponentcomponentscontentcardcomponentContentalignment>;
  headline?: Maybe<Scalars['String']>;
  headlineAlignment?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlinealignment>;
  headlineColor?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlinecolor>;
  headlineDecoration?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlinedecoration>;
  headlineFontSize?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlinefontsize>;
  headlineOrientation?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlineorientation>;
  headlineStyle?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlinestyle>;
  headlineWeight?: Maybe<EnumComponentcomponentscontentcardcomponentHeadlineweight>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  imagePosition?: Maybe<EnumComponentcomponentscontentcardcomponentImageposition>;
  link?: Maybe<ComponentComponentsLinkComponent>;
  linkColor?: Maybe<EnumComponentcomponentscontentcardcomponentLinkcolor>;
};

export enum EnumComponentcomponentscontentcardcomponentBackgroundcolor {
  PRIMARY = 'primary',
  QUATERNARY = 'quaternary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export enum EnumComponentcomponentscontentcardcomponentBackgroundstyle {
  TRANSPARENT = 'transparent'
}

export enum EnumComponentcomponentscontentcardcomponentBordercolor {
  GRADIENT = 'gradient',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export enum EnumComponentcomponentscontentcardcomponentBorderwidth {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export enum EnumComponentcomponentscontentcardcomponentCardwidth {
  FULL = 'full',
  HALF = 'half',
  ONETHIRD = 'oneThird',
  TWOTHIRDS = 'twoThirds'
}

export enum EnumComponentcomponentscontentcardcomponentContentalignment {
  CENTER = 'center',
  RIGHT = 'right'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlinealignment {
  CENTER = 'center',
  RIGHT = 'right'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlinecolor {
  GRADIENT = 'gradient',
  PRIMARY = 'primary',
  QUATERNARY = 'quaternary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlinedecoration {
  UNDERLINE = 'underline',
  UPPERCASE = 'uppercase'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlinefontsize {
  EXTRALARGE = 'extraLarge',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlineorientation {
  VERTICAL = 'vertical'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlinestyle {
  ITALIC = 'italic'
}

export enum EnumComponentcomponentscontentcardcomponentHeadlineweight {
  BOLD = 'bold',
  LIGHT = 'light',
  MEDIUM = 'medium'
}

export enum EnumComponentcomponentscontentcardcomponentImageposition {
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top'
}

export type ComponentComponentsLinkComponent = {
  __typename?: 'ComponentComponentsLinkComponent';
  category?: Maybe<CategoryEntityResponse>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  story?: Maybe<StoryEntityResponse>;
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<TopicEntityResponse>;
};

export type StoryEntityResponse = {
  __typename?: 'StoryEntityResponse';
  data?: Maybe<StoryEntity>;
};

export type TopicEntityResponse = {
  __typename?: 'TopicEntityResponse';
  data?: Maybe<TopicEntity>;
};

export type TopicEntity = {
  __typename?: 'TopicEntity';
  attributes?: Maybe<Topic>;
  id?: Maybe<Scalars['ID']>;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt?: Maybe<Scalars['DateTime']>;
  isVisibleInListView?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<TopicRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seperator_01?: Maybe<ComponentGlobalColorSeparatorModule>;
  seperator_02?: Maybe<ComponentGlobalColorSeparatorModule>;
  slug?: Maybe<Scalars['String']>;
  stories?: Maybe<StoryRelationResponseCollection>;
  tagCloud?: Maybe<ComponentGlobalTagCloudModule>;
  text?: Maybe<Scalars['String']>;
  textCard?: Maybe<ComponentGlobalTextCardModule>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  versionNumber?: Maybe<Scalars['Int']>;
  versions?: Maybe<TopicRelationResponseCollection>;
  vuid?: Maybe<Scalars['String']>;
};


export type TopicLocalizationsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TopicStoriesArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TopicVersionsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TopicRelationResponseCollection = {
  __typename?: 'TopicRelationResponseCollection';
  data: Array<TopicEntity>;
};

export type ComponentGlobalColorSeparatorModule = {
  __typename?: 'ComponentGlobalColorSeparatorModule';
  id: Scalars['ID'];
  theme: ComponentConfigTheme;
};

export type ComponentGlobalTagCloudModule = {
  __typename?: 'ComponentGlobalTagCloudModule';
  id: Scalars['ID'];
  primaryTags?: Maybe<Array<Maybe<ComponentComponentsTagComponent>>>;
  quaternaryTags?: Maybe<Array<Maybe<ComponentComponentsTagComponent>>>;
  secondaryTags?: Maybe<Array<Maybe<ComponentComponentsTagComponent>>>;
  tagsSeparator?: Maybe<Scalars['Boolean']>;
  tertiaryTags?: Maybe<Array<Maybe<ComponentComponentsTagComponent>>>;
  theme: ComponentConfigTheme;
};


export type ComponentGlobalTagCloudModulePrimaryTagsArgs = {
  filters?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGlobalTagCloudModuleQuaternaryTagsArgs = {
  filters?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGlobalTagCloudModuleSecondaryTagsArgs = {
  filters?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGlobalTagCloudModuleTertiaryTagsArgs = {
  filters?: InputMaybe<ComponentComponentsTagComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsTagComponent = {
  __typename?: 'ComponentComponentsTagComponent';
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  story?: Maybe<StoryEntityResponse>;
  tag?: Maybe<Scalars['String']>;
  weight?: Maybe<EnumComponentcomponentstagcomponentWeight>;
};

export enum EnumComponentcomponentstagcomponentWeight {
  DEFAULT = 'default',
  LARGE = 'large',
  MEDIUM = 'medium'
}

export type ComponentGlobalTextCardModule = {
  __typename?: 'ComponentGlobalTextCardModule';
  buttonLink?: Maybe<ComponentComponentsSimpleLink>;
  cardHeadline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  separatorHeadline?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  theme: ComponentConfigTheme;
};

export type ComponentComponentsSimpleLink = {
  __typename?: 'ComponentComponentsSimpleLink';
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export enum EnumComponentcomponentscontentcardcomponentLinkcolor {
  GRADIENT = 'gradient',
  PRIMARY = 'primary',
  QUATERNARY = 'quaternary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export type ComponentComponentsCookie = {
  __typename?: 'ComponentComponentsCookie';
  button?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  overlayText?: Maybe<Scalars['String']>;
  showCookie?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export type ComponentComponentsEasyDbItems = {
  __typename?: 'ComponentComponentsEasyDbItems';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  layout?: Maybe<EnumComponentcomponentseasydbitemsLayout>;
  text?: Maybe<Scalars['String']>;
  textColumns?: Maybe<EnumComponentcomponentseasydbitemsTextcolumns>;
  textPosition?: Maybe<EnumComponentcomponentseasydbitemsTextposition>;
};


export type ComponentComponentsEasyDbItemsAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export enum EnumComponentcomponentseasydbitemsLayout {
  COLUMN = 'column',
  ROW = 'row'
}

export enum EnumComponentcomponentseasydbitemsTextcolumns {
  COL1 = 'col1',
  COL2 = 'col2',
  COL3 = 'col3'
}

export enum EnumComponentcomponentseasydbitemsTextposition {
  ABOVE = 'above',
  BELOW = 'below'
}

export type ComponentComponentsEasyDbRef = {
  __typename?: 'ComponentComponentsEasyDbRef';
  id: Scalars['ID'];
  objectFit?: Maybe<EnumComponentcomponentseasydbrefObjectfit>;
  ref: Scalars['String'];
};

export enum EnumComponentcomponentseasydbrefObjectfit {
  CONTAIN = 'contain',
  COVER = 'cover'
}

export type ComponentComponentsHeadlineComponent = {
  __typename?: 'ComponentComponentsHeadlineComponent';
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level: Scalars['Int'];
};

export type ComponentComponentsImageCard = {
  __typename?: 'ComponentComponentsImageCard';
  asset: UploadFileEntityResponse;
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  slug?: Maybe<Scalars['String']>;
  subHeader?: Maybe<Scalars['String']>;
};

export type ComponentComponentsImageMapCard = {
  __typename?: 'ComponentComponentsImageMapCard';
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  text?: Maybe<Scalars['String']>;
  xCoordinates: Scalars['Long'];
  yCoordinates: Scalars['Long'];
};

export type ComponentComponentsImageScrollCard = {
  __typename?: 'ComponentComponentsImageScrollCard';
  headline: Scalars['String'];
  id: Scalars['ID'];
  subHeadline?: Maybe<Scalars['String']>;
};

export type ComponentComponentsLegalPages = {
  __typename?: 'ComponentComponentsLegalPages';
  block?: Maybe<Array<Maybe<ComponentComponentsSmbLegalPagesBlock>>>;
  footerLink?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  matomo?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
};


export type ComponentComponentsLegalPagesBlockArgs = {
  filters?: InputMaybe<ComponentComponentsSmbLegalPagesBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsSmbLegalPagesBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsSmbLegalPagesBlockFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsSmbLegalPagesBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsSmbLegalPagesBlockFiltersInput>>>;
  text?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsSmbLegalPagesBlock = {
  __typename?: 'ComponentComponentsSmbLegalPagesBlock';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  videoAssets?: Maybe<UploadFileRelationResponseCollection>;
};


export type ComponentComponentsSmbLegalPagesBlockAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentComponentsSmbLegalPagesBlockVideoAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsMediaComponent = {
  __typename?: 'ComponentComponentsMediaComponent';
  assets: UploadFileRelationResponseCollection;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  layout?: Maybe<EnumComponentcomponentsmediacomponentLayout>;
  text?: Maybe<Scalars['String']>;
  textColumns?: Maybe<EnumComponentcomponentsmediacomponentTextcolumns>;
  textPosition?: Maybe<EnumComponentcomponentsmediacomponentTextposition>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
};


export type ComponentComponentsMediaComponentAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum EnumComponentcomponentsmediacomponentLayout {
  COLUMN = 'column',
  ROW = 'row'
}

export enum EnumComponentcomponentsmediacomponentTextcolumns {
  COL1 = 'col1',
  COL2 = 'col2',
  COL3 = 'col3'
}

export enum EnumComponentcomponentsmediacomponentTextposition {
  ABOVE = 'above',
  BELOW = 'below'
}

export type ComponentComponentsModelInfoPoints = {
  __typename?: 'ComponentComponentsModelInfoPoints';
  asset: UploadFileEntityResponse;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  slug?: Maybe<EnumComponentcomponentsmodelinfopointsSlug>;
  text?: Maybe<Scalars['String']>;
};

export enum EnumComponentcomponentsmodelinfopointsSlug {
  SPRITEA1 = 'SpriteA1',
  SPRITEA2 = 'SpriteA2',
  SPRITEA3 = 'SpriteA3',
  SPRITEA4 = 'SpriteA4',
  SPRITEB1 = 'SpriteB1',
  SPRITEB2 = 'SpriteB2',
  SPRITEB3 = 'SpriteB3',
  SPRITEB4 = 'SpriteB4'
}

export type ComponentComponentsNavigationLinkComponent = {
  __typename?: 'ComponentComponentsNavigationLinkComponent';
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  slug?: Maybe<EnumComponentcomponentsnavigationlinkcomponentSlug>;
  subTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export enum EnumComponentcomponentsnavigationlinkcomponentSlug {
  PRIMARY = 'primary',
  QUATERNARY = 'quaternary',
  QUINARY = 'quinary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export type ComponentComponentsSlug = {
  __typename?: 'ComponentComponentsSlug';
  id: Scalars['ID'];
  slug?: Maybe<Scalars['String']>;
};

export type ComponentComponentsSmbCollectionsBlock = {
  __typename?: 'ComponentComponentsSmbCollectionsBlock';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  cardCtaText?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  type: EnumComponentcomponentssmbcollectionsblockType;
};


export type ComponentComponentsSmbCollectionsBlockAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum EnumComponentcomponentssmbcollectionsblockType {
  GUIDE = 'GUIDE',
  INTRO = 'INTRO',
  RESEARCH = 'RESEARCH',
  TOPIC = 'TOPIC'
}

export type ComponentComponentsSmbDownloadModule = {
  __typename?: 'ComponentComponentsSmbDownloadModule';
  buttonText?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type ComponentComponentsSmbHeaderMenuItems = {
  __typename?: 'ComponentComponentsSmbHeaderMenuItems';
  headline?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  subHeadline?: Maybe<Scalars['String']>;
  type: EnumComponentcomponentssmbheadermenuitemsType;
};

export enum EnumComponentcomponentssmbheadermenuitemsType {
  GUIDE = 'GUIDE',
  INTRO = 'INTRO',
  RESEARCH = 'RESEARCH',
  TOPIC = 'TOPIC'
}

export type ComponentComponentsSmbHighlightsBlock = {
  __typename?: 'ComponentComponentsSmbHighlightsBlock';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  type: EnumComponentcomponentssmbhighlightsblockType;
};


export type ComponentComponentsSmbHighlightsBlockAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum EnumComponentcomponentssmbhighlightsblockType {
  GUIDE = 'GUIDE',
  INTRO = 'INTRO',
  RESEARCH = 'RESEARCH',
  TOPIC = 'TOPIC'
}

export type ComponentComponentsSmbResearchModal = {
  __typename?: 'ComponentComponentsSmbResearchModal';
  downloadSection?: Maybe<ComponentComponentsSmbDownloadModule>;
  id: Scalars['ID'];
  webSection?: Maybe<ComponentComponentsSmbWebModule>;
};

export type ComponentComponentsSmbWebModule = {
  __typename?: 'ComponentComponentsSmbWebModule';
  buttonLink?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type ComponentComponentsSmbSearchButtonBlock = {
  __typename?: 'ComponentComponentsSmbSearchButtonBlock';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  headline: Scalars['String'];
  id: Scalars['ID'];
  searchButtonGroupHeadline1?: Maybe<Scalars['String']>;
  searchButtonGroupHeadline2?: Maybe<Scalars['String']>;
  searchButtonGroupHeadline3?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type ComponentComponentsSmbSearchButtonBlockAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsSmbSection = {
  __typename?: 'ComponentComponentsSmbSection';
  CollectionsBlock?: Maybe<ComponentComponentsSmbCollectionsBlock>;
  HighlightsBlock?: Maybe<ComponentComponentsSmbHighlightsBlock>;
  id: Scalars['ID'];
  SearchButtonBlock?: Maybe<ComponentComponentsSmbSearchButtonBlock>;
  TextBlock?: Maybe<ComponentComponentsSmbTextCard>;
  Type?: Maybe<EnumComponentcomponentssmbsectionType>;
  VideoBlock?: Maybe<ComponentComponentsSmbVideoBlock>;
};

export type ComponentComponentsSmbTextCard = {
  __typename?: 'ComponentComponentsSmbTextCard';
  headline: Scalars['String'];
  id: Scalars['ID'];
  linkText?: Maybe<Scalars['String']>;
  linkUrl?: Maybe<Scalars['String']>;
  subHeadline?: Maybe<Scalars['String']>;
  text: Scalars['String'];
};

export enum EnumComponentcomponentssmbsectionType {
  GUIDE = 'GUIDE',
  INTRO = 'INTRO',
  RESEARCH = 'RESEARCH',
  TEXT = 'TEXT',
  TOPIC = 'TOPIC'
}

export type ComponentComponentsSmbVideoBlock = {
  __typename?: 'ComponentComponentsSmbVideoBlock';
  assets: UploadFileRelationResponseCollection;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkText?: Maybe<Scalars['String']>;
  linkUrl?: Maybe<Scalars['String']>;
  subHeadline?: Maybe<Scalars['String']>;
};


export type ComponentComponentsSmbVideoBlockAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsStoryComponent = {
  __typename?: 'ComponentComponentsStoryComponent';
  alignment?: Maybe<EnumComponentcomponentsstorycomponentAlignment>;
  asset?: Maybe<UploadFileEntityResponse>;
  border?: Maybe<Scalars['Boolean']>;
  cardText: Scalars['String'];
  headline?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  story?: Maybe<StoryEntityResponse>;
  title?: Maybe<Scalars['String']>;
  weight?: Maybe<EnumComponentcomponentsstorycomponentWeight>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
};

export enum EnumComponentcomponentsstorycomponentAlignment {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum EnumComponentcomponentsstorycomponentWeight {
  SIZE1 = 'size1',
  SIZE2 = 'size2',
  SIZE3 = 'size3'
}

export type ComponentComponentsTextComponent = {
  __typename?: 'ComponentComponentsTextComponent';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type ComponentConfigHeroSwiperItem = {
  __typename?: 'ComponentConfigHeroSwiperItem';
  caption?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image: UploadFileEntityResponse;
  mobileImage?: Maybe<UploadFileEntityResponse>;
  tabletImage?: Maybe<UploadFileEntityResponse>;
  title: Scalars['String'];
};

export type ComponentConfigIndexConfig = {
  __typename?: 'ComponentConfigIndexConfig';
  id: Scalars['ID'];
  teaser_iamge?: Maybe<UploadFileEntityResponse>;
  teaser_text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentGlobal3DModel = {
  __typename?: 'ComponentGlobal3DModel';
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  infoPoints?: Maybe<Array<Maybe<ComponentComponentsModelInfoPoints>>>;
  modelFile: UploadFileEntityResponse;
  modelPointSvg: UploadFileEntityResponse;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobal3DModelInfoPointsArgs = {
  filters?: InputMaybe<ComponentComponentsModelInfoPointsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsModelInfoPointsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsModelInfoPointsFiltersInput>>>;
  headline?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsModelInfoPointsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsModelInfoPointsFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  text?: InputMaybe<StringFilterInput>;
};

export type ComponentGlobal3DNewModel = {
  __typename?: 'ComponentGlobal3DNewModel';
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  modelGLB: UploadFileRelationResponseCollection;
  modelJSON: UploadFileEntityResponse;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobal3DNewModelModelGlbArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalCardImageModule = {
  __typename?: 'ComponentGlobalCardImageModule';
  headline?: Maybe<ComponentComponentsHeadlineComponent>;
  id: Scalars['ID'];
  layout?: Maybe<EnumComponentglobalcardimagemoduleLayout>;
  position?: Maybe<EnumComponentglobalcardimagemodulePosition>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  stories?: Maybe<Array<Maybe<ComponentComponentsStoryComponent>>>;
  textAlignment?: Maybe<EnumComponentglobalcardimagemoduleTextalignment>;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalCardImageModuleStoriesArgs = {
  filters?: InputMaybe<ComponentComponentsStoryComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum EnumComponentglobalcardimagemoduleLayout {
  FLOAT = 'float',
  PARALLEL = 'parallel',
  TRANSLATE = 'translate'
}

export enum EnumComponentglobalcardimagemodulePosition {
  DOWN = 'down',
  UP = 'up'
}

export type ComponentComponentsStoryComponentFiltersInput = {
  alignment?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsStoryComponentFiltersInput>>>;
  border?: InputMaybe<BooleanFilterInput>;
  cardText?: InputMaybe<StringFilterInput>;
  headline?: InputMaybe<StringFilterInput>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsStoryComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsStoryComponentFiltersInput>>>;
  story?: InputMaybe<StoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  weight?: InputMaybe<StringFilterInput>;
  youtubeVideoUrl?: InputMaybe<StringFilterInput>;
};

export enum EnumComponentglobalcardimagemoduleTextalignment {
  CENTER = 'center'
}

export type ComponentGlobalContentModule = {
  __typename?: 'ComponentGlobalContentModule';
  contentCards?: Maybe<Array<Maybe<ComponentComponentsContentCardComponent>>>;
  id: Scalars['ID'];
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalContentModuleContentCardsArgs = {
  filters?: InputMaybe<ComponentComponentsContentCardComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsContentCardComponentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsContentCardComponentFiltersInput>>>;
  backgroundColor?: InputMaybe<StringFilterInput>;
  backgroundStyle?: InputMaybe<StringFilterInput>;
  borderColor?: InputMaybe<StringFilterInput>;
  borderWidth?: InputMaybe<StringFilterInput>;
  cardWidth?: InputMaybe<StringFilterInput>;
  contentAlignment?: InputMaybe<StringFilterInput>;
  headline?: InputMaybe<StringFilterInput>;
  headlineAlignment?: InputMaybe<StringFilterInput>;
  headlineColor?: InputMaybe<StringFilterInput>;
  headlineDecoration?: InputMaybe<StringFilterInput>;
  headlineFontSize?: InputMaybe<StringFilterInput>;
  headlineOrientation?: InputMaybe<StringFilterInput>;
  headlineStyle?: InputMaybe<StringFilterInput>;
  headlineWeight?: InputMaybe<StringFilterInput>;
  imagePosition?: InputMaybe<StringFilterInput>;
  link?: InputMaybe<ComponentComponentsLinkComponentFiltersInput>;
  linkColor?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsContentCardComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsContentCardComponentFiltersInput>>>;
};

export type ComponentComponentsLinkComponentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsLinkComponentFiltersInput>>>;
  category?: InputMaybe<CategoryFiltersInput>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsLinkComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsLinkComponentFiltersInput>>>;
  story?: InputMaybe<StoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  topic?: InputMaybe<TopicFiltersInput>;
};

export type ComponentGlobalEasyDbImageModule = {
  __typename?: 'ComponentGlobalEasyDbImageModule';
  easyDBRef: Array<Maybe<ComponentComponentsEasyDbRef>>;
  headline?: Maybe<ComponentComponentsHeadlineComponent>;
  id: Scalars['ID'];
  mediaItems?: Maybe<ComponentComponentsEasyDbItems>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalEasyDbImageModuleEasyDbRefArgs = {
  filters?: InputMaybe<ComponentComponentsEasyDbRefFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsEasyDbRefFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsEasyDbRefFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsEasyDbRefFiltersInput>;
  objectFit?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsEasyDbRefFiltersInput>>>;
  ref?: InputMaybe<StringFilterInput>;
};

export type ComponentGlobalFilterModule = {
  __typename?: 'ComponentGlobalFilterModule';
  categories?: Maybe<CategoryRelationResponseCollection>;
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};


export type ComponentGlobalFilterModuleCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalHeroModule = {
  __typename?: 'ComponentGlobalHeroModule';
  heroAsset?: Maybe<UploadFileEntityResponse>;
  heroBackgroundTheme?: Maybe<EnumComponentglobalheromoduleHerobackgroundtheme>;
  heroText?: Maybe<ComponentComponentsTextComponent>;
  id: Scalars['ID'];
};

export enum EnumComponentglobalheromoduleHerobackgroundtheme {
  PRIMARY = 'primary',
  QUATERNARY = 'quaternary',
  QUINARY = 'quinary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

export type ComponentGlobalImageBannerModule = {
  __typename?: 'ComponentGlobalImageBannerModule';
  backgroundAsset: UploadFileEntityResponse;
  card?: Maybe<ComponentComponentsBannerCard>;
  id: Scalars['ID'];
  position?: Maybe<EnumComponentglobalimagebannermodulePosition>;
  theme?: Maybe<ComponentConfigTheme>;
};

export enum EnumComponentglobalimagebannermodulePosition {
  CENTER = 'center',
  END = 'end',
  START = 'start'
}

export type ComponentGlobalImageMapModule = {
  __typename?: 'ComponentGlobalImageMapModule';
  cards?: Maybe<Array<Maybe<ComponentComponentsImageMapCard>>>;
  id: Scalars['ID'];
  moduleAsset: UploadFileEntityResponse;
  moduleHeadline?: Maybe<Scalars['String']>;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalImageMapModuleCardsArgs = {
  filters?: InputMaybe<ComponentComponentsImageMapCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsImageMapCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsImageMapCardFiltersInput>>>;
  headline?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsImageMapCardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsImageMapCardFiltersInput>>>;
  text?: InputMaybe<StringFilterInput>;
  xCoordinates?: InputMaybe<LongFilterInput>;
  yCoordinates?: InputMaybe<LongFilterInput>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  contains?: InputMaybe<Scalars['Long']>;
  containsi?: InputMaybe<Scalars['Long']>;
  endsWith?: InputMaybe<Scalars['Long']>;
  eq?: InputMaybe<Scalars['Long']>;
  eqi?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  ne?: InputMaybe<Scalars['Long']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']>;
  notContainsi?: InputMaybe<Scalars['Long']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  startsWith?: InputMaybe<Scalars['Long']>;
};

export type ComponentGlobalImagePlayerModule = {
  __typename?: 'ComponentGlobalImagePlayerModule';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  buttonText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};


export type ComponentGlobalImagePlayerModuleAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalImageScrollModule = {
  __typename?: 'ComponentGlobalImageScrollModule';
  asset: UploadFileEntityResponse;
  card: ComponentComponentsImageScrollCard;
  id: Scalars['ID'];
  theme?: Maybe<ComponentConfigTheme>;
};

export type ComponentGlobalLinkedStoriesModule = {
  __typename?: 'ComponentGlobalLinkedStoriesModule';
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  storiesLinks?: Maybe<StoryRelationResponseCollection>;
};


export type ComponentGlobalLinkedStoriesModuleStoriesLinksArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalLinksModule = {
  __typename?: 'ComponentGlobalLinksModule';
  cardLinks?: Maybe<Array<Maybe<ComponentComponentsCardLinkComponent>>>;
  id: Scalars['ID'];
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalLinksModuleCardLinksArgs = {
  filters?: InputMaybe<ComponentComponentsCardLinkComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsCardLinkComponentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsCardLinkComponentFiltersInput>>>;
  firstLinkHref?: InputMaybe<StringFilterInput>;
  firstLinkTitle?: InputMaybe<StringFilterInput>;
  headline?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsCardLinkComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsCardLinkComponentFiltersInput>>>;
  secondLinkHref?: InputMaybe<StringFilterInput>;
  secondLinkTitle?: InputMaybe<StringFilterInput>;
  thirdLinkHref?: InputMaybe<StringFilterInput>;
  thirdLinkTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentGlobalMediaModule = {
  __typename?: 'ComponentGlobalMediaModule';
  gridAlignment?: Maybe<EnumComponentglobalmediamoduleGridalignment>;
  headline?: Maybe<ComponentComponentsHeadlineComponent>;
  id: Scalars['ID'];
  link?: Maybe<ComponentComponentsLinkComponent>;
  mediaItems?: Maybe<ComponentComponentsMediaComponent>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  subHeadline?: Maybe<Scalars['String']>;
  theme?: Maybe<ComponentConfigTheme>;
};

export enum EnumComponentglobalmediamoduleGridalignment {
  DEFAULT = 'default',
  LEFT = 'left',
  RIGHT = 'right'
}

export type ComponentGlobalRouteNavigationModule = {
  __typename?: 'ComponentGlobalRouteNavigationModule';
  backwardsLink?: Maybe<ComponentComponentsLinkComponent>;
  forwardLink?: Maybe<ComponentComponentsLinkComponent>;
  icon?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  theme?: Maybe<ComponentConfigTheme>;
};

export type ComponentGlobalSammlungOnlineAdapter = {
  __typename?: 'ComponentGlobalSammlungOnlineAdapter';
  headline?: Maybe<ComponentComponentsHeadlineComponent>;
  id: Scalars['ID'];
  mediaItems?: Maybe<ComponentComponentsEasyDbItems>;
  ref: Array<Maybe<ComponentComponentsEasyDbRef>>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalSammlungOnlineAdapterRefArgs = {
  filters?: InputMaybe<ComponentComponentsEasyDbRefFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalSeparatorModule = {
  __typename?: 'ComponentGlobalSeparatorModule';
  id: Scalars['ID'];
  separatorHeadline?: Maybe<Scalars['String']>;
  showInMenu?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<ComponentConfigTheme>;
};

export type ComponentGlobalStoriesContainerModule = {
  __typename?: 'ComponentGlobalStoriesContainerModule';
  active?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  theme?: Maybe<ComponentConfigTheme>;
};

export type ComponentGlobalTagCarouselModule = {
  __typename?: 'ComponentGlobalTagCarouselModule';
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  story?: Maybe<StoryEntityResponse>;
  tag?: Maybe<Scalars['String']>;
  theme?: Maybe<ComponentConfigTheme>;
  weight?: Maybe<EnumComponentglobaltagcarouselmoduleWeight>;
};

export enum EnumComponentglobaltagcarouselmoduleWeight {
  SIZE1 = 'size1',
  SIZE2 = 'size2',
  SIZE3 = 'size3'
}

export type ComponentGlobalTextDrawerModule = {
  __typename?: 'ComponentGlobalTextDrawerModule';
  assets?: Maybe<UploadFileRelationResponseCollection>;
  button?: Maybe<ComponentComponentsButtonComponent>;
  drawerHeadline?: Maybe<Scalars['String']>;
  drawerSubHeadline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  showInMenu?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  theme?: Maybe<ComponentConfigTheme>;
};


export type ComponentGlobalTextDrawerModuleAssetsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGlobalVideoModule = {
  __typename?: 'ComponentGlobalVideoModule';
  id: Scalars['ID'];
  placeholderImage: UploadFileEntityResponse;
  video: UploadFileEntityResponse;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Index = {
  __typename?: 'Index';
  config?: Maybe<ComponentConfigIndexConfig>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<IndexRelationResponseCollection>;
  modules?: Maybe<Array<Maybe<IndexModulesDynamicZone>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type IndexLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type IndexRelationResponseCollection = {
  __typename?: 'IndexRelationResponseCollection';
  data: Array<IndexEntity>;
};

export type IndexEntity = {
  __typename?: 'IndexEntity';
  attributes?: Maybe<Index>;
  id?: Maybe<Scalars['ID']>;
};

export type IndexModulesDynamicZone = ComponentGlobal3DModel | ComponentGlobal3DNewModel | ComponentGlobalCardImageModule | ComponentGlobalColorSeparatorModule | ComponentGlobalContentModule | ComponentGlobalFilterModule | ComponentGlobalHeroModule | ComponentGlobalImageBannerModule | ComponentGlobalImageScrollModule | ComponentGlobalLinkedStoriesModule | ComponentGlobalLinksModule | ComponentGlobalMediaModule | ComponentGlobalRichtextModule | ComponentGlobalRouteNavigationModule | ComponentGlobalSeparatorModule | ComponentGlobalStoriesContainerModule | ComponentGlobalTagCarouselModule | ComponentGlobalTagCloudModule | ComponentGlobalTextCardModule | ComponentGlobalTextDrawerModule | ComponentGlobalVideoModule | Error;

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type QrReader = {
  __typename?: 'QrReader';
  createdAt?: Maybe<Scalars['DateTime']>;
  isVisibleInListView?: Maybe<Scalars['Boolean']>;
  json?: Maybe<Scalars['JSON']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  versionNumber?: Maybe<Scalars['Int']>;
  versions?: Maybe<QrReaderRelationResponseCollection>;
  vuid?: Maybe<Scalars['String']>;
};


export type QrReaderVersionsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type QrReaderRelationResponseCollection = {
  __typename?: 'QrReaderRelationResponseCollection';
  data: Array<QrReaderEntity>;
};

export type QrReaderEntity = {
  __typename?: 'QrReaderEntity';
  attributes?: Maybe<QrReader>;
  id?: Maybe<Scalars['ID']>;
};

export type Room = {
  __typename?: 'Room';
  createdAt?: Maybe<Scalars['DateTime']>;
  floor?: Maybe<Scalars['String']>;
  isVisibleInListView?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<RoomRelationResponseCollection>;
  objects?: Maybe<StoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  versionNumber?: Maybe<Scalars['Int']>;
  versions?: Maybe<RoomRelationResponseCollection>;
  vuid?: Maybe<Scalars['String']>;
};


export type RoomLocalizationsArgs = {
  filters?: InputMaybe<RoomFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RoomObjectsArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RoomVersionsArgs = {
  filters?: InputMaybe<RoomFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RoomRelationResponseCollection = {
  __typename?: 'RoomRelationResponseCollection';
  data: Array<RoomEntity>;
};

export type RoomEntity = {
  __typename?: 'RoomEntity';
  attributes?: Maybe<Room>;
  id?: Maybe<Scalars['ID']>;
};

export type SiteConfig = {
  __typename?: 'SiteConfig';
  breadcrumbsLink?: Maybe<ComponentComponentsBreadcrumbsLink>;
  cookies?: Maybe<ComponentComponentsCookie>;
  copyright?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  footerPrimaryLinkItems?: Maybe<Array<Maybe<ComponentComponentsNavigationLinkComponent>>>;
  footerSecondaryLinkItems?: Maybe<Array<Maybe<ComponentComponentsNavigationLinkComponent>>>;
  footerTertiaryLinkItems?: Maybe<Array<Maybe<ComponentComponentsNavigationLinkComponent>>>;
  headerMenuItems?: Maybe<Array<Maybe<ComponentComponentsNavigationLinkComponent>>>;
  headerTitle: Scalars['String'];
  languageSwitcher: Scalars['Boolean'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SiteConfigRelationResponseCollection>;
  showQrScanner: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SiteConfigFooterPrimaryLinkItemsArgs = {
  filters?: InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SiteConfigFooterSecondaryLinkItemsArgs = {
  filters?: InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SiteConfigFooterTertiaryLinkItemsArgs = {
  filters?: InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SiteConfigHeaderMenuItemsArgs = {
  filters?: InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentComponentsNavigationLinkComponentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsNavigationLinkComponentFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  subTitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type SiteConfigRelationResponseCollection = {
  __typename?: 'SiteConfigRelationResponseCollection';
  data: Array<SiteConfigEntity>;
};

export type SiteConfigEntity = {
  __typename?: 'SiteConfigEntity';
  attributes?: Maybe<SiteConfig>;
  id?: Maybe<Scalars['ID']>;
};

export type SmbGuidepage = {
  __typename?: 'SmbGuidepage';
  createdAt?: Maybe<Scalars['DateTime']>;
  fallbackHeader?: Maybe<Scalars['String']>;
  fallbackText?: Maybe<Scalars['String']>;
  header_image?: Maybe<UploadFileEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SmbGuidepageRelationResponseCollection>;
  over_image_text?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SmbGuidepageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type SmbGuidepageRelationResponseCollection = {
  __typename?: 'SmbGuidepageRelationResponseCollection';
  data: Array<SmbGuidepageEntity>;
};

export type SmbGuidepageEntity = {
  __typename?: 'SmbGuidepageEntity';
  attributes?: Maybe<SmbGuidepage>;
  id?: Maybe<Scalars['ID']>;
};

export type SmbLandingpage = {
  __typename?: 'SmbLandingpage';
  createdAt?: Maybe<Scalars['DateTime']>;
  heroSwiperItems?: Maybe<Array<Maybe<ComponentConfigHeroSwiperItem>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SmbLandingpageRelationResponseCollection>;
  module?: Maybe<Array<Maybe<SmbLandingpageModuleDynamicZone>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SmbLandingpageHeroSwiperItemsArgs = {
  filters?: InputMaybe<ComponentConfigHeroSwiperItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SmbLandingpageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type ComponentConfigHeroSwiperItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentConfigHeroSwiperItemFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentConfigHeroSwiperItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentConfigHeroSwiperItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type SmbLandingpageRelationResponseCollection = {
  __typename?: 'SmbLandingpageRelationResponseCollection';
  data: Array<SmbLandingpageEntity>;
};

export type SmbLandingpageEntity = {
  __typename?: 'SmbLandingpageEntity';
  attributes?: Maybe<SmbLandingpage>;
  id?: Maybe<Scalars['ID']>;
};

export type SmbLandingpageModuleDynamicZone = ComponentComponentsSmbSection | Error;

export type SmbResearchpage = {
  __typename?: 'SmbResearchpage';
  createdAt?: Maybe<Scalars['DateTime']>;
  header?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SmbResearchpageRelationResponseCollection>;
  maintenance_text?: Maybe<Scalars['String']>;
  maintenance_text_long?: Maybe<Scalars['String']>;
  modalDialog?: Maybe<ComponentComponentsSmbResearchModal>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  show_maintenance_popup?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SmbResearchpageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type SmbResearchpageRelationResponseCollection = {
  __typename?: 'SmbResearchpageRelationResponseCollection';
  data: Array<SmbResearchpageEntity>;
};

export type SmbResearchpageEntity = {
  __typename?: 'SmbResearchpageEntity';
  attributes?: Maybe<SmbResearchpage>;
  id?: Maybe<Scalars['ID']>;
};

export type SmbSiteConfig = {
  __typename?: 'SmbSiteConfig';
  contactTextBlock?: Maybe<ComponentComponentsSmbTextCard>;
  contactVideoBlock?: Maybe<ComponentComponentsSmbVideoBlock>;
  copyright?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  headerMenuItems?: Maybe<Array<Maybe<ComponentComponentsSmbHeaderMenuItems>>>;
  legalPages?: Maybe<Array<Maybe<SmbSiteConfigLegalPagesDynamicZone>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SmbSiteConfigRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SmbSiteConfigHeaderMenuItemsArgs = {
  filters?: InputMaybe<ComponentComponentsSmbHeaderMenuItemsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SmbSiteConfigLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type ComponentComponentsSmbHeaderMenuItemsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsSmbHeaderMenuItemsFiltersInput>>>;
  headline?: InputMaybe<StringFilterInput>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsSmbHeaderMenuItemsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsSmbHeaderMenuItemsFiltersInput>>>;
  subHeadline?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
};

export type SmbSiteConfigLegalPagesDynamicZone = ComponentComponentsLegalPages | Error;

export type SmbSiteConfigRelationResponseCollection = {
  __typename?: 'SmbSiteConfigRelationResponseCollection';
  data: Array<SmbSiteConfigEntity>;
};

export type SmbSiteConfigEntity = {
  __typename?: 'SmbSiteConfigEntity';
  attributes?: Maybe<SmbSiteConfig>;
  id?: Maybe<Scalars['ID']>;
};

export type SmbTopicspage = {
  __typename?: 'SmbTopicspage';
  createdAt?: Maybe<Scalars['DateTime']>;
  heroFallbackAsset: UploadFileEntityResponse;
  heroFallbackHeader: Scalars['String'];
  heroFallbackText: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SmbTopicspageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SmbTopicspageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type SmbTopicspageRelationResponseCollection = {
  __typename?: 'SmbTopicspageRelationResponseCollection';
  data: Array<SmbTopicspageEntity>;
};

export type SmbTopicspageEntity = {
  __typename?: 'SmbTopicspageEntity';
  attributes?: Maybe<SmbTopicspage>;
  id?: Maybe<Scalars['ID']>;
};

export type Tour = {
  __typename?: 'Tour';
  createdAt?: Maybe<Scalars['DateTime']>;
  isVisibleInListView?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<TourRelationResponseCollection>;
  objects?: Maybe<StoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  teaser_image?: Maybe<UploadFileEntityResponse>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  versionNumber?: Maybe<Scalars['Int']>;
  versions?: Maybe<TourRelationResponseCollection>;
  vuid?: Maybe<Scalars['String']>;
};


export type TourLocalizationsArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TourObjectsArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type TourVersionsArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TourRelationResponseCollection = {
  __typename?: 'TourRelationResponseCollection';
  data: Array<TourEntity>;
};

export type TourEntity = {
  __typename?: 'TourEntity';
  attributes?: Maybe<Tour>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  sitemap_exclude?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type StoryModulesDynamicZone = ComponentGlobal3DModel | ComponentGlobal3DNewModel | ComponentGlobalCardImageModule | ComponentGlobalColorSeparatorModule | ComponentGlobalContentModule | ComponentGlobalEasyDbImageModule | ComponentGlobalFilterModule | ComponentGlobalImageBannerModule | ComponentGlobalImageMapModule | ComponentGlobalImagePlayerModule | ComponentGlobalImageScrollModule | ComponentGlobalLinkedStoriesModule | ComponentGlobalLinksModule | ComponentGlobalMediaModule | ComponentGlobalRichtextModule | ComponentGlobalRouteNavigationModule | ComponentGlobalSammlungOnlineAdapter | ComponentGlobalSeparatorModule | ComponentGlobalTagCarouselModule | ComponentGlobalTagCloudModule | ComponentGlobalTextCardModule | ComponentGlobalTextDrawerModule | ComponentGlobalVideoModule | Error;

export type RoomEntityResponse = {
  __typename?: 'RoomEntityResponse';
  data?: Maybe<RoomEntity>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type IndexEntityResponse = {
  __typename?: 'IndexEntityResponse';
  data?: Maybe<IndexEntity>;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type QrReaderEntityResponse = {
  __typename?: 'QrReaderEntityResponse';
  data?: Maybe<QrReaderEntity>;
};

export type RoomEntityResponseCollection = {
  __typename?: 'RoomEntityResponseCollection';
  data: Array<RoomEntity>;
  meta: ResponseCollectionMeta;
};

export type SiteConfigEntityResponse = {
  __typename?: 'SiteConfigEntityResponse';
  data?: Maybe<SiteConfigEntity>;
};

export type SmbGuidepageEntityResponse = {
  __typename?: 'SmbGuidepageEntityResponse';
  data?: Maybe<SmbGuidepageEntity>;
};

export type SmbLandingpageEntityResponse = {
  __typename?: 'SmbLandingpageEntityResponse';
  data?: Maybe<SmbLandingpageEntity>;
};

export type SmbResearchpageEntityResponse = {
  __typename?: 'SmbResearchpageEntityResponse';
  data?: Maybe<SmbResearchpageEntity>;
};

export type SmbSiteConfigEntityResponse = {
  __typename?: 'SmbSiteConfigEntityResponse';
  data?: Maybe<SmbSiteConfigEntity>;
};

export type SmbTopicspageEntityResponse = {
  __typename?: 'SmbTopicspageEntityResponse';
  data?: Maybe<SmbTopicspageEntity>;
};

export type StoryEntityResponseCollection = {
  __typename?: 'StoryEntityResponseCollection';
  data: Array<StoryEntity>;
  meta: ResponseCollectionMeta;
};

export type TopicEntityResponseCollection = {
  __typename?: 'TopicEntityResponseCollection';
  data: Array<TopicEntity>;
  meta: ResponseCollectionMeta;
};

export type TourEntityResponse = {
  __typename?: 'TourEntityResponse';
  data?: Maybe<TourEntity>;
};

export type TourEntityResponseCollection = {
  __typename?: 'TourEntityResponseCollection';
  data: Array<TourEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type StrapiIslQuery = {
  __typename?: 'strapi_islQuery';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  index?: Maybe<IndexEntityResponse>;
  me?: Maybe<UsersPermissionsMe>;
  qrReader?: Maybe<QrReaderEntityResponse>;
  room?: Maybe<RoomEntityResponse>;
  rooms?: Maybe<RoomEntityResponseCollection>;
  siteConfig?: Maybe<SiteConfigEntityResponse>;
  smbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  smbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  smbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  smbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  smbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  stories?: Maybe<StoryEntityResponseCollection>;
  story?: Maybe<StoryEntityResponse>;
  topic?: Maybe<TopicEntityResponse>;
  topics?: Maybe<TopicEntityResponseCollection>;
  tour?: Maybe<TourEntityResponse>;
  tours?: Maybe<TourEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type StrapiIslQueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslQueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiIslQueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQueryQrReaderArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQueryRoomArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslQueryRoomsArgs = {
  filters?: InputMaybe<RoomFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQuerySiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslQuerySmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQuerySmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQuerySmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQuerySmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQuerySmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiIslQueryStoriesArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryStoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslQueryTopicArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslQueryTopicsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryTourArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslQueryToursArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiIslQueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiIslQueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiIslQueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiIslQueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiIslQueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StrapiKgmQuery = {
  __typename?: 'strapi_kgmQuery';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  index?: Maybe<IndexEntityResponse>;
  me?: Maybe<UsersPermissionsMe>;
  qrReader?: Maybe<QrReaderEntityResponse>;
  room?: Maybe<RoomEntityResponse>;
  rooms?: Maybe<RoomEntityResponseCollection>;
  siteConfig?: Maybe<SiteConfigEntityResponse>;
  smbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  smbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  smbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  smbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  smbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  stories?: Maybe<StoryEntityResponseCollection>;
  story?: Maybe<StoryEntityResponse>;
  topic?: Maybe<TopicEntityResponse>;
  topics?: Maybe<TopicEntityResponseCollection>;
  tour?: Maybe<TourEntityResponse>;
  tours?: Maybe<TourEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type StrapiKgmQueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmQueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiKgmQueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQueryQrReaderArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQueryRoomArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmQueryRoomsArgs = {
  filters?: InputMaybe<RoomFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQuerySiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmQuerySmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQuerySmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQuerySmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQuerySmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQuerySmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiKgmQueryStoriesArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryStoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmQueryTopicArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmQueryTopicsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryTourArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmQueryToursArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiKgmQueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiKgmQueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiKgmQueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiKgmQueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiKgmQueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StrapiSmbQuery = {
  __typename?: 'strapi_smbQuery';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  index?: Maybe<IndexEntityResponse>;
  me?: Maybe<UsersPermissionsMe>;
  qrReader?: Maybe<QrReaderEntityResponse>;
  room?: Maybe<RoomEntityResponse>;
  rooms?: Maybe<RoomEntityResponseCollection>;
  siteConfig?: Maybe<SiteConfigEntityResponse>;
  smbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  smbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  smbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  smbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  smbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  stories?: Maybe<StoryEntityResponseCollection>;
  story?: Maybe<StoryEntityResponse>;
  topic?: Maybe<TopicEntityResponse>;
  topics?: Maybe<TopicEntityResponseCollection>;
  tour?: Maybe<TourEntityResponse>;
  tours?: Maybe<TourEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type StrapiSmbQueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbQueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiSmbQueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQueryQrReaderArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQueryRoomArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbQueryRoomsArgs = {
  filters?: InputMaybe<RoomFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQuerySiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbQuerySmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQuerySmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQuerySmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQuerySmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQuerySmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type StrapiSmbQueryStoriesArgs = {
  filters?: InputMaybe<StoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryStoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbQueryTopicArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbQueryTopicsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryTourArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbQueryToursArgs = {
  filters?: InputMaybe<TourFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiSmbQueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiSmbQueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiSmbQueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StrapiSmbQueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type StrapiSmbQueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  strapi_hbf?: Maybe<StrapiHbfMutation>;
  strapi_isl?: Maybe<StrapiIslMutation>;
  strapi_kgm?: Maybe<StrapiKgmMutation>;
  strapi_smb?: Maybe<StrapiSmbMutation>;
};

export type StrapiHbfMutation = {
  __typename?: 'strapi_hbfMutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createCategoryLocalization?: Maybe<CategoryEntityResponse>;
  createIndexLocalization?: Maybe<IndexEntityResponse>;
  createRoom?: Maybe<RoomEntityResponse>;
  createRoomLocalization?: Maybe<RoomEntityResponse>;
  createSiteConfigLocalization?: Maybe<SiteConfigEntityResponse>;
  createSmbGuidepageLocalization?: Maybe<SmbGuidepageEntityResponse>;
  createSmbLandingpageLocalization?: Maybe<SmbLandingpageEntityResponse>;
  createSmbResearchpageLocalization?: Maybe<SmbResearchpageEntityResponse>;
  createSmbSiteConfigLocalization?: Maybe<SmbSiteConfigEntityResponse>;
  createSmbTopicspageLocalization?: Maybe<SmbTopicspageEntityResponse>;
  createStory?: Maybe<StoryEntityResponse>;
  createStoryLocalization?: Maybe<StoryEntityResponse>;
  createTopic?: Maybe<TopicEntityResponse>;
  createTopicLocalization?: Maybe<TopicEntityResponse>;
  createTour?: Maybe<TourEntityResponse>;
  createTourLocalization?: Maybe<TourEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteIndex?: Maybe<IndexEntityResponse>;
  deleteQrReader?: Maybe<QrReaderEntityResponse>;
  deleteRoom?: Maybe<RoomEntityResponse>;
  deleteSiteConfig?: Maybe<SiteConfigEntityResponse>;
  deleteSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  deleteSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  deleteSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  deleteSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  deleteSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  deleteStory?: Maybe<StoryEntityResponse>;
  deleteTopic?: Maybe<TopicEntityResponse>;
  deleteTour?: Maybe<TourEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateIndex?: Maybe<IndexEntityResponse>;
  updateQrReader?: Maybe<QrReaderEntityResponse>;
  updateRoom?: Maybe<RoomEntityResponse>;
  updateSiteConfig?: Maybe<SiteConfigEntityResponse>;
  updateSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  updateSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  updateSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  updateSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  updateSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  updateStory?: Maybe<StoryEntityResponse>;
  updateTopic?: Maybe<TopicEntityResponse>;
  updateTour?: Maybe<TourEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type StrapiHbfMutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiHbfMutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateIndexLocalizationArgs = {
  data?: InputMaybe<IndexInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateRoomArgs = {
  data: RoomInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateRoomLocalizationArgs = {
  data?: InputMaybe<RoomInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateSiteConfigLocalizationArgs = {
  data?: InputMaybe<SiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateSmbGuidepageLocalizationArgs = {
  data?: InputMaybe<SmbGuidepageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateSmbLandingpageLocalizationArgs = {
  data?: InputMaybe<SmbLandingpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateSmbResearchpageLocalizationArgs = {
  data?: InputMaybe<SmbResearchpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateSmbSiteConfigLocalizationArgs = {
  data?: InputMaybe<SmbSiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateSmbTopicspageLocalizationArgs = {
  data?: InputMaybe<SmbTopicspageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateStoryArgs = {
  data: StoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateStoryLocalizationArgs = {
  data?: InputMaybe<StoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateTopicArgs = {
  data: TopicInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateTopicLocalizationArgs = {
  data?: InputMaybe<TopicInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateTourArgs = {
  data: TourInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateTourLocalizationArgs = {
  data?: InputMaybe<TourInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type StrapiHbfMutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type StrapiHbfMutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type StrapiHbfMutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type StrapiHbfMutationDeleteCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteRoomArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteSmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteSmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteSmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteSmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteSmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteStoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteTopicArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteTourArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type StrapiHbfMutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type StrapiHbfMutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type StrapiHbfMutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type StrapiHbfMutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type StrapiHbfMutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type StrapiHbfMutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type StrapiHbfMutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type StrapiHbfMutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type StrapiHbfMutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type StrapiHbfMutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiHbfMutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type StrapiHbfMutationUpdateIndexArgs = {
  data: IndexInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateQrReaderArgs = {
  data: QrReaderInput;
};


export type StrapiHbfMutationUpdateRoomArgs = {
  data: RoomInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateSiteConfigArgs = {
  data: SiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateSmbGuidepageArgs = {
  data: SmbGuidepageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateSmbLandingpageArgs = {
  data: SmbLandingpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateSmbResearchpageArgs = {
  data: SmbResearchpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateSmbSiteConfigArgs = {
  data: SmbSiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateSmbTopicspageArgs = {
  data: SmbTopicspageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateStoryArgs = {
  data: StoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateTopicArgs = {
  data: TopicInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateTourArgs = {
  data: TourInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiHbfMutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type StrapiHbfMutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type StrapiHbfMutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type StrapiHbfMutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type StrapiHbfMutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type CategoryInput = {
  hero?: InputMaybe<ComponentGlobalRichtextModuleInput>;
  isVisibleInListView?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  stories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  subtitle?: InputMaybe<Scalars['String']>;
  teaser_image?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  versionNumber?: InputMaybe<Scalars['Int']>;
  versions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  vuid?: InputMaybe<Scalars['String']>;
};

export type ComponentGlobalRichtextModuleInput = {
  id?: InputMaybe<Scalars['ID']>;
  richText?: InputMaybe<ComponentComponentsRichTextComponentInput>;
  showInMenu?: InputMaybe<Scalars['Boolean']>;
  theme?: InputMaybe<ComponentConfigThemeInput>;
};

export type ComponentComponentsRichTextComponentInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  layout?: InputMaybe<EnumComponentcomponentsrichtextcomponentLayout>;
  level?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  textColumns?: InputMaybe<EnumComponentcomponentsrichtextcomponentTextcolumns>;
};

export type ComponentConfigThemeInput = {
  id?: InputMaybe<Scalars['ID']>;
  themes?: InputMaybe<EnumComponentconfigthemeThemes>;
};

export type IndexInput = {
  config?: InputMaybe<ComponentConfigIndexConfigInput>;
  modules?: InputMaybe<Array<Scalars['IndexModulesDynamicZoneInput']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentConfigIndexConfigInput = {
  id?: InputMaybe<Scalars['ID']>;
  teaser_iamge?: InputMaybe<Scalars['ID']>;
  teaser_text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RoomInput = {
  floor?: InputMaybe<Scalars['String']>;
  isVisibleInListView?: InputMaybe<Scalars['Boolean']>;
  objects?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  versionNumber?: InputMaybe<Scalars['Int']>;
  versions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  vuid?: InputMaybe<Scalars['String']>;
};

export type SiteConfigInput = {
  breadcrumbsLink?: InputMaybe<ComponentComponentsBreadcrumbsLinkInput>;
  cookies?: InputMaybe<ComponentComponentsCookieInput>;
  copyright?: InputMaybe<Scalars['String']>;
  footerPrimaryLinkItems?: InputMaybe<Array<InputMaybe<ComponentComponentsNavigationLinkComponentInput>>>;
  footerSecondaryLinkItems?: InputMaybe<Array<InputMaybe<ComponentComponentsNavigationLinkComponentInput>>>;
  footerTertiaryLinkItems?: InputMaybe<Array<InputMaybe<ComponentComponentsNavigationLinkComponentInput>>>;
  headerMenuItems?: InputMaybe<Array<InputMaybe<ComponentComponentsNavigationLinkComponentInput>>>;
  headerTitle?: InputMaybe<Scalars['String']>;
  languageSwitcher?: InputMaybe<Scalars['Boolean']>;
  showQrScanner?: InputMaybe<Scalars['Boolean']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentComponentsBreadcrumbsLinkInput = {
  collapseText?: InputMaybe<Scalars['String']>;
  expandText?: InputMaybe<Scalars['String']>;
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentComponentsCookieInput = {
  button?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  overlayText?: InputMaybe<Scalars['String']>;
  showCookie?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type ComponentComponentsNavigationLinkComponentInput = {
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<EnumComponentcomponentsnavigationlinkcomponentSlug>;
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SmbGuidepageInput = {
  fallbackHeader?: InputMaybe<Scalars['String']>;
  fallbackText?: InputMaybe<Scalars['String']>;
  header_image?: InputMaybe<Scalars['ID']>;
  over_image_text?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type SmbLandingpageInput = {
  heroSwiperItems?: InputMaybe<Array<InputMaybe<ComponentConfigHeroSwiperItemInput>>>;
  module?: InputMaybe<Array<Scalars['SmbLandingpageModuleDynamicZoneInput']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentConfigHeroSwiperItemInput = {
  caption?: InputMaybe<Scalars['String']>;
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['ID']>;
  mobileImage?: InputMaybe<Scalars['ID']>;
  tabletImage?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SmbResearchpageInput = {
  header?: InputMaybe<Scalars['String']>;
  maintenance_text?: InputMaybe<Scalars['String']>;
  maintenance_text_long?: InputMaybe<Scalars['String']>;
  modalDialog?: InputMaybe<ComponentComponentsSmbResearchModalInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  show_maintenance_popup?: InputMaybe<Scalars['Boolean']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentComponentsSmbResearchModalInput = {
  downloadSection?: InputMaybe<ComponentComponentsSmbDownloadModuleInput>;
  id?: InputMaybe<Scalars['ID']>;
  webSection?: InputMaybe<ComponentComponentsSmbWebModuleInput>;
};

export type ComponentComponentsSmbDownloadModuleInput = {
  buttonText?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
};

export type ComponentComponentsSmbWebModuleInput = {
  buttonLink?: InputMaybe<Scalars['String']>;
  buttonText?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
};

export type SmbSiteConfigInput = {
  contactTextBlock?: InputMaybe<ComponentComponentsSmbTextCardInput>;
  contactVideoBlock?: InputMaybe<ComponentComponentsSmbVideoBlockInput>;
  copyright?: InputMaybe<Scalars['String']>;
  headerMenuItems?: InputMaybe<Array<InputMaybe<ComponentComponentsSmbHeaderMenuItemsInput>>>;
  legalPages?: InputMaybe<Array<Scalars['SmbSiteConfigLegalPagesDynamicZoneInput']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentComponentsSmbTextCardInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  linkText?: InputMaybe<Scalars['String']>;
  linkUrl?: InputMaybe<Scalars['String']>;
  subHeadline?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type ComponentComponentsSmbVideoBlockInput = {
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  linkText?: InputMaybe<Scalars['String']>;
  linkUrl?: InputMaybe<Scalars['String']>;
  subHeadline?: InputMaybe<Scalars['String']>;
};

export type ComponentComponentsSmbHeaderMenuItemsInput = {
  headline?: InputMaybe<Scalars['String']>;
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  subHeadline?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EnumComponentcomponentssmbheadermenuitemsType>;
};

export type SmbTopicspageInput = {
  heroFallbackAsset?: InputMaybe<Scalars['ID']>;
  heroFallbackHeader?: InputMaybe<Scalars['String']>;
  heroFallbackText?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type StoryInput = {
  category?: InputMaybe<Scalars['ID']>;
  config?: InputMaybe<ComponentConfigPageConfigInput>;
  displayInHero?: InputMaybe<Scalars['Boolean']>;
  isVisibleInListView?: InputMaybe<Scalars['Boolean']>;
  modules?: InputMaybe<Array<Scalars['StoryModulesDynamicZoneInput']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  room?: InputMaybe<Scalars['ID']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  topic?: InputMaybe<Scalars['ID']>;
  tours?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  versionNumber?: InputMaybe<Scalars['Int']>;
  versions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  vuid?: InputMaybe<Scalars['String']>;
};

export type ComponentConfigPageConfigInput = {
  author?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  teaser_image?: InputMaybe<Scalars['ID']>;
  teaser_text?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['String']>;
};

export type TopicInput = {
  isVisibleInListView?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seperator_01?: InputMaybe<ComponentGlobalColorSeparatorModuleInput>;
  seperator_02?: InputMaybe<ComponentGlobalColorSeparatorModuleInput>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  stories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  tagCloud?: InputMaybe<ComponentGlobalTagCloudModuleInput>;
  text?: InputMaybe<Scalars['String']>;
  textCard?: InputMaybe<ComponentGlobalTextCardModuleInput>;
  title?: InputMaybe<Scalars['String']>;
  versionNumber?: InputMaybe<Scalars['Int']>;
  versions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  vuid?: InputMaybe<Scalars['String']>;
};

export type ComponentGlobalColorSeparatorModuleInput = {
  id?: InputMaybe<Scalars['ID']>;
  theme?: InputMaybe<ComponentConfigThemeInput>;
};

export type ComponentGlobalTagCloudModuleInput = {
  id?: InputMaybe<Scalars['ID']>;
  primaryTags?: InputMaybe<Array<InputMaybe<ComponentComponentsTagComponentInput>>>;
  quaternaryTags?: InputMaybe<Array<InputMaybe<ComponentComponentsTagComponentInput>>>;
  secondaryTags?: InputMaybe<Array<InputMaybe<ComponentComponentsTagComponentInput>>>;
  tagsSeparator?: InputMaybe<Scalars['Boolean']>;
  tertiaryTags?: InputMaybe<Array<InputMaybe<ComponentComponentsTagComponentInput>>>;
  theme?: InputMaybe<ComponentConfigThemeInput>;
};

export type ComponentComponentsTagComponentInput = {
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  story?: InputMaybe<Scalars['ID']>;
  tag?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<EnumComponentcomponentstagcomponentWeight>;
};

export type ComponentGlobalTextCardModuleInput = {
  buttonLink?: InputMaybe<ComponentComponentsSimpleLinkInput>;
  cardHeadline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  separatorHeadline?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<ComponentConfigThemeInput>;
};

export type ComponentComponentsSimpleLinkInput = {
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TourInput = {
  isVisibleInListView?: InputMaybe<Scalars['Boolean']>;
  objects?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  teaser_image?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  versionNumber?: InputMaybe<Scalars['Int']>;
  versions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  vuid?: InputMaybe<Scalars['String']>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QrReaderInput = {
  isVisibleInListView?: InputMaybe<Scalars['Boolean']>;
  json?: InputMaybe<Scalars['JSON']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sitemap_exclude?: InputMaybe<Scalars['Boolean']>;
  versionNumber?: InputMaybe<Scalars['Int']>;
  versions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  vuid?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type StrapiIslMutation = {
  __typename?: 'strapi_islMutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createCategoryLocalization?: Maybe<CategoryEntityResponse>;
  createIndexLocalization?: Maybe<IndexEntityResponse>;
  createRoom?: Maybe<RoomEntityResponse>;
  createRoomLocalization?: Maybe<RoomEntityResponse>;
  createSiteConfigLocalization?: Maybe<SiteConfigEntityResponse>;
  createSmbGuidepageLocalization?: Maybe<SmbGuidepageEntityResponse>;
  createSmbLandingpageLocalization?: Maybe<SmbLandingpageEntityResponse>;
  createSmbResearchpageLocalization?: Maybe<SmbResearchpageEntityResponse>;
  createSmbSiteConfigLocalization?: Maybe<SmbSiteConfigEntityResponse>;
  createSmbTopicspageLocalization?: Maybe<SmbTopicspageEntityResponse>;
  createStory?: Maybe<StoryEntityResponse>;
  createStoryLocalization?: Maybe<StoryEntityResponse>;
  createTopic?: Maybe<TopicEntityResponse>;
  createTopicLocalization?: Maybe<TopicEntityResponse>;
  createTour?: Maybe<TourEntityResponse>;
  createTourLocalization?: Maybe<TourEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteIndex?: Maybe<IndexEntityResponse>;
  deleteQrReader?: Maybe<QrReaderEntityResponse>;
  deleteRoom?: Maybe<RoomEntityResponse>;
  deleteSiteConfig?: Maybe<SiteConfigEntityResponse>;
  deleteSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  deleteSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  deleteSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  deleteSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  deleteSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  deleteStory?: Maybe<StoryEntityResponse>;
  deleteTopic?: Maybe<TopicEntityResponse>;
  deleteTour?: Maybe<TourEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateIndex?: Maybe<IndexEntityResponse>;
  updateQrReader?: Maybe<QrReaderEntityResponse>;
  updateRoom?: Maybe<RoomEntityResponse>;
  updateSiteConfig?: Maybe<SiteConfigEntityResponse>;
  updateSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  updateSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  updateSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  updateSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  updateSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  updateStory?: Maybe<StoryEntityResponse>;
  updateTopic?: Maybe<TopicEntityResponse>;
  updateTour?: Maybe<TourEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type StrapiIslMutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiIslMutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateIndexLocalizationArgs = {
  data?: InputMaybe<IndexInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateRoomArgs = {
  data: RoomInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateRoomLocalizationArgs = {
  data?: InputMaybe<RoomInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateSiteConfigLocalizationArgs = {
  data?: InputMaybe<SiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateSmbGuidepageLocalizationArgs = {
  data?: InputMaybe<SmbGuidepageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateSmbLandingpageLocalizationArgs = {
  data?: InputMaybe<SmbLandingpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateSmbResearchpageLocalizationArgs = {
  data?: InputMaybe<SmbResearchpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateSmbSiteConfigLocalizationArgs = {
  data?: InputMaybe<SmbSiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateSmbTopicspageLocalizationArgs = {
  data?: InputMaybe<SmbTopicspageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateStoryArgs = {
  data: StoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateStoryLocalizationArgs = {
  data?: InputMaybe<StoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateTopicArgs = {
  data: TopicInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateTopicLocalizationArgs = {
  data?: InputMaybe<TopicInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateTourArgs = {
  data: TourInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateTourLocalizationArgs = {
  data?: InputMaybe<TourInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type StrapiIslMutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type StrapiIslMutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type StrapiIslMutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type StrapiIslMutationDeleteCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteRoomArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteSmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteSmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteSmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteSmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteSmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteStoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteTopicArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteTourArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type StrapiIslMutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type StrapiIslMutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type StrapiIslMutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type StrapiIslMutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type StrapiIslMutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type StrapiIslMutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type StrapiIslMutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type StrapiIslMutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type StrapiIslMutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type StrapiIslMutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiIslMutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type StrapiIslMutationUpdateIndexArgs = {
  data: IndexInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateQrReaderArgs = {
  data: QrReaderInput;
};


export type StrapiIslMutationUpdateRoomArgs = {
  data: RoomInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateSiteConfigArgs = {
  data: SiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateSmbGuidepageArgs = {
  data: SmbGuidepageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateSmbLandingpageArgs = {
  data: SmbLandingpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateSmbResearchpageArgs = {
  data: SmbResearchpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateSmbSiteConfigArgs = {
  data: SmbSiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateSmbTopicspageArgs = {
  data: SmbTopicspageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateStoryArgs = {
  data: StoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateTopicArgs = {
  data: TopicInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateTourArgs = {
  data: TourInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiIslMutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type StrapiIslMutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type StrapiIslMutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type StrapiIslMutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type StrapiIslMutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type StrapiKgmMutation = {
  __typename?: 'strapi_kgmMutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createCategoryLocalization?: Maybe<CategoryEntityResponse>;
  createIndexLocalization?: Maybe<IndexEntityResponse>;
  createRoom?: Maybe<RoomEntityResponse>;
  createRoomLocalization?: Maybe<RoomEntityResponse>;
  createSiteConfigLocalization?: Maybe<SiteConfigEntityResponse>;
  createSmbGuidepageLocalization?: Maybe<SmbGuidepageEntityResponse>;
  createSmbLandingpageLocalization?: Maybe<SmbLandingpageEntityResponse>;
  createSmbResearchpageLocalization?: Maybe<SmbResearchpageEntityResponse>;
  createSmbSiteConfigLocalization?: Maybe<SmbSiteConfigEntityResponse>;
  createSmbTopicspageLocalization?: Maybe<SmbTopicspageEntityResponse>;
  createStory?: Maybe<StoryEntityResponse>;
  createStoryLocalization?: Maybe<StoryEntityResponse>;
  createTopic?: Maybe<TopicEntityResponse>;
  createTopicLocalization?: Maybe<TopicEntityResponse>;
  createTour?: Maybe<TourEntityResponse>;
  createTourLocalization?: Maybe<TourEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteIndex?: Maybe<IndexEntityResponse>;
  deleteQrReader?: Maybe<QrReaderEntityResponse>;
  deleteRoom?: Maybe<RoomEntityResponse>;
  deleteSiteConfig?: Maybe<SiteConfigEntityResponse>;
  deleteSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  deleteSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  deleteSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  deleteSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  deleteSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  deleteStory?: Maybe<StoryEntityResponse>;
  deleteTopic?: Maybe<TopicEntityResponse>;
  deleteTour?: Maybe<TourEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateIndex?: Maybe<IndexEntityResponse>;
  updateQrReader?: Maybe<QrReaderEntityResponse>;
  updateRoom?: Maybe<RoomEntityResponse>;
  updateSiteConfig?: Maybe<SiteConfigEntityResponse>;
  updateSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  updateSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  updateSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  updateSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  updateSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  updateStory?: Maybe<StoryEntityResponse>;
  updateTopic?: Maybe<TopicEntityResponse>;
  updateTour?: Maybe<TourEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type StrapiKgmMutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiKgmMutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateIndexLocalizationArgs = {
  data?: InputMaybe<IndexInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateRoomArgs = {
  data: RoomInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateRoomLocalizationArgs = {
  data?: InputMaybe<RoomInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateSiteConfigLocalizationArgs = {
  data?: InputMaybe<SiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateSmbGuidepageLocalizationArgs = {
  data?: InputMaybe<SmbGuidepageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateSmbLandingpageLocalizationArgs = {
  data?: InputMaybe<SmbLandingpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateSmbResearchpageLocalizationArgs = {
  data?: InputMaybe<SmbResearchpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateSmbSiteConfigLocalizationArgs = {
  data?: InputMaybe<SmbSiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateSmbTopicspageLocalizationArgs = {
  data?: InputMaybe<SmbTopicspageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateStoryArgs = {
  data: StoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateStoryLocalizationArgs = {
  data?: InputMaybe<StoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateTopicArgs = {
  data: TopicInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateTopicLocalizationArgs = {
  data?: InputMaybe<TopicInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateTourArgs = {
  data: TourInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateTourLocalizationArgs = {
  data?: InputMaybe<TourInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type StrapiKgmMutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type StrapiKgmMutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type StrapiKgmMutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type StrapiKgmMutationDeleteCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteRoomArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteSmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteSmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteSmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteSmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteSmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteStoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteTopicArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteTourArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type StrapiKgmMutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type StrapiKgmMutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type StrapiKgmMutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type StrapiKgmMutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type StrapiKgmMutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type StrapiKgmMutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type StrapiKgmMutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type StrapiKgmMutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type StrapiKgmMutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type StrapiKgmMutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiKgmMutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type StrapiKgmMutationUpdateIndexArgs = {
  data: IndexInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateQrReaderArgs = {
  data: QrReaderInput;
};


export type StrapiKgmMutationUpdateRoomArgs = {
  data: RoomInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateSiteConfigArgs = {
  data: SiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateSmbGuidepageArgs = {
  data: SmbGuidepageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateSmbLandingpageArgs = {
  data: SmbLandingpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateSmbResearchpageArgs = {
  data: SmbResearchpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateSmbSiteConfigArgs = {
  data: SmbSiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateSmbTopicspageArgs = {
  data: SmbTopicspageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateStoryArgs = {
  data: StoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateTopicArgs = {
  data: TopicInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateTourArgs = {
  data: TourInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiKgmMutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type StrapiKgmMutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type StrapiKgmMutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type StrapiKgmMutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type StrapiKgmMutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type StrapiSmbMutation = {
  __typename?: 'strapi_smbMutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createCategoryLocalization?: Maybe<CategoryEntityResponse>;
  createIndexLocalization?: Maybe<IndexEntityResponse>;
  createRoom?: Maybe<RoomEntityResponse>;
  createRoomLocalization?: Maybe<RoomEntityResponse>;
  createSiteConfigLocalization?: Maybe<SiteConfigEntityResponse>;
  createSmbGuidepageLocalization?: Maybe<SmbGuidepageEntityResponse>;
  createSmbLandingpageLocalization?: Maybe<SmbLandingpageEntityResponse>;
  createSmbResearchpageLocalization?: Maybe<SmbResearchpageEntityResponse>;
  createSmbSiteConfigLocalization?: Maybe<SmbSiteConfigEntityResponse>;
  createSmbTopicspageLocalization?: Maybe<SmbTopicspageEntityResponse>;
  createStory?: Maybe<StoryEntityResponse>;
  createStoryLocalization?: Maybe<StoryEntityResponse>;
  createTopic?: Maybe<TopicEntityResponse>;
  createTopicLocalization?: Maybe<TopicEntityResponse>;
  createTour?: Maybe<TourEntityResponse>;
  createTourLocalization?: Maybe<TourEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteIndex?: Maybe<IndexEntityResponse>;
  deleteQrReader?: Maybe<QrReaderEntityResponse>;
  deleteRoom?: Maybe<RoomEntityResponse>;
  deleteSiteConfig?: Maybe<SiteConfigEntityResponse>;
  deleteSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  deleteSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  deleteSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  deleteSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  deleteSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  deleteStory?: Maybe<StoryEntityResponse>;
  deleteTopic?: Maybe<TopicEntityResponse>;
  deleteTour?: Maybe<TourEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateIndex?: Maybe<IndexEntityResponse>;
  updateQrReader?: Maybe<QrReaderEntityResponse>;
  updateRoom?: Maybe<RoomEntityResponse>;
  updateSiteConfig?: Maybe<SiteConfigEntityResponse>;
  updateSmbGuidepage?: Maybe<SmbGuidepageEntityResponse>;
  updateSmbLandingpage?: Maybe<SmbLandingpageEntityResponse>;
  updateSmbResearchpage?: Maybe<SmbResearchpageEntityResponse>;
  updateSmbSiteConfig?: Maybe<SmbSiteConfigEntityResponse>;
  updateSmbTopicspage?: Maybe<SmbTopicspageEntityResponse>;
  updateStory?: Maybe<StoryEntityResponse>;
  updateTopic?: Maybe<TopicEntityResponse>;
  updateTour?: Maybe<TourEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type StrapiSmbMutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiSmbMutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateCategoryLocalizationArgs = {
  data?: InputMaybe<CategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateIndexLocalizationArgs = {
  data?: InputMaybe<IndexInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateRoomArgs = {
  data: RoomInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateRoomLocalizationArgs = {
  data?: InputMaybe<RoomInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateSiteConfigLocalizationArgs = {
  data?: InputMaybe<SiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateSmbGuidepageLocalizationArgs = {
  data?: InputMaybe<SmbGuidepageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateSmbLandingpageLocalizationArgs = {
  data?: InputMaybe<SmbLandingpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateSmbResearchpageLocalizationArgs = {
  data?: InputMaybe<SmbResearchpageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateSmbSiteConfigLocalizationArgs = {
  data?: InputMaybe<SmbSiteConfigInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateSmbTopicspageLocalizationArgs = {
  data?: InputMaybe<SmbTopicspageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateStoryArgs = {
  data: StoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateStoryLocalizationArgs = {
  data?: InputMaybe<StoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateTopicArgs = {
  data: TopicInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateTopicLocalizationArgs = {
  data?: InputMaybe<TopicInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateTourArgs = {
  data: TourInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateTourLocalizationArgs = {
  data?: InputMaybe<TourInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type StrapiSmbMutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type StrapiSmbMutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type StrapiSmbMutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type StrapiSmbMutationDeleteCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteIndexArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteRoomArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteSmbGuidepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteSmbLandingpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteSmbResearchpageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteSmbSiteConfigArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteSmbTopicspageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteStoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteTopicArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteTourArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type StrapiSmbMutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type StrapiSmbMutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type StrapiSmbMutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type StrapiSmbMutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type StrapiSmbMutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type StrapiSmbMutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type StrapiSmbMutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type StrapiSmbMutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type StrapiSmbMutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type StrapiSmbMutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type StrapiSmbMutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type StrapiSmbMutationUpdateIndexArgs = {
  data: IndexInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateQrReaderArgs = {
  data: QrReaderInput;
};


export type StrapiSmbMutationUpdateRoomArgs = {
  data: RoomInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateSiteConfigArgs = {
  data: SiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateSmbGuidepageArgs = {
  data: SmbGuidepageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateSmbLandingpageArgs = {
  data: SmbLandingpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateSmbResearchpageArgs = {
  data: SmbResearchpageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateSmbSiteConfigArgs = {
  data: SmbSiteConfigInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateSmbTopicspageArgs = {
  data: SmbTopicspageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateStoryArgs = {
  data: StoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateTopicArgs = {
  data: TopicInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateTourArgs = {
  data: TourInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type StrapiSmbMutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type StrapiSmbMutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type StrapiSmbMutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type StrapiSmbMutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type StrapiSmbMutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "smb.assortments" */
  smb_assortments: Array<SmbAssortments>;
  /** fetch data from the table in a streaming manner: "smb.assortments" */
  smb_assortments_stream: Array<SmbAssortments>;
  /** fetch data from the table: "smb.assortments_translation" */
  smb_assortments_translation: Array<SmbAssortmentsTranslation>;
  /** fetch data from the table in a streaming manner: "smb.assortments_translation" */
  smb_assortments_translation_stream: Array<SmbAssortmentsTranslation>;
  /** fetch data from the table: "smb.attachments" */
  smb_attachments: Array<SmbAttachments>;
  /** fetch data from the table in a streaming manner: "smb.attachments" */
  smb_attachments_stream: Array<SmbAttachments>;
  /** fetch data from the table: "smb.attribute_translations" */
  smb_attribute_translations: Array<SmbAttributeTranslations>;
  /** fetch data from the table in a streaming manner: "smb.attribute_translations" */
  smb_attribute_translations_stream: Array<SmbAttributeTranslations>;
  /** fetch data from the table: "smb.attributes" */
  smb_attributes: Array<SmbAttributes>;
  /** fetch data from the table: "smb.attributes" using primary key columns */
  smb_attributes_by_pk?: Maybe<SmbAttributes>;
  /** fetch data from the table in a streaming manner: "smb.attributes" */
  smb_attributes_stream: Array<SmbAttributes>;
  /** fetch data from the table: "smb.buildings" */
  smb_buildings: Array<SmbBuildings>;
  /** fetch data from the table: "smb.buildings" using primary key columns */
  smb_buildings_by_pk?: Maybe<SmbBuildings>;
  /** fetch data from the table in a streaming manner: "smb.buildings" */
  smb_buildings_stream: Array<SmbBuildings>;
  /** fetch data from the table: "smb.collections" */
  smb_collections: Array<SmbCollections>;
  /** fetch data from the table: "smb.collections" using primary key columns */
  smb_collections_by_pk?: Maybe<SmbCollections>;
  /** fetch data from the table in a streaming manner: "smb.collections" */
  smb_collections_stream: Array<SmbCollections>;
  /** fetch data from the table: "smb.cultural_references" */
  smb_cultural_references: Array<SmbCulturalReferences>;
  /** fetch data from the table in a streaming manner: "smb.cultural_references" */
  smb_cultural_references_stream: Array<SmbCulturalReferences>;
  /** fetch data from the table: "smb.exhibitions" */
  smb_exhibitions: Array<SmbExhibitions>;
  /** fetch data from the table in a streaming manner: "smb.exhibitions" */
  smb_exhibitions_stream: Array<SmbExhibitions>;
  /** fetch data from the table: "smb.geographical_references" */
  smb_geographical_references: Array<SmbGeographicalReferences>;
  /** fetch data from the table in a streaming manner: "smb.geographical_references" */
  smb_geographical_references_stream: Array<SmbGeographicalReferences>;
  /** fetch data from the table: "smb.highlights" */
  smb_highlights: Array<SmbHighlights>;
  /** fetch aggregated fields from the table: "smb.highlights" */
  smb_highlights_aggregate: SmbHighlightsAggregate;
  /** fetch data from the table in a streaming manner: "smb.highlights" */
  smb_highlights_stream: Array<SmbHighlights>;
  /** fetch data from the table: "smb.language" */
  smb_language: Array<SmbLanguage>;
  /** fetch data from the table in a streaming manner: "smb.language" */
  smb_language_stream: Array<SmbLanguage>;
  /** fetch data from the table: "smb.licenses" */
  smb_licenses: Array<SmbLicenses>;
  /** fetch data from the table in a streaming manner: "smb.licenses" */
  smb_licenses_stream: Array<SmbLicenses>;
  /** fetch data from the table: "smb.licenses_translation" */
  smb_licenses_translation: Array<SmbLicensesTranslation>;
  /** fetch data from the table in a streaming manner: "smb.licenses_translation" */
  smb_licenses_translation_stream: Array<SmbLicensesTranslation>;
  /** fetch data from the table: "smb.material_references" */
  smb_material_references: Array<SmbMaterialReferences>;
  /** fetch data from the table in a streaming manner: "smb.material_references" */
  smb_material_references_stream: Array<SmbMaterialReferences>;
  /** fetch data from the table: "smb.objects" */
  smb_objects: Array<SmbObjects>;
  /** fetch aggregated fields from the table: "smb.objects" */
  smb_objects_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.objects" using primary key columns */
  smb_objects_by_pk?: Maybe<SmbObjects>;
  /** fetch data from the table in a streaming manner: "smb.objects" */
  smb_objects_stream: Array<SmbObjects>;
  /** fetch data from the table: "smb.org_unit" */
  smb_org_unit: Array<SmbOrgUnit>;
  /** fetch data from the table in a streaming manner: "smb.org_unit" */
  smb_org_unit_stream: Array<SmbOrgUnit>;
  /** fetch data from the table: "smb.persons" */
  smb_persons: Array<SmbPersons>;
  /** fetch data from the table: "smb.persons_objects" */
  smb_persons_objects: Array<SmbPersonsObjects>;
  /** fetch data from the table in a streaming manner: "smb.persons_objects" */
  smb_persons_objects_stream: Array<SmbPersonsObjects>;
  /** fetch data from the table in a streaming manner: "smb.persons" */
  smb_persons_stream: Array<SmbPersons>;
  /** fetch data from the table: "smb.stt_platform_config" */
  smb_stt_platform_config: Array<SmbSttPlatformConfig>;
  /** fetch data from the table in a streaming manner: "smb.stt_platform_config" */
  smb_stt_platform_config_stream: Array<SmbSttPlatformConfig>;
  /** fetch data from the table: "smb.thesaurus" */
  smb_thesaurus: Array<SmbThesaurus>;
  /** fetch data from the table in a streaming manner: "smb.thesaurus" */
  smb_thesaurus_stream: Array<SmbThesaurus>;
  /** fetch data from the table: "smb.thesaurus_translations" */
  smb_thesaurus_translations: Array<SmbThesaurusTranslations>;
  /** fetch data from the table in a streaming manner: "smb.thesaurus_translations" */
  smb_thesaurus_translations_stream: Array<SmbThesaurusTranslations>;
  /** fetch data from the table: "smb.user" */
  smb_user: Array<SmbUser>;
  /** fetch data from the table in a streaming manner: "smb.user" */
  smb_user_stream: Array<SmbUser>;
};


export type SubscriptionRootSmbAssortmentsArgs = {
  distinct_on?: InputMaybe<Array<SmbAssortmentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAssortmentsOrderBy>>;
  where?: InputMaybe<SmbAssortmentsBoolExp>;
};


export type SubscriptionRootSmbAssortmentsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbAssortmentsStreamCursorInput>>;
  where?: InputMaybe<SmbAssortmentsBoolExp>;
};


export type SubscriptionRootSmbAssortmentsTranslationArgs = {
  distinct_on?: InputMaybe<Array<SmbAssortmentsTranslationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAssortmentsTranslationOrderBy>>;
  where?: InputMaybe<SmbAssortmentsTranslationBoolExp>;
};


export type SubscriptionRootSmbAssortmentsTranslationStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbAssortmentsTranslationStreamCursorInput>>;
  where?: InputMaybe<SmbAssortmentsTranslationBoolExp>;
};


export type SubscriptionRootSmbAttachmentsArgs = {
  distinct_on?: InputMaybe<Array<SmbAttachmentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttachmentsOrderBy>>;
  where?: InputMaybe<SmbAttachmentsBoolExp>;
};


export type SubscriptionRootSmbAttachmentsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbAttachmentsStreamCursorInput>>;
  where?: InputMaybe<SmbAttachmentsBoolExp>;
};


export type SubscriptionRootSmbAttributeTranslationsArgs = {
  distinct_on?: InputMaybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: InputMaybe<SmbAttributeTranslationsBoolExp>;
};


export type SubscriptionRootSmbAttributeTranslationsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbAttributeTranslationsStreamCursorInput>>;
  where?: InputMaybe<SmbAttributeTranslationsBoolExp>;
};


export type SubscriptionRootSmbAttributesArgs = {
  distinct_on?: InputMaybe<Array<SmbAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbAttributesOrderBy>>;
  where?: InputMaybe<SmbAttributesBoolExp>;
};


export type SubscriptionRootSmbAttributesByPkArgs = {
  key: Scalars['String'];
};


export type SubscriptionRootSmbAttributesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbAttributesStreamCursorInput>>;
  where?: InputMaybe<SmbAttributesBoolExp>;
};


export type SubscriptionRootSmbBuildingsArgs = {
  distinct_on?: InputMaybe<Array<SmbBuildingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbBuildingsOrderBy>>;
  where?: InputMaybe<SmbBuildingsBoolExp>;
};


export type SubscriptionRootSmbBuildingsByPkArgs = {
  key: Scalars['String'];
};


export type SubscriptionRootSmbBuildingsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbBuildingsStreamCursorInput>>;
  where?: InputMaybe<SmbBuildingsBoolExp>;
};


export type SubscriptionRootSmbCollectionsArgs = {
  distinct_on?: InputMaybe<Array<SmbCollectionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbCollectionsOrderBy>>;
  where?: InputMaybe<SmbCollectionsBoolExp>;
};


export type SubscriptionRootSmbCollectionsByPkArgs = {
  key: Scalars['String'];
};


export type SubscriptionRootSmbCollectionsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbCollectionsStreamCursorInput>>;
  where?: InputMaybe<SmbCollectionsBoolExp>;
};


export type SubscriptionRootSmbCulturalReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbCulturalReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbCulturalReferencesOrderBy>>;
  where?: InputMaybe<SmbCulturalReferencesBoolExp>;
};


export type SubscriptionRootSmbCulturalReferencesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbCulturalReferencesStreamCursorInput>>;
  where?: InputMaybe<SmbCulturalReferencesBoolExp>;
};


export type SubscriptionRootSmbExhibitionsArgs = {
  distinct_on?: InputMaybe<Array<SmbExhibitionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbExhibitionsOrderBy>>;
  where?: InputMaybe<SmbExhibitionsBoolExp>;
};


export type SubscriptionRootSmbExhibitionsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbExhibitionsStreamCursorInput>>;
  where?: InputMaybe<SmbExhibitionsBoolExp>;
};


export type SubscriptionRootSmbGeographicalReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbGeographicalReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbGeographicalReferencesOrderBy>>;
  where?: InputMaybe<SmbGeographicalReferencesBoolExp>;
};


export type SubscriptionRootSmbGeographicalReferencesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbGeographicalReferencesStreamCursorInput>>;
  where?: InputMaybe<SmbGeographicalReferencesBoolExp>;
};


export type SubscriptionRootSmbHighlightsArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


export type SubscriptionRootSmbHighlightsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SmbHighlightsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbHighlightsOrderBy>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


export type SubscriptionRootSmbHighlightsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbHighlightsStreamCursorInput>>;
  where?: InputMaybe<SmbHighlightsBoolExp>;
};


export type SubscriptionRootSmbLanguageArgs = {
  distinct_on?: InputMaybe<Array<SmbLanguageSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLanguageOrderBy>>;
  where?: InputMaybe<SmbLanguageBoolExp>;
};


export type SubscriptionRootSmbLanguageStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbLanguageStreamCursorInput>>;
  where?: InputMaybe<SmbLanguageBoolExp>;
};


export type SubscriptionRootSmbLicensesArgs = {
  distinct_on?: InputMaybe<Array<SmbLicensesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLicensesOrderBy>>;
  where?: InputMaybe<SmbLicensesBoolExp>;
};


export type SubscriptionRootSmbLicensesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbLicensesStreamCursorInput>>;
  where?: InputMaybe<SmbLicensesBoolExp>;
};


export type SubscriptionRootSmbLicensesTranslationArgs = {
  distinct_on?: InputMaybe<Array<SmbLicensesTranslationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbLicensesTranslationOrderBy>>;
  where?: InputMaybe<SmbLicensesTranslationBoolExp>;
};


export type SubscriptionRootSmbLicensesTranslationStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbLicensesTranslationStreamCursorInput>>;
  where?: InputMaybe<SmbLicensesTranslationBoolExp>;
};


export type SubscriptionRootSmbMaterialReferencesArgs = {
  distinct_on?: InputMaybe<Array<SmbMaterialReferencesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbMaterialReferencesOrderBy>>;
  where?: InputMaybe<SmbMaterialReferencesBoolExp>;
};


export type SubscriptionRootSmbMaterialReferencesStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbMaterialReferencesStreamCursorInput>>;
  where?: InputMaybe<SmbMaterialReferencesBoolExp>;
};


export type SubscriptionRootSmbObjectsArgs = {
  distinct_on?: InputMaybe<Array<SmbObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbObjectsOrderBy>>;
  where?: InputMaybe<SmbObjectsBoolExp>;
};


export type SubscriptionRootSmbObjectsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SmbObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbObjectsOrderBy>>;
  where?: InputMaybe<SmbObjectsBoolExp>;
};


export type SubscriptionRootSmbObjectsByPkArgs = {
  id: Scalars['bigint'];
};


export type SubscriptionRootSmbObjectsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbObjectsStreamCursorInput>>;
  where?: InputMaybe<SmbObjectsBoolExp>;
};


export type SubscriptionRootSmbOrgUnitArgs = {
  distinct_on?: InputMaybe<Array<SmbOrgUnitSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbOrgUnitOrderBy>>;
  where?: InputMaybe<SmbOrgUnitBoolExp>;
};


export type SubscriptionRootSmbOrgUnitStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbOrgUnitStreamCursorInput>>;
  where?: InputMaybe<SmbOrgUnitBoolExp>;
};


export type SubscriptionRootSmbPersonsArgs = {
  distinct_on?: InputMaybe<Array<SmbPersonsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbPersonsOrderBy>>;
  where?: InputMaybe<SmbPersonsBoolExp>;
};


export type SubscriptionRootSmbPersonsObjectsArgs = {
  distinct_on?: InputMaybe<Array<SmbPersonsObjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbPersonsObjectsOrderBy>>;
  where?: InputMaybe<SmbPersonsObjectsBoolExp>;
};


export type SubscriptionRootSmbPersonsObjectsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbPersonsObjectsStreamCursorInput>>;
  where?: InputMaybe<SmbPersonsObjectsBoolExp>;
};


export type SubscriptionRootSmbPersonsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbPersonsStreamCursorInput>>;
  where?: InputMaybe<SmbPersonsBoolExp>;
};


export type SubscriptionRootSmbSttPlatformConfigArgs = {
  distinct_on?: InputMaybe<Array<SmbSttPlatformConfigSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbSttPlatformConfigOrderBy>>;
  where?: InputMaybe<SmbSttPlatformConfigBoolExp>;
};


export type SubscriptionRootSmbSttPlatformConfigStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbSttPlatformConfigStreamCursorInput>>;
  where?: InputMaybe<SmbSttPlatformConfigBoolExp>;
};


export type SubscriptionRootSmbThesaurusArgs = {
  distinct_on?: InputMaybe<Array<SmbThesaurusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbThesaurusOrderBy>>;
  where?: InputMaybe<SmbThesaurusBoolExp>;
};


export type SubscriptionRootSmbThesaurusStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbThesaurusStreamCursorInput>>;
  where?: InputMaybe<SmbThesaurusBoolExp>;
};


export type SubscriptionRootSmbThesaurusTranslationsArgs = {
  distinct_on?: InputMaybe<Array<SmbThesaurusTranslationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbThesaurusTranslationsOrderBy>>;
  where?: InputMaybe<SmbThesaurusTranslationsBoolExp>;
};


export type SubscriptionRootSmbThesaurusTranslationsStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbThesaurusTranslationsStreamCursorInput>>;
  where?: InputMaybe<SmbThesaurusTranslationsBoolExp>;
};


export type SubscriptionRootSmbUserArgs = {
  distinct_on?: InputMaybe<Array<SmbUserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SmbUserOrderBy>>;
  where?: InputMaybe<SmbUserBoolExp>;
};


export type SubscriptionRootSmbUserStreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SmbUserStreamCursorInput>>;
  where?: InputMaybe<SmbUserBoolExp>;
};

/** Streaming cursor of the table "smb_assortments" */
export type SmbAssortmentsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbAssortmentsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbAssortmentsStreamCursorValueInput = {
  key?: InputMaybe<Scalars['String']>;
  preview_image?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  ASC = 'ASC',
  /** descending ordering of the cursor */
  DESC = 'DESC'
}

/** Streaming cursor of the table "smb_assortments_translation" */
export type SmbAssortmentsTranslationStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbAssortmentsTranslationStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbAssortmentsTranslationStreamCursorValueInput = {
  abstract?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_attachments" */
export type SmbAttachmentsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbAttachmentsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbAttachmentsStreamCursorValueInput = {
  attachment?: InputMaybe<Scalars['String']>;
  credits?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  media_type?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};

/** Streaming cursor of the table "smb_attribute_translations" */
export type SmbAttributeTranslationsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbAttributeTranslationsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbAttributeTranslationsStreamCursorValueInput = {
  attribute_key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_attributes" */
export type SmbAttributesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbAttributesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbAttributesStreamCursorValueInput = {
  datatype?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_buildings" */
export type SmbBuildingsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbBuildingsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbBuildingsStreamCursorValueInput = {
  key?: InputMaybe<Scalars['String']>;
  /** Display title used for all languages */
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_collections" */
export type SmbCollectionsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbCollectionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbCollectionsStreamCursorValueInput = {
  key?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_cultural_references" */
export type SmbCulturalReferencesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbCulturalReferencesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbCulturalReferencesStreamCursorValueInput = {
  sequence?: InputMaybe<Scalars['Int']>;
};

/** Streaming cursor of the table "smb_exhibitions" */
export type SmbExhibitionsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbExhibitionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbExhibitionsStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_geographical_references" */
export type SmbGeographicalReferencesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbGeographicalReferencesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbGeographicalReferencesStreamCursorValueInput = {
  details?: InputMaybe<Scalars['String']>;
  sequence?: InputMaybe<Scalars['Int']>;
};

/** Streaming cursor of the table "smb_highlights" */
export type SmbHighlightsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbHighlightsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbHighlightsStreamCursorValueInput = {
  object_id?: InputMaybe<Scalars['bigint']>;
};

/** Streaming cursor of the table "smb_language" */
export type SmbLanguageStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbLanguageStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbLanguageStreamCursorValueInput = {
  lang?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_licenses" */
export type SmbLicensesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbLicensesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbLicensesStreamCursorValueInput = {
  key?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_licenses_translation" */
export type SmbLicensesTranslationStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbLicensesTranslationStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbLicensesTranslationStreamCursorValueInput = {
  content?: InputMaybe<Scalars['String']>;
  license_text?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_material_references" */
export type SmbMaterialReferencesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbMaterialReferencesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbMaterialReferencesStreamCursorValueInput = {
  details?: InputMaybe<Scalars['String']>;
  sequence?: InputMaybe<Scalars['Int']>;
};

/** Streaming cursor of the table "smb_objects" */
export type SmbObjectsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbObjectsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbObjectsStreamCursorValueInput = {
  exhibition_space?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "smb_org_unit" */
export type SmbOrgUnitStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbOrgUnitStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbOrgUnitStreamCursorValueInput = {
  is_compilation?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_persons_objects" */
export type SmbPersonsObjectsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbPersonsObjectsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbPersonsObjectsStreamCursorValueInput = {
  sequence?: InputMaybe<Scalars['Int']>;
};

/** Streaming cursor of the table "smb_persons" */
export type SmbPersonsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbPersonsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbPersonsStreamCursorValueInput = {
  date_of_birth?: InputMaybe<Scalars['String']>;
  date_of_death?: InputMaybe<Scalars['String']>;
  date_range?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_stt_platform_config" */
export type SmbSttPlatformConfigStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbSttPlatformConfigStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbSttPlatformConfigStreamCursorValueInput = {
  enable_story_filter?: InputMaybe<Scalars['Boolean']>;
  hero_slider_limit?: InputMaybe<Scalars['Int']>;
  hide_in_overview?: InputMaybe<Scalars['Boolean']>;
  link_template?: InputMaybe<Scalars['String']>;
  platform_key?: InputMaybe<SmbSttPlatformEnum>;
};

/** Streaming cursor of the table "smb_thesaurus" */
export type SmbThesaurusStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbThesaurusStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbThesaurusStreamCursorValueInput = {
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_thesaurus_translations" */
export type SmbThesaurusTranslationsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbThesaurusTranslationsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbThesaurusTranslationsStreamCursorValueInput = {
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "smb_user" */
export type SmbUserStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SmbUserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SmbUserStreamCursorValueInput = {
  email?: InputMaybe<Scalars['String']>;
};
