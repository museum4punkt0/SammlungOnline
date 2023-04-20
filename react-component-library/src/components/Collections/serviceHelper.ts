/* eslint-disable no-console */
import {
  ICollectionContextData,
  useConfigLoader,
  AssortmentsService,
  AssortmentsContextData,
  GuideService,
} from 'src';
import TopicStoriesService from '../../services/TopicStoriesService/service';
import { LinkBuilder } from 'src/utils/LinkBuilder';
import ImageUrlBuilder from '../../utils/ImageUrlBuilder';
// import LanguageService from '../../utils/LanguageService';
import { useTranslation } from 'react-i18next';

import './collections.scss';

export function getCollections(
  hideInOverviewTopicStories: boolean,
  slug?: string,
  cardCta?: string,
  platform?: string,
): any {
  const { config } = useConfigLoader();
  const { t } = useTranslation();

  const navigator = new LinkBuilder();
  const imageUrlBuilder = new ImageUrlBuilder(config);

  // const getCurrentLocale = () => {
  //   const defaultLang = 'de';
  //   const lang = LanguageService.getCurrentStrapiLanguage();
  //   let currentLocale = '';

  //   if (lang !== defaultLang) {
  //     currentLocale = `/${currentLocale}${lang}`;
  //   }

  //   return currentLocale;
  // };

  const getResearchCollections = () => {
    const assortmentsService = new AssortmentsService();
    const { assortmentsContextData } =
      assortmentsService.getAssortmentObjects();
    const collections = {
      cards: [],
      filters: {},
      hero: [],
    } as any;
    collections.cards = assortmentsContextData.map(
      (assortment: AssortmentsContextData) => {
        return {
          id: assortment.id,
          section: 'research',
          title: assortment.title,
          subtitle: assortment.subtitle,
          image: assortment.img,
          href: assortment.link,
          actionText: cardCta,
        };
      },
    );

    return collections;
  };

  const getTopicsCollections = (
    platformVal: string | undefined,
    hideInOverviewTopicStories: boolean,
  ) => {
    const platform = platformVal || '';
    const topicStories = new TopicStoriesService();
    const { loading, data: contextData } = topicStories.getStoriesData(
      platform,
      hideInOverviewTopicStories,
    );
    const collections = {
      cards: [],
      filters: {},
      hero: [],
    } as any;

    if (!loading) {
      collections.filters = { ...contextData.filters };
      if (contextData.cards && contextData.cards.length) {
        collections.cards = [...contextData.cards];
        collections.cards = collections.cards.map(
          (story: any, index: number) => {
            return {
              id: `story_${index}`,
              section: 'topics',
              title: story.title,
              subtitle: t(story.subtitle),
              image: story.previewImage,
              href: story.href,
              actionText: cardCta || story.cta,
              target: story.target,
            };
          },
        );
      }
      return collections;
    }

    return collections;
  };

  const getGuideCollections = () => {
    const guideService = new GuideService(imageUrlBuilder);
    const { contextData } = guideService.getGuides(
      config?.CAROUSEL_CONFIG?.COLLECTION_CARD_IMAGE_SIZE,
      config?.CAROUSEL_CONFIG?.TOUR_CAROUSEL_IMAGE_SIZE,
    );
    const collections = {
      cards: [],
      filters: {},
      hero: [],
    } as any;
    collections.cards = contextData.map((tour: ICollectionContextData) => {
      return {
        id: tour.id,
        section: 'guide',
        title: tour.title,
        subtitle: tour.subtitle,
        image: tour.previewImageCard,
        href: navigator.getGuideHref(tour.id, tour.title),
        actionText: cardCta,
      };
    });

    return collections;
  };

  switch (slug) {
    case 'RESEARCH':
      return getResearchCollections();
    case 'TOPIC':
      return getTopicsCollections(platform, hideInOverviewTopicStories);
    case 'GUIDE':
      return getGuideCollections();
    case 'INTRO':
    default:
      return [];
  }
}
