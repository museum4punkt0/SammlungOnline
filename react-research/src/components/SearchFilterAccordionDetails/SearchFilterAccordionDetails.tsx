/* eslint-disable no-console */
import React from 'react';

import { AccordionDetails, Grid, Typography } from '@material-ui/core';

import { SearchFiltersList, SearchFiltersOptionsList } from '../index';
import { IVirtualSearchFilter } from '../../types/index';

import useStyles from './searchFilterAccordionDetails.jss';

export interface ISearchFilterAccordionDetailsProps {
  formBaseName: string;
  filters: IVirtualSearchFilter[];
  sublevel?: Array<{
    title?: string;
    text?: string;
  }>;
}

const SearchFilterAccordionDetails: React.FC<ISearchFilterAccordionDetailsProps> = props => {
  const { filters, sublevel, formBaseName } = props;
  const classes = useStyles();
  const getFiltersArray = (
    row:
      | {
          title?: string;
          text?: string;
        }
      | string,
    index: number,
  ) => {
    if (row && index >= 0)
      return filters.filter(item => {
        if (item?.level && Number(item?.level) === index) {
          return item;
        }
      });
    else return filters;
  };

  const renderFilters = (filters: IVirtualSearchFilter[]) => {
    return (
      <Grid container className={classes.advancedContainer}>
        <Grid item xs={12}>
          <SearchFiltersList filters={filters} formBaseName={formBaseName} />
        </Grid>
        <Grid item xs={12}>
          <SearchFiltersOptionsList filters={filters} formBaseName={formBaseName} />
        </Grid>
      </Grid>
    );
  };

  const renderContent = () => {
    if (sublevel && sublevel.length >= 0) {
      return sublevel.map((row, index) => {
        return (
          <AccordionDetails className={classes.advancedWrapper} key={index}>
            <>
              {row?.title && (
                <Typography className={classes.headline} variant={'h6'} component={'h5'}>
                  {row?.title}
                </Typography>
              )}
            </>
            {renderFilters(getFiltersArray(row, index))}
            {row?.text && (
              <Typography className={classes.text} variant={'body1'} component={'p'}>
                {row?.text}
              </Typography>
            )}
          </AccordionDetails>
        );
      });
    }
    return (
      <AccordionDetails className={classes.advancedWrapper}>
        {renderFilters(filters)}
      </AccordionDetails>
    );
  };

  return <>{renderContent()}</>;
};

export default SearchFilterAccordionDetails;
