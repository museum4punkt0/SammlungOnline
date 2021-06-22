import React from 'react';
import { useTranslation } from 'react-i18next';

import useShowFilters from './hooks/use-show-filters.hook';
import useClearFilters from './hooks/use-clear-filters.hook';
import useFieldConditions from './hooks/use-field-conditions.hook';

import { Collapse, Grid, Typography, Button } from '@material-ui/core';
import SearchFilterAccordionList from './components/SearchFilterAccordion/components/SearchFilterAccordionList/SearchFilterAccordionList';
import SearchToggleFiltersButton from './components/SearchToggleFiltersButton/SearchToggleFiltersButton';
import SearchConditionsList from './components/SearchConditionsList/SearchConditionsList';
import AddIcon from '@material-ui/icons/Add';

import { ISearchFormData } from '../../interfaces/form-data.interface';

import { ESearchFormFields } from '../../enums/search-form-fields.enum';

import useStyles from './searchFiltersContainer.jss';
import { useCreateSearchFormChangeEvent } from '../../search-form.context';

export interface ISearchFiltersContainerProps {
    defaultValues?: ISearchFormData;
}

export const SearchFiltersContainer: React.FC<ISearchFiltersContainerProps> = () => {
    const { t } = useTranslation();

    const [showFilters, { toggle: toggleFilters }] = useShowFilters();
    const { conditions: conditionsFields, removeCondition, appendCondition } = useFieldConditions(
        ESearchFormFields.conditions,
    );
    const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

    const clearFilters = useClearFilters();
    const handleClearFilters = (event: React.MouseEvent) => {
        event.stopPropagation();
        clearFilters();
        createSearchFormChangeEvent();
    };

    const handleRemoveCondition = (index: number) => {
        removeCondition(index);
        createSearchFormChangeEvent();
    };

    const classes = useStyles();

    return (
        <Collapse style={{ width: '100%' }} in={showFilters} collapsedHeight={90}>
            <SearchToggleFiltersButton open={showFilters} onClear={handleClearFilters} onClick={toggleFilters} />
            {showFilters && (
                <>
                    <Grid container spacing={0}>
                        <SearchConditionsList
                            conditionFields={conditionsFields as any}
                            onRemove={handleRemoveCondition}
                        />
                    </Grid>
                    <Grid className={classes.moreSearchContainer} container alignItems="flex-start" spacing={0}>
                        <Button className={classes.addAttributeContainer} onClick={appendCondition}>
                            <AddIcon className={classes.addIcon} />
                            <Typography component="div" variant="h5">
                                {t('searchForm.actions.addCondition')}
                            </Typography>
                        </Button>
                    </Grid>
                    <SearchFilterAccordionList />
                </>
            )}
        </Collapse>
    );
};
