export {
  CollectionCard,
  CollectionContext,
  CollectionsContext,
  CollectionsDiscoverModule,
  CollectionsModule,
  CollectionPlayerModule,
  CollectionModule,
} from '@smb/smb-react-components-library';

import { CollectionObject as _CollectionObject } from '@smb/smb-react-components-library';
import { IImageUrlBuilder as _ImageUrlBuilder } from '@smb/smb-react-components-library';
import { ICollectionsContextData as _CollectionsContextData } from '@smb/smb-react-components-library';
import { ICollectionContextData as _CollectionContextData } from '@smb/smb-react-components-library';

// // Workaround for typescripts isolated modules issue: https://github.com/microsoft/TypeScript/issues/28481
export type CollectionObject = _CollectionObject;
export type ImageUrlBuilder = _ImageUrlBuilder;
export type CollectionsContextData = _CollectionsContextData;
export type CollectionContextData = _CollectionContextData;
