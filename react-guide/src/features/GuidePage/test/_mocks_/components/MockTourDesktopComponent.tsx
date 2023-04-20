import { Grid, Typography } from '@material-ui/core';

import React from 'react';
import useStyles from '../../../components/guidePage.jss';
import TourNavigation from '../../../components/TourHeader/TourNavigation';
import TourHeader from '../../../components/TourHeader/TourHeader';
import TourBody from '../../../components/TourBody/TourBody';
import TourFooter from '../../../components/TourFooter/TourFooter';
import {
  Carousel,
  CarouselHeadline,
  CollectionCard,
} from '@smb/smb-react-components-library';
import { IMockCollection, IMockConfig, IMockTourData } from '../types';
import { useTranslation } from 'react-i18next';

export const MockTourDesktopComponent = ({
  mockTourData,
  mockCollection,
  config,
}: {
  mockTourData: IMockTourData;
  mockCollection: Array<IMockCollection>;
  config: IMockConfig;
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.content} style={{ paddingTop: '5rem' }}>
      {/* Guide Data */}
      <Grid container justifyContent="center">
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ margin: '0 0.5rem', maxWidth: '80rem' }}
        >
          {/* Route */}
          {mockTourData && (
            <Grid container item>
              <TourNavigation />
              <div>
                <Grid
                  container
                  justifyContent="center"
                  style={{ marginTop: '1rem', height: '100%' }}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    style={{ maxWidth: '80rem' }}
                  >
                    <Typography color="primary" variant="h5">
                      {mockTourData.subtitle}
                    </Typography>
                    <Typography variant="h1">{mockTourData.title}</Typography>
                  </Grid>
                </Grid>
              </div>

              {/* route header ("title": string) */}
              <TourHeader title={mockTourData.title} />
              {/* route body ("stations": StationData[]) */}
              <TourBody
                stations={mockTourData.stations}
                location={mockTourData.location}
              />
              {/* route fooer ("title": string) */}
              {(mockTourData.stations.length > 0 && (
                <TourFooter
                  title={mockTourData.title}
                  station={
                    mockTourData.stations[mockTourData.stations.length - 1]
                  }
                  location={mockTourData.location}
                />
              )) || <TourFooter title={mockTourData.title} />}
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
          {mockCollection.map((collection: IMockCollection) => {
            return (
              <CollectionCard
                key={collection.id}
                actionText={t('collections module discover button')}
                count={collection.elementCount}
                {...collection}
              />
            );
          })}
        </Carousel>
      </Grid>
    </div>
  );
};
