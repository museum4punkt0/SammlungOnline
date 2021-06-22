import { createContext, useContext } from 'react';
import { loadConfig } from '../config/configuration';
import { AppStage } from '../enums/app-stage.enum';
import { IConfiguration } from '../interfaces/config.interface';

export interface ICoreContext {
    configuration: IConfiguration;
}

export const CoreContext = createContext<ICoreContext>({
    configuration: loadConfig(AppStage.LOCAL),
});

export const useCoreContext = (): ICoreContext => {
    return useContext(CoreContext);
};
