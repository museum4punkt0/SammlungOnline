import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid } from '@material-ui/core';
import { SearchInput } from '../index';
import { ESearchConditionFields } from '../../enums/index';
import { IDateRangeFilter, ISuggestion } from '../../types/index';

import './data-range.scss';

interface IDataRangeInput {
  value: IDateRangeFilter;
  defaultValue: IDateRangeFilter;
  onBlur: () => void;
  onChange: (value: IDateRangeFilter) => void;
}

const DataRangeInput: React.FC<IDataRangeInput> = props => {
  const { value, defaultValue, onChange, onBlur } = props;

  const { t } = useTranslation();
  const handleOnChangeDatingTo = (option: string | ISuggestion) => {
    if (typeof option === 'string') {
      const datingTo: string = option;
      return onChange({ ...value, datingTo });
    } else if (typeof option !== 'string' && option.value) {
      const datingTo: string = option.value;
      return onChange({ ...value, datingTo });
    }
  };

  const handleOnChangeDatingFrom = (option: string | ISuggestion) => {
    if (typeof option === 'string') {
      const datingFrom: string = option;
      return onChange({ ...value, datingFrom });
    } else if (typeof option !== 'string' && option.value) {
      const datingFrom: string = option.value;
      return onChange({ ...value, datingFrom });
    }
  };

  return (
    <Grid container justifyContent="flex-start">
      <Grid className={'data-range'}>
        <SearchInput
          value={value.datingFrom}
          defaultValue={defaultValue.datingFrom}
          variant="standard"
          disableSuggestions={true}
          fieldName={ESearchConditionFields.dateRange}
          label={t('searchForm.filters.attributes.datingFrom')}
          onBlur={onBlur}
          onChange={(datingFrom: string | ISuggestion) => {
            handleOnChangeDatingFrom(datingFrom);
          }}
        />
      </Grid>
      <Grid className={'data-range'}>
        <SearchInput
          value={value.datingTo}
          defaultValue={defaultValue.datingTo}
          variant="standard"
          disableSuggestions={true}
          fieldName={ESearchConditionFields.dateRange}
          label={t('searchForm.filters.attributes.datingTo')}
          onBlur={onBlur}
          onChange={(datingTo: string | ISuggestion) => {
            handleOnChangeDatingTo(datingTo);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DataRangeInput;
