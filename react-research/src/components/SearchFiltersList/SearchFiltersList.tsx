import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchFilterToggleButton } from '../index';
import { IVirtualSearchFilter } from '../../types';
import { useCreateSearchFormChangeEvent } from '../../providers';

export interface ISearchFiltersListProps {
  formBaseName: string;
  filtersGroupName: string;
  filters: IVirtualSearchFilter[];
}

const SearchFiltersList: React.FC<ISearchFiltersListProps> = props => {
  const { filters, formBaseName, filtersGroupName } = props;

  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  return (
    <Grid container spacing={1}>
      {filters.map(({ virtualValue, name, value, index }) => {
        const formValueKey = `${formBaseName}.filters[${index}].virtualValue`;

        return (
          <Grid key={formValueKey} item style={{ padding: 0 }}>
            <SearchFilterToggleButton
              name={formValueKey}
              filtersGroupName={filtersGroupName}
              label={name}
              searchValue={value} // if no value -> filter is disabled
              hasValue={virtualValue ?? false}
              onChange={createSearchFormChangeEvent}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchFiltersList;
