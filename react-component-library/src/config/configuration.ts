export interface IConfiguration {
  stage: AppStage;
  PRODUCTION_READY: boolean;
  IMAGE_PROVIDER_ENDPOINT: string;
  GRAPHQL_ENDPOINT: string;
  GUIDE_ORIENT_API_ENDPOINT: string;
  ELASTIC_API_URL: string;
  INTRO_DOMAIN: string;
  TOPICS_DOMAIN: string;
  GUIDE_DOMAIN: string;
  RESEARCH_DOMAIN: string;
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
  STRAPI_SCHEMA_CONFIG: {
    all: string;
    smb: string;
    kgm: string;
    hbf: string;
    isl: string;
  };
  STRAPI_CONFIG: {
    backend: {
      smb: string;
      kgm: string;
      hbf: string;
      isl: string;
    };
  };
  KEYWORDS_ICONCLASSES_LINK: string;
}

const EXTERNAL_LINKS = {
  KEYWORDS_ICONCLASSES_LINK: 'https://iconclass.org/rkd/',
};

const CAROUSEL_CONFIG = {
  COLLECTION_CARD_IMAGE_SIZE: 400,
  MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: 750,
  DETAILPAGE_IMAGE_SIZE: 2500,
  PREVIEW_IMAGE_SIZE: 86,
  SLIDER_IMAGE_SIZE: 2500,
  TOUR_CAROUSEL_IMAGE_SIZE: 200,
  HIGHLIGHT_CAROUSEL_IMAGE_SIZE: 200,
  CAROUSEL_HIGHLIGHTS_COUNT: 50,
};

const STRAPI_SCHEMA_CONFIG = {
  all: 'all',
  smb: 'strapi_smb',
  kgm: 'strapi_kgm',
  hbf: 'strapi_hbf',
  isl: 'strapi_isl',
};

export enum AppStage {
  LOCAL = 'local',
  DEV = 'dev',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

const DEV: IConfiguration = {
  stage: AppStage.DEV,
  PRODUCTION_READY: false,
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xailabs.dev/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://smb-api-guide.xailabs.dev',
  ELASTIC_API_URL: 'https://smb-api.xailabs.dev/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
  TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
  RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
  MATOMO_URL: 'https://smb-matomo.xailabs.dev',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  STRAPI_SCHEMA_CONFIG: STRAPI_SCHEMA_CONFIG,
  STRAPI_CONFIG: {
    backend: {
      isl: 'https://stt-isl.xaidev.net/strapi',
      smb: 'https://stt-smb.xaidev.net/strapi',
      kgm: 'https://stt-kgm.xaidev.net/strapi',
      hbf: 'https://stt-hbf.xaidev.net/strapi',
    },
  },
  ...EXTERNAL_LINKS,
};

const STAGE: IConfiguration = {
  stage: AppStage.STAGE,
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_ENDPOINT: 'https://smb-research.xaidev.net/images',
  GRAPHQL_ENDPOINT: 'https://smb-api.xaidev.net/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://smb-api.xaidev.net/guide',
  ELASTIC_API_URL: 'https://smb-api.xaidev.net/search',
  INTRO_DOMAIN: 'https://smb-landingpage.xaidev.net',
  TOPICS_DOMAIN: 'https://smb-topics.xaidev.net',
  RESEARCH_DOMAIN: 'https://smb-research.xaidev.net',
  GUIDE_DOMAIN: 'https://smb-guide.xaidev.net',
  MATOMO_URL: 'https://smb-admin.xaidev.net/matomo/',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  STRAPI_SCHEMA_CONFIG: STRAPI_SCHEMA_CONFIG,
  STRAPI_CONFIG: {
    backend: {
      isl: 'https://stt-isl.xaidev.net/strapi',
      smb: 'https://stt-smb.xaidev.net/strapi',
      kgm: 'https://stt-kgm.xaidev.net/strapi',
      hbf: 'https://stt-hbf.xaidev.net/strapi',
    },
  },
  ...EXTERNAL_LINKS,
};

const PRODUCTION: IConfiguration = {
  stage: AppStage.PRODUCTION,
  PRODUCTION_READY: true,
  IMAGE_PROVIDER_ENDPOINT: 'https://recherche.smb.museum/images',
  GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
  GUIDE_ORIENT_API_ENDPOINT: 'https://api.smb.museum/guide',
  ELASTIC_API_URL: 'https://api.smb.museum/search',
  INTRO_DOMAIN: 'https://sammlung.smb.museum',
  TOPICS_DOMAIN: 'https://themen.smb.museum',
  RESEARCH_DOMAIN: 'https://recherche.smb.museum',
  GUIDE_DOMAIN: 'https://touren.smb.museum',
  MATOMO_URL: 'https://admin.smb.museum/matomo/index.php',
  CAROUSEL_CONFIG: CAROUSEL_CONFIG,
  STRAPI_SCHEMA_CONFIG: STRAPI_SCHEMA_CONFIG,
  STRAPI_CONFIG: {
    backend: {
      isl: 'https://islamic-art.smb.museum/cms',
      smb: 'https://admin.smb.museum/smb',
      kgm: 'https://admin.smb.museum/kgm',
      hbf: 'https://admin.smb.museum/hbf',
    },
  },
  ...EXTERNAL_LINKS,
};

const LOCAL: IConfiguration = {
  ...STAGE,
  stage: AppStage.LOCAL,
  PRODUCTION_READY: false,
  INTRO_DOMAIN: 'http://localhost:3000',
  TOPICS_DOMAIN: 'http://localhost:3001',
  GUIDE_DOMAIN: 'http://localhost:3002',
  RESEARCH_DOMAIN: 'http://localhost:3003',
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
