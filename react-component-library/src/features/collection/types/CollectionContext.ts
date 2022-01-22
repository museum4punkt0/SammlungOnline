import { createContext } from 'react';

import { IImageUrlBuilder } from '../../../services/ImageUrlBuilderService/image-url-builder-service.interaface';
import { ICollectionObject } from '../../../services/GuideService';

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

export interface CollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  displayTitle: string;
  imageUrlBuilder: IImageUrlBuilder;
}

export const CollectionContext = createContext<ICollectionContextData>({
  id: 0,
  previewImageSlider: '',
  previewImageCard: '',
  previewImageMediaPlayer: '',
  title: '',
  subtitle: '',
  collectionObjects: [],
  interval: 8000,
});

export interface ICollectionCardProps {
  title: string;
  subtitle: string;
  count: number;
  image: string;
  actionText: string;
  tintColor: string;
  onClick?: () => void;
}
