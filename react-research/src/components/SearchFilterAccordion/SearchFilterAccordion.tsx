import React from 'react';

import { Accordion } from '@material-ui/core';

import { LoadingSpinner } from '@smb/smb-react-components-library';

import { SearchFilterAccordionSummary, SearchFilterAccordionDetails } from '../index';
import { IVirtualSearchFilterGroup } from '../../types';

import useStyles from './searchFilterAccordion.jss';
import { useFacetsContext } from '../../providers/facets-context.provider';

interface ISearchFilterAccordionProps {
  formBaseName: string;
  advancedFilter: IVirtualSearchFilterGroup;
}

const SearchFilterAccordion: React.FC<ISearchFilterAccordionProps> = props => {
  const { formBaseName, advancedFilter } = props;
  const { loading } = useFacetsContext();
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <SearchFilterAccordionDetails
          filters={advancedFilter.filters ?? []}
          sublevel={advancedFilter.sublevel}
          formBaseName={formBaseName}
          filtersGroupName={advancedFilter.name}
          data-testid={'search_filter_accordion_details'}
        />
      )}
    </Accordion>
  );
};

export default SearchFilterAccordion;
