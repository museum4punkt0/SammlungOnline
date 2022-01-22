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
    <Accordion
      key={formBaseName}
      className={classes.advancedSearchAccordion}
      data-testid={'search_filter_accordion_wrapper'}
    >
      <SearchFilterAccordionSummary
        name={formBaseName}
        filterName={advancedFilter.label}
        data-testid={'search_filter_accordion_summary'}
      />
      <SearchFilterAccordionDetails
        filters={advancedFilter.filters ?? []}
        formBaseName={formBaseName}
        data-testid={'search_filter_accordion_details'}
      />
    </Accordion>
  );
};

export default SearchFilterAccordion;
