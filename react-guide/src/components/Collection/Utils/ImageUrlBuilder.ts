export interface ImageUrlBuilder {
  buildUrl: (imageId: string, width: number, height: number) => string;
}
