import { IImageUrlBuilder } from '../../../services/ImageUrlBuilderService/image-url-builder-service.interaface';


export interface ICollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  imageUrlBuilder: IImageUrlBuilder;
}

export interface CollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  displayTitle: string;
  imageUrlBuilder: ICollectionObject;
}
