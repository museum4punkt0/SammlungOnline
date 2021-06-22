import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  bigint: any;
  _varchar: any;
  _search_tuple: any;
  uuid: any;
};




/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  ASC = 'asc',
  /** in the ascending order, nulls first */
  ASC_NULLS_FIRST = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  ASC_NULLS_LAST = 'asc_nulls_last',
  /** in the descending order, nulls first */
  DESC = 'desc',
  /** in the descending order, nulls first */
  DESC_NULLS_FIRST = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DESC_NULLS_LAST = 'desc_nulls_last'
}

/** query root */
export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "smb.attachments" */
  smb_attachments: Array<SmbAttachments>;
  /** fetch data from the table: "smb.attachments" using primary key columns */
  smb_attachments_by_pk?: Maybe<SmbAttachments>;
  /** execute function "smb.attribute_search_suggestions" which returns "smb.search_suggestions" */
  smb_attribute_search_suggestions: Array<SmbSearchSuggestions>;
  /** fetch data from the table: "smb.attribute_translations" */
  smb_attribute_translations: Array<SmbAttributeTranslations>;
  /** fetch data from the table: "smb.attribute_translations" using primary key columns */
  smb_attribute_translations_by_pk?: Maybe<SmbAttributeTranslations>;
  /** fetch data from the table: "smb.attributes" */
  smb_attributes: Array<SmbAttributes>;
  /** fetch data from the table: "smb.attributes" using primary key columns */
  smb_attributes_by_pk?: Maybe<SmbAttributes>;
  /** execute function "smb.autocomplete_search" which returns "smb.search_suggestions" */
  smb_autocomplete_search: Array<SmbSearchSuggestions>;
  /** execute function "smb.filter_objects" which returns "smb.objects" */
  smb_filter_objects: Array<SmbObjects>;
  /** execute function "smb.filter_objects" and query aggregates on result of table type "smb.objects" */
  smb_filter_objects_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.header" */
  smb_header: Array<SmbHeader>;
  /** fetch data from the table: "smb.header" using primary key columns */
  smb_header_by_pk?: Maybe<SmbHeader>;
  /** fetch data from the table: "smb.header_translations" */
  smb_header_translations: Array<SmbHeaderTranslations>;
  /** fetch data from the table: "smb.header_translations" using primary key columns */
  smb_header_translations_by_pk?: Maybe<SmbHeaderTranslations>;
  /** fetch data from the table: "smb.highlights" */
  smb_highlights: Array<SmbHighlights>;
  /** fetch aggregated fields from the table: "smb.highlights" */
  smb_highlights_aggregate: SmbHighlightsAggregate;
  /** fetch data from the table: "smb.highlights" using primary key columns */
  smb_highlights_by_pk?: Maybe<SmbHighlights>;
  /** fetch data from the table: "smb.intro_slide_translations" */
  smb_intro_slide_translations: Array<SmbIntroSlideTranslations>;
  /** fetch data from the table: "smb.intro_slide_translations" using primary key columns */
  smb_intro_slide_translations_by_pk?: Maybe<SmbIntroSlideTranslations>;
  /** fetch data from the table: "smb.intro_slides" */
  smb_intro_slides: Array<SmbIntroSlides>;
  /** fetch data from the table: "smb.intro_slides" using primary key columns */
  smb_intro_slides_by_pk?: Maybe<SmbIntroSlides>;
  /** fetch data from the table: "smb.intro_text_module_translations" */
  smb_intro_text_module_translations: Array<SmbIntroTextModuleTranslations>;
  /** fetch data from the table: "smb.intro_text_module_translations" using primary key columns */
  smb_intro_text_module_translations_by_pk?: Maybe<SmbIntroTextModuleTranslations>;
  /** fetch data from the table: "smb.intro_text_module_type" */
  smb_intro_text_module_type: Array<SmbIntroTextModuleType>;
  /** fetch data from the table: "smb.intro_text_module_type" using primary key columns */
  smb_intro_text_module_type_by_pk?: Maybe<SmbIntroTextModuleType>;
  /** fetch data from the table: "smb.intro_text_modules" */
  smb_intro_text_modules: Array<SmbIntroTextModules>;
  /** fetch data from the table: "smb.intro_text_modules" using primary key columns */
  smb_intro_text_modules_by_pk?: Maybe<SmbIntroTextModules>;
  /** fetch data from the table: "smb.language" */
  smb_language: Array<SmbLanguage>;
  /** fetch data from the table: "smb.language" using primary key columns */
  smb_language_by_pk?: Maybe<SmbLanguage>;
  /** fetch data from the table: "smb.licenses" */
  smb_licenses: Array<SmbLicenses>;
  /** fetch data from the table: "smb.licenses" using primary key columns */
  smb_licenses_by_pk?: Maybe<SmbLicenses>;
  /** fetch data from the table: "smb.licenses_translation" */
  smb_licenses_translation: Array<SmbLicensesTranslation>;
  /** fetch data from the table: "smb.licenses_translation" using primary key columns */
  smb_licenses_translation_by_pk?: Maybe<SmbLicensesTranslation>;
  /** fetch data from the table: "smb.objects" */
  smb_objects: Array<SmbObjects>;
  /** fetch aggregated fields from the table: "smb.objects" */
  smb_objects_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.objects" using primary key columns */
  smb_objects_by_pk?: Maybe<SmbObjects>;
  /** execute function "smb.search_object" which returns "smb.objects" */
  smb_search_object: Array<SmbObjects>;
  /** execute function "smb.search_object" and query aggregates on result of table type "smb.objects" */
  smb_search_object_aggregate: SmbObjectsAggregate;
  /** execute function "smb.search_object_aggregate" and query aggregates on result of table type "smb.objects" */
  smb_search_object_aggregate_aggregate: SmbObjectsAggregate;
  /** execute function "smb.search_object_combined" which returns "smb.objects" */
  smb_search_object_combined: Array<SmbObjects>;
  /** execute function "smb.search_object_combined" and query aggregates on result of table type "smb.objects" */
  smb_search_object_combined_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.search_suggestions" */
  smb_search_suggestions: Array<SmbSearchSuggestions>;
  /** fetch data from the table: "smb.topics" */
  smb_topics: Array<SmbTopics>;
  /** fetch data from the table: "smb.topics" using primary key columns */
  smb_topics_by_pk?: Maybe<SmbTopics>;
  /** fetch data from the table: "smb.topics_objects" */
  smb_topics_objects: Array<SmbTopicsObjects>;
  /** fetch data from the table: "smb.topics_objects" using primary key columns */
  smb_topics_objects_by_pk?: Maybe<SmbTopicsObjects>;
  /** fetch data from the table: "smb.topics_translations" */
  smb_topics_translations: Array<SmbTopicsTranslations>;
  /** fetch data from the table: "smb.topics_translations" using primary key columns */
  smb_topics_translations_by_pk?: Maybe<SmbTopicsTranslations>;
  /** fetch data from the table: "smb.tours" */
  smb_tours: Array<SmbTours>;
  /** fetch data from the table: "smb.tours" using primary key columns */
  smb_tours_by_pk?: Maybe<SmbTours>;
  /** fetch data from the table: "smb.tours_objects" */
  smb_tours_objects: Array<SmbToursObjects>;
  /** fetch data from the table: "smb.tours_objects" using primary key columns */
  smb_tours_objects_by_pk?: Maybe<SmbToursObjects>;
  /** fetch data from the table: "smb.tours_objects_translation" */
  smb_tours_objects_translation: Array<SmbToursObjectsTranslation>;
  /** fetch data from the table: "smb.tours_objects_translation" using primary key columns */
  smb_tours_objects_translation_by_pk?: Maybe<SmbToursObjectsTranslation>;
  /** fetch data from the table: "smb.tours_translation" */
  smb_tours_translation: Array<SmbToursTranslation>;
  /** fetch data from the table: "smb.tours_translation" using primary key columns */
  smb_tours_translation_by_pk?: Maybe<SmbToursTranslation>;
  /** fetch data from the table: "smb.user" */
  smb_user: Array<SmbUser>;
  /** fetch data from the table: "smb.user" using primary key columns */
  smb_user_by_pk?: Maybe<SmbUser>;
};


/** query root */
export type QueryRootSmbAttachmentsArgs = {
  distinct_on?: Maybe<Array<SmbAttachmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttachmentsOrderBy>>;
  where?: Maybe<SmbAttachmentsBoolExp>;
};


/** query root */
export type QueryRootSmbAttachmentsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbAttributeSearchSuggestionsArgs = {
  args: SmbAttributeSearchSuggestionsArgs;
  distinct_on?: Maybe<Array<SmbSearchSuggestionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbSearchSuggestionsOrderBy>>;
  where?: Maybe<SmbSearchSuggestionsBoolExp>;
};


/** query root */
export type QueryRootSmbAttributeTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: Maybe<SmbAttributeTranslationsBoolExp>;
};


/** query root */
export type QueryRootSmbAttributeTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbAttributesArgs = {
  distinct_on?: Maybe<Array<SmbAttributesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttributesOrderBy>>;
  where?: Maybe<SmbAttributesBoolExp>;
};


/** query root */
export type QueryRootSmbAttributesByPkArgs = {
  key: Scalars['String'];
};


