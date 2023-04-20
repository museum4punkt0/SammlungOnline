import { IImageUrlBuilder } from '../../ImageUrlBuilderService/image-url-builder-service.interaface';

export interface ICollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  text?: string;
  slug?: string;
  imageUrlBuilder: IImageUrlBuilder;
}

export interface ICollectionContextData {
  id: number;
  previewImageSlider: string;
  previewImageCard: string;
  previewImageMediaPlayer: string;
  title: string;
  subtitle: string;
  abstract: string;
  collectionObjects: ICollectionObject[];
  interval?: number;
  selectedObjectIndex?: number;
  onCollectionObjectSelected?: (index: number) => void;
}
