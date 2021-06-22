import React from 'react';
import { useTranslation } from 'react-i18next';

import useActiveFiltersCount from './use-active-filters-count.hook';

import { AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface ISearchFilterAccordionSummaryProps {
    filterName: string;
    name: string;
}

const SearchFilterAccordionSummary: React.FC<ISearchFilterAccordionSummaryProps> = ({ filterName, name }) => {
    const { t } = useTranslation();

    const activeFiltersCount = useActiveFiltersCount(name);

    return (
        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" color="primary" />}>
            <Typography component="div" variant="h5">
                {t(filterName)} ({activeFiltersCount})
            </Typography>
        </AccordionSummary>
    );
};

export default SearchFilterAccordionSummary;
