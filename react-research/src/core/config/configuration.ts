import { IConfiguration } from '../interfaces/config.interface';
import { AppStage } from '../enums/app-stage.enum';

const DEV: IConfiguration = {
    stage: AppStage.DEV,
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
    stage: AppStage.STAGE,
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
    stage: AppStage.PRODUCTION,
    PRODUCTION_READY: true,
    IMAGE_PROVIDER_DOMAIN: 'https://recherche.smb.museum',
    IMAGE_PROVIDER_ENDPOINT: 'https://recherche.smb.museum/images',
    GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
    ELASTIC_API_URL: 'https://api.smb.museum/search',
    INTRO_DOMAIN: 'https://sammlung.smb.museum',
    TOPICS_DOMAIN: 'https://themen.smb.museum',
    GUIDE_DOMAIN: 'https://touren.smb.museum',
    RESEARCH_DOMAIN: 'https://recherche.smb.museum',
};
const LOCAL: IConfiguration = {
    ...DEV,
    stage: AppStage.LOCAL,
    ELASTIC_API_URL: 'https://api.smb.museum/search',
    GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
    IMAGE_PROVIDER_DOMAIN: 'https://recherche.smb.museum',
    IMAGE_PROVIDER_ENDPOINT: 'https://recherche.smb.museum/images',
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
