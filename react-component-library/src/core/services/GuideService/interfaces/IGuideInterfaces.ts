import { IImageUrlBuilder } from '../../../util/ImageUrlBuilder';

export interface ICollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  imageUrlBuilder: IImageUrlBuilder;
}

export interface ICollectionContextData {
  id: number;
  previewImageSlider: string;
  previewImageCard: string;
  previewImageMediaPlayer: string;
  title: string;
  subtitle: string;
  collectionObjects: ICollectionObject[];
  interval?: number;
  selectedObjectIndex?: number;
  onCollectionObjectSelected?: (index: number) => void;
}
