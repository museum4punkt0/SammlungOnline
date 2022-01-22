import {
  ConfigLoader,
  IConfiguration,
  IImageUrlBuilder,
} from '@smb/smb-react-components-library';

const FALLBACK_IMAGE_TYPE = 'webp';

class ImageUrlBuilder implements IImageUrlBuilder {
  private config: IConfiguration;

  constructor() {
    this.config = ConfigLoader.CurrentConfig;
  }

  splitImageIdAndType(
    id: string,
    fallbackType = FALLBACK_IMAGE_TYPE,
  ): [string, string] {
    const parts = id.split(/\.([^\\.]{3,})$/);
    if (parts.length !== 3) {
      return [parts.join('.'), fallbackType];
    }

    return [parts[0], parts[1]];
  }

  buildUrl(id: string, width: number, height: number): string {
    const [imageId, imageType] = this.splitImageIdAndType(id);

    return new URL(
      this.config.IMAGE_PROVIDER_ENDPOINT.concat(
        '/',
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

  // todo replace with buildURL
  buildUrlLocal(id: string): URL {
    const [imageId, imageType] = this.splitImageIdAndType(id);

    return new URL(
      this.config.IMAGE_PROVIDER_DOMAIN.concat(imageId, '.', imageType),
    );
  }
}

export default ImageUrlBuilder;
