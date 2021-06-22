import { ApolloLink } from 'apollo-link';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createApolloLinkWithAuthentication = (graphqlEndpoint: string): ApolloLink => {
    const httpLink = createHttpLink({
        uri: graphqlEndpoint,
    });

    const authLink = setContext((_request, { headers: previousHeaders }) => {
        const nextHeaders = { ...previousHeaders };

        try {
            nextHeaders.authorization = JSON.parse(localStorage.getItem('auth') ?? '');
        } catch (error) {}

        return {
            headers: nextHeaders,
        };
    });

    return ApolloLink.from([authLink as any, httpLink as any]) as ApolloLink;
};
