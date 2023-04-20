import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './mainSearchSuggestionBody.jss';
import { SuggestionBodyProps, ISuggestion } from '../../types/index';
import { isValueValid } from '../../utils/utils';

export const MainSearchSuggestionBody: React.FC<SuggestionBodyProps> = ({
  suggestionList,
  value,
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
    <>
      {suggestionList.map((suggestion: ISuggestion, index: number) => (
        <React.Fragment key={`suggestionList_${index}`}>
          {suggestion?.value === value ? (
            <div className={classes.optionWrapper}>
              <div className={classes.optionField}>
                {getTranslatedField(suggestion?.field)}
              </div>
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
