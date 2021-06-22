import CollectionCard from './CollectionCard';
import CollectionContext from './CollectionContext';
import CollectionModule from './CollectionModule';
import CollectionsContext from './CollectionsContext';
import CollectionsDiscoverModule from './CollectionsDiscoverModule';
// import CollectionsModule from './CollectionsModule';
import { CollectionObject as DtoCollectionObject } from './Dto/CollectionObject';
import { ImageUrlBuilder as UtilsImageUrlBuilder } from './Utils/ImageUrlBuilder';

export {
    CollectionCard,
    CollectionContext,
    CollectionModule,
    CollectionsContext,
    CollectionsDiscoverModule,
    // CollectionsModule,
};

// Workaround for typescripts isolated modules issue: https://github.com/microsoft/TypeScript/issues/28481
export type CollectionObject = DtoCollectionObject;
export type ImageUrlBuilder = UtilsImageUrlBuilder;
