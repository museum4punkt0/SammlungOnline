import React from 'react';

import { Accordion } from '@material-ui/core';
import SearchFilterAccordionDetails from './components/SearchFilterAccordionDetails/SearchFilterAccordionDetails';
import SearchFilterAccordionSummary from './components/SearchFilterAccordionSumarry/SearchFilterAccordionSummary';

import { IVirtualSearchFilterGroup } from '../../../../interfaces/virtual-filter-group.interface';

import useStyles from './searchFilterAccordion.jss';

interface ISearchFilterAccordionProps {
    formBaseName: string;
    advancedFilter: IVirtualSearchFilterGroup;
}

const SearchFilterAccordion: React.FC<ISearchFilterAccordionProps> = (props) => {
    const { formBaseName, advancedFilter } = props;

    const classes = useStyles();

    return (
        <Accordion key={formBaseName} className={classes.advancedSearchAccordion}>
            <SearchFilterAccordionSummary name={formBaseName} filterName={advancedFilter.label} />
            <SearchFilterAccordionDetails filters={advancedFilter.filters ?? []} formBaseName={formBaseName} />
        </Accordion>
    );
};

export default SearchFilterAccordion;
