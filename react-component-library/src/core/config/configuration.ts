export interface IConfiguration {
  PRODUCTION_READY: boolean;
  IMAGE_PROVIDER_DOMAIN: string;
  IMAGE_PROVIDER_ENDPOINT: string;
  GRAPHQL_ENDPOINT: string;
  INTRO_DOMAIN: string;
  TOPICS_DOMAIN: string;
  GUIDE_DOMAIN: string;
  RESEARCH_DOMAIN: string;
  ELASTIC_API_URL: string;
}

export enum AppStage {
  LOCAL = 'local',
  DEV = 'dev',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

const DEV: IConfiguration = {
  PRODUCTION_READY: false,
  IMAGE_PROVIDER_DOMAIN: 'https://smb-research.xailabs.dev',
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.dev/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
  ELASTIC_API_URL: 'https://smb-search.xailabs.dev/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
};
const STAGE: IConfiguration = {
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_DOMAIN: 'https://smb-research.xailabs.com',
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.com/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql',
  ELASTIC_API_URL: 'https://smb-api.xailabs.com/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.com',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.com',
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.com',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.com',
};
const PRODUCTION: IConfiguration = {
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_DOMAIN: 'https://recherche.smb.museum',
  IMAGE_PROVIDER_ENDPOINT: 'https://recherche.smb.museum/images',
  GRAPHQL_ENDPOINT: 'https://smb-live-api.xailabs.com/v1/graphql',
  ELASTIC_API_URL: 'https://smb-live-api.xailabs.com/search',
  INTRO_DOMAIN: 'https://sammlung.smb.museum',
  TOPICS_DOMAIN: 'https://themen.smb.museum',
  GUIDE_DOMAIN: 'https://touren.smb.museum',
  RESEARCH_DOMAIN: 'https://recherche.smb.museum',
};
const LOCAL: IConfiguration = {
  ...DEV,
  RESEARCH_DOMAIN: 'http://localhost:3000',
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
