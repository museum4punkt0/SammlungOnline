import React from 'react';
import { SuggestionBodyProps } from '../../types';
import { isValueValid } from '../../utils/utils';
import { useStyles } from './extendedSearchSuggestionBody.jss';

/**
 * Component rendering suggestions in advanced search for the advanced filter
 * field value input - renders only possible value and number of hits.
 * @param suggestion
 * @constructor
 */
export const ExtendedSearchSuggestionBody: React.FC<SuggestionBodyProps> = ({
  suggestion,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.optionWrapper}>
      <div className={classes.optionValueWrapper}>
        <div className={classes.optionValue}>{suggestion?.value}</div>
      </div>
      {/*<div className={classes.optionCounter}>{isValueValid(suggestion?.counter)}</div>*/}
    </div>
  );
};
