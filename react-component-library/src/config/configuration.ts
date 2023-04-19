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
  IMAGE_PROVIDER_DOMAIN: 'https://smb-research.xaidev.net/images/',
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xaidev.net/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xaidev.net/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://smb-api.xaidev.net/guide',
  ELASTIC_API_URL: 'https://smb-api.xaidev.net/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xaidev.net',
  TOPICS_DOMAIN: 'https://smb-topics.xaidev.net',
  RESEARCH_DOMAIN: 'https://smb-research.xaidev.net',
  GUIDE_DOMAIN: 'https://smb-guide.xaidev.net',
  RESEARCH_DETAIL_PATH: 'detail',
  MATOMO_URL: 'https://smb-admin.xaidev.net/matomo/',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  stage: AppStage.STAGE,
};
const PRODUCTION: IConfiguration = {
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_DOMAIN: 'https://recherche.smb.museum/images/',
  IMAGE_PROVIDER_ENDPOINT: 'https://recherche.smb.museum/images',
  GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://api.smb.museum/guide',
  ELASTIC_API_URL: 'https://api.smb.museum/search',
  INTRO_DOMAIN: 'https://sammlung.smb.museum',
  TOPICS_DOMAIN: 'http://themen.smb.museum',
  GUIDE_DOMAIN: 'http://touren.smb.museum',
  RESEARCH_DOMAIN: 'http://recherche.smb.museum',
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
