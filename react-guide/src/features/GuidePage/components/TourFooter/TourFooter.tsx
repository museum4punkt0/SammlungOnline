import { Button, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import useStyles from './tourfooter.jss';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useTranslation } from 'react-i18next';
import RouteDescriptionModule from '../ExapandableCard/RouteDescription/RouteDescriptionModule';
import StationDirection from '../Station/Direction';
import { StationData } from '../../types/GuideData';

function TourFooter({
  title,
  station,
  location,
}: {
  title: string;
  station?: StationData;
  location?: string;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item className={classes.headerTitle}>
        <Typography variant="h3">
          {t('end')}: {title}
        </Typography>
      </Grid>

      {/* Wegbeschreibung zum Ausgang */}
      {station && location && (
        <RouteDescriptionModule
          image={station.map}
          location={location}
          level={station.level}
        >
          {station.directions.map((direction) => {
            return (
              <StationDirection
                key={direction.name}
                direction={direction}
                station={station}
              />
            );
          })}
        </RouteDescriptionModule>
      )}

      <Button
        className={classes.returnTopButton}
        style={{ padding: '0', marginTop: '4rem', marginBottom: '1rem' }}
        color={'inherit'}
        // todo other annchor possible: https://stackoverflow.com/a/33204783
        onClick={() => window.scrollTo(0, 0)}
      >
        <Grid container direction="column" alignItems="center">
          <ArrowUpwardIcon color="primary" fontSize="large" />
          <Typography
            style={{ marginTop: '1rem' }}
            variant="h3"
            color="primary"
          >
            {t('return to tour start')}
          </Typography>
        </Grid>
      </Button>
    </Grid>
  );
}

export default TourFooter;
