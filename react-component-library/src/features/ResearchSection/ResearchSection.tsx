/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SwiperCarousel } from '../index';

import {
  HighlightService,
  AssortmentsService,
  AssortmentsContextData,
  useConfigLoader,
} from 'src';

import { CarouselHeadline, LoadingSpinner } from 'src';
import { CollectionCard } from '../collection/components/CollectionCard/CollectionCardNew';
import { CarouselImageCard } from '../carousel/components/CarouselImageCard/CarouselImageCardNew';

// import useStyles from './researchSection.jss';
import './researchSection.scss';

function ResearchSection(): ReactElement {
  const highlightsService = new HighlightService();
  const assortmentsService = new AssortmentsService();
  const { loading, contextData } = highlightsService.getHighlightsObjects();
  const { assortmentsLoading, assortmentsContextData } =
    assortmentsService.getAssortmentObjects();

  const { config } = useConfigLoader();
  const { t } = useTranslation();

  // const classes = useStyles();

  const getCardAssortments = (contextData: Array<AssortmentsContextData>) => {
    return contextData.map((assortment: AssortmentsContextData) => {
      return {
        section: 'research',
        title: assortment.title,
        subtitle: assortment.subtitle,
        href: assortment.link,
        id: assortment.id,
        actionText: t('collections.buttons.research'),
        image: assortment.img,
      };
    });
  };

  const assortments = getCardAssortments(assortmentsContextData);

  return (
    <>
      <div className={'research-section'}>
        <CarouselHeadline
          href={config.RESEARCH_DOMAIN}
          variant={'h4'}
          text={t('research.highlights.text')}
          link={false}
        >
          {t('research.highlights.title')}
        </CarouselHeadline>

        {loading && (
          <div className={'research-section__loader'}>
            <LoadingSpinner />
          </div>
        )}
        {!loading && contextData.length > 0 && (
          <SwiperCarousel
            data={contextData as any}
            type="auto"
            sliderComponent={CarouselImageCard}
            section="research-auto"
          />
        )}
      </div>

      {!assortmentsLoading && assortments.length > 0 && (
        <div className={'research-section'}>
          <CarouselHeadline
            href={config.RESEARCH_DOMAIN}
            variant={'h4'}
            text={t('research.collection.text')}
            link={false}
          >
            {t('research.collection.title')}
          </CarouselHeadline>

          {assortmentsLoading && (
            <div className={'research-section__loader'}>
              <LoadingSpinner />
            </div>
          )}

          <SwiperCarousel
            data={assortments as any}
            type="pair"
            sliderComponent={CollectionCard}
            section="research-pair"
          />
        </div>
      )}
    </>
  );
}

export default ResearchSection;
