export class ImageUrlBuilderService {
    constructor(private readonly _imageProviderDomain: string) {}

    public splitImageIdAndType(id: string, fallbackType = 'webp'): [string, string] {
        const parts = id.split(/\.([^\\.]{3,})$/);
        if (parts.length !== 3) {
            return [parts.join('.'), fallbackType];
        }

        return [parts[0], parts[1]];
    }

    public buildUrl(id: string, width: number, height: number): string {
        const [imageId, imageType] = this.splitImageIdAndType(id);

        const imageWidth = width.toString();
        const imageHeight = height.toString();

        const imageUrl = `${this._imageProviderDomain}/images/${imageId}_${imageWidth}x${imageHeight}.${imageType}`;

        return new URL(imageUrl).toString();
    }
}
