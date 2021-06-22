import { DATA_CONFIG } from './dataConfig';

export interface Config {
    IMAGE_PROVIDER_DOMAIN: string;
    IMAGE_PROVIDER_PATH: string;
    GRAPHQL_ENDPOINT: string;
    INTRO_DOMAIN: string;
    TOPICS_DOMAIN: string;
    GUIDE_DOMAIN: string;
    RESEARCH_DOMAIN: string;
    RESEARCH_DETAIL_PATH: string;
    MEDIA_PLAYER_INTERVAL: number;
    DATA_CONFIG: {
        SLIDER_IMAGE_SIZE: number;
        DISPLAY_TITLE_ATTRIBUTE_CANDIDATES: string[];
        CAROUSEL_HIGHLIGHTS_COUNT: number;
        CAROUSEL_IMAGE_SIZE: number;
        MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: number;
        COLLECTION_CARD_IMAGE_SIZE: number;
    };
}

export enum AppStage {
    LOCAL = 'local',
    DEV = 'dev',
    STAGE = 'stage',
    PRODUCTION = 'production',
}

const DEV: Config = {
    IMAGE_PROVIDER_DOMAIN: 'https://smb-landingpage.xailabs.dev',
    IMAGE_PROVIDER_PATH: '/images/',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
    MEDIA_PLAYER_INTERVAL: 8000,
    DATA_CONFIG: DATA_CONFIG,
    INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
    TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
    GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
    RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
    RESEARCH_DETAIL_PATH: 'detail',
};
const STAGE: Config = {
    ...DEV,
    IMAGE_PROVIDER_DOMAIN: 'https://smb-landingpage.xailabs.com',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql',
    INTRO_DOMAIN: 'https://smb-landingpage.xailabs.com',
    TOPICS_DOMAIN: 'https://smb-topics.xailabs.com',
    RESEARCH_DOMAIN: 'https://smb-research.xailabs.com',
    GUIDE_DOMAIN: 'https://smb-guide.xailabs.com',
};
const PRODUCTION: Config = {
    ...STAGE,
    IMAGE_PROVIDER_DOMAIN: 'https://sammlung.smb.museum',
    GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
    INTRO_DOMAIN: 'https://sammlung.smb.museum',
    TOPICS_DOMAIN: 'http://themen.smb.museum',
    GUIDE_DOMAIN: 'http://touren.smb.museum',
    RESEARCH_DOMAIN: 'http://recherche.smb.museum',
};
const LOCAL: Config = {
    ...STAGE,
    INTRO_DOMAIN: 'http://localhost:3000',
    // IMAGE_PROVIDER_DOMAIN: 'http://localhost:8080',
    // GRAPHQL_ENDPOINT: 'http://localhost:8081/v1/graphql',
};

export default {
    LOCAL,
    DEV,
    STAGE,
    PRODUCTION,
};
