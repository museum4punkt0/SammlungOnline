import { createContext, useContext } from 'react';
import 'cross-fetch/polyfill';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';

import { IConfiguration, loadConfig } from '@smb/smb-react-components-library';

export interface IApolloDependencyContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const defaultApolloConfiguration = loadConfig(null);

export const createApolloDependencies = (
  configuration: IConfiguration,
): IApolloDependencyContext => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: configuration.GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });

  return {
    apolloClient,
  };
};

const defaultApolloDependencyContext = createApolloDependencies(
  defaultApolloConfiguration,
);

export const ApolloDependencyContext = createContext<IApolloDependencyContext>(
  defaultApolloDependencyContext,
);

ApolloDependencyContext.displayName = 'ApolloDependencyContext';

export const useApolloDependency = (): IApolloDependencyContext =>
  useContext(ApolloDependencyContext);
