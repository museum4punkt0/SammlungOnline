/* eslint no-console: ["error", { allow: ["log"] }] */
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LanguageService from '../../../utils/LanguageService';

import {
  QueryRoot,
  StoryEntity,
  SmbSttPlatformConfig,
} from '../../../generated/graphql';
import { ConfigLoader } from '../../../hooks';

const FetchAllStories = (
  platform: string,
  hideInOverviewTopicStories: boolean,
) => {
  const config = ConfigLoader.CurrentConfig;
  const lang = LanguageService.getCurrentLanguage();
  const fragmentStoriesFields = `stories(locale: "${lang}", publicationState: LIVE) {
  data {
    attributes {
      title
      slug
      displayInHero
      publishedAt
      config {
        author
        id
        teaser_text
        year
        teaser_image {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
  }`;

  let fragmentSttPlatformsFields: string;

  if (hideInOverviewTopicStories) {
    fragmentSttPlatformsFields = `smb_stt_platform_config(where: { hide_in_overview: { _eq: false }  }) {
      platform_key
      hide_in_overview
      link_template
      hero_slider_limit
    }`;
  } else {
    fragmentSttPlatformsFields = `smb_stt_platform_config(where: { enable_story_filter: { _eq: true }  }) {
      platform_key
      hide_in_overview
      link_template
      hero_slider_limit
    }`;
  }

  if (platform === 'all') {
    let query = '';
    for (const key in config.STRAPI_SCHEMA_CONFIG) {
      if (config.STRAPI_SCHEMA_CONFIG[key] !== 'all') {
        query += `${config.STRAPI_SCHEMA_CONFIG[key]} {
          ${fragmentStoriesFields}
        }`;
      }
    }
    return gql`query fetchStories {
      ${query}
      ${fragmentSttPlatformsFields}
    }`;
  }

  const query = `${platform} {
    ${fragmentStoriesFields}
  }`;

  return gql`query fetchStories {
    ${query}
    ${fragmentSttPlatformsFields}
  }`;
};

class StoriesRepository {
  fetchAllStories(platform: string, hideInOverviewTopicStories: boolean) {
    const config = ConfigLoader.CurrentConfig;
    const QueryString = FetchAllStories(platform, hideInOverviewTopicStories);
    const { loading, error, data } = useQuery<QueryRoot>(QueryString);

    const resultData = {
      activeFilters: [] as SmbSttPlatformConfig[],
    };

    if (!loading && data && data.smb_stt_platform_config) {
      data.smb_stt_platform_config.forEach((platform) => {
        const platfrom = platform.platform_key.toLocaleLowerCase();
        const configStrapiPlatform = config.STRAPI_SCHEMA_CONFIG[platfrom];

        resultData.activeFilters = data.smb_stt_platform_config;

        if (
          !loading &&
          data &&
          data[configStrapiPlatform] &&
          data[configStrapiPlatform]?.stories?.data.length
        ) {
          resultData[platfrom] = data[configStrapiPlatform]?.stories
            ?.data as StoryEntity[];
        }
      });
    }

    return { loading, error, data: resultData };
  }
}

export default StoriesRepository;
