import { EVisibility } from '../enums/visibility.enum';
/**
 * Configuration for Fields of Exhibition-Object Detail view. (src/features/Detail/DetailPage.tsx)
 * Feeds ./features/Detail/hooks/use-visibility-configuration.hook.ts
 * with information about Fields to show in grid (short list view)
 * and in Accordion (expandable detail view)
 * @compilation allows for custom configuration options for different institutions
 * @fields the list of fields to rendered
 * @param key refers to the field from the API/api-service
 * @param visibility: configures weather the field is visible when its empty. An empty fields with "forced" visibility
 * results in a default string being rendered instead of the empty field (handled in use-visibility-configuration.hook.ts)
 */
export const ExhibitDescriptionFieldsVisibilityConfig = {
  grid: [
    {
      compilation: 'default',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'materialAndTechnique', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dimensionsAndWeight', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'geographicalReferences', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'acquisition', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
  ],
  accordion: [
    {
      compilation: 'default',
      fields: [
        {
          key: 'description',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          expanded: true,
        },
      ],
    },
    {
      compilation: 'EM',
      fields: [
        {
          key: 'description',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          expanded: true,
        },
        { key: 'provenanceEvaluation', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenance', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'NG',
      fields: [
        { key: 'signatures', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        {
          key: 'description',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          expanded: true,
        },
        { key: 'provenanceEvaluation', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenance', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'exhibitions', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'literature', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
  ],
};
