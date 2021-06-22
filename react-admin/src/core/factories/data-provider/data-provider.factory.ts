import { ApolloClient } from 'apollo-boost';
import buildDataProvider from 'ra-data-hasura';

export const dataProviderFactory = <T>(graphQlClient: ApolloClient<T>) => {
    return buildDataProvider({ client: graphQlClient });
};
