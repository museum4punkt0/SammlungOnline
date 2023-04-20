import React from 'react';
import { useTranslation } from 'react-i18next';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionSummary, Typography } from '@material-ui/core';

import { useActiveFiltersCount } from '../../hooks/index';

import './searchFilterAccordionSummary.scss';

interface ISearchFilterAccordionSummaryProps {
  filterName: string;
  name: string;
}

const SearchFilterAccordionSummary: React.FC<ISearchFilterAccordionSummaryProps> = ({
  filterName,
  name,
}) => {
  const { t } = useTranslation();
  const activeFiltersCount = useActiveFiltersCount(name);

  return (
    <AccordionSummary
      className={'accordionSummary'}
      expandIcon={<ExpandMoreIcon fontSize="large" color="primary" />}
      data-testid={'search_filter_accordion_collection_wrapper'}
    >
      <Typography component="div" variant="h4">
        {t(filterName)}
      </Typography>
      <Typography component="span" variant="body1">
        {activeFiltersCount
          ? `(${activeFiltersCount} ${t('searchForm.labels.filtersSelected')})`
          : `(${t('searchForm.labels.noFiltersSelected')})`}
      </Typography>
    </AccordionSummary>
  );
};

export default SearchFilterAccordionSummary;
