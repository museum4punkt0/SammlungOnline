import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import useAllActiveFiltersCount from './use-all-active-filters-count.hook';

import { Grid, Typography, Hidden, Button, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';

import useStyles from './searchToggleFiltersButton.jss';

interface ISearchToggleFiltersButtonProps {
  open: boolean;
  onClick: () => void;
  onClear: (event: React.MouseEvent) => void;
}

const SearchToggleFiltersButton: React.FC<ISearchToggleFiltersButtonProps> = (props) => {
  const { onClick, onClear, open } = props;

  const { t } = useTranslation();

  const allActiveFiltersCount = useAllActiveFiltersCount();
  const shouldShowFiltersCount = allActiveFiltersCount > 0;

  const classes = useStyles();

  return (
    <div
      className={classes.advancedSearchContainer}
      data-testid={'search_toggle_filters_wrapper'}
    >
      <Grid
        alignItems="flex-end"
        justify="space-between"
        direction="row"
        container
        spacing={0}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="flex-start"
          lg={10}
          md={9}
          sm={8}
          xs={10}
        >
          <Button onClick={onClick} data-testid="advance-search-filter-button">
            <ExpandMoreIcon
              fontSize="large"
              className={clsx(classes.expandIcon, {
                [classes.expandIconExpandedState]: open,
              })}
            />
            <Typography display="inline" component="div" variant="h4">
              {t('searchForm.advancedSearch')}
            </Typography>
            <Typography component="div" variant="h5">
              {allActiveFiltersCount > 0 ? '(' + allActiveFiltersCount + ')' : ''}
            </Typography>
          </Button>
        </Grid>

        {shouldShowFiltersCount && (
          <Grid
            item
            container
            alignContent="center"
            justify="flex-end"
            lg={2}
            md={3}
            sm={4}
            xs={2}
          >
            <Button style={{ padding: '0', minWidth: 'initial' }} onClick={onClear}>
              <Hidden only={['xs']}>
                <Typography style={{ margin: '0 0.875rem' }} component="div" variant="h4">
                  {t('searchForm.actions.clear')}
                </Typography>
              </Hidden>
              <Box className={classes.searchIconContainer}>
                <ClearIcon fontSize="large" />
              </Box>
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default SearchToggleFiltersButton;
