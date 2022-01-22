import { IConfiguration, loadConfig } from '@smb/smb-react-components-library';

export class ConfigurationService {
  private _config: IConfiguration | null = null;

  public async loadConfig(): Promise<IConfiguration> {
    if (!this._config) {
      const { href } = new URL(process.env.PUBLIC_URL, window.location.href);
      const { headers } = await fetch(href, { method: 'HEAD' });

      const appStageFromEnvironment = process.env.REACT_APP_STAGE;
      const appStageFromHeaders = headers.get('X-React-App-Stage');
      const appStage = appStageFromEnvironment ?? appStageFromHeaders;

      this._config = loadConfig(appStage);
    }
    return this._config;
  }
}

export const configurationService = new ConfigurationService();
