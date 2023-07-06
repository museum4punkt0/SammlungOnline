import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './mainSearchSuggestionBody.jss';
import { SuggestionBodyProps } from '../../types';
import { isValueValid } from '../../utils/utils';

/**
 * Renders a suggestion when text is written in the SearchInput.
 * Has on click event to move the suggestion in the advanced search filters.
 *
 * ---------------
 * NOTE: This component is used to render a suggestion in the list of suggestions
 * of the SearchInput component by being passed in renderSuggestionBody for the
 * Autocomplete component from MUI. Basically this is called for each suggestion
 * in autocomplete.
 * @param suggestion - suggestion to render
 * @constructor
 */
export const MainSearchSuggestionBody: React.FC<SuggestionBodyProps> = ({
  suggestion,
}) => {
  const { t: translate } = useTranslation();
  const classes = useStyles();


  const getTranslatedField = (field: string | undefined) => {
    if (field) {
      return translate(`searchForm.filters.attributes.${field}`);
    }
    return translate('searchForm.filters.attributes.fulltext');
  };

  return (
    <div className={classes.optionWrapper}>
      <div className={classes.optionField}>{getTranslatedField(suggestion?.field)}</div>
      <div className={classes.optionValueWrapper}>
        <div className={classes.optionValue}>{suggestion?.value}</div>
      </div>
      {/*<div className={classes.optionCounter}>{isValueValid(suggestion?.counter)}</div>*/}
    </div>
  );
};