/** query root */
export type QueryRootSmbAutocompleteSearchArgs = {
  args: SmbAutocompleteSearchArgs;
  distinct_on?: Maybe<Array<SmbSearchSuggestionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbSearchSuggestionsOrderBy>>;
  where?: Maybe<SmbSearchSuggestionsBoolExp>;
};


/** query root */
export type QueryRootSmbFilterObjectsArgs = {
  args: SmbFilterObjectsArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbFilterObjectsAggregateArgs = {
  args: SmbFilterObjectsArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbHeaderArgs = {
  distinct_on?: Maybe<Array<SmbHeaderSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHeaderOrderBy>>;
  where?: Maybe<SmbHeaderBoolExp>;
};


/** query root */
export type QueryRootSmbHeaderByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbHeaderTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbHeaderTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHeaderTranslationsOrderBy>>;
  where?: Maybe<SmbHeaderTranslationsBoolExp>;
};


/** query root */
export type QueryRootSmbHeaderTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbHighlightsArgs = {
  distinct_on?: Maybe<Array<SmbHighlightsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHighlightsOrderBy>>;
  where?: Maybe<SmbHighlightsBoolExp>;
};


/** query root */
export type QueryRootSmbHighlightsAggregateArgs = {
  distinct_on?: Maybe<Array<SmbHighlightsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHighlightsOrderBy>>;
  where?: Maybe<SmbHighlightsBoolExp>;
};


/** query root */
export type QueryRootSmbHighlightsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbIntroSlideTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbIntroSlideTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroSlideTranslationsOrderBy>>;
  where?: Maybe<SmbIntroSlideTranslationsBoolExp>;
};


/** query root */
export type QueryRootSmbIntroSlideTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbIntroSlidesArgs = {
  distinct_on?: Maybe<Array<SmbIntroSlidesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroSlidesOrderBy>>;
  where?: Maybe<SmbIntroSlidesBoolExp>;
};


/** query root */
export type QueryRootSmbIntroSlidesByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbIntroTextModuleTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModuleTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModuleTranslationsOrderBy>>;
  where?: Maybe<SmbIntroTextModuleTranslationsBoolExp>;
};


/** query root */
export type QueryRootSmbIntroTextModuleTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbIntroTextModuleTypeArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModuleTypeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModuleTypeOrderBy>>;
  where?: Maybe<SmbIntroTextModuleTypeBoolExp>;
};


/** query root */
export type QueryRootSmbIntroTextModuleTypeByPkArgs = {
  value: Scalars['String'];
};


/** query root */
export type QueryRootSmbIntroTextModulesArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModulesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModulesOrderBy>>;
  where?: Maybe<SmbIntroTextModulesBoolExp>;
};


/** query root */
export type QueryRootSmbIntroTextModulesByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbLanguageArgs = {
  distinct_on?: Maybe<Array<SmbLanguageSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLanguageOrderBy>>;
  where?: Maybe<SmbLanguageBoolExp>;
};


/** query root */
export type QueryRootSmbLanguageByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbLicensesArgs = {
  distinct_on?: Maybe<Array<SmbLicensesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLicensesOrderBy>>;
  where?: Maybe<SmbLicensesBoolExp>;
};


/** query root */
export type QueryRootSmbLicensesByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbLicensesTranslationArgs = {
  distinct_on?: Maybe<Array<SmbLicensesTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLicensesTranslationOrderBy>>;
  where?: Maybe<SmbLicensesTranslationBoolExp>;
};


