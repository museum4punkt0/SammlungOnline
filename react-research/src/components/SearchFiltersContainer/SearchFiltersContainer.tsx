/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddIcon from '@material-ui/icons/Add';
import { Collapse, Grid, Typography, Button } from '@material-ui/core';

import {
  useShowFilters,
  useClearFilters,
  useFieldConditions,
  useAllActiveFiltersCount,
} from '../../hooks/index';
import { ISearchFormData } from '../../types/index';
import { ESearchFormFields } from '../../enums/index';
import { useCreateSearchFormChangeEvent } from '../../providers/index';

import {
  SearchFilterAccordionList,
  SearchToggleFiltersButton,
  SearchConditionsList,
} from '../index';

import useStyles from './searchFiltersContainer.jss';

export interface ISearchFiltersContainerProps {
  defaultValues?: ISearchFormData;
}

export const SearchFiltersContainer: React.FC<ISearchFiltersContainerProps> = () => {
  const { t } = useTranslation();

  const [onFilterToggle, setOnFilterToggle] = useState(false);
  const [showFilters, { toggle: toggleFilters }] = useShowFilters();
  const allActiveFiltersCount = useAllActiveFiltersCount();

  useEffect(() => {
    const shouldShowFiltersCount = allActiveFiltersCount > 0;
    if (shouldShowFiltersCount && !showFilters) {
      setOnFilterToggle(true);
      toggleFilters();
      return;
    } else if (
      (!showFilters && !shouldShowFiltersCount) ||
      (!shouldShowFiltersCount && showFilters)
    ) {
      return toggleFilters(true);
    }
  }, [allActiveFiltersCount]);

  const {
    conditions: conditionsFields,
    removeCondition,
    appendCondition,
  } = useFieldConditions(ESearchFormFields.conditions);

  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  const clearFilters = useClearFilters();
  const handleClearFilters = (event: React.MouseEvent) => {
    event.stopPropagation();
    clearFilters();
    createSearchFormChangeEvent();
    setOnFilterToggle(false);
  };
  const handleToggleFilters = (state: boolean) => {
    toggleFilters();
    setOnFilterToggle(!state);
  };

  const handleRemoveCondition = (index: number) => {
    removeCondition(index);
    createSearchFormChangeEvent();
  };

  const classes = useStyles();

  const getCollapseState = (state: boolean) => {
    if (state) return true;
    else return false;
  };

  return (
    <Collapse
      style={{ width: '100%' }}
      in={getCollapseState(onFilterToggle)}
      collapsedSize={98}
    >
      <SearchToggleFiltersButton
        open={getCollapseState(onFilterToggle)}
        onClear={handleClearFilters}
        onClick={() => handleToggleFilters(onFilterToggle)}
      />
      {getCollapseState(onFilterToggle) && (
        <>
          <Grid container spacing={0} data-testid="search-condition-list-wrapper">
            <SearchConditionsList
              conditionFields={conditionsFields as any}
              onRemove={handleRemoveCondition}
            />
          </Grid>
          <Grid
            className={classes.moreSearchContainer}
            container
            alignItems="flex-start"
            spacing={0}
          >
            <Button
              className={classes.addAttributeContainer}
              onClick={appendCondition}
              data-testid={'addCondition-button'}
            >
              <AddIcon className={classes.addIcon} fontSize={'large'} />
              <Typography component="div" variant="h4" className={classes.header}>
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
