import React from 'react';

import { Accordion } from '@material-ui/core';

import { SearchFilterAccordionSummary, SearchFilterAccordionDetails } from '../index';
import { IVirtualSearchFilterGroup } from '../../types/index';

import useStyles from './searchFilterAccordion.jss';

interface ISearchFilterAccordionProps {
  formBaseName: string;
  advancedFilter: IVirtualSearchFilterGroup;
}

const SearchFilterAccordion: React.FC<ISearchFilterAccordionProps> = props => {
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
        sublevel={advancedFilter.sublevel}
        formBaseName={formBaseName}
        data-testid={'search_filter_accordion_details'}
      />
    </Accordion>
  );
};

export default SearchFilterAccordion;
