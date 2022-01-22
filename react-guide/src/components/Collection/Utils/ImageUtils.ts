import { ICollectionObject } from '@smb/smb-react-components-library';

const buildImageUrl = (
  collectionObject: ICollectionObject,
  imageSize: number,
): string => {
  if (collectionObject.imageId === '') {
    return '';
  }
  return collectionObject.imageUrlBuilder
    .buildUrl(collectionObject.imageId, imageSize, imageSize)
    .toString();
};

export { buildImageUrl };
