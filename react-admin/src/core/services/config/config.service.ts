import { PRODUCTION, STAGE, DEV } from '../../config/configuration';

import { EAppStage } from '../../enums/config/app-stage.enum';

import { IConfiguration } from '../../interfaces/config/config.interface';

export default class ConfigService {
    public async getApplicationStage(): Promise<EAppStage> {
        const { href } = new URL(process.env.PUBLIC_URL, window.location.href);
        const { headers } = await fetch(href, { method: 'HEAD' });

        const applicationStage = process.env.REACT_APP_STAGE ?? headers.get('X-React-App-Stage');

        return (applicationStage?.toLowerCase() as EAppStage) ?? EAppStage.DEV;
    }

    public getConfiguration(applicationStage: EAppStage): IConfiguration {
        switch (applicationStage) {
            case EAppStage.PRODUCTION:
                return PRODUCTION;
            case EAppStage.STAGE:
                return STAGE;
            default:
                return DEV;
        }
    }
}
