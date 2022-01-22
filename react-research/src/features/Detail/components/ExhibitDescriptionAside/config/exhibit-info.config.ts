import { AppStage } from '../../../../../config/enums/app-stage.enum';
import { IExhibitInfoItemConfig } from '../interfaces/exhibit-info.config';

const defaultValue = 'search.exhibit.attributes.noData';

const infoItemsConfiguration: IExhibitInfoItemConfig[] = [
  {
    title: 'search.exhibit.attributes.identNumber',
    predicate: (exhibit) => exhibit.identNumber ?? defaultValue,
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    title: 'search.exhibit.attributes.collection',
    predicate: (exhibit) => {
      if (!exhibit.compilation) {
        return exhibit.collection ?? defaultValue;
      }
      if (!exhibit.collection) {
        return exhibit.compilation;
      }
      return `${exhibit.collection} | ${exhibit.compilation}`;
    },
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    title: 'search.exhibit.attributes.location',
    predicate: (exhibit): string => {
      switch (exhibit?.exhibited) {
        case true:
          return exhibit?.exhibitionSpace ?? defaultValue;
        case false:
          return 'search.exhibit.notExhibited';
        default:
          return defaultValue;
      }
    },
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE],
  },
];

export default infoItemsConfiguration;
