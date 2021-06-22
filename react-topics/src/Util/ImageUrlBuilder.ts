import { ConfigLoader } from './ConfigLoader';
import { Config } from '../config';
import {IImageUrlBuilder} from "smb-react-components-library/dist/core/services/ImageUrlBuilderService/image-url-builder-service.interaface";

const FALLBACK_IMAGE_TYPE = 'webp';

class ImageUrlBuilder implements IImageUrlBuilder {
    private config: Config;

    constructor() {
        this.config = ConfigLoader.CurrentConfig;
    }

    splitImageIdAndType(id: string, fallbackType = FALLBACK_IMAGE_TYPE): [string, string] {
        const parts = id.split(/\.([^\\.]{3,})$/);
        if (parts.length !== 3) {
            return [parts.join('.'), fallbackType];
        }

        return [parts[0], parts[1]];
    }

    buildUrl(id: string, width: number, height: number): string {
        const [imageId, imageType] = this.splitImageIdAndType(id);

        return new URL(
            this.config.IMAGE_PROVIDER_DOMAIN.concat(
                this.config.IMAGE_PROVIDER_PATH,
                imageId,
                '_',
                width.toString(),
                'x',
                height.toString(),
                '.',
                imageType,
            ),
        ).toString();
    }
}

export default ImageUrlBuilder;
