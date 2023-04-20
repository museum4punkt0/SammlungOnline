import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Link, Typography } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { Direction, StationData } from '../../types/GuideData';

import { LinkBuilder } from '../../../../utils/LinkBuilder';

import useStyles from './direction.jss';

interface IStationDirectionProps {
  direction: Direction;
  station: StationData;
}

const StationDirection: React.FC<IStationDirectionProps> = (props) => {
  const { direction, station } = props;

  const { t } = useTranslation();
  const link = new LinkBuilder();

  const {
    name: directionName,
    description: directionDescription,
    facilities,
    relatedStations,
  } = direction;

  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      direction="row"
      container
      spacing={1}
      justifyContent="flex-start"
    >
      <Grid item>
        <Typography variant="body2" color="primary">
          {station.name === directionName
            ? `${t('next station')} ${directionName}`
            : directionName}
        </Typography>
      </Grid>
      {directionDescription && (
        <Grid item>
          <Typography variant="body1" color="primary">
            {directionDescription}
          </Typography>
        </Grid>
      )}
      {facilities.map((facility, index) => {
        const shouldAddComma = index !== facilities.length - 1;

        return (
          <Grid key={index} item>
            <Typography variant="body1" color="primary">
              {facility}
              {shouldAddComma ? ',' : ''}
            </Typography>
          </Grid>
        );
      })}
      {relatedStations.map(({ tour, id, description }, index) => {
        const linkToGuideStation = link.createLinkToGuideStation(
          tour.id,
          tour.title,
          id,
        );

        return (
          <Grid item key={index}>
            <Link href={linkToGuideStation} target="_blank">
              <Grid container alignItems="center">
                <Typography variant="body1" color="primary">
                  {description}
                </Typography>
                <ArrowRightAltIcon
                  style={{ height: '21px' }}
                  fontSize="default"
                />
              </Grid>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StationDirection;
