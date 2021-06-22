import { createContext } from 'react';
import { CollectionContextData } from './CollectionContext';

export interface CollectionsContextData {
    collections: CollectionContextData[];
    onCollectionClick?: (index: number, title: string) => void;
}

const CollectionsContext = createContext<CollectionsContextData>({
    collections: [],
});

export default CollectionsContext;
