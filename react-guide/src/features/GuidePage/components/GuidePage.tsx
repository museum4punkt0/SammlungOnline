import React, { ReactElement, useEffect } from 'react';

import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// util
import { LinkBuilder } from '../../../utils/LinkBuilder';

//TODO clean up _mocks_
import TourDescription from './../components/Description/TourDescription';
import TourHeader from './../components/TourHeader/TourHeader';
import TourFooter from './../components/TourFooter/TourFooter';
import TourBody from './../components/TourBody/TourBody';
import TourTitleCard from './../components/TourTitleCard/TourTitleCardModule';
import TourNavigation from './../components/TourHeader/TourNavigation';

// Materialui Components
import { Grid, isWidthUp, Typography, withWidth } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

// import GuideService from '../../Services/GuideService';

import LocationFilter from '../utils/LocationFilter';

// SMB Components
import {
  Carousel,
  CarouselHeadline,
  CollectionCard,
  GuideService,
  ICollectionContextData,
  ICollectionsContextData,
  useConfigLoader,
} from '@smb/smb-react-components-library';

import useStyles from './guidePage.jss';
import ImageUrlBuilder from '../../../utils/ImageUrlBuilder';

const cardCollection = (
  contextData: ICollectionContextData[],
  navigator: LinkBuilder,
) => {
  return contextData.map((guide: ICollectionContextData) => {
    return {
      title: guide.title,
      subtitle: guide.subtitle,
      tintColor: 'rgba(0, 0, 0, 0.5)',
      elementCount: guide.collectionObjects.length,
      onClick: () => navigator.toGuide(guide.id, guide.title),
      id: guide.id,
      image: guide.previewImageCard,
    };
  });
};

