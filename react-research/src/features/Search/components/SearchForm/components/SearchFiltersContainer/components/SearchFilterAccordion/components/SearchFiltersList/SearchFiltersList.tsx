import React from 'react';

import { Grid } from '@material-ui/core';
import SearchFilterToggleButton from '../../../SearchFilterToggleButton/SearchFilterToggleButton';

import { IVirtualSearchFilter } from '../../../../../../interfaces/virtual-filter.interface';
import { useCreateSearchFormChangeEvent } from '../../../../../../search-form.context';

export interface ISearchFiltersListProps {
    formBaseName: string;
    filters: IVirtualSearchFilter[];
}

const SearchFiltersList: React.FC<ISearchFiltersListProps> = (props) => {
    const { filters, formBaseName } = props;
    const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

    return (
        <Grid container spacing={1}>
            {filters.map(({ virtualValue, name }, index: number) => {
                const formValueKey = `${formBaseName}.filters[${index}].virtualValue`;

                return (
                    <Grid key={formValueKey} item>
                        <SearchFilterToggleButton
                            name={formValueKey}
                            label={name}
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
