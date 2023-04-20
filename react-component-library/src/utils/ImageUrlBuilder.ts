import { ConfigLoader, IConfiguration, IImageUrlBuilder } from 'src';

const FALLBACK_IMAGE_TYPE = 'webp';

class ImageUrlBuilder implements IImageUrlBuilder {
  private config: IConfiguration;

  constructor(config: any) {
    this.config = config || ConfigLoader.CurrentConfig;
  }

  splitImageIdAndType(
    filename: string,
    fallbackType = FALLBACK_IMAGE_TYPE,
  ): [string, string] {
    const parts = filename.split(/\.([^\\.]{3,})$/);
    if (parts.length !== 3) {
      return [parts.join('.'), fallbackType];
    }
    return [parts[0], parts[1]];
  }

  buildUrl(filename: string, width: number, height: number): string {
    // if full url is given, we cannot resize the image
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }

    // we have an image that is supposed to be served by our image-provider which supports serverside resizing
    // -> https://recherche.smb.museum/images/{fileid}_{width}x{height}.{imageType}
    const [imageId, imageType] = this.splitImageIdAndType(filename);
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
}

export default ImageUrlBuilder;
