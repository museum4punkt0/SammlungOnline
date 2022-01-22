import { useTranslation } from 'react-i18next';

import { EVisibility } from '../enums/visibility.enum';

import { ExhibitDescriptionFieldsVisibilityConfig } from '../configuration/visible-fields.config';

import { ExhibitModel, IGridItem, IAccordionItem } from '@smb/smb-react-components-library';

export interface IUseVisibilityConfiguration {
  exhibit: ExhibitModel | null;
  lineBreak: string;
}

/**
 * Hook to format Grid Data for Detail Display
 * @param name: determines which configuration is to be used in ExhibitDescriptionFieldsVisibilityConfig
 * @param exhibit: ExhibitModel | null; The Exhibition-Object Data to be formatted
 * @param lineBreak: string the line breaks to use for array conversion
 * @returns an Array of Accordion Items, that is formatted according to the configuration, empty items are filtered out
 */
export const useGridConfiguration = ({
  exhibit,
  lineBreak = '\n',
}: IUseVisibilityConfiguration): IGridItem[] => {
  const { t } = useTranslation();
  const configurations = ExhibitDescriptionFieldsVisibilityConfig['grid'];
  let configuration = null;
  /** Parses the Config object to determine weather to use the default config or some
   * specific config for the current collectionKey
   */
  for (const _config of configurations) {
    if (exhibit?.collectionKey?.startsWith(_config.compilation)) {
      configuration = _config;
    } else if (!configuration && _config.compilation === 'default') {
      configuration = _config;
    }
  }

  if (!configuration || !exhibit) {
    return [];
  }

  // transverses each field of the configuration file
  const items: IGridItem[] = configuration?.fields
    ?.map((field) => {
      // sets default text for empty exhibition fields
      const noDataAvailableText = t('search.exhibit.attributes.noData');
      // gets the fields content from the field
      const content = exhibit[field.key as unknown as keyof ExhibitModel] as
        | string
        | string[];
      // joins the content if its is an array,
      let contentTransformed: string = Array.isArray(content)
        ? content.join('\n')
        : content ?? '';
      // Filters out empty values
      contentTransformed = contentTransformed
        .split('\n')
        .filter((value) => value.trim())
        .join(lineBreak);
      // If "Visible_if_Available"  is set and there is no content it sets
      // title and content to  '' (will be removed with filter in the end)
      // otherwise sets text to default empty-text or the prepared Data
      if (
        field.visibility === EVisibility.VISIBLE_IF_AVAILABLE &&
        !contentTransformed?.trim()
      ) {
        return { title: '', content: '' };
      } else {
        contentTransformed = contentTransformed || noDataAvailableText;
      }
      return {
        title: t(`search.exhibit.attributes.${field.key}`),
        content: contentTransformed,
      };
    })
    .filter(
      // filters out empty items
      (item) => item.title && item.content,
    );

  return items ?? [];
};

/**
 * Hook to format Accordion Data for Detail Display
 * @param name: determines which configuration is to be used in ExhibitDescriptionFieldsVisibilityConfig
 * @param exhibit: ExhibitModel | null; The Exhibition-Object Data to be formatted
 * @param lineBreak: string the line breaks to use for array conversion
 * @returns an Array of Accordion Items, that is formatted according to the configuration, empty items are filtered out
 */
export const useAccordionConfiguration = ({
  exhibit,
  lineBreak = '\n',
}: IUseVisibilityConfiguration): IAccordionItem[] => {
  const { t } = useTranslation();
  const configurations = ExhibitDescriptionFieldsVisibilityConfig['accordion'];

  let configuration = null;
  /** Parses the Config object to determine weather to use the default config or some
   * specific config for the current collectionKey
   */
  for (const _config of configurations) {
    if (exhibit?.collectionKey?.startsWith(_config.compilation)) {
      configuration = _config;
    } else if (!configuration && _config.compilation === 'default') {
      configuration = _config;
    }
  }

  if (!configuration || !exhibit) {
    return [];
  }

  let listTitle: string | undefined;
  // transverses each field of the configuration file
  const items: IAccordionItem[] = configuration?.fields
    ?.map((field) => {
      // sets default text for empty exhibition fields
      const noDataAvailableText = t('search.exhibit.attributes.noData');
      // gets the fields content from the exhibit
      const content = exhibit[field.key as unknown as keyof ExhibitModel] as
        | string
        | string[];
      if (field.key === 'provenanceEvaluation') {
        listTitle = content ? content.toString() : '';
      }
      let contentTransformed: string | string[];
      // Removes empty values from accordion array but keeps the array form.
      if (Array.isArray(content)) {
        contentTransformed = content.filter((value) => value.trim());
      } else {
        // joins the content if its is an array,
        contentTransformed = Array.isArray(content) ? content.join('\n') : content ?? '';
        // Filters out empty values and transforms to the correct linebreak
        contentTransformed = contentTransformed
          .split('\n')
          .filter((value) => value.trim())
          .join(lineBreak);
      }
      // If "Visible_if_Available"  is set and there is no content it sets
      // title and content to  '' (will be removed with filter in the end)
      // otherwise sets text to default empty-text or the prepared Data
      // also empty provenanceEvaluation field
      // (we will handle the content below && above TODO: refactor this)
      if (
        (field.visibility === EVisibility.VISIBLE_IF_AVAILABLE &&
          !Array.isArray(contentTransformed) &&
          !contentTransformed?.trim()) ||
        contentTransformed.length < 0 ||
        field.key === 'provenanceEvaluation'
      ) {
        return { title: '', content: '' };
      } else {
        contentTransformed = contentTransformed || noDataAvailableText;
      }

      return {
        title: t(`search.exhibit.attributes.${field.key}`),
        content: contentTransformed,
        expanded: field.expanded,
      };
    })
    .filter(
      // filters out empty items
      (item) => item.title && item.content,
    );
  // handle provenance title
  if (listTitle) {
    const provenanceIndex: number = items.findIndex(
      (item) => item.title === t(`search.exhibit.attributes.provenance`),
    );
    items[provenanceIndex].listTitle = listTitle;
  }

  return items ?? [];
};
