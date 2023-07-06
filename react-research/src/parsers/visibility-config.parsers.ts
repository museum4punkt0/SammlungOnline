/* eslint-disable no-console */
import {
  ExhibitModel,
  IGridItem,
  IGridItemContent,
} from '@smb/smb-react-components-library';
import { LinkBuilder } from '../utils/LinkBuilder';
import { TFunction } from 'i18next';
import { queryParamsStringGetter } from '../hooks/use-query-params-getter.hook';

/**
 * Aggregation of all possible values an object field can have on an
 * ExhibitModel in a full projection.
 *
 * -----
 * @note: Should a new field be added at a later time (in grid), the parser should be adjusted
 */
export interface IObjectFieldValue {
  id?: number;
  typeId?: number;
  denominationId?: number;
  key?: string;
  filename?: string;
  title?: string;
  linkTemplate?: string;
  name?: string;
  formatted?: string;
  markup?: string;
  gte?: string;
  lte?: string;
  location?: string;
  details?: string;
}
/**
 * Parser class for fields to be displayed in the grid
 */
export class GridFieldsParser {
  private readonly _exhibit: ExhibitModel;
  private readonly _missingDataPlaceholder: string;
  private readonly _t: TFunction;
  private readonly _notDisplayedFieldNames = ['involvedParties'];
  private readonly getQueryParamsString: queryParamsStringGetter;

  constructor(
    exhibit: ExhibitModel,
    translator: TFunction,
    getQueryParamsString: () => string,
    missingDataPlaceholder?: string,
  ) {
    this._exhibit = exhibit;
    this._missingDataPlaceholder = missingDataPlaceholder ?? 'No data available.';
    this._t = translator;
    this.getQueryParamsString = getQueryParamsString;
  }

  /**
   * Parses any field that exists on an ExhibitModel instance. If it doesn't
   * exist, an empty list is returned
   * @param fieldName
   */
  public parseField(fieldName: string): string | IGridItem {
    if (!this._exhibit) return '';
    const fieldContent = this._exhibit[(fieldName as unknown) as keyof ExhibitModel];
    if (!fieldContent) return '';

    const simpleParse = this._tryParsePrimaryValues(
      fieldName,
      fieldContent as string | string[],
    );
    if (simpleParse.success) return simpleParse.result ?? '';
    return this._tryParseObjectValue(fieldName, fieldContent as IObjectFieldValue[]);
  }

  /**
   * Checks if the data in the provided field is a simple string or list of
   * strings or empty list and returns it formatted as an IGridItem and
   * @param fieldName - name of the field in ExhibitModel
   * @param fieldContent - content of the field from ExhibitModel
   * @returns {success: boolean (weather it was a simple field), result: IGridItem}
   * @private
   */
  private _tryParsePrimaryValues(
    fieldName: string,
    fieldContent: string | string[],
  ): { result: IGridItem | undefined; success: boolean } {
    const title = this._getTitle(fieldName);
    if (typeof fieldContent === 'string') {
      return {
        success: true,
        result: {
          title: title,
          content: fieldContent,
        },
      };
    }
    if (
      Array.isArray(fieldContent) &&
      fieldContent.length &&
      typeof fieldContent[0] === 'string'
    ) {
      return {
        success: true,
        result: {
          title: title,
          content: fieldContent.filter(str => str.trim()).join('\n'),
        },
      };
    }

    if (Array.isArray(fieldContent) && !fieldContent.length) {
      return {
        success: true,
        result: {
          title: title,
          content: this._missingDataPlaceholder,
        },
      };
    }

    return { success: false, result: undefined };
  }

  /**
   * Tries to parse a complex field that has any of the known layouts.
   * If a markup field is met, parser will look for anchor html tags (a) and
   * should they have data-link-type="internal" the href will be replaced with
   * internal search link with the filter for that field applied
   * @param fieldName
   * @param fieldValue
   * @private
   */
  private _tryParseObjectValue(
    fieldName: string,
    fieldValue: IObjectFieldValue[],
  ): IGridItem {
    const gridItem = {
      title: this._getTitle(fieldName),
      content: [] as IGridItemContent[],
    };

    fieldValue.forEach(item => {
      const searchValue =
        item.name ||
        item.location ||
        item.details ||
        item.title ||
        item.formatted ||
        item.key ||
        item.id?.toString() ||
        '';
      const obj = {
        markup: item.markup
          ? replaceInternalLinks(
              fieldName,
              item.markup,
              searchValue,
              this._t,
              this.getQueryParamsString,
            )
          : '',
        formatted: item.formatted ?? '',
      };
      gridItem.content.push(obj);
    });

    return gridItem;
  }

  /**
   * Checks if the field name title should be displayed and returns empty string
   * if it is in the list of fields that should not have their names displayed
   * else returns the translated field name
   * @param fieldName
   * @private
   */
  private _getTitle(fieldName: string): string {
    return this._notDisplayedFieldNames.includes(fieldName)
      ? ''
      : this._t(`search.exhibit.attributes.${fieldName}`);
  }
}

/**
 * Replace all the internal links in the markup string if they exist. Also adds
 * aria-label and title attributes to links. If links are external, aria-label
 * and title are added but links are not replaced.
 * If no links are found, the unaltered markup is returned
 * @param fieldName - field for which replacement of links is made
 * @param markup - markup in which to look for links
 * @param searchValue - value to be applied in the filtering
 * @param t - function to translate external links
 * @param getQueryParamsString - function to get the query params to be added in url before search field condition
 * @private
 */
export const replaceInternalLinks = (
  fieldName: string,
  markup: string,
  searchValue: string,
  t?: TFunction,
  getQueryParamsString?: queryParamsStringGetter,
): string => {
  const domParser = new DOMParser();
  const rawHtml = domParser.parseFromString(markup, 'text/html');
  const links = rawHtml.getElementsByTagName('a');
  if (!links.length) {
    return markup;
  }
  const params = getQueryParamsString && getQueryParamsString();
  const link = new LinkBuilder().getSearchConditionLink(fieldName, searchValue, params);

  for (let i = 0; i < links.length; i++) {
    const anchor = links[i];
    if (
      // eslint-disable-next-line no-prototype-builtins
      anchor.dataset.hasOwnProperty('linkType') &&
      anchor.dataset.linkType === 'internal'
    ) {
      links[i].href = link;
      const fieldTranslated = t ? t(`search.exhibit.attributes.${fieldName}`) : '';
      const title = `${
        t
          ? t('details.internalSearch', {
              field: fieldTranslated,
              value: searchValue,
            })
          : ''
      }`;
      anchor.setAttribute('aria-label', title ?? '');
      anchor.setAttribute('title', title ?? '');
    } else if (
      // eslint-disable-next-line no-prototype-builtins
      anchor.dataset.hasOwnProperty('linkType') &&
      anchor.dataset.linkType === 'external'
    ) {
      const domain = new URL(anchor.href).hostname;
      const text =
        (t && t('details.externalSearch', { value: searchValue, domain: domain })) ?? '';
      anchor.setAttribute('aria-label', text);
      anchor.setAttribute('title', text);
    }
  }
  // skip <head> and <body> tags and get html content
  return (<HTMLElement>rawHtml.firstChild?.childNodes[1])?.innerHTML;
};
