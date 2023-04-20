/* eslint no-console: ["error", { allow: ["log"] }] */
import LanguageService from '../../../utils/LanguageService';
import StoriesRepository from '../repository';
import { IStoriesData } from '../../../features/collection/types/CollectionContext';
import { StoryEntity, SmbSttPlatformConfig } from '../../../generated/graphql';

import { ConfigLoader } from '../../../hooks';
import { IConfiguration } from '../../../config';

interface Stories {
  isl?: StoryEntity[];
  hbf?: StoryEntity[];
  kgm?: StoryEntity[];
  smb?: StoryEntity[];
  activeFilters: SmbSttPlatformConfig[];
}

class TopicStoriesService {
  private config: IConfiguration;
  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }

  getStoriesData(platform: string, hideInOverviewTopicStories: boolean) {
    const { loading, error, data } = this.storiesApiCall(
      platform,
      hideInOverviewTopicStories,
    );
    let convertedData = {} as IStoriesData;

    if (!loading && data && !error) {
      convertedData = this.convertStoriesData(data);
    }

    return { loading, error, data: convertedData as IStoriesData };
  }

  private storiesApiCall(
    platform: string,
    hideInOverviewTopicStories: boolean,
  ) {
    const storiesRepository = new StoriesRepository();

    //Temp fix, untill strapi is on staging, else fetchPlatform = platform
    const fetchPlatform = platform;

    return storiesRepository.fetchAllStories(
      this.config.STRAPI_SCHEMA_CONFIG[fetchPlatform],
      hideInOverviewTopicStories,
    );
  }

  private convertStoriesData(data: Stories): IStoriesData {
    const lang = LanguageService.getCurrentLanguage();
    const getFilters = () => {
      const filters = data.activeFilters.map((item) => {
        const platform = item.platform_key.toLocaleLowerCase();
        return {
          title: `stt.filter.${platform}`,
          value: platform,
          id: platform,
        };
      });
      filters.unshift({
        title: `stt.filter.all`,
        value: 'all',
        id: 'all',
      });
      return filters;
    };
    const heroConvertedData = [] as any[];
    const convertedData = [] as any[];

    const filters = {
      label: 'stt.filter.label',
      iconPosition: 'start',
      options: getFilters() as any[],
    };

    for (const platform in data) {
      if (platform !== 'activeFilters') {
        const activeFilterData = data.activeFilters.filter(
          (item) => item.platform_key.toLocaleLowerCase() === platform,
        )[0];
        const PLATFORM_CONFIG_FRONTEND = activeFilterData.link_template;
        const PLATFORM_CONFIG_BACKEND =
          this.config.STRAPI_CONFIG.backend[
            activeFilterData.platform_key.toLocaleLowerCase()
          ];

        data[platform].map((story: any, index: number) => {
          const imageUrl = `${PLATFORM_CONFIG_BACKEND}${story?.attributes?.config?.teaser_image?.data?.attributes?.url}`;
          const convertedStory = {
            title: story?.attributes?.title,
            text: story?.attributes?.config?.teaser_text,
            subtitle: `stt.filter.${platform}`,
            href: PLATFORM_CONFIG_FRONTEND.replace(':lang', lang).replace(
              ':slug',
              story?.attributes?.slug,
            ),
            previewImage: imageUrl,
            platform: platform,
            publishedAt: story.attributes.publishedAt,
            id: index,
            target: '_blank',
            cta: `stt.cta.${platform}`,
          };

          if (
            story.attributes.displayInHero &&
            index < activeFilterData.hero_slider_limit
          ) {
            heroConvertedData.push(convertedStory);
          }
          convertedData.push(convertedStory);
        });
      }
    }

    return {
      hero: heroConvertedData,
      cards: convertedData,
      filters: filters,
    };
  }
}

export default TopicStoriesService;
