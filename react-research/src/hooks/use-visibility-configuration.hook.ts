/* eslint-disable no-console */
import { useTranslation } from 'react-i18next';

import { EVisibility } from '../enums/index';
import { ExhibitDescriptionFieldsVisibilityConfig } from '../utils/configuration/index';
import { LinkBuilder } from '../utils/LinkBuilder';
import {
  ExhibitModel,
  IGridItem,
  IAccordionItem,
  IAccordionObject,
  useConfigLoader,
} from '@smb/smb-react-components-library';

export interface IUseVisibilityConfiguration {
  exhibit: ExhibitModel | null;
  lineBreak: string;
}

export interface IUseNewVisibilityConfiguration {
  view: string;
  exhibit: ExhibitModel | null;
  lineBreak: string;
}

export interface ExhibitDescriptionFieldsKeys {
  key: string;
  visibility: EVisibility.VISIBLE_IF_AVAILABLE;
  layout: 'column' | 'row';
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
    ?.map(field => {
      // sets default text for empty exhibition fields
      const noDataAvailableText = t('search.exhibit.attributes.noData');
      // gets the fields content from the field
      let content = exhibit[(field.key as unknown) as keyof ExhibitModel] as
        | string
        | string[]
        | string[]
        | Array<{
            formatted: string;
            href: string;
            html: boolean;
          }>;

      if (field.key == 'titles' && Array.isArray(content)) {
        content = content.slice(1, content.length);
      }

      // joins the content if its is an array,
      let contentTransformed:
        | string
        | Array<{
            formatted: string;
            href: string;
            html: boolean;
          }> = '';

      if (Array.isArray(content) && typeof content[0] === 'string') {
        contentTransformed = (content as string[]).map(item => {
          return {
            formatted: item,
            href: item,
            html: true,
          };
        });
      } else if (Array.isArray(content) && typeof content[0] !== 'string') {
        contentTransformed = content as any;
      } else {
        contentTransformed = content ? (content as string) : '';
        // Filters out empty values
        contentTransformed = contentTransformed
          .split('\n')
          .filter(value => value.trim())
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
      }
      return {
        title:
          field.key !== 'involvedParties'
            ? t(`search.exhibit.attributes.${field.key}`)
            : ' ',
        content: contentTransformed,
      };
    })
    .filter(
      // filters out empty items
      item => item.title && item.content,
    );

  return items ?? [];
};

/**
 * Hook to format Card Data for Detail Display
 * @param name: determines which configuration is to be used in ExhibitDescriptionFieldsVisibilityConfig
 * @param exhibit: ExhibitModel | null; The Exhibition-Object Data to be formatted
 * @param lineBreak: string the line breaks to use for array conversion
 * @returns an Array of Accordion Items, that is formatted according to the configuration, empty items are filtered out
 */

