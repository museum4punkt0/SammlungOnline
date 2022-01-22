import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HighlightButton } from '../../../components/HighlightButton';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import TopicsService from '../../../utils/TopicsService';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { LinkBuilder } from '../../../utils/LinkBuilder';
import useDefaultStyles from '../../../context/Themes/defaultStyles.jss';
import ImageUrlBuilder from '../../../utils/ImageUrlBuilder';
import {
  Slider,
  Slide,
  CollectionsModule,
  CollectionsContext,
  ICollectionsContextData,
  IntroService,
  ITextSectionContextData,
  GuideService,
  Sections,
  TextModuleType,
  useConfigLoader,
} from '@smb/smb-react-components-library';
import useStyles from './landingPage.jss';

function LandingPage(): ReactElement {
  const classes = useStyles();
  const defaultClasses = useDefaultStyles();
  const { config } = useConfigLoader();
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const link = new LinkBuilder(config);

  const topicsService = new TopicsService();
  const { loading, contextData } = topicsService.getTopics();

  const guideService = new GuideService(new ImageUrlBuilder());
  // const { loading: introLoading, contextData: intoContextData } = guideService.getGuides(config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE, config.DATA_CONFIG.TOPIC_SLIDER_IMAGE_SIZE);

  const introService = new IntroService(config);
  const { loading: introLoading, contextData: intoContextData } =
    introService.getIntroContextData();

  const textSectionContext: ITextSectionContextData = {
    sections: intoContextData.textModulesContextData,
  };
  // console.log(textSectionContext)

  const onCollectionClick = (id: number, title: string): void => {
    history.push(`/collections/${id}/${title}`);
  };

  const collectionsContext: ICollectionsContextData = {
    collections: contextData,
    onCollectionClick: onCollectionClick,
  };

  useLayoutEffect(() => {
    if (contextData) {
      // console.log(location.hash.slice(1));
      const element = document.getElementById(location.hash.slice(1));
      element?.scrollIntoView();
    }
  });

  if (loading || !contextData) {
    return (
      <div className={classes.content} data-testid={'page-loading-spinner'}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Grid>
      <div
        className={classes.content}
        data-testid={'page-image-content-wrapper'}
      >
        {contextData?.length > 1 && (
          <React.Fragment>
            <Slider autoplay enableKeyboardControls pauseOnHover>
              {collectionsContext.collections.map(
                (collectionContextData, index) => {
                  return (
                    <Slide
                      key={index}
                      image={collectionContextData.previewImageSlider}
                    >
                      <div className={classes.slideTintCover}>
                        <div className={classes.slideContentWrapper}>
                          <div className={classes.slideContent}>
                            <Typography variant={'h2'}>
                              {collectionContextData.title}
                            </Typography>
                            <Typography
                              component="div"
                              variant={'h5'}
                              className={clsx(
                                defaultClasses.highlightTxtBig,
                                classes.slideContentSubtitle,
                              )}
                            >
                              {collectionContextData.subtitle}
                            </Typography>
                            <HighlightButton
                              data-cy="test"
                              caption={t('go to topic')}
                              onClick={(): void =>
                                link.toTopics(
                                  collectionContextData.id,
                                  collectionContextData.title,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Slide>
                  );
                },
              )}
            </Slider>
            <Grid container justify="center">
              <div
                data-testid={'page-topics-wrapper'}
                id={'topics'}
                className={classes.collectionsModuleWrapper}
                style={{ padding: '2rem', maxWidth: '80rem' }}
              >
                <CollectionsContext.Provider value={collectionsContext}>
                  <CollectionsModule
                    collectionModuleClasses={classes.collectionModule}
                  />
                </CollectionsContext.Provider>
              </div>
            </Grid>
          </React.Fragment>
        )}
        <Sections
          sections={textSectionContext.sections}
          allowedSectionTypes={[TextModuleType.RESEARCH, TextModuleType.GUIDE]}
        ></Sections>
      </div>
    </Grid>
  );
}

export default LandingPage;
