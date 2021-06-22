import { IImageUrlBuilder } from "smb-react-components-library/dist/core/services/ImageUrlBuilderService/image-url-builder-service.interaface";

export interface CollectionObject {
    objectId: string;
    imageId: string;
    title: string;
    displayTitle: string;
    imageUrlBuilder: IImageUrlBuilder;
}
