import { createContext } from 'react';
import { ICollectionContextData } from './CollectionContext';

export interface ICollectionsContextData {
  collections: ICollectionContextData[];
  onCollectionClick?: (index: number, title: string) => void;
}

const CollectionsContext = createContext<ICollectionsContextData>({
  collections: [],
});

export default CollectionsContext;
