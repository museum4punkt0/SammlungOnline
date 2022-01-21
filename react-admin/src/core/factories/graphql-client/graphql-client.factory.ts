import { ApolloClient, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
import { DefaultOptions } from 'apollo-client/ApolloClient';

import { createApolloLinkWithAuthentication } from '../../services/graphql-client/graphql-client.service';
import { UserStorage } from '../../services/user/user-storage.service';

export const graphQlClientFactory = (
    graphqlEndpoint: string,
    userStorage: UserStorage,
): ApolloClient<NormalizedCacheObject> => {
    const link = createApolloLinkWithAuthentication(graphqlEndpoint, userStorage);

    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    };

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        defaultOptions,
    });
};
