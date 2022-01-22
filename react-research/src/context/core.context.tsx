import { createContext, useContext } from 'react';
import { IConfiguration, loadConfig, AppStage } from '@smb/smb-react-components-library';

export interface ICoreContext {
  configuration: IConfiguration;
}

export const CoreContext = createContext<ICoreContext>({
  configuration: loadConfig(AppStage.LOCAL),
});

export const useCoreContext = (): ICoreContext => {
  return useContext(CoreContext);
};
