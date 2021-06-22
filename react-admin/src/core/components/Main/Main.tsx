import React, { useState } from 'react';
import { Admin, Loading } from 'react-admin';

import TopicsResources from '../../../features/Topics/TopicsResources';
import IntroResources from '../../../features/Intro/IntroResources';
import GuiderResources from '../../../features/Guide/GuideResources';
import SystemResources from '../../../features/System/SystemResources';

import { EPermissions } from '../../enums/auth/permissions.enum';

import useAdminDataProvider from '../../hooks/use-admin-data-provider.hook';
import { useDependency } from '../../contexts/dependencies/hooks/use-dependency.hook';

const Main: React.FC = () => {
    const { graphQlClient, authProvider, i18nProvider } = useDependency();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const adminDataProvider = useAdminDataProvider(graphQlClient, isAuthenticated);

    if (!adminDataProvider) {
        return <Loading />;
    }

    return (
        <Admin
            title="Topics Administration"
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            dataProvider={adminDataProvider}
        >
            {(permissions: string) => {
                if (permissions) {
                    setIsAuthenticated(true);
                }

                const resources = [];

                permissions.includes(EPermissions.Topics) && resources.push(TopicsResources);
                permissions.includes(EPermissions.Intro) && resources.push(IntroResources);
                permissions.includes(EPermissions.Guide) && resources.push(GuiderResources);
                permissions.includes(EPermissions.System) && resources.push(SystemResources);

                return resources;
            }}
        </Admin>
    );
};

export default Main;
