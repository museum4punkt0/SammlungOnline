import useConfigLoader from '../../Util/ConfigLoader';
import { useEffect, useState } from 'react';
import { HttpLink } from 'apollo-link-http';
import { Config } from '../../config';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';

const createGraphQlClient = (config: Config): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        link: new HttpLink({
            uri: config.GRAPHQL_ENDPOINT,
        }),
        cache: new InMemoryCache(),
    });
};

function useGraphQlClient(): { loading: boolean; graphQlClient: ApolloClient<NormalizedCacheObject> } {
    const { loadingConfig, config } = useConfigLoader();
    const [graphQlClient, setGraphQlClient] = useState<ApolloClient<NormalizedCacheObject>>(
        createGraphQlClient(config),
    );

    useEffect(() => {
        setGraphQlClient(createGraphQlClient(config));
    }, [loadingConfig, config, config.GRAPHQL_ENDPOINT]);

    return {
        loading: loadingConfig,
        graphQlClient: graphQlClient,
    };
}

export default useGraphQlClient;
