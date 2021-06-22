import { IConfiguration } from '../../config/configuration';
import { IImageUrlBuilder } from './image-url-builder-service.interaface';

class ImageUrlBuilderService implements IImageUrlBuilder {
  private _defaultImageType = 'webp';

  constructor(private _config: IConfiguration) {}

  public createUrlFromTemplate(template: string, width: number, height: number): string {
    const _width = width.toString();
    const _height = height.toString();

    return template.replace('{width}', _width).replace('{height}', _height);
  }

  public createTemplateImageUrl(imageName: string): string {
    const [baseName, type] = this.splitImageIdAndType(imageName);

    return `${this._config.IMAGE_PROVIDER_ENDPOINT}/${baseName}_{width}x{height}.${type}`;
  }

  public splitImageIdAndType(id: string, fallbackType = this._defaultImageType): [string, string] {
    const parts = id.split(/\.([^\\.]{3,})$/);
    if (parts.length !== 3) {
      return [parts.join('.'), fallbackType];
    }

    return [parts[0], parts[1]];
  }

  public buildUrl(id: string, width: number, height: number): string {
    const [imageId, type] = this.splitImageIdAndType(id);

    return new URL(`${this._config.IMAGE_PROVIDER_ENDPOINT}/${imageId}_${width}x${height}.${type}`).toString();
  }
}

export default ImageUrlBuilderService;
