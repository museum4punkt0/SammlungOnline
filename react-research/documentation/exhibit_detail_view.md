TODO Update content and rename file


## How to add new fields to the DetailPage frontend

1. Add new fields to `src/features/Detail/configuration/visible-fields.config.ts`
2. Add translations for the field in `public/locales/de/translation.json` and `public/locales/en/translation.json`
3. Add API translation in `src/core/enums/graphql-translations/graphql-translation-attributes-fields.enum.ts`
4. Add field definition to react-component-library `src/core/models/exhibit/exhibit.model.ts` && `src/core/models/exhibit/graphql-exhibit.model.ts`
5. Add fields in `src/core/services/ExhibitService/ExhibitService.ts`

## How to add new fields to the AdvancedSearch 

1. Add field to ESearchConditionsFields in `src/enums/search-condition-fields.enum.ts`
2. Add a parser instance for the field to `src/parsers/search-filter-parsers.map.ts`

## How to add new facet groups to the AdvancedSearch

1. Add the group to IFetchAdvancedSearchInfo in `src/parsers/advanced-search-info.parser.ts`
2. Add the group structure to DEFAULT_ADVANCED_SEARCH_INFO in same file
3. Add a parsing method for the group to AdvancedSearchInfoParser in same file

