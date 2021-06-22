
import { DATA_CONFIG } from './dataConfig';


export interface Config {
    IMAGE_PROVIDER_DOMAIN: string;
    IMAGE_PROVIDER_PATH: string;
    IMAGE_PROVIDER_ENDPOINT: string;
    GRAPHQL_ENDPOINT: string;
    MEDIA_PLAYER_INTERVAL: number;
    INTRO_DOMAIN: string;
    TOPICS_DOMAIN: string;
    GUIDE_DOMAIN: string;
    RESEARCH_DOMAIN: string;
    ELASTIC_API_URL: string;
    MATOMO_URL: string;
    DATA_CONFIG: {
        TOPIC_SLIDER_IMAGE_SIZE: number;
        COLLECTION_CARD_IMAGE_SIZE: number;
        MEDIA_PLAYER_PREVIEW_IMAGE_SIZE: number;
        CAROUSEL_IMAGE_SIZE: number;
        DETAILPAGE_IMAGE_SIZE: number;
        PREVIEW_IMAGE_SIZE: number;
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
        OBJECT_ATTRIBUTE_KEY_LOCATION: string;
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
    IMAGE_PROVIDER_DOMAIN: 'https://smb-topics.xailabs.dev',
    IMAGE_PROVIDER_ENDPOINT: 'https://smb-topics.xailabs.dev/images',
    IMAGE_PROVIDER_PATH: '/images/',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
    ELASTIC_API_URL: 'https://smb-search.xailabs.dev/search',
    MEDIA_PLAYER_INTERVAL: 8000,
    DATA_CONFIG: DATA_CONFIG,
    INTRO_DOMAIN: 'https://smb-landingpage.xailabs.dev',
    TOPICS_DOMAIN: 'https://smb-topics.xailabs.dev',
    RESEARCH_DOMAIN: 'https://smb-research.xailabs.dev',
    GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
    MATOMO_URL:
        'http://localhost/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=&fontColor=&fontSize=&fontFamily=ClanOTNarrow%2C%20Arial',
};
const STAGE: Config = {
    ...DEV,
    IMAGE_PROVIDER_DOMAIN: 'https://smb-topics.xailabs.com',
    IMAGE_PROVIDER_ENDPOINT: 'https://smb-topics.xailabs.com/images',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql',
    ELASTIC_API_URL: 'https://smb-api.xailabs.com/search',
    INTRO_DOMAIN: 'https://smb-landingpage.xailabs.com',
    TOPICS_DOMAIN: 'https://smb-topics.xailabs.com',
    RESEARCH_DOMAIN: 'https://smb-research.xailabs.com',
    GUIDE_DOMAIN: 'https://smb-guide.xailabs.com',
    MATOMO_URL:
        'http://localhost/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=&fontColor=&fontSize=&fontFamily=ClanOTNarrow%2C%20Arial',
};
const PRODUCTION: Config = {
    ...STAGE,
    IMAGE_PROVIDER_DOMAIN: 'https://themen.smb.museum',
    IMAGE_PROVIDER_ENDPOINT: 'https://themen.smb.museum/images',
    GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
    ELASTIC_API_URL: 'https://api.smb.museum/search',
    INTRO_DOMAIN: 'https://sammlung.smb.museum',
    TOPICS_DOMAIN: 'https://themen.smb.museum',
    RESEARCH_DOMAIN: 'https://recherche.smb.museum',
    GUIDE_DOMAIN: 'https://touren.smb.museum',
    MATOMO_URL:
        'http://localhost/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=&fontColor=&fontSize=&fontFamily=ClanOTNarrow%2C%20Arial',
};
const LOCAL: Config = {
    ...DEV,
    TOPICS_DOMAIN: 'http://localhost:3000',
    // GRAPHQL_ENDPOINT: 'http://localhost:8081/v1/graphql',
};

export default {
    LOCAL,
    DEV,
    STAGE,
    PRODUCTION,
};
