/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-boost';

import { SmbObjects } from '../../../generated/graphql';
import { ITourData } from '../interfaces/IGuideData';
import { ICollectionContextData } from '../interfaces/IGuideInterfaces';
import { IImageUrlBuilder } from '../../ImageUrlBuilderService/image-url-builder-service.interaface';

class GuideService {
  // private ImageUrlBuilder: IImageUrlBuilder;
  // private readonly config: Config;

  constructor(_imageUrlBuilder: IImageUrlBuilder) {
    // this.ImageUrlBuilder = imageUrlBuilder;
    // this.config = ConfigLoader.CurrentConfig;
  }

  getGuide(
    id: number,
    _imageCardSize: number,
    _imageSliderSize: number,
  ): {
    tourLoading: boolean;
    tourError: ApolloError | undefined;
    tourData: ITourData | null;
    objectLoading: boolean;
    objectError: ApolloError | undefined;
    objectsData: { data: SmbObjects | null }[];
  } {
    // eslint-disable-next-line no-console
    console.log('getGuide', id);
    return {
      tourLoading: true,
      tourError: undefined,
      tourData: null,
      objectLoading: false,
      objectError: undefined,
      objectsData: [],
    };
  }

  getGuides(
    _imageCardSize: number,
    _ImageSliderSize: number,
  ): {
    loading: boolean;
    error: ApolloError | undefined;
    rawData: null;
    contextData: Array<ICollectionContextData>;
  } {
    // eslint-disable-next-line no-console
    console.log('getGuides');
    return { loading: true, error: undefined, rawData: null, contextData: [] };
  }
}

export default GuideService;
