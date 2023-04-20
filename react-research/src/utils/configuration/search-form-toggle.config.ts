import { IConfigurableForEnvironment } from '../../types/index';
import { AppStage } from '../../enums/index';

export interface ISearchToggle {
  label: string;
  name: string;
  value: boolean;
}

export const searchFormTogglesConfig: Array<ISearchToggle &
  IConfigurableForEnvironment> = [
  {
    label: 'searchForm.filters.toggles.attachment',
    name: 'attachments',
    value: true,
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    label: 'searchForm.filters.toggles.highlight',
    name: 'highlight',
    value: true,

    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    label: 'searchForm.filters.toggles.exhibited',
    name: 'exhibit',
    value: true,
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
];
