import { IResolver } from '../types/index';

export class SearchFilterResolver implements IResolver<string> {
  public resolve(value: string): string {
    return value;
  }
}
