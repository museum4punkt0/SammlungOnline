import { useEffect, useState } from 'react';
import { HttpLink } from 'apollo-link-http';
import { IConfiguration, useConfigLoader } from 'src';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';

const createGraphQlClient = (
  config: IConfiguration,
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: new HttpLink({
      uri: config.GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
};

function useGraphQlClient(): {
  loading: boolean;
  graphQlClient: ApolloClient<NormalizedCacheObject>|undefined;
} {
  const { loadingConfig, config } = useConfigLoader();

  const [graphQlClient, setGraphQlClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    if (config) {
      setGraphQlClient(createGraphQlClient(config));
    }
  }, [config]);

  return {
    loading: loadingConfig,
    graphQlClient: graphQlClient,
  };
}

export default useGraphQlClient;
