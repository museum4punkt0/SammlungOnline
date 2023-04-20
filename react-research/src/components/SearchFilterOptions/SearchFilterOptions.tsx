import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Grid, Typography } from '@material-ui/core';

import { SearchFilterCheckbox } from '../index';
import { IVirtualSearchFilter } from '../../types/index';

import useStyles from './searchFilterOptions.jss';

export interface ISearchFilterOptions {
  name: string;
  label: string;
  baseFormName: string;
  options: any[];
  onChange?: (value: boolean) => void;
}

const SearchFilterOptions: React.FC<ISearchFilterOptions> = props => {
  const { label, options, baseFormName, name, onChange } = props;

  const { control, getValues } = useFormContext();
  const filterField = useWatch<IVirtualSearchFilter>({
    name: baseFormName,
    control,
    defaultValue: getValues(baseFormName),
  });

  const classes = useStyles();

  if (!filterField?.virtualValue || !filterField?.options.length) {
    return null;
  }

  return (
    <Grid className={classes.container}>
      <div className={classes.containerHeader}>
        <Typography className={classes.headline} variant={'h6'}>
          {label}:
        </Typography>
        <Typography className={classes.headline} variant={'caption'}>
          {name}
        </Typography>
      </div>
      {options?.map(({ name, virtualValue }: any, index: number) => {
        const optionValueKey = `${baseFormName}.options[${index}].virtualValue`;

        return (
          <SearchFilterCheckbox
            key={name}
            name={optionValueKey}
            label={name}
            value={virtualValue}
            onChange={onChange}
          />
        );
      })}
    </Grid>
  );
};

export default SearchFilterOptions;
