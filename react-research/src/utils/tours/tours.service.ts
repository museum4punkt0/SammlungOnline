import { ApolloError } from 'apollo-boost';

import {
  ICollectionContextData,
  IConfiguration,
  ImageUrlBuilderService,
} from '@smb/smb-react-components-library';

class ToursService {
  constructor(
    private readonly _config: IConfiguration,
    private readonly _imageUrlBuilder: ImageUrlBuilderService,
  ) {}

  getGuides(): {
    loadingGuides: boolean;
    errorGuides: ApolloError | undefined;
    rawDataGuides: null;
    contextDataGuides: Array<ICollectionContextData>;
  } {
    // eslint-disable-next-line no-console
    console.log('getGuides');
    return {
      loadingGuides: true,
      errorGuides: undefined,
      rawDataGuides: null,
      contextDataGuides: [],
    };
  }

  public findToursInfoByExhibitId(exhibitId: number) {
    // eslint-disable-next-line no-console
    console.log('findToursInfoByExhibitId', exhibitId);
    return { loading: true, error: undefined, data: [] };
  }
}

export default ToursService;
