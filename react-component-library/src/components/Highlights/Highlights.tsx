/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react';
import { SwiperCarousel } from '../../features/index';

import {
  CarouselHeadline,
  LoadingSpinner,
  HighlightService,
  useConfigLoader,
  HighlightsContextData,
} from 'src';

import { CarouselImageCard } from '../../features/carousel/components/CarouselImageCard/CarouselImageCardNew';
import { HighlightsData } from './typeInterface';
import './highlights.scss';

function Highlights({
  data,
  highlightsCollections,
}: {
  data: HighlightsData;
  highlightsCollections?: HighlightsContextData[];
}): ReactElement {
  const { config } = useConfigLoader();

  const getTitleHref = () => {
    switch (data.slug) {
      case 'INTRO':
        return config.INTRO_DOMAIN;
      case 'RESEARCH':
        return config.RESEARCH_DOMAIN;
      case 'TOPIC':
        return config.TOPICS_DOMAIN;
      case 'GUIDE':
        return config.GUIDE_DOMAIN;
      default:
        return '';
    }
  };

  const getHighlightsCollections = () => {
    if (highlightsCollections && highlightsCollections?.length > 0) {
      return highlightsCollections;
    } else {
      const highlightsService = new HighlightService();
      const { loading, contextData } = highlightsService.getHighlightsObjects();
      if (!loading && contextData.length > 0) return contextData;
      else return [];
    }
  };

  const highlights = getHighlightsCollections();

  return (
    <>
      {highlights && (
        <div className={'highlights-block'}>
          <CarouselHeadline
            href={getTitleHref()}
            variant={'h4'}
            text={data.text}
            link={false}
            assets={data.assets}
          >
            {data.title}
          </CarouselHeadline>
          {highlights && highlights?.length <= 0 && (
            <div className={'highlights-block__loader'}>
              <LoadingSpinner />
            </div>
          )}
          {highlights && highlights?.length > 0 && (
            <SwiperCarousel
              data={highlights as any}
              type="auto"
              sliderComponent={CarouselImageCard}
              section="research-auto"
            />
          )}
        </div>
      )}
    </>
  );
}

export default Highlights;
