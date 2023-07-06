import { IConfiguration } from '../../config/configuration';
import { IImageUrlBuilder } from './image-url-builder-service.interaface';

const DEFAULT_IMAGE_TYPESUFFIX = 'jpg';

class ImageUrlBuilderService implements IImageUrlBuilder {

  constructor(private _config: IConfiguration) { }

  public createUrlFromTemplate(
    template: string,
    width: number,
    height: number,
  ): string {
    const w = width.toString();
    const h = height.toString();
    return template.replace('{width}', w).replace('{height}', h);
  }

  public createTemplateImageUrl(imageName: string): string {
    const [baseName, type] = this.splitImageIdAndType(imageName);
    return `${this._config.IMAGE_PROVIDER_ENDPOINT}/${baseName}_{width}x{height}.${type}`;
  }

  public splitImageIdAndType(
    filename: string,
    fallbackType = DEFAULT_IMAGE_TYPESUFFIX,
  ): [string, string] {
    const parts = filename.split(/\.([^\\.]{3,})$/);
    // expect len=3 because there is an empty string at the end -> ['name', 'suffix', '']
    if (parts.length !== 3) {
      return [parts.join('.'), fallbackType];
    }
    return [parts[0], parts[1]];
  }

  public buildUrl(filename: string, width: number, height: number): string {
    const [name, type] = this.splitImageIdAndType(filename);
    return new URL(
      `${this._config.IMAGE_PROVIDER_ENDPOINT}/${name}_${width}x${height}.${type}`,
    ).toString();
  }
}

export default ImageUrlBuilderService;
