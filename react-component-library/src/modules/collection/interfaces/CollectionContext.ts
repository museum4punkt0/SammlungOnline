import { createContext } from 'react';
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
  onCollectionObjectSelected?: (index: number) => void;
}

const CollectionContext = createContext<ICollectionContextData>({
  id: 0,
  previewImageSlider: '',
  previewImageCard: '',
  previewImageMediaPlayer: '',
  title: '',
  subtitle: '',
  collectionObjects: [],
  interval: 8000,
});

export default CollectionContext;
