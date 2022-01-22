export interface IConfiguration {
  PRODUCTION_READY: boolean;
  IMAGE_PROVIDER_DOMAIN: string;
  IMAGE_PROVIDER_ENDPOINT: string;
  GRAPHQL_ENDPOINT: string;
  GUIDE_ORIENT_API_ENDPOINT: string;
  ELASTIC_API_URL: string;
  INTRO_DOMAIN: string;
  TOPICS_DOMAIN: string;
  GUIDE_DOMAIN: string;
  RESEARCH_DOMAIN: string;
  RESEARCH_DETAIL_PATH: string;
  MATOMO_URL: string;
  CAROUSEL_CONFIG: {
    COLLECTION_CARD_IMAGE_SIZE: number;
    MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: number;
    DETAILPAGE_IMAGE_SIZE: number;
    PREVIEW_IMAGE_SIZE: number;
    SLIDER_IMAGE_SIZE: number;
    TOUR_CAROUSEL_IMAGE_SIZE: number;
    HIGHLIGHT_CAROUSEL_IMAGE_SIZE: number;
    CAROUSEL_HIGHLIGHTS_COUNT: number;
  };
  stage: AppStage;
}
const CAROUSEL_CONFIG = {
  COLLECTION_CARD_IMAGE_SIZE: 580,
  MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: 750,
  DETAILPAGE_IMAGE_SIZE: 2500,
  PREVIEW_IMAGE_SIZE: 86,
  SLIDER_IMAGE_SIZE: 2500,
  TOUR_CAROUSEL_IMAGE_SIZE: 200,
  HIGHLIGHT_CAROUSEL_IMAGE_SIZE: 200,
  CAROUSEL_HIGHLIGHTS_COUNT: 50,
};

export enum AppStage {
  LOCAL = 'local',
  DEV = 'dev',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

const DEV: IConfiguration = {
  PRODUCTION_READY: false,
  IMAGE_PROVIDER_DOMAIN: 'https://smb-research.xailabs.dev/images/',
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.dev/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://smb-api-guide.xailabs.dev',
  ELASTIC_API_URL: 'https://smb-api.xailabs.dev/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
  RESEARCH_DETAIL_PATH: 'detail',
  MATOMO_URL: 'https://smb-matomo.xailabs.dev',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  stage: AppStage.DEV,
};
const STAGE: IConfiguration = {
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_DOMAIN: 'https://smb-research.xailabs.com/images/',
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.com/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://smb-api.xailabs.com/guide',
  ELASTIC_API_URL: 'https://smb-api.xailabs.com/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.com',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.com',
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.com',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.com',
  RESEARCH_DETAIL_PATH: 'detail',
  MATOMO_URL: 'https://smb-admin.xailabs.com/matomo/',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  stage: AppStage.STAGE,
};
const PRODUCTION: IConfiguration = {
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_DOMAIN: 'https://recherche-smb.xailabs.com/images/',
  IMAGE_PROVIDER_ENDPOINT: 'https://recherche-smb.xailabs.com/images',
  GRAPHQL_ENDPOINT: 'https://api-smb.xailabs.com/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://api-smb.xailabs.com/guide',
  ELASTIC_API_URL: 'https://api-smb.xailabs.com/search',
  INTRO_DOMAIN: 'https://sammlung-smb.xailabs.com',
  TOPICS_DOMAIN: 'http://themen-smb.xailabs.com',
  GUIDE_DOMAIN: 'http://touren-smb.xailabs.com',
  RESEARCH_DOMAIN: 'http://recherche-smb.xailabs.com',
  RESEARCH_DETAIL_PATH: 'detail',
  MATOMO_URL: 'https://admin.smb.museum/matomo/index.php',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  stage: AppStage.PRODUCTION,
};
const LOCAL: IConfiguration = {
  ...DEV,
  RESEARCH_DOMAIN: 'http://localhost:3000',
  // GUIDE_ORIENT_API_ENDPOINT: 'https://smb-guide-api.xailabs.dev',
  // MATOMO_URL: 'https://admin.smb.museum/matomo/index.php',
  // GUIDE_ORIENT_API_ENDPOINT: 'http://localhost:8080/smb-api.xailabs.com/guide/',
  stage: AppStage.LOCAL,
};

export const loadConfig = (
  environment: AppStage | string | null,
): IConfiguration => {
  switch (environment) {
    case AppStage.DEV:
      return DEV;
    case AppStage.STAGE:
      return STAGE;
    case AppStage.PRODUCTION:
      return PRODUCTION;
    default:
      return LOCAL;
  }
};
