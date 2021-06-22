import { createContext } from 'react';

import { DEV as defaultConfiguration } from '../../config/configuration';

import { IConfiguration } from '../../interfaces/config/config.interface';

export interface IConfigurationContext {
    configuration: IConfiguration;
}

export const createConfigurationContextValue = (configuration: IConfiguration) => {
    return {
        configuration,
    };
};

const defaultConfigurationContext = createConfigurationContextValue(defaultConfiguration);

export const ConfigurationContext = createContext<IConfigurationContext>(defaultConfigurationContext);
