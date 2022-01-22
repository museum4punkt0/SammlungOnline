import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

import useStyles from './expandableCard.jss';

// import ZoomInIcon from '@material-ui/icons/ZoomIn';

// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import CloseIcon from '@material-ui/icons/Close';

import { useTranslation } from 'react-i18next';

function OverrideCard({
  location,
  image,
  locationLevel,
  onExit,
}: {
  location: string;
  image: string;
  locationLevel: string;
  onExit: () => void;
}): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card
      elevation={0}
      style={{
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '0px',
        marginBottom: '1rem',
      }}
    >
      <Card
        elevation={0}
        className={classes.mapContainer}
        style={{ width: '100%', borderRadius: '0px' }}
      >
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          wrap="nowrap"
        >
          <Grid
            item
            container
            xs={10}
            direction="column"
            justify="flex-start"
            wrap="nowrap"
            spacing={1}
            style={{ margin: '0.5rem 0' }}
          >
            {/* title */}
            <Grid
              item
              container
              alignContent="center"
              style={{ paddingLeft: '.5rem' }}
            >
              <Typography
                color="secondary"
                noWrap
                variant="h4"
                style={{ fontSize: '1rem' }}
              >
                {t('location overview')}
              </Typography>
            </Grid>
            <Grid
              item
              container
              alignContent="center"
              style={{ paddingLeft: '.5rem' }}
            >
              <Typography
                color="secondary"
                noWrap
                variant="h4"
                style={{ fontSize: '1rem' }}
              >
                {location}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="flex-start"
            style={{ marginRight: '0.375rem', marginTop: '0.375rem' }}
          >
            <IconButton
              className={classes.expandMap}
              onClick={onExit}
              // aria-expanded={expandedMap}
              aria-label="show more"
              style={{ padding: '0' }}
            >
              <CloseIcon
                color="secondary"
                style={{ fontSize: '3rem' }}
                className={classes.iconHover}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Card>

      <div className={classes.mapContainer}>
        <CardContent
          style={{
            maxHeight: '23.125rem',
            padding: 0,
            backgroundColor: 'white',
            margin: '0 0.5rem',
          }}
        >
          <Grid container justify="center">
            <CardMedia
              style={{
                height: '23.125rem',
                width: '100%',
                maxWidth: '30rem',
                backgroundPosition: 'top',
              }}
              // className={classes.objectMapImage}
              src="picture"
              image={image}
            />
          </Grid>
        </CardContent>
        {/* TODO V2 */}
        {/* <Grid container justify='center'>
                    <ZoomInIcon color='secondary' fontSize='large' />
                </Grid> */}
        <Grid container justify="center">
          {/* TODO V2 */}
          {/* <ArrowBackIosIcon color='secondary' fontSize='large' /> */}
          <Typography variant="h4" color="secondary" style={{ margin: '1rem' }}>
            {locationLevel}
          </Typography>
          {/* TODO V2 */}
          {/* <ArrowForwardIosIcon color='secondary' fontSize='large' /> */}
        </Grid>
      </div>
    </Card>
  );
}

export default OverrideCard;
