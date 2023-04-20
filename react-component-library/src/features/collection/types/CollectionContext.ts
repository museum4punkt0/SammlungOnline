import { createContext } from 'react';

import { IImageUrlBuilder } from '../../../services/ImageUrlBuilderService/image-url-builder-service.interaface';
import { ICollectionObject } from './ICollectionObject';

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
  platform?: string;
  onCollectionObjectSelected?: (index: number) => void;
}

export interface IStoriesData {
  hero: any[];
  cards: any[];
  filters: {
    label: string;
    iconPosition: string;
    options: {
      title: string;
      value: string;
      id: string;
    }[];
  };
}

export interface CollectionObject {
  objectId: string;
  imageId: string;
  title: string;
  text?: string;
  slug?: string;
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
  title?: string;
  subtitle?: string | undefined | null;
  count?: number;
  section?: string;
  image?: string;
  actionText?: string;
  tintColor?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}
