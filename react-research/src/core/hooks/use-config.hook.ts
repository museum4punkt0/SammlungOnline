import { useState, useEffect } from 'react';

import { IConfiguration } from '../interfaces/config.interface';

import { configurationService } from '../services/configService';

export function useConfig(): IConfiguration | null {
    const [config, setConfig] = useState<IConfiguration | null>(null);

    useEffect(() => {
        (async () => {
            const configuration = await configurationService.loadConfig();

            setConfig(configuration);
        })();
    }, []);

    return config;
}
