import { Divider, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import useStyles from './tourHeader.jss';
import { useTranslation } from 'react-i18next';

function TourHeader({
  title, //, share = false,
}: {
  title: string;
  share?: boolean;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      className={classes.content}
      style={{ marginBottom: '1rem' }}
    >
      <Grid item className={classes.headerTitle}>
        <Divider
          className={classes.divider}
          style={{ marginBottom: '.5rem' }}
        />
        <Typography variant="h3">
          {t('start')}: {title}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TourHeader;
