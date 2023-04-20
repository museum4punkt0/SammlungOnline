import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, Link, Grid } from '@material-ui/core';

import useStyles from './carouselImageCard.jss';

import { ICarouselImageCardProps } from '../../types/carousel.interface';
import { FallbackImage } from '../../../../components/FallbackImage/components/FallbackImage';
import { LazyLoadImage } from 'src';

export const CarouselImageCard: React.FC<ICarouselImageCardProps> = (props) => {
  const { t } = useTranslation();

  const {
    img = '',
    caption = '',
    color = '#000',
    link = '',
    maxWidth = 200,
    maxHeight = 200,
  } = props;

  const classes = useStyles();

  const renderFallbackImage = () => {
    return (
      <FallbackImage
        label={caption}
        text={t('image.notFoundText')}
        width={maxWidth}
        height={maxHeight}
      />
    );
  };

  return (
    // <Card className={getCardStyle()} style={{ color: color }}>
    // {/* <CardContent
    //   tabIndex={-1}

    //   className={classes.content}
    //   style={{ color: color }}
    // > */}
    <Link
      data-testid={'carousel-card'}
      href={link}
      className={classes.card}
      style={{ color: color }}
    >
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
      >
        <LazyLoadImage
          Fallback={renderFallbackImage()}
          width={maxWidth}
          height={maxHeight}
          src={img}
        />
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography
          className={classes.caption}
          variant="caption"
          color="inherit"
        >
          {caption}
        </Typography>
      </Grid>
    </Link>
    // {/* </CardContent> */}
    // </Card>
  );
};
