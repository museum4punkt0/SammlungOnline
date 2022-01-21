import { IConfiguration } from '../interfaces/config/config.interface';

export const LOCAL: IConfiguration = {
    DOMAIN: 'http://localhost:3000',
    IMAGE_PROVIDER_DOMAIN: 'http://localhost:8090',
    GRAPHQL_ENDPOINT: 'http://localhost:8081/v1/graphql',
};
export const DEV: IConfiguration = {
    DOMAIN: 'https://smb-admin.xailabs.dev',
    IMAGE_PROVIDER_DOMAIN: 'https://smb-admin.xailabs.dev',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.dev/v1/graphql',
};
export const STAGE: IConfiguration = {
    DOMAIN: 'https://smb-admin.xailabs.com',
    IMAGE_PROVIDER_DOMAIN: 'https://smb-admin.xailabs.com',
    GRAPHQL_ENDPOINT: 'https://smb-api.xailabs.com/v1/graphql',
};
export const PRODUCTION: IConfiguration = {
    DOMAIN: 'https://admin.smb.museum',
    IMAGE_PROVIDER_DOMAIN: 'https://admin.smb.museum',
    GRAPHQL_ENDPOINT: 'https://api.smb.museum/v1/graphql',
};
