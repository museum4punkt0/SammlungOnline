/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { LinkBuilder } from '../../utils/LinkBuilder';
import ImageUrlBuilder from '../../utils/ImageUrlBuilder';
import { SwiperCarousel } from '../index';

import { useConfigLoader, CarouselHeadline } from 'src';
import { GuideService, ICollectionContextData } from 'src';
import './guideSection.scss';
import { CollectionCard } from '../collection/components/CollectionCard/CollectionCardNew';

function GuideSection(): ReactElement {
  const { config } = useConfigLoader();
  const navigator = new LinkBuilder();
  const { t } = useTranslation();
  const imageUrlBuilder = new ImageUrlBuilder(config);
  const guideService = new GuideService(imageUrlBuilder);
  const { loading, contextData } = guideService.getGuides(
    config?.CAROUSEL_CONFIG?.COLLECTION_CARD_IMAGE_SIZE,
    config?.CAROUSEL_CONFIG?.TOUR_CAROUSEL_IMAGE_SIZE,
  );
  const cardCollection = (
    contextData: ICollectionContextData[],
    navigator: LinkBuilder,
  ) => {
    return contextData.map((tour: ICollectionContextData) => {
      return {
        section: 'guide',
        title: tour.title,
        subtitle: tour.subtitle,
        image: tour.previewImageCard,
        actionText: t('collections.buttons.guide'),
        href: navigator.getGuideHref(tour.id, tour.title),
        id: tour.id,
      };
    });
  };

  const collections = cardCollection(contextData, navigator);

  return (
    <>
      {!loading && collections.length > 0 && (
        <div className={'guide-section'}>
          <CarouselHeadline href={config.GUIDE_DOMAIN}>
            {t('routes in the collection')}
          </CarouselHeadline>
          <SwiperCarousel
            data={collections as any}
            type="pair"
            sliderComponent={CollectionCard}
            section="guide-pair"
          />
        </div>
      )}
    </>
  );
}

export default GuideSection;
