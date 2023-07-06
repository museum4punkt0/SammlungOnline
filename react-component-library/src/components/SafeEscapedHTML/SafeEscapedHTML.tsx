import React from 'react';
import { filterXSS, IFilterXSSOptions } from 'xss';
import defaultXssFilteringOptions from "./xss-filtering-options.config";

export interface ISafeEscapedHTMLProps {
  /**
   * HTML string to be escaped/sanitized
   */
  htmlString: string;
  /**
   * tag to be presented as parent for the escaped html
   */
  htmlTag?: 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Optional css class names to be applied to the div container
   */
  cssClassNames?: string;
  /**
   * Optional configuration for filtering HTML - if not provided, the default
   * will be applied
   *
   * ------
   * https://github.com/leizongmin/js-xss/blob/master/lib/default.js
   */
  filteringOptions?: IFilterXSSOptions;
}

/**
 * Safely escapes HTML and displays it inside a customizable div element.
 * Can be styled by adding css classes divided by space as a string in the
 * cssClassNames prop
 * @param props
 * @constructor
 */
export const SafeEscapedHTML: React.FC<ISafeEscapedHTMLProps> = (
  props: ISafeEscapedHTMLProps,
) => {
  const { htmlString, filteringOptions = defaultXssFilteringOptions, htmlTag, cssClassNames } = props;
  const safeHTML = filterXSS(htmlString, filteringOptions);
  switch (htmlTag) {
    case 'p':
      return (
        <p
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'span':
      return (
        <span
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'h1':
      return (
        <h1
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'h2':
      return (
        <h2
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'h3':
      return (
        <h3
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'h4':
      return (
        <h4
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'h5':
      return (
        <h5
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    case 'h6':
      return (
        <h6
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={cssClassNames ?? ''}
        />
      );
    default:
      return (
        <div
          dangerouslySetInnerHTML={{ __html: safeHTML }}
          className={props.cssClassNames ?? ''}
        />
      );
  }
};
