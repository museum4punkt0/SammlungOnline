import { useState, useEffect } from 'react';
import Configs from '../config';
import { Config, AppStage } from '../config';

export class ConfigLoader {
    static Running = false;
    static FetchedReactAppStage = false;
    static CurrentConfig: Config = Configs.LOCAL;
}

function useConfigLoader(): { loadingConfig: boolean; appStage: string; config: Config } {
    // used states and useEffect to keep care of possible side-effects
    const [config, setConfig] = useState<Config>(ConfigLoader.CurrentConfig);
    const [fetchedReactAppStage, setFetchedReactAppStage] = useState<boolean>(ConfigLoader.FetchedReactAppStage);
    const [appStage, setAppStage] = useState<string>(AppStage.LOCAL);

    useEffect(() => {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

        !fetchedReactAppStage &&
            fetch(publicUrl.href, { method: 'HEAD' }).then((response) => {
                const REACT_APP_STAGE = process.env.REACT_APP_STAGE
                    ? process.env.REACT_APP_STAGE
                    : response.headers.get('X-React-App-Stage');

                switch (REACT_APP_STAGE?.toLowerCase()) {
                    case AppStage.PRODUCTION:
                        setConfig(Configs.PRODUCTION);
                        ConfigLoader.CurrentConfig = Configs.PRODUCTION;
                        break;
                    case AppStage.STAGE:
                        setConfig(Configs.STAGE);
                        ConfigLoader.CurrentConfig = Configs.STAGE;
                        break;
                    case AppStage.DEV:
                        setConfig(Configs.DEV);
                        ConfigLoader.CurrentConfig = Configs.DEV;
                        break;
                    case AppStage.LOCAL:
                    default:
                        setConfig(Configs.LOCAL);
                        ConfigLoader.CurrentConfig = Configs.LOCAL;
                        break;
                }

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