const MobileWrapper = withWidth()(function (props: {
  width: Breakpoint;
}): ReactElement {
  const link = new LinkBuilder();
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { config } = useConfigLoader();
  const location = useLocation();
  const locationFilter = new LocationFilter(location);
  const id = parseInt(locationFilter.getPathParam(1));
  const guideService = new GuideService(new ImageUrlBuilder());

  const onCollectionClick = (id: number, title: string): void => {
    history.push(`/tour/${id}/${title}`);
  };


  // data for curren guide
  const { tourLoading, tourData } = guideService.getGuide(
    id,
    config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
    config.CAROUSEL_CONFIG.SLIDER_IMAGE_SIZE,
  );

  // todo use guideservice --loading--
  // data for carousel
  const { contextData } = guideService.getGuides(
    config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
    config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
  );
  const collectionsContext: ICollectionsContextData = {
    collections: contextData,
    onCollectionClick: onCollectionClick,
  };

  useEffect(() => {
    if (contextData) {
      const element = document.getElementById(location.hash.slice(1));
      element?.scrollIntoView();
    }
  });

  if (!tourLoading && tourData?.id === 0) {
    return <Redirect to="/404" />;
  }

  // desktop
  if (isWidthUp('md', props.width)) {
    return (
      <div className={classes.content}>
        {!tourLoading && (
          <TourTitleCard
            withImage
            title={tourData?.title ? tourData.title : 'noTitle'}
            subTitle={tourData?.subtitle ? tourData?.subtitle : 'noSubtitle'}
            abstract={tourData?.abstract ? tourData?.abstract : 'noAbstract'}
            image={tourData?.image ? tourData?.image : ''}
          />
        )}

        {/* Guide Data */}
        <Grid
          container
          justify="center"
          data-testid={'guide-page-data-content-wrapper'}
        >
          <Grid
            item
            container
            justify="space-between"
            style={{ margin: '0 2rem', maxWidth: '80rem' }}
          >
            <Grid item sm={4}>
              {tourData && (
                <TourDescription
                  location={tourData.location}
                  duration={tourData.duration}
                  objectsCount={tourData.objectsCount}
                  abstract={tourData.abstract}
                  description={tourData.description}
                />
              )}
            </Grid>
            {/* Route */}
            {tourData && (
              <Grid container item sm={7} md={7}>
                <TourNavigation />

                {/* route header ("title": string) */}
                <TourHeader title={tourData.title} data-testid={'kek1'} />
                {/* route body ("stations": StationData[]) */}
                <TourBody
                  stations={tourData.stations}
                  location={tourData.location}
                />
                {/* route fooer ("title": string) */}
                {(tourData.stations.length > 0 && (
                  <TourFooter
                    title={tourData.title}
                    station={tourData.stations[tourData.stations.length - 1]}
                    location={tourData.location}
                  />
                )) || <TourFooter title={tourData.title} />}
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Other Guides Carousel */}
        <Grid
          style={{
            backgroundColor: '#d3d3d3',
            margin: '0 0.5rem',
            paddingBottom: '4rem',
          }}
        >
          <CarouselHeadline color="#f25b5b" href={config.GUIDE_DOMAIN}>
            {t('guide carousel title')}
          </CarouselHeadline>
          <Carousel
            cellSpacing={12}
            color="#666666"
            visibleSlides={{
              xs: 1,
              sm: 2,
              lg: 2,
            }}
          >
            {cardCollection(collectionsContext.collections, link).map(
              (collection) => {
                return (
                  <CollectionCard
                    key={collection.id}
                    actionText={t('collections module discover button')}
                    count={collection.elementCount}
                    {...collection}
                  />
                );
              },
            )}
          </Carousel>
        </Grid>
      </div>
    );
  }

  //mobile
  return (
    <div className={classes.content} style={{ paddingTop: '5rem' }}>
      {/* Guide Data */}
      <Grid container justify="center">
        <Grid
          item
          container
          justify="space-between"
          style={{ margin: '0 0.5rem', maxWidth: '80rem' }}
        >
          {/* Route */}
          {tourData && (
            <Grid container item>
              <TourNavigation />
              <div>
                <Grid
                  container
                  justify="center"
                  style={{ marginTop: '1rem', height: '100%' }}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    style={{ maxWidth: '80rem' }}
                  >
                    <Typography color="primary" variant="h5">
                      {tourData.subtitle}
                    </Typography>
                    <Typography variant="h1">{tourData.title}</Typography>
                  </Grid>
                </Grid>
              </div>
              <TourDescription
                location={tourData.location}
                duration={tourData.duration}
                objectsCount={tourData.objectsCount}
                abstract={tourData.abstract}
                description={tourData.description}
              />
              {/* route header ("title": string) */}
              <TourHeader title={tourData.title} />
              {/* route body ("stations": StationData[]) */}
              <TourBody
                stations={tourData.stations}
                location={tourData.location}
              />
              {/* route fooer ("title": string) */}
              {(tourData.stations.length > 0 && (
                <TourFooter
                  title={tourData.title}
                  station={tourData.stations[tourData.stations.length - 1]}
                  location={tourData.location}
                />
              )) || <TourFooter title={tourData.title} />}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Other Guides Carousel */}
      <Grid
        style={{
          backgroundColor: '#d3d3d3',
          padding: '2rem',
        }}
      >
        <CarouselHeadline color="#f25b5b" href={config.GUIDE_DOMAIN}>
          {t('guide carousel title')}
        </CarouselHeadline>
        <Carousel
          color="#666666"
          cellSpacing={12}
          visibleSlides={{
            xs: 1,
            sm: 2,
            lg: 2,
          }}
        >
          {cardCollection(collectionsContext.collections, link).map(
            (collection) => {
              return (
                <CollectionCard
                  key={collection.id}
                  actionText={t('collections module discover button')}
                  count={collection.elementCount}
                  {...collection}
                />
              );
            },
          )}
        </Carousel>
      </Grid>
    </div>
  );
});

function GuidePage(): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <MobileWrapper />
    </div>
  );
}

export default GuidePage;
