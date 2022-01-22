import useStyles from '../../../components/landingPage.jss';
import { useTranslation } from 'react-i18next';
import { Slide, Slider } from '@smb/smb-react-components-library';
import { Typography } from '@material-ui/core';
import HighlightButton from '../../../../../components/HighlightButton/HightlightButton';
import React from 'react';
import { IMockCollection } from '../types';

export const MockSliderComponent = ({
  mockCollection,
}: {
  mockCollection: Array<IMockCollection>;
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Slider>
      {mockCollection.map((tour, index) => {
        return (
          <Slide key={index} image={tour.previewImageSlider}>
            <div className={classes.slideTintCover}>
              <div className={classes.slideContentWrapper}>
                <div className={classes.slideContent}>
                  <Typography
                    variant={'overline'}
                    color={'secondary'}
                    className={classes.slideTitle}
                  >
                    {tour.previewImageMediaPlayer}
                  </Typography>
                  <Typography variant={'h2'} className={classes.slideTitle}>
                    {tour.title}
                  </Typography>
                  <Typography variant={'h5'}>{tour.subtitle}</Typography>
                  <HighlightButton
                    caption={t('go to tour')}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log(tour.id, tour.title);
                    }}
                  />
                </div>
              </div>
            </div>
          </Slide>
        );
      })}
    </Slider>
  );
};
