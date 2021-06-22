import { createContext } from 'react';
import { I18nProvider } from 'ra-core';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { DEV as defaultConfiguration } from '../../config/configuration';

import { IConfiguration } from '../../interfaces/config/config.interface';
import { IAuthProvider } from '../../interfaces/auth/auth-provider.interface';

import { authProviderFactory } from '../../factories/auth/auth.factory';
import { graphQlClientFactory } from '../../factories/graphql-client/graphql-client.factory';
import i18nProviderFactory from '../../factories/i18n-provider/i18n-provider.factory';

import { ImageUrlBuilderService } from '../../services/image-url-builder/image-url-builder.service';

export interface IDependencyContext {
    imageUrlBuilderService: ImageUrlBuilderService;
    authProvider: IAuthProvider;
    i18nProvider: I18nProvider;
    graphQlClient: ApolloClient<NormalizedCacheObject>;
}

export const createDependencies = (configuration: IConfiguration): IDependencyContext => {
    const authProvider = authProviderFactory(configuration.DOMAIN);
    const imageUrlBuilderService = new ImageUrlBuilderService(configuration.IMAGE_PROVIDER_DOMAIN);
    const graphQlClient = graphQlClientFactory(configuration.GRAPHQL_ENDPOINT);
    const i18nProvider = i18nProviderFactory();

    return {
        imageUrlBuilderService,
        authProvider,
        i18nProvider,
        graphQlClient,
    };
};

const defaultDependencyContext = createDependencies(defaultConfiguration);

export const DependencyContext = createContext<IDependencyContext>(defaultDependencyContext);
