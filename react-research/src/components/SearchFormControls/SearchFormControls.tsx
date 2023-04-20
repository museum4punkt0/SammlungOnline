import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray } from 'react-hook-form';

import { Grid } from '@material-ui/core';

import { SearchSwitch } from '../index';
import { ESearchFormFields } from '../../enums/index';
import { useCreateSearchFormChangeEvent } from '../../providers/index';

import useStyles from './searchFormControls.jss';

const SearchFormControls = () => {
  const { fields: searchFormControlFields } = useFieldArray({
    name: ESearchFormFields.searchControls,
  });
  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.container}
      alignItems="center"
      justifyContent="flex-start"
      direction="row-reverse"
      data-testid="grid-searchControls-switcher-wrapper"
    >
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