export const useCardConfiguration = ({
  view,
  exhibit,
  lineBreak = '\n',
}: IUseNewVisibilityConfiguration): IGridItem[] => {
  const { t } = useTranslation();

  if (!exhibit) {
    return [];
  }

  const configurations =
    view === 'card'
      ? ExhibitDescriptionFieldsVisibilityConfig['card']
      : ExhibitDescriptionFieldsVisibilityConfig['list'];

  /**
   * Parses the Config object to determine weather to use the default config or some
   * specific config for the current collectionKey
   */
  const configuration =
    configurations.find(cfg => exhibit?.collectionKey?.startsWith(cfg.compilation)) ||
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    configurations.find(cfg => cfg.compilation === 'default')!;

  const items: IGridItem[] = configuration.fields
    ?.map(field => {
      // sets default text for empty exhibition fields
      const noDataAvailableText = t('search.exhibit.attributes.noData');
      // gets the fields content from the field
      const content = exhibit[(field.key as unknown) as keyof ExhibitModel] as
        | string
        | string[]
        | Array<{
            formatted: string;
            href: string;
          }>;
      // joins the content if its is an array,
      let contentTransformed: string;
      // console.log('content----', field, content);

      if (Array.isArray(content) && typeof content[0] !== 'string') {
        contentTransformed = (content[0]?.formatted ?? '') as string;
      } else {
        contentTransformed = Array.isArray(content)
          ? (content[0] as string)
          : (content as string) ?? ('' as string);
      }
      // Filters out empty values
      contentTransformed = contentTransformed
        .split('\n')
        .filter(value => value.trim())
        .join(lineBreak);
      // If "Visible_if_Available"  is set and there is no content it sets
      // title and content to  '' (will be removed with filter in the end)
      // otherwise sets text to default empty-text or the prepared Data
      // console.log(field, 'field.visibility');

      if (
        field.visibility === EVisibility.VISIBLE_IF_AVAILABLE &&
        !contentTransformed?.trim()
      ) {
        return { title: '', content: '' };
      } else {
        contentTransformed = contentTransformed || noDataAvailableText;
      }
      if (field.key === 'involvedParties') {
        if (contentTransformed.includes(':')) {
          contentTransformed = contentTransformed.split(':')[1];
        }
        if (contentTransformed.includes('(')) {
          contentTransformed = contentTransformed.split('(')[0];
        }
        if (contentTransformed.includes(',')) {
          contentTransformed = contentTransformed.split(',')[0];
        }
      }

      return {
        title: t(`search.exhibit.attributes.${field.key}`),
        content: contentTransformed,
      };
    })
    .filter(
      // filters out empty items
      item => item.title && item.content,
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
  const { config } = useConfigLoader();
  const { t } = useTranslation();
  const configurations = ExhibitDescriptionFieldsVisibilityConfig['accordion'];

  const getkeywordsList = (keys: ExhibitDescriptionFieldsKeys[]): IAccordionObject[] => {
    const getListItems = (
      field: ExhibitDescriptionFieldsKeys,
    ): { text?: string; externalUrl?: string; internalUrl: string }[] => {
      const content = exhibit
        ? (exhibit[(field.key as unknown) as keyof ExhibitModel] as string[])
        : [''];
      const contentTransformed: {
        text?: string;
        externalUrl?: string;
        internalUrl: string;
      }[] =
        content &&
        content.map(item => {
          const link = new LinkBuilder(config);
          const regex = new RegExp(/\[(.[^[\]]+)\](.+)/g);
          const groups = regex.exec(item);

          if (groups) {
            const id = groups[1];
            const content = groups[2];
            return {
              text: `${id} ${content.trimStart()}`,
              externalUrl: link.getIconClassLink(id),
              internalUrl: link.getSearchConditionLink(field.key, item),
            };
          }
          return {
            text: item,
            externalUrl: '',
            internalUrl: link.getSearchConditionLink(field.key, item),
          };
        });

      return contentTransformed;
    };

    const items: IAccordionObject[] = keys
      ?.map((field: ExhibitDescriptionFieldsKeys) => {
        return {
          title: t(`search.exhibit.attributes.${field.key}`),
          list: getListItems(field),
          layout: field.layout,
          key: field.key,
        };
      })
      .filter(item => item?.title && item.list && item?.list?.length > 0);
    return items;
  };

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
    ?.map((field: any) => {
      // sets default text for empty exhibition fields
      const noDataAvailableText = t('search.exhibit.attributes.noData');
      // gets the fields content from the exhibit
      let keywordsList: IAccordionObject[] | null = [];
      const content = exhibit[(field.key as unknown) as keyof ExhibitModel] as
        | string
        | string[];
      if (field.key === 'provenanceEvaluation') {
        listTitle = content ? content.toString() : '';
      }

      let contentTransformed: string | string[];
      // Removes empty values from accordion array but keeps the array form.
      if (Array.isArray(content)) {
        contentTransformed = content.filter(value => value.trim());
      } else {
        // joins the content if its is an array,
        contentTransformed = content ?? '';

        // Filters out empty values and transforms to the correct linebreak
        contentTransformed = contentTransformed
          .split('\n')
          .filter(value => value.trim())
          .join(lineBreak);
      }

      // If "Visible_if_Available"  is set and there is no content it sets
      // title and content to  '' (will be removed with filter in the end)
      // otherwise sets text to default empty-text or the prepared Data
      // also empty provenanceEvaluation field
      // (we will handle the content below && above TODO: refactor this)

      if (field.key === 'keywords' && field?.keys) {
        let innerContent = false;
        field.keys.map((field: any) => {
          const content:
            | string
            | number
            | boolean
            | string[]
            | undefined
            | []
            | Array<{
                formatted: string;
                href: string;
              }> = exhibit[(field.key as unknown) as keyof ExhibitModel];

          if (content) {
            innerContent = true;
          }
        });
        if (innerContent) {
          keywordsList = getkeywordsList(field?.keys as ExhibitDescriptionFieldsKeys[]);
          contentTransformed = [];
        }
      }
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
        keywordsList: [...keywordsList],
        expanded: field.expanded,
      };
    })
    .filter(
      // filters out empty items
      item => item.title && item.content,
    );
  // handle provenance title
  if (listTitle) {
    const provenanceIndex: number = items.findIndex(
      item => item.title === t(`search.exhibit.attributes.provenance`),
    );
    items[provenanceIndex].listTitle = listTitle;
  }

  return items ?? [];
};