/** query root */
export type QueryRootSmbLicensesTranslationByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbObjectsArgs = {
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbObjectsAggregateArgs = {
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbObjectsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbSearchObjectArgs = {
  args: SmbSearchObjectArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbSearchObjectAggregateArgs = {
  args: SmbSearchObjectArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbSearchObjectAggregateAggregateArgs = {
  args: SmbSearchObjectAggregateArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbSearchObjectCombinedArgs = {
  args: SmbSearchObjectCombinedArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbSearchObjectCombinedAggregateArgs = {
  args: SmbSearchObjectCombinedArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbSearchSuggestionsArgs = {
  distinct_on?: Maybe<Array<SmbSearchSuggestionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbSearchSuggestionsOrderBy>>;
  where?: Maybe<SmbSearchSuggestionsBoolExp>;
};


/** query root */
export type QueryRootSmbTopicsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsOrderBy>>;
  where?: Maybe<SmbTopicsBoolExp>;
};


/** query root */
export type QueryRootSmbTopicsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbTopicsObjectsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsObjectsOrderBy>>;
  where?: Maybe<SmbTopicsObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbTopicsObjectsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbTopicsTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsTranslationsOrderBy>>;
  where?: Maybe<SmbTopicsTranslationsBoolExp>;
};


/** query root */
export type QueryRootSmbTopicsTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbToursArgs = {
  distinct_on?: Maybe<Array<SmbToursSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursOrderBy>>;
  where?: Maybe<SmbToursBoolExp>;
};


/** query root */
export type QueryRootSmbToursByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbToursObjectsArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsOrderBy>>;
  where?: Maybe<SmbToursObjectsBoolExp>;
};


/** query root */
export type QueryRootSmbToursObjectsByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbToursObjectsTranslationArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsTranslationOrderBy>>;
  where?: Maybe<SmbToursObjectsTranslationBoolExp>;
};


/** query root */
export type QueryRootSmbToursObjectsTranslationByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbToursTranslationArgs = {
  distinct_on?: Maybe<Array<SmbToursTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursTranslationOrderBy>>;
  where?: Maybe<SmbToursTranslationBoolExp>;
};


/** query root */
export type QueryRootSmbToursTranslationByPkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type QueryRootSmbUserArgs = {
  distinct_on?: Maybe<Array<SmbUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbUserOrderBy>>;
  where?: Maybe<SmbUserBoolExp>;
};


/** query root */
export type QueryRootSmbUserByPkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "smb.attachments" */
export type SmbAttachments = {
  __typename?: 'smb_attachments';
  attachment: Scalars['String'];
  credits?: Maybe<Scalars['String']>;
  /** An object relationship */
  object: SmbObjects;
  primary?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "smb.attachments". All fields are combined with a logical 'AND'. */
export type SmbAttachmentsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbAttachmentsBoolExp>>>;
  _not?: Maybe<SmbAttachmentsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbAttachmentsBoolExp>>>;
  attachment?: Maybe<StringComparisonExp>;
  credits?: Maybe<StringComparisonExp>;
  object?: Maybe<SmbObjectsBoolExp>;
  primary?: Maybe<BooleanComparisonExp>;
};

/** ordering options when selecting data from "smb.attachments" */
export type SmbAttachmentsOrderBy = {
  attachment?: Maybe<OrderBy>;
  credits?: Maybe<OrderBy>;
  object?: Maybe<SmbObjectsOrderBy>;
  primary?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.attachments" */
export type SmbAttachmentsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.attachments" */
export enum SmbAttachmentsSelectColumn {
  /** column name */
  ATTACHMENT = 'attachment',
  /** column name */
  CREDITS = 'credits',
  /** column name */
  PRIMARY = 'primary'
}

export type SmbAttributeSearchSuggestionsArgs = {
  amount?: Maybe<Scalars['Int']>;
  attributekey?: Maybe<Scalars['String']>;
  filterlang?: Maybe<Scalars['String']>;
  searchterm?: Maybe<Scalars['String']>;
};

/** columns and relationships of "smb.attribute_translations" */
export type SmbAttributeTranslations = {
  __typename?: 'smb_attribute_translations';
  /** An object relationship */
  attribute: SmbAttributes;
  attribute_key: Scalars['String'];
  /** An object relationship */
  language: SmbLanguage;
  value?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "smb.attribute_translations". All fields are combined with a logical 'AND'. */
export type SmbAttributeTranslationsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbAttributeTranslationsBoolExp>>>;
  _not?: Maybe<SmbAttributeTranslationsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbAttributeTranslationsBoolExp>>>;
  attribute?: Maybe<SmbAttributesBoolExp>;
  attribute_key?: Maybe<StringComparisonExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  value?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.attribute_translations" */
export type SmbAttributeTranslationsOrderBy = {
  attribute?: Maybe<SmbAttributesOrderBy>;
  attribute_key?: Maybe<OrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  value?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.attribute_translations" */
export type SmbAttributeTranslationsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.attribute_translations" */
export enum SmbAttributeTranslationsSelectColumn {
  /** column name */
  ATTRIBUTE_KEY = 'attribute_key',
  /** column name */
  VALUE = 'value'
}

/** columns and relationships of "smb.attributes" */
export type SmbAttributes = {
  __typename?: 'smb_attributes';
  /** An array relationship */
  attribute_translations: Array<SmbAttributeTranslations>;
  datatype: Scalars['String'];
  key: Scalars['String'];
  relevant?: Maybe<Scalars['Boolean']>;
};


/** columns and relationships of "smb.attributes" */
export type SmbAttributesAttributeTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: Maybe<SmbAttributeTranslationsBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.attributes". All fields are combined with a logical 'AND'. */
export type SmbAttributesBoolExp = {
  _and?: Maybe<Array<Maybe<SmbAttributesBoolExp>>>;
  _not?: Maybe<SmbAttributesBoolExp>;
  _or?: Maybe<Array<Maybe<SmbAttributesBoolExp>>>;
  attribute_translations?: Maybe<SmbAttributeTranslationsBoolExp>;
  datatype?: Maybe<StringComparisonExp>;
  key?: Maybe<StringComparisonExp>;
  relevant?: Maybe<BooleanComparisonExp>;
};

/** ordering options when selecting data from "smb.attributes" */
export type SmbAttributesOrderBy = {
  datatype?: Maybe<OrderBy>;
  key?: Maybe<OrderBy>;
  relevant?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.attributes" */
export type SmbAttributesPkColumnsInput = {
  key: Scalars['String'];
};

/** select columns of table "smb.attributes" */
export enum SmbAttributesSelectColumn {
  /** column name */
  DATATYPE = 'datatype',
  /** column name */
  KEY = 'key',
  /** column name */
  RELEVANT = 'relevant'
}

export type SmbAutocompleteSearchArgs = {
  attributekeys?: Maybe<Scalars['_varchar']>;
  attributelimit?: Maybe<Scalars['Int']>;
  filterlang?: Maybe<Scalars['String']>;
  searchterm?: Maybe<Scalars['String']>;
};

export type SmbFilterObjectsArgs = {
  attachment?: Maybe<Scalars['Boolean']>;
  exhibited?: Maybe<Scalars['Boolean']>;
  highlight?: Maybe<Scalars['Boolean']>;
  qlimit?: Maybe<Scalars['Int']>;
  qoffset?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "smb.header" */
export type SmbHeader = {
  __typename?: 'smb_header';
  color: Scalars['String'];
  drawer_color: Scalars['String'];
  /** An array relationship */
  header_translations: Array<SmbHeaderTranslations>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
};


/** columns and relationships of "smb.header" */
export type SmbHeaderHeaderTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbHeaderTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHeaderTranslationsOrderBy>>;
  where?: Maybe<SmbHeaderTranslationsBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.header". All fields are combined with a logical 'AND'. */
export type SmbHeaderBoolExp = {
  _and?: Maybe<Array<Maybe<SmbHeaderBoolExp>>>;
  _not?: Maybe<SmbHeaderBoolExp>;
  _or?: Maybe<Array<Maybe<SmbHeaderBoolExp>>>;
  color?: Maybe<StringComparisonExp>;
  drawer_color?: Maybe<StringComparisonExp>;
  header_translations?: Maybe<SmbHeaderTranslationsBoolExp>;
  href?: Maybe<StringComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
};

/** ordering options when selecting data from "smb.header" */
export type SmbHeaderOrderBy = {
  color?: Maybe<OrderBy>;
  drawer_color?: Maybe<OrderBy>;
  href?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.header" */
export type SmbHeaderPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.header" */
export enum SmbHeaderSelectColumn {
  /** column name */
  COLOR = 'color',
  /** column name */
  DRAWER_COLOR = 'drawer_color',
  /** column name */
  HREF = 'href',
  /** column name */
  ID = 'id'
}

/** columns and relationships of "smb.header_translations" */
export type SmbHeaderTranslations = {
  __typename?: 'smb_header_translations';
  /** An object relationship */
  header: SmbHeader;
  header_id: Scalars['bigint'];
  id: Scalars['bigint'];
  /** An object relationship */
  language: SmbLanguage;
  language_id: Scalars['bigint'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
};

/** Boolean expression to filter rows from the table "smb.header_translations". All fields are combined with a logical 'AND'. */
export type SmbHeaderTranslationsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbHeaderTranslationsBoolExp>>>;
  _not?: Maybe<SmbHeaderTranslationsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbHeaderTranslationsBoolExp>>>;
  header?: Maybe<SmbHeaderBoolExp>;
  header_id?: Maybe<BigintComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  language_id?: Maybe<BigintComparisonExp>;
  subtitle?: Maybe<StringComparisonExp>;
  title?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.header_translations" */
export type SmbHeaderTranslationsOrderBy = {
  header?: Maybe<SmbHeaderOrderBy>;
  header_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  language_id?: Maybe<OrderBy>;
  subtitle?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.header_translations" */
export type SmbHeaderTranslationsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.header_translations" */
export enum SmbHeaderTranslationsSelectColumn {
  /** column name */
  HEADER_ID = 'header_id',
  /** column name */
  ID = 'id',
  /** column name */
  LANGUAGE_ID = 'language_id',
  /** column name */
  SUBTITLE = 'subtitle',
  /** column name */
  TITLE = 'title'
}

/** columns and relationships of "smb.highlights" */
export type SmbHighlights = {
  __typename?: 'smb_highlights';
  /** An object relationship */
  object: SmbObjects;
  object_id: Scalars['bigint'];
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
  count?: Maybe<Scalars['Int']>;
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
  columns?: Maybe<Array<SmbHighlightsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "smb.highlights" */
export type SmbHighlightsAggregateOrderBy = {
  avg?: Maybe<SmbHighlightsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<SmbHighlightsMaxOrderBy>;
  min?: Maybe<SmbHighlightsMinOrderBy>;
  stddev?: Maybe<SmbHighlightsStddevOrderBy>;
  stddev_pop?: Maybe<SmbHighlightsStddevPopOrderBy>;
  stddev_samp?: Maybe<SmbHighlightsStddevSampOrderBy>;
  sum?: Maybe<SmbHighlightsSumOrderBy>;
  var_pop?: Maybe<SmbHighlightsVarPopOrderBy>;
  var_samp?: Maybe<SmbHighlightsVarSampOrderBy>;
  variance?: Maybe<SmbHighlightsVarianceOrderBy>;
};

/** aggregate avg on columns */
export type SmbHighlightsAvgFields = {
  __typename?: 'smb_highlights_avg_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "smb.highlights" */
export type SmbHighlightsAvgOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.highlights". All fields are combined with a logical 'AND'. */
export type SmbHighlightsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbHighlightsBoolExp>>>;
  _not?: Maybe<SmbHighlightsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbHighlightsBoolExp>>>;
  object?: Maybe<SmbObjectsBoolExp>;
  object_id?: Maybe<BigintComparisonExp>;
};

/** aggregate max on columns */
export type SmbHighlightsMaxFields = {
  __typename?: 'smb_highlights_max_fields';
  object_id?: Maybe<Scalars['bigint']>;
};

/** order by max() on columns of table "smb.highlights" */
export type SmbHighlightsMaxOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SmbHighlightsMinFields = {
  __typename?: 'smb_highlights_min_fields';
  object_id?: Maybe<Scalars['bigint']>;
};

/** order by min() on columns of table "smb.highlights" */
export type SmbHighlightsMinOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** ordering options when selecting data from "smb.highlights" */
export type SmbHighlightsOrderBy = {
  object?: Maybe<SmbObjectsOrderBy>;
  object_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.highlights" */
export type SmbHighlightsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.highlights" */
export enum SmbHighlightsSelectColumn {
  /** column name */
  OBJECT_ID = 'object_id'
}

/** aggregate stddev on columns */
export type SmbHighlightsStddevFields = {
  __typename?: 'smb_highlights_stddev_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "smb.highlights" */
export type SmbHighlightsStddevOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SmbHighlightsStddevPopFields = {
  __typename?: 'smb_highlights_stddev_pop_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "smb.highlights" */
export type SmbHighlightsStddevPopOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SmbHighlightsStddevSampFields = {
  __typename?: 'smb_highlights_stddev_samp_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "smb.highlights" */
export type SmbHighlightsStddevSampOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type SmbHighlightsSumFields = {
  __typename?: 'smb_highlights_sum_fields';
  object_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "smb.highlights" */
export type SmbHighlightsSumOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate var_pop on columns */
export type SmbHighlightsVarPopFields = {
  __typename?: 'smb_highlights_var_pop_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "smb.highlights" */
export type SmbHighlightsVarPopOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SmbHighlightsVarSampFields = {
  __typename?: 'smb_highlights_var_samp_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "smb.highlights" */
export type SmbHighlightsVarSampOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type SmbHighlightsVarianceFields = {
  __typename?: 'smb_highlights_variance_fields';
  object_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "smb.highlights" */
export type SmbHighlightsVarianceOrderBy = {
  object_id?: Maybe<OrderBy>;
};

/** columns and relationships of "smb.intro_slide_translations" */
export type SmbIntroSlideTranslations = {
  __typename?: 'smb_intro_slide_translations';
  /** An object relationship */
  intro_slide: SmbIntroSlides;
  /** An object relationship */
  language: SmbLanguage;
  title: Scalars['String'];
};

/**
 * Boolean expression to filter rows from the table "smb.intro_slide_translations".
 * All fields are combined with a logical 'AND'.
 */
export type SmbIntroSlideTranslationsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbIntroSlideTranslationsBoolExp>>>;
  _not?: Maybe<SmbIntroSlideTranslationsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbIntroSlideTranslationsBoolExp>>>;
  intro_slide?: Maybe<SmbIntroSlidesBoolExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  title?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.intro_slide_translations" */
export type SmbIntroSlideTranslationsOrderBy = {
  intro_slide?: Maybe<SmbIntroSlidesOrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  title?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.intro_slide_translations" */
export type SmbIntroSlideTranslationsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.intro_slide_translations" */
export enum SmbIntroSlideTranslationsSelectColumn {
  /** column name */
  TITLE = 'title'
}

/** columns and relationships of "smb.intro_slides" */
export type SmbIntroSlides = {
  __typename?: 'smb_intro_slides';
  image: Scalars['String'];
  /** An array relationship */
  intro_slide_translations: Array<SmbIntroSlideTranslations>;
};


/** columns and relationships of "smb.intro_slides" */
export type SmbIntroSlidesIntroSlideTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbIntroSlideTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroSlideTranslationsOrderBy>>;
  where?: Maybe<SmbIntroSlideTranslationsBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.intro_slides". All fields are combined with a logical 'AND'. */
export type SmbIntroSlidesBoolExp = {
  _and?: Maybe<Array<Maybe<SmbIntroSlidesBoolExp>>>;
  _not?: Maybe<SmbIntroSlidesBoolExp>;
  _or?: Maybe<Array<Maybe<SmbIntroSlidesBoolExp>>>;
  image?: Maybe<StringComparisonExp>;
  intro_slide_translations?: Maybe<SmbIntroSlideTranslationsBoolExp>;
};

/** ordering options when selecting data from "smb.intro_slides" */
export type SmbIntroSlidesOrderBy = {
  image?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.intro_slides" */
export type SmbIntroSlidesPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.intro_slides" */
export enum SmbIntroSlidesSelectColumn {
  /** column name */
  IMAGE = 'image'
}

/** columns and relationships of "smb.intro_text_module_translations" */
export type SmbIntroTextModuleTranslations = {
  __typename?: 'smb_intro_text_module_translations';
  content: Scalars['String'];
  /** An object relationship */
  intro_text_module: SmbIntroTextModules;
  /** An object relationship */
  language: SmbLanguage;
  link_caption: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
};

/**
 * Boolean expression to filter rows from the table
 * "smb.intro_text_module_translations". All fields are combined with a logical 'AND'.
 */
export type SmbIntroTextModuleTranslationsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbIntroTextModuleTranslationsBoolExp>>>;
  _not?: Maybe<SmbIntroTextModuleTranslationsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbIntroTextModuleTranslationsBoolExp>>>;
  content?: Maybe<StringComparisonExp>;
  intro_text_module?: Maybe<SmbIntroTextModulesBoolExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  link_caption?: Maybe<StringComparisonExp>;
  subtitle?: Maybe<StringComparisonExp>;
  title?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.intro_text_module_translations" */
export type SmbIntroTextModuleTranslationsOrderBy = {
  content?: Maybe<OrderBy>;
  intro_text_module?: Maybe<SmbIntroTextModulesOrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  link_caption?: Maybe<OrderBy>;
  subtitle?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.intro_text_module_translations" */
export type SmbIntroTextModuleTranslationsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.intro_text_module_translations" */
export enum SmbIntroTextModuleTranslationsSelectColumn {
  /** column name */
  CONTENT = 'content',
  /** column name */
  LINK_CAPTION = 'link_caption',
  /** column name */
  SUBTITLE = 'subtitle',
  /** column name */
  TITLE = 'title'
}

/** columns and relationships of "smb.intro_text_module_type" */
export type SmbIntroTextModuleType = {
  __typename?: 'smb_intro_text_module_type';
  /** An array relationship */
  intro_text_modules: Array<SmbIntroTextModules>;
  value: Scalars['String'];
};


/** columns and relationships of "smb.intro_text_module_type" */
export type SmbIntroTextModuleTypeIntroTextModulesArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModulesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModulesOrderBy>>;
  where?: Maybe<SmbIntroTextModulesBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.intro_text_module_type". All fields are combined with a logical 'AND'. */
export type SmbIntroTextModuleTypeBoolExp = {
  _and?: Maybe<Array<Maybe<SmbIntroTextModuleTypeBoolExp>>>;
  _not?: Maybe<SmbIntroTextModuleTypeBoolExp>;
  _or?: Maybe<Array<Maybe<SmbIntroTextModuleTypeBoolExp>>>;
  intro_text_modules?: Maybe<SmbIntroTextModulesBoolExp>;
  value?: Maybe<StringComparisonExp>;
};

export enum SmbIntroTextModuleTypeEnum {
  /** Module for guide platform. */
  GUIDE = 'GUIDE',
  /** Module for research platform. */
  RESEARCH = 'RESEARCH',
  /** Simple text module. */
  TEXT = 'TEXT',
  /** Module for topic platform. */
  TOPIC = 'TOPIC'
}

/** expression to compare columns of type smb_intro_text_module_type_enum. All fields are combined with logical 'AND'. */
export type SmbIntroTextModuleTypeEnumComparisonExp = {
  _eq?: Maybe<SmbIntroTextModuleTypeEnum>;
  _in?: Maybe<Array<SmbIntroTextModuleTypeEnum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<SmbIntroTextModuleTypeEnum>;
  _nin?: Maybe<Array<SmbIntroTextModuleTypeEnum>>;
};

/** ordering options when selecting data from "smb.intro_text_module_type" */
export type SmbIntroTextModuleTypeOrderBy = {
  value?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.intro_text_module_type" */
export type SmbIntroTextModuleTypePkColumnsInput = {
  value: Scalars['String'];
};

/** select columns of table "smb.intro_text_module_type" */
export enum SmbIntroTextModuleTypeSelectColumn {
  /** column name */
  VALUE = 'value'
}

/** columns and relationships of "smb.intro_text_modules" */
export type SmbIntroTextModules = {
  __typename?: 'smb_intro_text_modules';
  /** An array relationship */
  intro_text_module_translations: Array<SmbIntroTextModuleTranslations>;
  /** An object relationship */
  intro_text_module_type: SmbIntroTextModuleType;
  link?: Maybe<Scalars['String']>;
  module_background_color: Scalars['String'];
  module_type: SmbIntroTextModuleTypeEnum;
  sequence: Scalars['Int'];
  text_area_color: Scalars['String'];
  text_color: Scalars['String'];
  title_color: Scalars['String'];
};


/** columns and relationships of "smb.intro_text_modules" */
export type SmbIntroTextModulesIntroTextModuleTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModuleTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModuleTranslationsOrderBy>>;
  where?: Maybe<SmbIntroTextModuleTranslationsBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.intro_text_modules". All fields are combined with a logical 'AND'. */
export type SmbIntroTextModulesBoolExp = {
  _and?: Maybe<Array<Maybe<SmbIntroTextModulesBoolExp>>>;
  _not?: Maybe<SmbIntroTextModulesBoolExp>;
  _or?: Maybe<Array<Maybe<SmbIntroTextModulesBoolExp>>>;
  intro_text_module_translations?: Maybe<SmbIntroTextModuleTranslationsBoolExp>;
  intro_text_module_type?: Maybe<SmbIntroTextModuleTypeBoolExp>;
  link?: Maybe<StringComparisonExp>;
  module_background_color?: Maybe<StringComparisonExp>;
  module_type?: Maybe<SmbIntroTextModuleTypeEnumComparisonExp>;
  sequence?: Maybe<IntComparisonExp>;
  text_area_color?: Maybe<StringComparisonExp>;
  text_color?: Maybe<StringComparisonExp>;
  title_color?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.intro_text_modules" */
export type SmbIntroTextModulesOrderBy = {
  intro_text_module_type?: Maybe<SmbIntroTextModuleTypeOrderBy>;
  link?: Maybe<OrderBy>;
  module_background_color?: Maybe<OrderBy>;
  module_type?: Maybe<OrderBy>;
  sequence?: Maybe<OrderBy>;
  text_area_color?: Maybe<OrderBy>;
  text_color?: Maybe<OrderBy>;
  title_color?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.intro_text_modules" */
export type SmbIntroTextModulesPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.intro_text_modules" */
export enum SmbIntroTextModulesSelectColumn {
  /** column name */
  LINK = 'link',
  /** column name */
  MODULE_BACKGROUND_COLOR = 'module_background_color',
  /** column name */
  MODULE_TYPE = 'module_type',
  /** column name */
  SEQUENCE = 'sequence',
  /** column name */
  TEXT_AREA_COLOR = 'text_area_color',
  /** column name */
  TEXT_COLOR = 'text_color',
  /** column name */
  TITLE_COLOR = 'title_color'
}

/** columns and relationships of "smb.language" */
export type SmbLanguage = {
  __typename?: 'smb_language';
  lang: Scalars['String'];
};

/** Boolean expression to filter rows from the table "smb.language". All fields are combined with a logical 'AND'. */
export type SmbLanguageBoolExp = {
  _and?: Maybe<Array<Maybe<SmbLanguageBoolExp>>>;
  _not?: Maybe<SmbLanguageBoolExp>;
  _or?: Maybe<Array<Maybe<SmbLanguageBoolExp>>>;
  lang?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.language" */
export type SmbLanguageOrderBy = {
  lang?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.language" */
export type SmbLanguagePkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.language" */
export enum SmbLanguageSelectColumn {
  /** column name */
  LANG = 'lang'
}

/** columns and relationships of "smb.licenses" */
export type SmbLicenses = {
  __typename?: 'smb_licenses';
  id: Scalars['bigint'];
  key: Scalars['String'];
  /** An array relationship */
  licenses_translations: Array<SmbLicensesTranslation>;
};


/** columns and relationships of "smb.licenses" */
export type SmbLicensesLicensesTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbLicensesTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLicensesTranslationOrderBy>>;
  where?: Maybe<SmbLicensesTranslationBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.licenses". All fields are combined with a logical 'AND'. */
export type SmbLicensesBoolExp = {
  _and?: Maybe<Array<Maybe<SmbLicensesBoolExp>>>;
  _not?: Maybe<SmbLicensesBoolExp>;
  _or?: Maybe<Array<Maybe<SmbLicensesBoolExp>>>;
  id?: Maybe<BigintComparisonExp>;
  key?: Maybe<StringComparisonExp>;
  licenses_translations?: Maybe<SmbLicensesTranslationBoolExp>;
};

/** ordering options when selecting data from "smb.licenses" */
export type SmbLicensesOrderBy = {
  id?: Maybe<OrderBy>;
  key?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.licenses" */
export type SmbLicensesPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.licenses" */
export enum SmbLicensesSelectColumn {
  /** column name */
  ID = 'id',
  /** column name */
  KEY = 'key'
}

/** columns and relationships of "smb.licenses_translation" */
export type SmbLicensesTranslation = {
  __typename?: 'smb_licenses_translation';
  content: Scalars['String'];
  id: Scalars['bigint'];
  /** An object relationship */
  language: SmbLanguage;
  /** An object relationship */
  license: SmbLicenses;
  license_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "smb.licenses_translation". All fields are combined with a logical 'AND'. */
export type SmbLicensesTranslationBoolExp = {
  _and?: Maybe<Array<Maybe<SmbLicensesTranslationBoolExp>>>;
  _not?: Maybe<SmbLicensesTranslationBoolExp>;
  _or?: Maybe<Array<Maybe<SmbLicensesTranslationBoolExp>>>;
  content?: Maybe<StringComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  license?: Maybe<SmbLicensesBoolExp>;
  license_id?: Maybe<BigintComparisonExp>;
};

/** ordering options when selecting data from "smb.licenses_translation" */
export type SmbLicensesTranslationOrderBy = {
  content?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  license?: Maybe<SmbLicensesOrderBy>;
  license_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.licenses_translation" */
export type SmbLicensesTranslationPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.licenses_translation" */
export enum SmbLicensesTranslationSelectColumn {
  /** column name */
  CONTENT = 'content',
  /** column name */
  ID = 'id',
  /** column name */
  LICENSE_ID = 'license_id'
}

/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjects = {
  __typename?: 'smb_objects';
  /** An array relationship */
  attachments: Array<SmbAttachments>;
  /** An array relationship */
  attribute_translations: Array<SmbAttributeTranslations>;
  created_at: Scalars['timestamptz'];
  exhibition_space?: Maybe<Scalars['String']>;
  /** An array relationship */
  highlights: Array<SmbHighlights>;
  /** An aggregated array relationship */
  highlights_aggregate: SmbHighlightsAggregate;
  id: Scalars['bigint'];
  /** An array relationship */
  topics_objects: Array<SmbTopicsObjects>;
  /** An array relationship */
  tours_objects: Array<SmbToursObjects>;
  updated_at: Scalars['timestamptz'];
};


/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjectsAttachmentsArgs = {
  distinct_on?: Maybe<Array<SmbAttachmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttachmentsOrderBy>>;
  where?: Maybe<SmbAttachmentsBoolExp>;
};


/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjectsAttributeTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: Maybe<SmbAttributeTranslationsBoolExp>;
};


/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjectsHighlightsArgs = {
  distinct_on?: Maybe<Array<SmbHighlightsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHighlightsOrderBy>>;
  where?: Maybe<SmbHighlightsBoolExp>;
};


/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjectsHighlightsAggregateArgs = {
  distinct_on?: Maybe<Array<SmbHighlightsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHighlightsOrderBy>>;
  where?: Maybe<SmbHighlightsBoolExp>;
};


/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjectsTopicsObjectsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsObjectsOrderBy>>;
  where?: Maybe<SmbTopicsObjectsBoolExp>;
};


/**
 * objects of smb
 * 
 * 
 * columns and relationships of "smb.objects"
 */
export type SmbObjectsToursObjectsArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsOrderBy>>;
  where?: Maybe<SmbToursObjectsBoolExp>;
};

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
  count?: Maybe<Scalars['Int']>;
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
  columns?: Maybe<Array<SmbObjectsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "smb.objects" */
export type SmbObjectsAggregateOrderBy = {
  avg?: Maybe<SmbObjectsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<SmbObjectsMaxOrderBy>;
  min?: Maybe<SmbObjectsMinOrderBy>;
  stddev?: Maybe<SmbObjectsStddevOrderBy>;
  stddev_pop?: Maybe<SmbObjectsStddevPopOrderBy>;
  stddev_samp?: Maybe<SmbObjectsStddevSampOrderBy>;
  sum?: Maybe<SmbObjectsSumOrderBy>;
  var_pop?: Maybe<SmbObjectsVarPopOrderBy>;
  var_samp?: Maybe<SmbObjectsVarSampOrderBy>;
  variance?: Maybe<SmbObjectsVarianceOrderBy>;
};

/** aggregate avg on columns */
export type SmbObjectsAvgFields = {
  __typename?: 'smb_objects_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "smb.objects" */
export type SmbObjectsAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smb.objects". All fields are combined with a logical 'AND'. */
export type SmbObjectsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbObjectsBoolExp>>>;
  _not?: Maybe<SmbObjectsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbObjectsBoolExp>>>;
  attachments?: Maybe<SmbAttachmentsBoolExp>;
  attribute_translations?: Maybe<SmbAttributeTranslationsBoolExp>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  exhibition_space?: Maybe<StringComparisonExp>;
  highlights?: Maybe<SmbHighlightsBoolExp>;
  id?: Maybe<BigintComparisonExp>;
  topics_objects?: Maybe<SmbTopicsObjectsBoolExp>;
  tours_objects?: Maybe<SmbToursObjectsBoolExp>;
  updated_at?: Maybe<TimestamptzComparisonExp>;
};

/** aggregate max on columns */
export type SmbObjectsMaxFields = {
  __typename?: 'smb_objects_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  exhibition_space?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "smb.objects" */
export type SmbObjectsMaxOrderBy = {
  created_at?: Maybe<OrderBy>;
  exhibition_space?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SmbObjectsMinFields = {
  __typename?: 'smb_objects_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  exhibition_space?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "smb.objects" */
export type SmbObjectsMinOrderBy = {
  created_at?: Maybe<OrderBy>;
  exhibition_space?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** ordering options when selecting data from "smb.objects" */
export type SmbObjectsOrderBy = {
  created_at?: Maybe<OrderBy>;
  exhibition_space?: Maybe<OrderBy>;
  highlights_aggregate?: Maybe<SmbHighlightsAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.objects" */
export type SmbObjectsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.objects" */
export enum SmbObjectsSelectColumn {
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  EXHIBITION_SPACE = 'exhibition_space',
  /** column name */
  ID = 'id',
  /** column name */
  UPDATED_AT = 'updated_at'
}

/** aggregate stddev on columns */
export type SmbObjectsStddevFields = {
  __typename?: 'smb_objects_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "smb.objects" */
export type SmbObjectsStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SmbObjectsStddevPopFields = {
  __typename?: 'smb_objects_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "smb.objects" */
export type SmbObjectsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SmbObjectsStddevSampFields = {
  __typename?: 'smb_objects_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "smb.objects" */
export type SmbObjectsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type SmbObjectsSumFields = {
  __typename?: 'smb_objects_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "smb.objects" */
export type SmbObjectsSumOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_pop on columns */
export type SmbObjectsVarPopFields = {
  __typename?: 'smb_objects_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "smb.objects" */
export type SmbObjectsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SmbObjectsVarSampFields = {
  __typename?: 'smb_objects_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "smb.objects" */
export type SmbObjectsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type SmbObjectsVarianceFields = {
  __typename?: 'smb_objects_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "smb.objects" */
export type SmbObjectsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};

export type SmbSearchObjectAggregateArgs = {
  attachment?: Maybe<Scalars['Boolean']>;
  attributekeys?: Maybe<Scalars['_varchar']>;
  filterlang?: Maybe<Scalars['String']>;
  highlight?: Maybe<Scalars['Boolean']>;
  searchterm?: Maybe<Scalars['String']>;
};

export type SmbSearchObjectArgs = {
  attachment?: Maybe<Scalars['Boolean']>;
  attributekeys?: Maybe<Scalars['_varchar']>;
  filterlang?: Maybe<Scalars['String']>;
  highlight?: Maybe<Scalars['Boolean']>;
  objectlimit?: Maybe<Scalars['Int']>;
  objectoffset?: Maybe<Scalars['Int']>;
  searchterm?: Maybe<Scalars['String']>;
};

export type SmbSearchObjectCombinedArgs = {
  and_search_values?: Maybe<Scalars['_search_tuple']>;
  attachment?: Maybe<Scalars['Boolean']>;
  attributekeys?: Maybe<Scalars['_varchar']>;
  filterlang?: Maybe<Scalars['String']>;
  highlight?: Maybe<Scalars['Boolean']>;
  not_search_values?: Maybe<Scalars['_search_tuple']>;
  or_search_values?: Maybe<Scalars['_search_tuple']>;
  searchterm?: Maybe<Scalars['String']>;
};

/** columns and relationships of "smb.search_suggestions" */
export type SmbSearchSuggestions = {
  __typename?: 'smb_search_suggestions';
  counter?: Maybe<Scalars['bigint']>;
  lang?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "smb.search_suggestions". All fields are combined with a logical 'AND'. */
export type SmbSearchSuggestionsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbSearchSuggestionsBoolExp>>>;
  _not?: Maybe<SmbSearchSuggestionsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbSearchSuggestionsBoolExp>>>;
  counter?: Maybe<BigintComparisonExp>;
  lang?: Maybe<StringComparisonExp>;
  value?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.search_suggestions" */
export type SmbSearchSuggestionsOrderBy = {
  counter?: Maybe<OrderBy>;
  lang?: Maybe<OrderBy>;
  value?: Maybe<OrderBy>;
};

/** select columns of table "smb.search_suggestions" */
export enum SmbSearchSuggestionsSelectColumn {
  /** column name */
  COUNTER = 'counter',
  /** column name */
  LANG = 'lang',
  /** column name */
  VALUE = 'value'
}

/** columns and relationships of "smb.topics" */
export type SmbTopics = {
  __typename?: 'smb_topics';
  has_slide: Scalars['Boolean'];
  id: Scalars['bigint'];
  /** An array relationship */
  objects: Array<SmbTopicsObjects>;
  preview_image: Scalars['String'];
  /** An array relationship */
  topics_translations: Array<SmbTopicsTranslations>;
};


/** columns and relationships of "smb.topics" */
export type SmbTopicsObjectsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsObjectsOrderBy>>;
  where?: Maybe<SmbTopicsObjectsBoolExp>;
};


/** columns and relationships of "smb.topics" */
export type SmbTopicsTopicsTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsTranslationsOrderBy>>;
  where?: Maybe<SmbTopicsTranslationsBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.topics". All fields are combined with a logical 'AND'. */
export type SmbTopicsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbTopicsBoolExp>>>;
  _not?: Maybe<SmbTopicsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbTopicsBoolExp>>>;
  has_slide?: Maybe<BooleanComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
  objects?: Maybe<SmbTopicsObjectsBoolExp>;
  preview_image?: Maybe<StringComparisonExp>;
  topics_translations?: Maybe<SmbTopicsTranslationsBoolExp>;
};

/** columns and relationships of "smb.topics_objects" */
export type SmbTopicsObjects = {
  __typename?: 'smb_topics_objects';
  created_at: Scalars['timestamptz'];
  id: Scalars['bigint'];
  /** An object relationship */
  object: SmbObjects;
  objects_id: Scalars['bigint'];
  /** An object relationship */
  topic: SmbTopics;
  topics_id: Scalars['bigint'];
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to filter rows from the table "smb.topics_objects". All fields are combined with a logical 'AND'. */
export type SmbTopicsObjectsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbTopicsObjectsBoolExp>>>;
  _not?: Maybe<SmbTopicsObjectsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbTopicsObjectsBoolExp>>>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
  object?: Maybe<SmbObjectsBoolExp>;
  objects_id?: Maybe<BigintComparisonExp>;
  topic?: Maybe<SmbTopicsBoolExp>;
  topics_id?: Maybe<BigintComparisonExp>;
  updated_at?: Maybe<TimestamptzComparisonExp>;
};

/** ordering options when selecting data from "smb.topics_objects" */
export type SmbTopicsObjectsOrderBy = {
  created_at?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  object?: Maybe<SmbObjectsOrderBy>;
  objects_id?: Maybe<OrderBy>;
  topic?: Maybe<SmbTopicsOrderBy>;
  topics_id?: Maybe<OrderBy>;
  updated_at?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.topics_objects" */
export type SmbTopicsObjectsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.topics_objects" */
export enum SmbTopicsObjectsSelectColumn {
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  ID = 'id',
  /** column name */
  OBJECTS_ID = 'objects_id',
  /** column name */
  TOPICS_ID = 'topics_id',
  /** column name */
  UPDATED_AT = 'updated_at'
}

/** ordering options when selecting data from "smb.topics" */
export type SmbTopicsOrderBy = {
  has_slide?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  preview_image?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.topics" */
export type SmbTopicsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.topics" */
export enum SmbTopicsSelectColumn {
  /** column name */
  HAS_SLIDE = 'has_slide',
  /** column name */
  ID = 'id',
  /** column name */
  PREVIEW_IMAGE = 'preview_image'
}

/** columns and relationships of "smb.topics_translations" */
export type SmbTopicsTranslations = {
  __typename?: 'smb_topics_translations';
  description?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
  /** An object relationship */
  language: SmbLanguage;
  title: Scalars['String'];
  /** An object relationship */
  topic: SmbTopics;
};

/** Boolean expression to filter rows from the table "smb.topics_translations". All fields are combined with a logical 'AND'. */
export type SmbTopicsTranslationsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbTopicsTranslationsBoolExp>>>;
  _not?: Maybe<SmbTopicsTranslationsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbTopicsTranslationsBoolExp>>>;
  description?: Maybe<StringComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  title?: Maybe<StringComparisonExp>;
  topic?: Maybe<SmbTopicsBoolExp>;
};

/** ordering options when selecting data from "smb.topics_translations" */
export type SmbTopicsTranslationsOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  title?: Maybe<OrderBy>;
  topic?: Maybe<SmbTopicsOrderBy>;
};

/** primary key columns input for table: "smb.topics_translations" */
export type SmbTopicsTranslationsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.topics_translations" */
export enum SmbTopicsTranslationsSelectColumn {
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  ID = 'id',
  /** column name */
  TITLE = 'title'
}

/** columns and relationships of "smb.tours" */
export type SmbTours = {
  __typename?: 'smb_tours';
  directions: Scalars['String'];
  id: Scalars['bigint'];
  number: Scalars['Int'];
  preview_image: Scalars['String'];
  /** An array relationship */
  tours_objects: Array<SmbToursObjects>;
  /** An array relationship */
  tours_translations: Array<SmbToursTranslation>;
};


/** columns and relationships of "smb.tours" */
export type SmbToursToursObjectsArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsOrderBy>>;
  where?: Maybe<SmbToursObjectsBoolExp>;
};


/** columns and relationships of "smb.tours" */
export type SmbToursToursTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbToursTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursTranslationOrderBy>>;
  where?: Maybe<SmbToursTranslationBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.tours". All fields are combined with a logical 'AND'. */
export type SmbToursBoolExp = {
  _and?: Maybe<Array<Maybe<SmbToursBoolExp>>>;
  _not?: Maybe<SmbToursBoolExp>;
  _or?: Maybe<Array<Maybe<SmbToursBoolExp>>>;
  directions?: Maybe<StringComparisonExp>;
  id?: Maybe<BigintComparisonExp>;
  number?: Maybe<IntComparisonExp>;
  preview_image?: Maybe<StringComparisonExp>;
  tours_objects?: Maybe<SmbToursObjectsBoolExp>;
  tours_translations?: Maybe<SmbToursTranslationBoolExp>;
};

/** columns and relationships of "smb.tours_objects" */
export type SmbToursObjects = {
  __typename?: 'smb_tours_objects';
  id: Scalars['bigint'];
  /** An object relationship */
  object: SmbObjects;
  object_id: Scalars['bigint'];
  room?: Maybe<Scalars['String']>;
  sequence: Scalars['Int'];
  /** An object relationship */
  tour: SmbTours;
  tour_id: Scalars['bigint'];
  /** An array relationship */
  tours_objects_translations: Array<SmbToursObjectsTranslation>;
};


/** columns and relationships of "smb.tours_objects" */
export type SmbToursObjectsToursObjectsTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsTranslationOrderBy>>;
  where?: Maybe<SmbToursObjectsTranslationBoolExp>;
};

/** Boolean expression to filter rows from the table "smb.tours_objects". All fields are combined with a logical 'AND'. */
export type SmbToursObjectsBoolExp = {
  _and?: Maybe<Array<Maybe<SmbToursObjectsBoolExp>>>;
  _not?: Maybe<SmbToursObjectsBoolExp>;
  _or?: Maybe<Array<Maybe<SmbToursObjectsBoolExp>>>;
  id?: Maybe<BigintComparisonExp>;
  object?: Maybe<SmbObjectsBoolExp>;
  object_id?: Maybe<BigintComparisonExp>;
  room?: Maybe<StringComparisonExp>;
  sequence?: Maybe<IntComparisonExp>;
  tour?: Maybe<SmbToursBoolExp>;
  tour_id?: Maybe<BigintComparisonExp>;
  tours_objects_translations?: Maybe<SmbToursObjectsTranslationBoolExp>;
};

/** ordering options when selecting data from "smb.tours_objects" */
export type SmbToursObjectsOrderBy = {
  id?: Maybe<OrderBy>;
  object?: Maybe<SmbObjectsOrderBy>;
  object_id?: Maybe<OrderBy>;
  room?: Maybe<OrderBy>;
  sequence?: Maybe<OrderBy>;
  tour?: Maybe<SmbToursOrderBy>;
  tour_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.tours_objects" */
export type SmbToursObjectsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.tours_objects" */
export enum SmbToursObjectsSelectColumn {
  /** column name */
  ID = 'id',
  /** column name */
  OBJECT_ID = 'object_id',
  /** column name */
  ROOM = 'room',
  /** column name */
  SEQUENCE = 'sequence',
  /** column name */
  TOUR_ID = 'tour_id'
}

/** columns and relationships of "smb.tours_objects_translation" */
export type SmbToursObjectsTranslation = {
  __typename?: 'smb_tours_objects_translation';
  abstract: Scalars['String'];
  description: Scalars['String'];
  /** An object relationship */
  language: SmbLanguage;
  /** An object relationship */
  tours_object: SmbToursObjects;
};

/**
 * Boolean expression to filter rows from the table
 * "smb.tours_objects_translation". All fields are combined with a logical 'AND'.
 */
export type SmbToursObjectsTranslationBoolExp = {
  _and?: Maybe<Array<Maybe<SmbToursObjectsTranslationBoolExp>>>;
  _not?: Maybe<SmbToursObjectsTranslationBoolExp>;
  _or?: Maybe<Array<Maybe<SmbToursObjectsTranslationBoolExp>>>;
  abstract?: Maybe<StringComparisonExp>;
  description?: Maybe<StringComparisonExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  tours_object?: Maybe<SmbToursObjectsBoolExp>;
};

/** ordering options when selecting data from "smb.tours_objects_translation" */
export type SmbToursObjectsTranslationOrderBy = {
  abstract?: Maybe<OrderBy>;
  description?: Maybe<OrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  tours_object?: Maybe<SmbToursObjectsOrderBy>;
};

/** primary key columns input for table: "smb.tours_objects_translation" */
export type SmbToursObjectsTranslationPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.tours_objects_translation" */
export enum SmbToursObjectsTranslationSelectColumn {
  /** column name */
  ABSTRACT = 'abstract',
  /** column name */
  DESCRIPTION = 'description'
}

/** ordering options when selecting data from "smb.tours" */
export type SmbToursOrderBy = {
  directions?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  number?: Maybe<OrderBy>;
  preview_image?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.tours" */
export type SmbToursPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.tours" */
export enum SmbToursSelectColumn {
  /** column name */
  DIRECTIONS = 'directions',
  /** column name */
  ID = 'id',
  /** column name */
  NUMBER = 'number',
  /** column name */
  PREVIEW_IMAGE = 'preview_image'
}

/** columns and relationships of "smb.tours_translation" */
export type SmbToursTranslation = {
  __typename?: 'smb_tours_translation';
  abstract: Scalars['String'];
  description: Scalars['String'];
  /** An object relationship */
  language: SmbLanguage;
  subtitle: Scalars['String'];
  title: Scalars['String'];
  /** An object relationship */
  tour: SmbTours;
};

/** Boolean expression to filter rows from the table "smb.tours_translation". All fields are combined with a logical 'AND'. */
export type SmbToursTranslationBoolExp = {
  _and?: Maybe<Array<Maybe<SmbToursTranslationBoolExp>>>;
  _not?: Maybe<SmbToursTranslationBoolExp>;
  _or?: Maybe<Array<Maybe<SmbToursTranslationBoolExp>>>;
  abstract?: Maybe<StringComparisonExp>;
  description?: Maybe<StringComparisonExp>;
  language?: Maybe<SmbLanguageBoolExp>;
  subtitle?: Maybe<StringComparisonExp>;
  title?: Maybe<StringComparisonExp>;
  tour?: Maybe<SmbToursBoolExp>;
};

/** ordering options when selecting data from "smb.tours_translation" */
export type SmbToursTranslationOrderBy = {
  abstract?: Maybe<OrderBy>;
  description?: Maybe<OrderBy>;
  language?: Maybe<SmbLanguageOrderBy>;
  subtitle?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  tour?: Maybe<SmbToursOrderBy>;
};

/** primary key columns input for table: "smb.tours_translation" */
export type SmbToursTranslationPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "smb.tours_translation" */
export enum SmbToursTranslationSelectColumn {
  /** column name */
  ABSTRACT = 'abstract',
  /** column name */
  DESCRIPTION = 'description',
  /** column name */
  SUBTITLE = 'subtitle',
  /** column name */
  TITLE = 'title'
}

/** columns and relationships of "smb.user" */
export type SmbUser = {
  __typename?: 'smb_user';
  email: Scalars['String'];
};

/** Boolean expression to filter rows from the table "smb.user". All fields are combined with a logical 'AND'. */
export type SmbUserBoolExp = {
  _and?: Maybe<Array<Maybe<SmbUserBoolExp>>>;
  _not?: Maybe<SmbUserBoolExp>;
  _or?: Maybe<Array<Maybe<SmbUserBoolExp>>>;
  email?: Maybe<StringComparisonExp>;
};

/** ordering options when selecting data from "smb.user" */
export type SmbUserOrderBy = {
  email?: Maybe<OrderBy>;
};

/** primary key columns input for table: "smb.user" */
export type SmbUserPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "smb.user" */
export enum SmbUserSelectColumn {
  /** column name */
  EMAIL = 'email'
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** subscription root */
export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "smb.attachments" */
  smb_attachments: Array<SmbAttachments>;
  /** fetch data from the table: "smb.attachments" using primary key columns */
  smb_attachments_by_pk?: Maybe<SmbAttachments>;
  /** execute function "smb.attribute_search_suggestions" which returns "smb.search_suggestions" */
  smb_attribute_search_suggestions: Array<SmbSearchSuggestions>;
  /** fetch data from the table: "smb.attribute_translations" */
  smb_attribute_translations: Array<SmbAttributeTranslations>;
  /** fetch data from the table: "smb.attribute_translations" using primary key columns */
  smb_attribute_translations_by_pk?: Maybe<SmbAttributeTranslations>;
  /** fetch data from the table: "smb.attributes" */
  smb_attributes: Array<SmbAttributes>;
  /** fetch data from the table: "smb.attributes" using primary key columns */
  smb_attributes_by_pk?: Maybe<SmbAttributes>;
  /** execute function "smb.autocomplete_search" which returns "smb.search_suggestions" */
  smb_autocomplete_search: Array<SmbSearchSuggestions>;
  /** execute function "smb.filter_objects" which returns "smb.objects" */
  smb_filter_objects: Array<SmbObjects>;
  /** execute function "smb.filter_objects" and query aggregates on result of table type "smb.objects" */
  smb_filter_objects_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.header" */
  smb_header: Array<SmbHeader>;
  /** fetch data from the table: "smb.header" using primary key columns */
  smb_header_by_pk?: Maybe<SmbHeader>;
  /** fetch data from the table: "smb.header_translations" */
  smb_header_translations: Array<SmbHeaderTranslations>;
  /** fetch data from the table: "smb.header_translations" using primary key columns */
  smb_header_translations_by_pk?: Maybe<SmbHeaderTranslations>;
  /** fetch data from the table: "smb.highlights" */
  smb_highlights: Array<SmbHighlights>;
  /** fetch aggregated fields from the table: "smb.highlights" */
  smb_highlights_aggregate: SmbHighlightsAggregate;
  /** fetch data from the table: "smb.highlights" using primary key columns */
  smb_highlights_by_pk?: Maybe<SmbHighlights>;
  /** fetch data from the table: "smb.intro_slide_translations" */
  smb_intro_slide_translations: Array<SmbIntroSlideTranslations>;
  /** fetch data from the table: "smb.intro_slide_translations" using primary key columns */
  smb_intro_slide_translations_by_pk?: Maybe<SmbIntroSlideTranslations>;
  /** fetch data from the table: "smb.intro_slides" */
  smb_intro_slides: Array<SmbIntroSlides>;
  /** fetch data from the table: "smb.intro_slides" using primary key columns */
  smb_intro_slides_by_pk?: Maybe<SmbIntroSlides>;
  /** fetch data from the table: "smb.intro_text_module_translations" */
  smb_intro_text_module_translations: Array<SmbIntroTextModuleTranslations>;
  /** fetch data from the table: "smb.intro_text_module_translations" using primary key columns */
  smb_intro_text_module_translations_by_pk?: Maybe<SmbIntroTextModuleTranslations>;
  /** fetch data from the table: "smb.intro_text_module_type" */
  smb_intro_text_module_type: Array<SmbIntroTextModuleType>;
  /** fetch data from the table: "smb.intro_text_module_type" using primary key columns */
  smb_intro_text_module_type_by_pk?: Maybe<SmbIntroTextModuleType>;
  /** fetch data from the table: "smb.intro_text_modules" */
  smb_intro_text_modules: Array<SmbIntroTextModules>;
  /** fetch data from the table: "smb.intro_text_modules" using primary key columns */
  smb_intro_text_modules_by_pk?: Maybe<SmbIntroTextModules>;
  /** fetch data from the table: "smb.language" */
  smb_language: Array<SmbLanguage>;
  /** fetch data from the table: "smb.language" using primary key columns */
  smb_language_by_pk?: Maybe<SmbLanguage>;
  /** fetch data from the table: "smb.licenses" */
  smb_licenses: Array<SmbLicenses>;
  /** fetch data from the table: "smb.licenses" using primary key columns */
  smb_licenses_by_pk?: Maybe<SmbLicenses>;
  /** fetch data from the table: "smb.licenses_translation" */
  smb_licenses_translation: Array<SmbLicensesTranslation>;
  /** fetch data from the table: "smb.licenses_translation" using primary key columns */
  smb_licenses_translation_by_pk?: Maybe<SmbLicensesTranslation>;
  /** fetch data from the table: "smb.objects" */
  smb_objects: Array<SmbObjects>;
  /** fetch aggregated fields from the table: "smb.objects" */
  smb_objects_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.objects" using primary key columns */
  smb_objects_by_pk?: Maybe<SmbObjects>;
  /** execute function "smb.search_object" which returns "smb.objects" */
  smb_search_object: Array<SmbObjects>;
  /** execute function "smb.search_object" and query aggregates on result of table type "smb.objects" */
  smb_search_object_aggregate: SmbObjectsAggregate;
  /** execute function "smb.search_object_aggregate" and query aggregates on result of table type "smb.objects" */
  smb_search_object_aggregate_aggregate: SmbObjectsAggregate;
  /** execute function "smb.search_object_combined" which returns "smb.objects" */
  smb_search_object_combined: Array<SmbObjects>;
  /** execute function "smb.search_object_combined" and query aggregates on result of table type "smb.objects" */
  smb_search_object_combined_aggregate: SmbObjectsAggregate;
  /** fetch data from the table: "smb.search_suggestions" */
  smb_search_suggestions: Array<SmbSearchSuggestions>;
  /** fetch data from the table: "smb.topics" */
  smb_topics: Array<SmbTopics>;
  /** fetch data from the table: "smb.topics" using primary key columns */
  smb_topics_by_pk?: Maybe<SmbTopics>;
  /** fetch data from the table: "smb.topics_objects" */
  smb_topics_objects: Array<SmbTopicsObjects>;
  /** fetch data from the table: "smb.topics_objects" using primary key columns */
  smb_topics_objects_by_pk?: Maybe<SmbTopicsObjects>;
  /** fetch data from the table: "smb.topics_translations" */
  smb_topics_translations: Array<SmbTopicsTranslations>;
  /** fetch data from the table: "smb.topics_translations" using primary key columns */
  smb_topics_translations_by_pk?: Maybe<SmbTopicsTranslations>;
  /** fetch data from the table: "smb.tours" */
  smb_tours: Array<SmbTours>;
  /** fetch data from the table: "smb.tours" using primary key columns */
  smb_tours_by_pk?: Maybe<SmbTours>;
  /** fetch data from the table: "smb.tours_objects" */
  smb_tours_objects: Array<SmbToursObjects>;
  /** fetch data from the table: "smb.tours_objects" using primary key columns */
  smb_tours_objects_by_pk?: Maybe<SmbToursObjects>;
  /** fetch data from the table: "smb.tours_objects_translation" */
  smb_tours_objects_translation: Array<SmbToursObjectsTranslation>;
  /** fetch data from the table: "smb.tours_objects_translation" using primary key columns */
  smb_tours_objects_translation_by_pk?: Maybe<SmbToursObjectsTranslation>;
  /** fetch data from the table: "smb.tours_translation" */
  smb_tours_translation: Array<SmbToursTranslation>;
  /** fetch data from the table: "smb.tours_translation" using primary key columns */
  smb_tours_translation_by_pk?: Maybe<SmbToursTranslation>;
  /** fetch data from the table: "smb.user" */
  smb_user: Array<SmbUser>;
  /** fetch data from the table: "smb.user" using primary key columns */
  smb_user_by_pk?: Maybe<SmbUser>;
};


/** subscription root */
export type SubscriptionRootSmbAttachmentsArgs = {
  distinct_on?: Maybe<Array<SmbAttachmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttachmentsOrderBy>>;
  where?: Maybe<SmbAttachmentsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbAttachmentsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbAttributeSearchSuggestionsArgs = {
  args: SmbAttributeSearchSuggestionsArgs;
  distinct_on?: Maybe<Array<SmbSearchSuggestionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbSearchSuggestionsOrderBy>>;
  where?: Maybe<SmbSearchSuggestionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbAttributeTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbAttributeTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttributeTranslationsOrderBy>>;
  where?: Maybe<SmbAttributeTranslationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbAttributeTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbAttributesArgs = {
  distinct_on?: Maybe<Array<SmbAttributesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbAttributesOrderBy>>;
  where?: Maybe<SmbAttributesBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbAttributesByPkArgs = {
  key: Scalars['String'];
};


/** subscription root */
export type SubscriptionRootSmbAutocompleteSearchArgs = {
  args: SmbAutocompleteSearchArgs;
  distinct_on?: Maybe<Array<SmbSearchSuggestionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbSearchSuggestionsOrderBy>>;
  where?: Maybe<SmbSearchSuggestionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbFilterObjectsArgs = {
  args: SmbFilterObjectsArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbFilterObjectsAggregateArgs = {
  args: SmbFilterObjectsArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbHeaderArgs = {
  distinct_on?: Maybe<Array<SmbHeaderSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHeaderOrderBy>>;
  where?: Maybe<SmbHeaderBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbHeaderByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbHeaderTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbHeaderTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHeaderTranslationsOrderBy>>;
  where?: Maybe<SmbHeaderTranslationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbHeaderTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbHighlightsArgs = {
  distinct_on?: Maybe<Array<SmbHighlightsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHighlightsOrderBy>>;
  where?: Maybe<SmbHighlightsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbHighlightsAggregateArgs = {
  distinct_on?: Maybe<Array<SmbHighlightsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbHighlightsOrderBy>>;
  where?: Maybe<SmbHighlightsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbHighlightsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbIntroSlideTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbIntroSlideTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroSlideTranslationsOrderBy>>;
  where?: Maybe<SmbIntroSlideTranslationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbIntroSlideTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbIntroSlidesArgs = {
  distinct_on?: Maybe<Array<SmbIntroSlidesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroSlidesOrderBy>>;
  where?: Maybe<SmbIntroSlidesBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbIntroSlidesByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbIntroTextModuleTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModuleTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModuleTranslationsOrderBy>>;
  where?: Maybe<SmbIntroTextModuleTranslationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbIntroTextModuleTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbIntroTextModuleTypeArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModuleTypeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModuleTypeOrderBy>>;
  where?: Maybe<SmbIntroTextModuleTypeBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbIntroTextModuleTypeByPkArgs = {
  value: Scalars['String'];
};


/** subscription root */
export type SubscriptionRootSmbIntroTextModulesArgs = {
  distinct_on?: Maybe<Array<SmbIntroTextModulesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbIntroTextModulesOrderBy>>;
  where?: Maybe<SmbIntroTextModulesBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbIntroTextModulesByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbLanguageArgs = {
  distinct_on?: Maybe<Array<SmbLanguageSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLanguageOrderBy>>;
  where?: Maybe<SmbLanguageBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbLanguageByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbLicensesArgs = {
  distinct_on?: Maybe<Array<SmbLicensesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLicensesOrderBy>>;
  where?: Maybe<SmbLicensesBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbLicensesByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbLicensesTranslationArgs = {
  distinct_on?: Maybe<Array<SmbLicensesTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbLicensesTranslationOrderBy>>;
  where?: Maybe<SmbLicensesTranslationBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbLicensesTranslationByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbObjectsArgs = {
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbObjectsAggregateArgs = {
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbObjectsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbSearchObjectArgs = {
  args: SmbSearchObjectArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbSearchObjectAggregateArgs = {
  args: SmbSearchObjectArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbSearchObjectAggregateAggregateArgs = {
  args: SmbSearchObjectAggregateArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbSearchObjectCombinedArgs = {
  args: SmbSearchObjectCombinedArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbSearchObjectCombinedAggregateArgs = {
  args: SmbSearchObjectCombinedArgs;
  distinct_on?: Maybe<Array<SmbObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbObjectsOrderBy>>;
  where?: Maybe<SmbObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbSearchSuggestionsArgs = {
  distinct_on?: Maybe<Array<SmbSearchSuggestionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbSearchSuggestionsOrderBy>>;
  where?: Maybe<SmbSearchSuggestionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbTopicsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsOrderBy>>;
  where?: Maybe<SmbTopicsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbTopicsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbTopicsObjectsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsObjectsOrderBy>>;
  where?: Maybe<SmbTopicsObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbTopicsObjectsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbTopicsTranslationsArgs = {
  distinct_on?: Maybe<Array<SmbTopicsTranslationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbTopicsTranslationsOrderBy>>;
  where?: Maybe<SmbTopicsTranslationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbTopicsTranslationsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbToursArgs = {
  distinct_on?: Maybe<Array<SmbToursSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursOrderBy>>;
  where?: Maybe<SmbToursBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbToursByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbToursObjectsArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsOrderBy>>;
  where?: Maybe<SmbToursObjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbToursObjectsByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbToursObjectsTranslationArgs = {
  distinct_on?: Maybe<Array<SmbToursObjectsTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursObjectsTranslationOrderBy>>;
  where?: Maybe<SmbToursObjectsTranslationBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbToursObjectsTranslationByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbToursTranslationArgs = {
  distinct_on?: Maybe<Array<SmbToursTranslationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbToursTranslationOrderBy>>;
  where?: Maybe<SmbToursTranslationBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbToursTranslationByPkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type SubscriptionRootSmbUserArgs = {
  distinct_on?: Maybe<Array<SmbUserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SmbUserOrderBy>>;
  where?: Maybe<SmbUserBoolExp>;
};


/** subscription root */
export type SubscriptionRootSmbUserByPkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};



