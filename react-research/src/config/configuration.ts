import { IConfiguration } from '../types/config.interface';
import { AppStage } from '../enums/app-stage.enum';

const DEV: IConfiguration = {
  stage: AppStage.DEV,
  PRODUCTION_READY: false,
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.dev/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
  ELASTIC_API_URL: 'https://smb-api.xailabs.dev/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
};
const STAGE: IConfiguration = {
  stage: AppStage.STAGE,
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xaidev.net/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xaidev.net/v1/graphql',
  ELASTIC_API_URL: 'https://smb-api.xaidev.net/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xaidev.net',
  TOPICS_DOMAIN: 'https://smb-topics.xaidev.net',
  RESEARCH_DOMAIN: 'https://smb-research.xaidev.net',
  GUIDE_DOMAIN: 'https://smb-guide.xaidev.net',
};
const PRODUCTION: IConfiguration = {
  stage: AppStage.PRODUCTION,
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research-live.xaidev.net/images',
  GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
  ELASTIC_API_URL: 'https://api.smb.museum/search',
  INTRO_DOMAIN: 'https://sammlung.smb.museum',
  TOPICS_DOMAIN: 'https://themen.smb.museum',
  RESEARCH_DOMAIN: 'https://recherche.smb.museum',
  GUIDE_DOMAIN: 'https://touren.smb.museum',
};
const LOCAL: IConfiguration = {
  ...STAGE,
  stage: AppStage.LOCAL,
  PRODUCTION_READY: false,
  RESEARCH_DOMAIN: 'http://localhost:3001',
};

export const loadConfig = (environment: AppStage | string | null): IConfiguration => {
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
