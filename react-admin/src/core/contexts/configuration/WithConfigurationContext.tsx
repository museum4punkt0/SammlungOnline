import React from 'react';

import { Loading } from 'react-admin';

import { ConfigurationContext, createConfigurationContextValue } from './configuration.context';

import useConfigLoader from '../../hooks/use-config-loader';

interface IWithConfigurationProps {
    children?: React.ReactNode;
}

const WithConfigurationContext: React.FC<IWithConfigurationProps> = ({ children }) => {
    const { config } = useConfigLoader();

    if (!config) {
        return <Loading />;
    }

    const configurationContextValue = createConfigurationContextValue(config);

    return <ConfigurationContext.Provider value={configurationContextValue}>{children}</ConfigurationContext.Provider>;
};

export default WithConfigurationContext;
