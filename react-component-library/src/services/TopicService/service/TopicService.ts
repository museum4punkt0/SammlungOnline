/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-boost';
// import { ConfigLoader, IConfiguration } from 'src';

export interface CollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  displayTitle: string;
  imageUrlBuilder: any;
}

export interface TopicCollectionContextData {
  id: number;
  previewImageCard: string;
  title: string;
  subtitle: string;
  collectionObjects: CollectionObject[];
  interval?: number;
  selectedObjectIndex?: number;
  tintColor?: string;
  elementCount?: number;
  previewImageSlider?: string;
  previewImageMediaPlayer?: string;
}

class TopicService {
  //  private readonly config: IConfiguration;

  // constructor() {
  //   this.config = ConfigLoader.CurrentConfig;
  // }

  getTopics(): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: null;
    contextData: TopicCollectionContextData[];
  } {
    // eslint-disable-next-line no-console
    console.log('getTopics');
    return {
      loading: true,
      error: undefined,
      rawData: null,
      contextData: [],
    };
  }

  public findTopicsInfoByExhibitId(exhibitId: number) {
    // eslint-disable-next-line no-console
    console.log('findTopicsInfoByExhibitId', exhibitId);
    return { loading: true, error: undefined, data: [] };
  }
}
export default TopicService;
