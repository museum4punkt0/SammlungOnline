import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardActionArea, Typography, Link, CardContent, Grid } from '@material-ui/core';

import LazyLoadImage from '../../../../core/components/LazyLoadImage/LazyLoadImage';
import { FallbackImage } from '../../../../core/core.module';

import useStyles from './carouselImageCard.jss';

export interface ICarouselImageCardProps {
  img: string;
  caption?: string;
  link?: string | undefined;
  maxWidth?: number;
  maxHeight?: number;
}

const CarouselImageCardComponent: React.FC<ICarouselImageCardProps> = props => {
  const { t } = useTranslation();

  const { img = '', caption = '', link = '', maxWidth = 200, maxHeight = 200 } = props;

  const classes = useStyles();

  const renderFallbackImage = () => {
    return <FallbackImage label={caption} text={t('image.notFoundText')} width={maxWidth} height={maxHeight} />;
  };

  return (
    <Card className={classes.card}>
      <CardActionArea tabIndex={-1}>
        <CardContent className={classes.content}>
          <Link href={link} className={classes.container}>
            <Grid container justify='center' alignItems='center'>
              <Grid item container justify='center' alignItems='center' xl={12} lg={12} md={12} sm={12} xs={12}>
                <LazyLoadImage Fallback={renderFallbackImage()} width={maxWidth} height={maxHeight} src={img} />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography className={classes.caption} variant='caption'>
                  {caption}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const CarouselImageCard = CarouselImageCardComponent;
