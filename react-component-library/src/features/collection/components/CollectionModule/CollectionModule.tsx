/* eslint-disable react/jsx-key */
import React, { createRef, ReactElement, RefObject, useState } from 'react';

import { Card, Link } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import useStyles from './collectionModule.jss';
import { CollectionContext } from '../CollectionContext/CollectionContext';
import { useConfigLoader } from '../../../../hooks';
import ImageUrlBuilder from '../../../../utils/ImageUrlBuilder';
import { LazyLoadImage } from '../../../../components';

/**
 * CollectionModule displays a collection of images as grid.
 * @param maxImageSize
 * @param title
 * @param bottomTitle
 * @constructor
 */
export function CollectionModule({
  maxImageSize = 170,
  title,
  bottomTitle,
}: {
  maxImageSize?: number;
  title?: string;
  bottomTitle?: string;
}): ReactElement {
  const classes = useStyles();
  const { config } = useConfigLoader();
  const [contentContainerRef] = useState<RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>(),
  );
  const buildImageUrl = (imageId: string, imageSize: number): string => {
    const imageUrlBuilder = new ImageUrlBuilder(config);
    return imageUrlBuilder.buildUrl(imageId, imageSize, imageSize);
  };
  // const collectionContext = useContext<CollectionContextData>(CollectionContext);

  const discoverButtonClicked = (): void => {
    contentContainerRef.current &&
      window &&
      window.scrollTo({
        left: 0,
        top: contentContainerRef.current.offsetTop,
        behavior: 'smooth',
      });
  };
  const scrollToTop = (): void => {
    window && window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };
  // const imageClicked = (index: number): void => {
  //   collectionContext.onCollectionObjectSelected &&
  //     collectionContext.onCollectionObjectSelected(index);
  //   scrollToTop();
  // };

  const createDetailPageLink = (objectId: string): string => {
    return `${config.RESEARCH_DOMAIN}/detail/${objectId}`;
  };

  const { t } = useTranslation();
  return (
    <CollectionContext.Consumer>
      {(collectionContext: { collectionObjects: any[] }): ReactElement => (
        <div
          className={classes.contentWrapper}
          ref={contentContainerRef}
          data-testid={'collection-module-content-wrapper'}
        >
          <Grid
            container={true}
            spacing={1}
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {title && (
              <Grid item={true} xs={12} className={classes.titleGridItem}>
                <ButtonBase
                  onClick={discoverButtonClicked}
                  className={classes.buttonTitle}
                >
                  <span>
                    <Typography
                      variant={'h3'}
                      className={classes.iconButtonTitleTypo}
                    >
                      {title}
                    </Typography>
                    <ArrowRightAltOutlinedIcon
                      className={classes.titleArrowButton}
                      fontSize={'large'}
                    />
                  </span>
                </ButtonBase>
              </Grid>
            )}
            {collectionContext.collectionObjects.map(
              (collectionObject, index) => (
                <Grid item={true} xs={12} sm={6} md={4} lg={3} key={index}>
                  <Link
                    className={classes.cardMediaLink}
                    href={createDetailPageLink(collectionObject.objectId)}
                    target="__blank"
                  >
                    <Card className={classes.card}>
                      <LazyLoadImage
                        src={buildImageUrl(collectionObject, maxImageSize)}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={buildImageUrl(collectionObject, maxImageSize)}
                        />
                      </LazyLoadImage>
                      <CardContent className={classes.cardContent}>
                        <Typography
                          aria-label={t('show detail')}
                          variant={'body1'}
                          className={classes.cardTypo}
                        >
                          {collectionObject.displayTitle}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ),
            )}
            {bottomTitle && (
              <Grid item={true} xs={12} className={classes.titleGridItem}>
                <ButtonBase
                  onClick={scrollToTop}
                  className={classes.buttonTitle}
                >
                  <span>
                    <ArrowRightAltOutlinedIcon
                      className={classes.endArrowButton}
                      fontSize={'large'}
                    />
                    <Typography
                      variant={'h3'}
                      className={classes.iconButtonTitleTypo}
                    >
                      {bottomTitle}
                    </Typography>
                  </span>
                </ButtonBase>
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </CollectionContext.Consumer>
  );
}
