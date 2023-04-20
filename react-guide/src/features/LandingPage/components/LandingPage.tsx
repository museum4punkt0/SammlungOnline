/* eslint-disable no-console */
import React, { ReactElement } from 'react';

// import { useTranslation } from 'react-i18next';

// SMB Components
import {
  // GuideService,
  // CollectionsModule,
  // ICollectionsContextData,
  // CollectionsContext,
  Sections,
  // useConfigLoader,
  TextSectionContextData,
  TextModuleType,
  // HeroSwiper,
  WrappedSpinner,
  // IntroService,
  // LinkBuilder,
  LandingpageService,
} from '@smb/smb-react-components-library';

// import ImageUrlBuilder from '../../../utils/ImageUrlBuilder';
import useStyles from './landingPage.jss';
import './landingPage.scss';

function LandingPage(): ReactElement {
  // const { config } = useConfigLoader();
  const classes = useStyles();
  // const { t } = useTranslation();

  // const link = new LinkBuilder();

  // const onCollectionClick = (id: number, title: string): void => {
  //   link.toGuide(id, title);
  // };

  // const guideService = new GuideService(new ImageUrlBuilder());
  // const { loading, contextData } = guideService.getGuides(
  //   config?.CAROUSEL_CONFIG?.COLLECTION_CARD_IMAGE_SIZE,
  //   config?.CAROUSEL_CONFIG?.SLIDER_IMAGE_SIZE,
  // );

  // const collectionsContext: ICollectionsContextData = {
  //   collections: contextData,
  //   onCollectionClick: onCollectionClick,
  // };

  // const introService = new IntroService(config);
  // const { contextData: textContextData } = introService.getIntroContextData();

  // const textSectionContext: TextSectionContextData = {
  //   sections: textContextData.textModulesContextData,
  // };
  const landingpageService = new LandingpageService();
  const { data: sectionsData, loading: sectionsDataLoading } =
    landingpageService.getLandingpageSections();

  const textSectionContext: TextSectionContextData = {
    sections: sectionsData || [],
  };

  // const collectionContext = () => {
  //   const collection = collectionsContext.collections.map((item) => {
  //     return {
  //       ...item,
  //       image: item?.previewImageSlider,
  //       actionText: t('go to tour'),
  //       actionHref: link.toGuideHref(item.id, item.title),
  //       caption: null,
  //       target: '',
  //       href: '#',
  //       id: item?.id,
  //     };
  //   });
  //   return collection;
  // };

  return (
    <>
      {!sectionsDataLoading ? (
        <div className={classes.content} data-testid={'page-content-wrapper'}>
          {/* {contextData && (
            <HeroSwiper
              data={collectionContext() as any}
              section="guide-hero"
            />
          )} */}

          {/* {!loading && (
        <CollectionsContext.Provider value={collectionsContext}>
          <div
            className="section collection-section"
            data-testid={'page-content-collection-module-wrapper'}
          >
            <CollectionsModule
              collectionModuleClasses={classes.collectionModule}
              section={'guide'}
            />
          </div>
        </CollectionsContext.Provider>
      )} */}
          {sectionsData && (
            <Sections
              sections={textSectionContext.sections}
              allowedSectionTypes={[TextModuleType.GUIDE]}
              pagination={true}
            ></Sections>
          )}

          {/* {sectionsData && (
            <Sections
              sections={textSectionContext.sections}
              allowedSectionTypes={[
                TextModuleType.RESEARCH,
                TextModuleType.TOPIC,
              ]}
            ></Sections>
          )} */}
        </div>
      ) : (
        <WrappedSpinner loading={true} platform={'guide'} />
      )}
    </>
  );
}

export default LandingPage;
