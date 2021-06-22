//todo use component linrary version

export interface IImageUrlBuilder {
    buildUrl: (imageId: string, width: number, height: number) => URL;
    buildUrlLocal: (id: string, width: number, height: number) => URL;
}
