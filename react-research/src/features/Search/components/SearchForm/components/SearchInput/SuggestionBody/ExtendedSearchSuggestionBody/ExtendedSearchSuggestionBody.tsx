import React from 'react';
import { useStyles } from './extendedSearchSuggestionBody.jss';
import { SuggestionBodyProps } from '../../interface/suggestion-body-props.inteface';
import { ISuggestion } from '../../../../../../services/search/interfaces/search/suggestion.interface';
import { generateGUID, isValueValid } from '../../../../../../../../utils/utils';

export const ExtendedSearchSuggestionBody: React.FC<SuggestionBodyProps> = ({
  suggestionList,
  value,
}) => {
  const classes = useStyles();

  return (
    <>
      {suggestionList.map((suggestion: ISuggestion) => (
        <>
          {suggestion?.value === value ? (
            <div key={generateGUID()} className={classes.optionWrapper}>
              <div className={classes.optionValueWrapper}>
                <div className={classes.optionValue}>{suggestion.value}</div>
              </div>
              <div className={classes.optionCounter}>
                {isValueValid(suggestion.counter)}
              </div>
            </div>
          ) : null}
        </>
      ))}
    </>
  );
};
