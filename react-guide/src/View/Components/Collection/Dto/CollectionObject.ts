import { ImageUrlBuilder } from '..';

export interface CollectionObject {
    objectId: string;
    imageId: string;
    title: string;
    imageUrlBuilder: ImageUrlBuilder;
}
