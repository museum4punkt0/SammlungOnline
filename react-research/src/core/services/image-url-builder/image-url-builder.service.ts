import { EImageUrlTemplateFields } from './enums/image-url-template-fields.enum';

import { IConfiguration } from '../../interfaces/config.interface';

class ImageUrlBuilderService {
    constructor(private _config: IConfiguration) {}

    public createUrlFromTemplate(template: string, width: number, height: number): string {
        const templateParseConfiguration = [
            { templateKey: EImageUrlTemplateFields.width, value: width },
            { templateKey: EImageUrlTemplateFields.height, value: height },
        ];

        return templateParseConfiguration.reduce((_template, { templateKey, value }) => {
            return _template.replace(templateKey, value.toString());
        }, template);
    }

    public createTemplateImageUrl(imageName: string): string {
        const [fileName, type] = this.splitImageIdAndType(imageName);
        const dimensions = `${EImageUrlTemplateFields.width}x${EImageUrlTemplateFields.height}`;

        return `${this._config.IMAGE_PROVIDER_ENDPOINT}/${fileName}_${dimensions}.${type}`;
    }

    public splitImageIdAndType(filename: string, fallbackType = 'webp'): [string, string] {
        const [name, type] = filename.split('.');

        return [name, type || fallbackType];
    }

    public buildUrl(id: string, width: number, height: number): string {
        const [fileName, type] = this.splitImageIdAndType(id);
        const dimensions = `${width}x${height}`;

        return new URL(`${this._config.IMAGE_PROVIDER_ENDPOINT}/${fileName}_${dimensions}.${type}`).toString();
    }
}

export default ImageUrlBuilderService;
