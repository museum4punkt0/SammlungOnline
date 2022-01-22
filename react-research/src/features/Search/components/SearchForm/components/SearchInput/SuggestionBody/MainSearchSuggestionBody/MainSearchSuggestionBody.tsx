import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './mainSearchSuggestionBody.jss';
import { SuggestionBodyProps } from '../../interface/suggestion-body-props.inteface';
import { generateGUID, isValueValid } from '../../../../../../../../utils/utils';
import { ISuggestion } from '../../../../../../services/search/interfaces/search/suggestion.interface';

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
      {suggestionList.map((suggestion: ISuggestion) => (
        <>
          {suggestion?.value === value ? (
            <div key={generateGUID()} className={classes.optionWrapper}>
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
        </>
      ))}
    </>
  );
};
