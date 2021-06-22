import { IImageUrlBuilder } from '../../../core/util/ImageUrlBuilder';

export interface ICollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  imageUrlBuilder: IImageUrlBuilder;
}
