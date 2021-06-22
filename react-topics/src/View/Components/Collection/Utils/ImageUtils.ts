import { CollectionObject } from '../Dto/CollectionObject';

const buildImageUrl = (collectionObject: CollectionObject, imageSize: number): string => {
    if (collectionObject.imageId === '') {
        return '';
    }
    return collectionObject.imageUrlBuilder.buildUrl(collectionObject.imageId, imageSize, imageSize).toString();
};

export { buildImageUrl };
