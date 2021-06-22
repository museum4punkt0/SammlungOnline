import React from 'react';

import { AccordionDetails, Grid } from '@material-ui/core';
import SearchFiltersList from '../SearchFiltersList/SearchFiltersList';
import SearchFiltersOptionsList from '../SearchFiltersOptionsList/SearchFiltersOptionsList';

import { IVirtualSearchFilter } from '../../../../../../interfaces/virtual-filter.interface';

export interface ISearchFilterAccordionDetailsProps {
    formBaseName: string;
    filters: IVirtualSearchFilter[];
}

const SearchFilterAccordionDetails: React.FC<ISearchFilterAccordionDetailsProps> = (props) => {
    const { filters, formBaseName } = props;

    return (
        <AccordionDetails>
            <Grid container>
                <Grid item xs={12}>
                    <SearchFiltersList filters={filters} formBaseName={formBaseName} />
                </Grid>
                <Grid item xs={12}>
                    <SearchFiltersOptionsList filters={filters} formBaseName={formBaseName} />
                </Grid>
            </Grid>
        </AccordionDetails>
    );
};

export default SearchFilterAccordionDetails;
