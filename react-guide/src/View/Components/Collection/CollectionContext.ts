import { createContext } from 'react';
import { CollectionObject } from './Dto/CollectionObject';

export interface CollectionContextData {
    id: number;
    previewImageSlider: string;
    previewImageCard: string;
    previewImageMediaPlayer: string;
    title: string;
    subtitle: string;
    collectionObjects: CollectionObject[];
    interval?: number;
    selectedObjectIndex?: number;
    onCollectionObjectSelected?: (index: number) => void;
}

const CollectionContext = createContext<CollectionContextData>({
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
