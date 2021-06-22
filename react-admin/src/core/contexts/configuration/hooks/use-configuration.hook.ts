import { useContext } from 'react';

import { IConfiguration } from '../../../interfaces/config/config.interface';

import { ConfigurationContext } from '../configuration.context';

export const useConfiguration = (): IConfiguration => {
    const { configuration } = useContext(ConfigurationContext);

    return configuration;
};
