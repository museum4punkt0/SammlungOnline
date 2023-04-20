import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { ReactElement } from 'react';
import useStyles from './tourTitleCardModule.jss';
import { HeroSwiper } from '@smb/smb-react-components-library';

function TourTitleCard({
  title,
  abstract,
  subTitle,
  image,
  withImage = false,
}: {
  title: string;
  abstract: string;
  subTitle: string;
  image?: string;
  withImage?: boolean;
}): ReactElement {
  const classes = useStyles();
  const collectionContext = () => {
    return [
      {
        title: title,
        text: abstract,
        subtitle: subTitle,
        image: image,
        caption: null,
        href: '#',
      },
    ];
  };
  return (
    <div>
      {withImage ? (
        <HeroSwiper data={collectionContext() as any} section="guide-hero" />
      ) : (
        <Grid container justifyContent="center" style={{ height: '100%' }}>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            style={{ maxWidth: '80rem' }}
          >
            <Typography variant="h5" className={classes.subtitle}>
              {subTitle}
            </Typography>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
            <Grid container item direction="row">
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.text}>
                  {abstract}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default TourTitleCard;
