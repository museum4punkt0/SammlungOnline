import { ApolloError } from 'apollo-boost';

import { IConfiguration } from '../../types/config.interface';
import { CollectionObject } from '@smb/smb-react-components-library';
import { TextContainerTextElement } from '@smb/smb-react-components-library';
import LanguageService from '../LanguageService';
import ImageUrlBuilderService from '../image-url-builder/image-url-builder.service';

export interface TopicsCollectionContextData {
  id?: number;
  previewImageCard: any;
  title: string;
  subtitle: string;
  collectionObjects: CollectionObject[];
  interval?: number;
  selectedObjectIndex?: number;
}
class TopicsService {
  constructor(
    private readonly _config: IConfiguration,
    private readonly _imageUrlBuilder: ImageUrlBuilderService,
  ) {}

  public getTopics(): {
    loading: boolean;
    error: ApolloError | undefined;
    contextData: Array<TopicsCollectionContextData> | null;
  } {
    // eslint-disable-next-line no-console
    console.log('getTopics');
    return {
      loading: true,
      error: undefined,
      contextData: [],
    };
  }

  public findTopicsInfoByExhibitId(exhibitId: number) {
    // eslint-disable-next-line no-console
    console.log('findTopicsInfoByExhibitId', exhibitId);
    return { loading: true, error: undefined, data: [] };
  }
}
export default TopicsService;
