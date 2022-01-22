import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { LinkBuilder } from '../../utils/LinkBuilder';
import ImageUrlBuilder from '../../utils/ImageUrlBuilder';

import {
  useConfigLoader,
  CarouselHeadline,
  Carousel,
  CollectionCard,
  TextSectionData,
  TextSection,
} from 'src';
import { GuideService, ICollectionContextData } from 'src';
import useStyles from './guideSection.jss';

const cardCollection = (
  contextData: ICollectionContextData[],
  navigator: LinkBuilder,
) => {
  return contextData.map((tour: ICollectionContextData) => {
    return {
      title: tour.title,
      subtitle: tour.subtitle,
      image: tour.previewImageCard,
      tintColor: 'rgba(0, 0, 0, 0.5)',
      count: tour.collectionObjects.length,
      onClick: () => navigator.toGuide(tour.id, tour.title),
      id: tour.id,
    };
  });
};

function GuideSection({
  textSectionData,
}: {
  textSectionData: TextSectionData;
}): ReactElement {
  const { config } = useConfigLoader();
  const navigator = new LinkBuilder();
  const { t } = useTranslation();
  const imageUrlBuilder = new ImageUrlBuilder(config);
  const guideService = new GuideService(imageUrlBuilder);
  const { contextData } = guideService.getGuides(
    config.CAROUSEL_CONFIG.COLLECTION_CARD_IMAGE_SIZE,
    config.CAROUSEL_CONFIG.TOUR_CAROUSEL_IMAGE_SIZE,
  );
  const collections = cardCollection(contextData, navigator);
  const classes = useStyles();
  return (
    <div
      className={classes.content}
      style={{ backgroundColor: textSectionData.moduleBackgroundColor }}
    >
      <TextSection textSectionData={textSectionData} isWrapped={true} />
      <div>
        <CarouselHeadline
          href={config.GUIDE_DOMAIN}
          color={textSectionData.titleColor}
        >
          {t('routes in the collection')}
        </CarouselHeadline>
        <Carousel
          cellSpacing={32}
          visibleSlides={{
            xs: 1,
            sm: 2,
            lg: 2,
          }}
        >
          {collections.map((collection) => {
            return (
              <CollectionCard
                key={collection.id}
                actionText={t('collections module discover button')}
                {...collection}
              ></CollectionCard>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default GuideSection;
