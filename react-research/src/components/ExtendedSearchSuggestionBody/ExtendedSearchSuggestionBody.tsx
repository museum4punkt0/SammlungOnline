import React from 'react';
import { SuggestionBodyProps } from '../../types/index';
import { ISuggestion } from '../../types/index';
import { isValueValid } from '../../utils/utils';
import { useStyles } from './extendedSearchSuggestionBody.jss';

export const ExtendedSearchSuggestionBody: React.FC<SuggestionBodyProps> = ({
  suggestionList,
  value,
}) => {
  const classes = useStyles();

  return (
    <>
      {suggestionList.map((suggestion: ISuggestion, index: number) => (
        <React.Fragment key={`suggestionList_${index}`}>
          {suggestion?.value === value ? (
            <div className={classes.optionWrapper}>
              <div className={classes.optionValueWrapper}>
                <div className={classes.optionValue}>{suggestion.value}</div>
              </div>
              <div className={classes.optionCounter}>
                {isValueValid(suggestion.counter)}
              </div>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
};
