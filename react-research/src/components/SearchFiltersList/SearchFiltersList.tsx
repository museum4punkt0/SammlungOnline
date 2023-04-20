import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchFilterToggleButton } from '../index';
import { IVirtualSearchFilter } from '../../types/index';
import { useCreateSearchFormChangeEvent } from '../../providers/index';

export interface ISearchFiltersListProps {
  formBaseName: string;
  filters: IVirtualSearchFilter[];
}

const SearchFiltersList: React.FC<ISearchFiltersListProps> = props => {
  const { filters, formBaseName } = props;
  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  return (
    <Grid container spacing={1}>
      {filters.map(({ virtualValue, name, value, index }) => {
        const formValueKey = `${formBaseName}.filters[${index}].virtualValue`;

        return (
          <Grid key={formValueKey} item style={{ padding: 0 }}>
            <SearchFilterToggleButton
              name={formValueKey}
              label={name}
              hasValue={value}
              value={virtualValue ?? false}
              onChange={createSearchFormChangeEvent}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchFiltersList;
