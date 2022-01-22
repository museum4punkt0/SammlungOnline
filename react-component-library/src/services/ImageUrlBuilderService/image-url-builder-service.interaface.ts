export interface IImageUrlBuilder {
  buildUrl(id: string, width: number, height: number): string;
}
