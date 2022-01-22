import CollectionCard from './CollectionCard';
import CollectionModule from './CollectionModule';

import CollectionsDiscoverModule from './CollectionsDiscoverModule';
// import CollectionsModule from './CollectionsModule';
import { CollectionObject as DtoCollectionObject } from './Dto/CollectionObject';
import { ImageUrlBuilder as UtilsImageUrlBuilder } from './Utils/ImageUrlBuilder';

export {
  CollectionCard,
  CollectionModule,
  CollectionsDiscoverModule,
  // CollectionsModule,
};

// Workaround for typescripts isolated modules issue: https://github.com/microsoft/TypeScript/issues/28481
export type CollectionObject = DtoCollectionObject;
export type ImageUrlBuilder = UtilsImageUrlBuilder;
