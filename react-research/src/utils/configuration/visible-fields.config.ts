import { EVisibility } from "../../enums/index";

/**
 * Configuration for Fields of Exhibition-Object Detail view. (src/features/Detail/DetailPage.tsx)
 * Feeds ./features/Detail/hooks/use-visibility-configuration.hook.ts
 * with information about Fields to show in grid (short list view)
 * and in Accordion (expandable detail view)
 * @compilation allows for custom configuration options for different institutions
 * @fields the list of fields to rendered
 * @keys the list of fields to rendered
 * @param key refers to the field from the API/api-service
 * @param visibility: configures whether the field is visible when its empty. An empty fields with "forced" visibility
 * results in a default string being rendered instead of the empty field (handled in use-visibility-configuration.hook.ts)
 *
 * -----
 * note: If a configuration is not set for a compilation, the default is used
 */
export const ExhibitDescriptionFieldsVisibilityConfig = {
  grid: [
    {
      compilation: 'default',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'archiveContent', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'titles', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'materialAndTechnique', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dimensionsAndWeight', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'geographicalReferences', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'culturalReferences', visibility: EVisibility.VISIBLE_IF_AVAILABLE},
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
        { key: 'inscriptions', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenanceEvaluation', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenance', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KB',
      fields: [
        {
          key: 'description',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          expanded: true,
        },
        { key: 'inscriptions', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenanceEvaluation', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenance', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        {
          key: 'keywords',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          keys: [
            {
              key: 'keywords',
              visibility: EVisibility.VISIBLE_IF_AVAILABLE,
              layout: 'row',
            },
            {
              key: 'iconclasses',
              visibility: EVisibility.VISIBLE_IF_AVAILABLE,
              layout: 'column',
            },
            {
              key: 'iconography',
              visibility: EVisibility.VISIBLE_IF_AVAILABLE,
              layout: 'column',
            },
          ],
        },
      ],
    },
    {
      compilation: 'KBPlakat',
      fields: [
        {
          key: 'description',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          expanded: true,
        },
        { key: 'inscriptions', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenanceEvaluation', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenance', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        {
          key: 'keywords',
          visibility: EVisibility.VISIBLE_IF_AVAILABLE,
          keys: [
            {
              key: 'keywords',
              visibility: EVisibility.VISIBLE_IF_AVAILABLE,
              layout: 'row',
            },
            {
              key: 'iconclasses',
              visibility: EVisibility.VISIBLE_IF_AVAILABLE,
              layout: 'column',
            },
            {
              key: 'iconography',
              visibility: EVisibility.VISIBLE_IF_AVAILABLE,
              layout: 'column',
            },
          ],
        },
        { key: 'literature', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
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
        { key: 'inscriptions', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenanceEvaluation', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'provenance', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'exhibitions', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'literature', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
  ],

  card: [
    {
      compilation: 'default',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'AMP',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MEK',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MK',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'ANT',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'EM',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'AKu',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'GG',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'IfM',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'ISL',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KB',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KGM',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KK',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MEK',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MIM',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MSB',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MVF',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'NG',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'SBM',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'SKS',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'VAM',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'findSpot', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'ZA',
      fields: [
        { key: 'title', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
  ],

  list: [
    {
      compilation: 'default',
      fields: [
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'AMP',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'ANT',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'EM',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'AKu',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'GG',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'IfM',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'ISL',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KB',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KGM',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'KK',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MEK',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MIM',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MVF',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'NG',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'MSB',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'SBM',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'SKS',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'VAM',
      fields: [
        { key: 'technicalTerm', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
    {
      compilation: 'ZA',
      fields: [
        { key: 'involvedParties', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'dating', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'identNumber', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
        { key: 'collection', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
      ],
    },
  ],
};
