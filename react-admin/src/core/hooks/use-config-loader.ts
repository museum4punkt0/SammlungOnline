import { useState, useEffect, useMemo } from 'react';

import { IConfiguration } from '../interfaces/config/config.interface';

import ConfigService from '../services/config/config.service';

interface IUseConfigLoaderResult {
    config: IConfiguration | null;
    loading: boolean;
}

function useConfig(): IUseConfigLoaderResult {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [configuration, setConfiguration] = useState<IConfiguration | null>(null);

    const configService = useMemo(() => new ConfigService(), []);

    useEffect(() => {
        (async () => {
            const applicationStage = await configService.getApplicationStage();
            const appConfiguration = configService.getConfiguration(applicationStage);

            setConfiguration(appConfiguration);
            setLoading(false);
        })();
    }, [configService]);

    return { loading: isLoading, config: configuration };
}

export default useConfig;
