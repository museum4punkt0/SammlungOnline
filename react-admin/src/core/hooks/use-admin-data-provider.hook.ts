import { useEffect, useState } from 'react';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { dataProviderFactory } from '../factories/data-provider/data-provider.factory';

const useAdminDataProvider = (graphQlClient: ApolloClient<NormalizedCacheObject> | null, isAuthenticated = false) => {
    const [adminDataProvider, setAdminDataProvider] = useState(null);

    useEffect(() => {
        (async () => {
            if (graphQlClient) {
                const provider = await dataProviderFactory<NormalizedCacheObject>(graphQlClient);

                setAdminDataProvider(() => provider);
            }
        })();
    }, [graphQlClient, isAuthenticated]);

    return adminDataProvider;
};

export default useAdminDataProvider;
