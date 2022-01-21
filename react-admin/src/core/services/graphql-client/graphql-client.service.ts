import { ApolloLink } from 'apollo-link';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IUserStorage } from '../user/user-storage.interface';

export const createApolloLinkWithAuthentication = (graphqlEndpoint: string, userStorage: IUserStorage): ApolloLink => {
    const httpLink = createHttpLink({
        uri: graphqlEndpoint,
    });

    const authLink = setContext((_request, { headers: previousHeaders }) => {
        const nextHeaders = { ...previousHeaders };

        try {
            const user = userStorage.get();

            if (user) {
                nextHeaders.authorization = `${user.token}`;
            }
        } catch (error) {}

        return {
            headers: nextHeaders,
        };
    });

    return ApolloLink.from([authLink as any, httpLink as any]) as ApolloLink;
};
