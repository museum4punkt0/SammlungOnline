import { DATA_CONFIG } from './dataConfig';

export interface Config {
    IMAGE_PROVIDER_DOMAIN: string;
    IMAGE_PROVIDER_PATH: string;
    GRAPHQL_ENDPOINT: string;
    MEDIA_PLAYER_INTERVAL: number;
    INTRO_DOMAIN: string;
    TOPICS_DOMAIN: string;
    GUIDE_DOMAIN: string;
    RESEARCH_DOMAIN: string;
    DATA_CONFIG: {
        TOPIC_SLIDER_IMAGE_SIZE: number;
        COLLECTION_CARD_IMAGE_SIZE: number;
        MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: number;
        DETAILPAGE_IMAGE_SIZE: number;
        PREVIEW_IMAGE_SIZE: number;
        SLIDER_IMAGE_SIZE: number;
        CAROUSEL_IMAGE_SIZE: number;
        OBJECT_ATTRIBUTE_KEY_TITLE: string;
        OBJECT_ATTRIBUTE_KEY_TECHNICAL_TERM: string;
        OBJECT_ATTRIBUTE_KEY_COLLECTION: string;
        OBJECT_ATTRIBUTE_KEY_PICTURE_CREDITS: string;
        OBJECT_ATTRIBUTE_KEY_IDENT_NR: string;
        OBJECT_ATTRIBUTE_KEY_INVOLVED_PARTIES: string;
        OBJECT_ATTRIBUTE_KEY_DATING: string;
        OBJECT_ATTRIBUTE_KEY_DESCRIPTION: string;
        OBJECT_ATTRIBUTE_KEY_GEOGRAPHICAL_REFERENCES: string;
        OBJECT_ATTRIBUTE_KEY_DIMENSIONS_AND_WEIGHT: string;
        OBJECT_ATTRIBUTE_KEY_MATERIAL_AND_TECHNIQUE: string;
        OBJECT_ATTRIBUTE_KEY_RELATED_MEDIA: string;
        OBJECT_ATTRIBUTE_KEY_LABELS: string;
        OBJECT_ATTRIBUTE_KEY_PROVENANCE: string;
        OBJECT_ATTRIBUTE_KEY_EXHIBITION: string;
        OBJECT_ATTRIBUTE_KEY_LITERATURE: string;
        OBJECT_ATTRIBUTE_KEY_NORM_DATA: string;
    };
}

export enum AppStage {
    LOCAL = 'local',
    DEV = 'dev',
    STAGE = 'stage',
    PRODUCTION = 'production',
}

const DEV: Config = {
    IMAGE_PROVIDER_DOMAIN: 'https://smb-guide.xailabs.dev',
    IMAGE_PROVIDER_PATH: '/images/',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
    MEDIA_PLAYER_INTERVAL: 8000,
    DATA_CONFIG: DATA_CONFIG,
    INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
    TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
    GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
    RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
};
const STAGE: Config = {
    ...DEV,
    IMAGE_PROVIDER_DOMAIN: 'https://smb-guide.xailabs.com',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql',
    INTRO_DOMAIN: 'https://smb-landingpage.xailabs.com',
    TOPICS_DOMAIN: 'https://smb-topics.xailabs.com',
    GUIDE_DOMAIN: 'https://smb-guide.xailabs.com',
    RESEARCH_DOMAIN: 'https://smb-research.xailabs.com',
};
const PRODUCTION: Config = {
    ...STAGE,    
    IMAGE_PROVIDER_DOMAIN: 'https://touren.smb.museum',
    GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
    INTRO_DOMAIN: 'https://sammlung.smb.museum',
    TOPICS_DOMAIN: 'https://themen.smb.museum',
    GUIDE_DOMAIN: 'https://touren.smb.museum',
    RESEARCH_DOMAIN: 'https://recherche.smb.museum',
};
const LOCAL: Config = {
    ...DEV,
    GUIDE_DOMAIN: 'http://localhost:3000',
    // GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql'
   // GRAPHQL_ENDPOINT: 'http://localhost:8081/v1/graphql',
};

export default {
    LOCAL,
    DEV,
    STAGE,
    PRODUCTION,
};
