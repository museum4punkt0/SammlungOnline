import { AppStage } from '../../enums/index';
import { IExhibitInfoItemConfig } from '../../types/index';

const NO_DATA_AVAILABLE = '';

export const infoItemsConfiguration: IExhibitInfoItemConfig[] = [
  {
    // title: 'search.exhibit.attributes.collection',
    title: '',
    type: 'collection',
    predicate: exhibit => {
      if (!exhibit.compilation) {
        return {
          content: exhibit.collection ?? NO_DATA_AVAILABLE,
          content2: NO_DATA_AVAILABLE,
        };
      }
      if (!exhibit.collection) {
        return {
          content: exhibit.compilation ?? NO_DATA_AVAILABLE,
          content2: NO_DATA_AVAILABLE,
        };
      }
      return { content: exhibit.collection, content2: exhibit.compilation };
    },
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    title: 'search.exhibit.attributes.identNumber',
    type: 'identNumber',
    predicate: exhibit => {
      return {
        content: exhibit.identNumber ?? NO_DATA_AVAILABLE,
        content2: NO_DATA_AVAILABLE,
      };
    },
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    title: 'search.exhibit.attributes.location',
    type: 'location',
    predicate: exhibit => {
      return exhibit?.exhibited && exhibit?.exhibitionSpace
        ? {
            content: exhibit.exhibitionSpace,
            content2: NO_DATA_AVAILABLE,
          }
        : { content: NO_DATA_AVAILABLE, content2: NO_DATA_AVAILABLE };
    },
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
];
