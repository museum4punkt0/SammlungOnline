###

#### How to add new Fields to the Detail page frontend

1. add new fields to `./src/features/Detail/configuration/visible-fields.config.ts`

2. Add Translations for the field in `public/locales/de/translation.json` and `public/locales/en/translation.json`

3. api translation in `src/core/enums/graphql-translations/graphql-translation-attributes-fields.enum.ts`
4. add field definition to mui-component-library `src/core/models/exhibit/exhibit.model.ts` &&? `src/core/models/exhibit/graphql-exhibit.model.ts`

5. Add fields in `src/core/services/ExhibitService/ExhibitService.ts`
