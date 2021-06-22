import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray } from 'react-hook-form';

import { Grid } from '@material-ui/core';
import SearchSwitch from './SearchSwitch/SearchSwitch';

import { ESearchFormFields } from '../../enums/search-form-fields.enum';

import useStyles from './searchFormControls.jss';

import { useCreateSearchFormChangeEvent } from '../../search-form.context';

const SearchFormControls = () => {
    const { fields: searchFormControlFields } = useFieldArray({ name: ESearchFormFields.searchControls });
    const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

    const { t } = useTranslation();

    const classes = useStyles();

    return (
        <Grid container className={classes.container} alignItems="center" justify="flex-start" direction="row-reverse">
            {searchFormControlFields?.map(({ id, label, value }, index) => {
                const valueKey = `${ESearchFormFields.searchControls}[${index}].value`;

                return (
                    <SearchSwitch
                        key={id}
                        name={valueKey}
                        label={t(label)}
                        value={value}
                        defaultValue={value}
                        onChange={createSearchFormChangeEvent}
                    />
                );
            })}
        </Grid>
    );
};

export default SearchFormControls;
