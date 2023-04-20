import { useState, useEffect } from 'react';
import { AppStage, IConfiguration, loadConfig } from 'src';

export class ConfigLoader {
  static Running = false;
  static FetchedReactAppStage = false;
  static CurrentConfig: IConfiguration;
}

function useConfigLoader(): {
  loadingConfig: boolean;
  appStage: string;
  config: IConfiguration;
} {
  // used states and useEffect to keep care of possible side-effects
  const [config, setConfig] = useState<IConfiguration>(
    ConfigLoader.CurrentConfig,
  );
  const [fetchedReactAppStage, setFetchedReactAppStage] = useState<boolean>(
    ConfigLoader.FetchedReactAppStage,
  );
  const [appStage, setAppStage] = useState<string>(AppStage.LOCAL);

  useEffect(() => {
    const publicUrl = new URL(
      process.env.PUBLIC_URL || '',
      window.location.href,
    );

    !fetchedReactAppStage &&
      fetch(publicUrl.href, { method: 'HEAD' }).then((response) => {
        const REACT_APP_STAGE =
          process.env.REACT_APP_STAGE ??
          response.headers.get('X-React-App-Stage');

        switch (REACT_APP_STAGE?.toLowerCase()) {
          case AppStage.PRODUCTION:
            ConfigLoader.CurrentConfig = loadConfig(AppStage.PRODUCTION);
            break;
          case AppStage.STAGE:
            ConfigLoader.CurrentConfig = loadConfig(AppStage.STAGE);
            break;
          case AppStage.DEV:
            ConfigLoader.CurrentConfig = loadConfig(AppStage.DEV);
            break;
          case AppStage.LOCAL:
            ConfigLoader.CurrentConfig = loadConfig(AppStage.LOCAL);
            break;
        }
        setConfig(ConfigLoader.CurrentConfig);
        if (REACT_APP_STAGE !== null) {
          setAppStage(REACT_APP_STAGE.toLowerCase());
        }
        ConfigLoader.FetchedReactAppStage = true;
        ConfigLoader.Running = false;
        setFetchedReactAppStage(true);
      });
  }, [config, fetchedReactAppStage, appStage]);

  return { loadingConfig: !fetchedReactAppStage, appStage, config };
}

export default useConfigLoader;
