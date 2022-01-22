import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

// SMB Components
import {
  GuideService,
  Slider,
  Slide,
  CollectionsModule,
  ICollectionsContextData,
  CollectionsContext,
  Sections,
  useConfigLoader,
  TextSectionContextData,
  TextModuleType,
  IntroService,
} from '@smb/smb-react-components-library';
import HighlightButton from '../../../components/HighlightButton/HightlightButton';

// Materialui Components
import { Typography } from '@material-ui/core';

// import GuideService from '../../Services/GuideService';
// import IntroService from '../api/IntroService';

import { LinkBuilder } from '../../../utils/LinkBuilder';
import ImageUrlBuilder from '../../../utils/ImageUrlBuilder';

import useStyles from './landingPage.jss';

function LandingPage(): ReactElement {
  const { config } = useConfigLoader();
  const classes = useStyles();
  const { t } = useTranslation();

  const link = new LinkBuilder();

  const onCollectionClick = (id: number, title: string): void => {
    link.toGuide(id, title);
  };

  const guideService = new GuideService(new ImageUrlBuilder());
  const { loading, contextData } = guideService.getGuides(
    config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
    config.CAROUSEL_CONFIG.SLIDER_IMAGE_SIZE,
  );

  const collectionsContext: ICollectionsContextData = {
    collections: contextData,
    onCollectionClick: onCollectionClick,
  };

  const introService = new IntroService(config);
  const { contextData: textContextData } = introService.getIntroContextData();
  const textSectionContext: TextSectionContextData = {
    sections: textContextData.textModulesContextData,
  };

  return (
    <div className={classes.content} data-testid={'page-content-wrapper'}>
      {!loading && (
        <Slider autoplay enableKeyboardControls pauseOnHover>
          {collectionsContext.collections.map((tour, index) => {
            return (
              <Slide key={index} image={tour.previewImageSlider}>
                <div className={classes.slideTintCover}>
                  <div className={classes.slideContentWrapper}>
                    <div className={classes.slideContent}>
                      {/* TODO replace collectionContext to get subtitle of tour nicer */}
                      {/* TODO tour.previewImageMediaPlayer == tour subtitle */}
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
                        onClick={() => link.toGuide(tour.id, tour.title)}
                      />
                    </div>
                  </div>
                </div>
              </Slide>
            );
          })}
        </Slider>
      )}

      {!loading && (
        <CollectionsContext.Provider value={collectionsContext}>
          <div
            style={{ padding: 10 }}
            data-testid={'page-content-collection-module-wrapper'}
          >
            <CollectionsModule
              collectionModuleClasses={classes.collectionModule}
            />
          </div>
        </CollectionsContext.Provider>
      )}

      <Sections
        sections={textSectionContext.sections}
        allowedSectionTypes={[TextModuleType.RESEARCH, TextModuleType.TOPIC]}
      ></Sections>
    </div>
  );
}

export default LandingPage;
