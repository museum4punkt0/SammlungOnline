import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid } from '@material-ui/core';
import SearchInput from '../../../../../SearchInput/SearchInput';

import { ESearchConditionFields } from '../../../../../../../../../../core/services/search/enums/search-condition-fields.enum';

import { IDateRangeFilter } from '../../../../../../../../../../core/services/search/interfaces/filters/data-range.interface';

interface IDataRangeInput {
    value: IDateRangeFilter;
    defaultValue: IDateRangeFilter;
    onBlur: () => void;
    onChange: (value: IDateRangeFilter) => void;
}

const DataRangeInput: React.FC<IDataRangeInput> = (props) => {
    const { value, defaultValue, onChange, onBlur } = props;

    const { t } = useTranslation();

    return (
        <Grid container spacing={3} justify="flex-start">
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <SearchInput
                    value={value.datingFrom}
                    defaultValue={defaultValue.datingFrom}
                    variant="standard"
                    disableSuggestions={true}
                    fieldName={ESearchConditionFields.dateRange}
                    label={t('searchForm.filters.attributes.datingFrom')}
                    onBlur={onBlur}
                    onChange={(datingFrom: string) => onChange({ ...value, datingFrom })}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <SearchInput
                    value={value.datingTo}
                    defaultValue={defaultValue.datingTo}
                    variant="standard"
                    disableSuggestions={true}
                    fieldName={ESearchConditionFields.dateRange}
                    label={t('searchForm.filters.attributes.datingTo')}
                    onBlur={onBlur}
                    onChange={(datingTo: string) => onChange({ ...value, datingTo })}
                />
            </Grid>
        </Grid>
    );
};

export default DataRangeInput;
