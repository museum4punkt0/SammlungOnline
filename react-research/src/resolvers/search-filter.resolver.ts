import { IResolver } from '../types/index';

export class SearchFilterResolver implements IResolver<string> {
  public resolve(value: string | { value: string }): string {
    if (typeof value === 'string') {
      return value;
    }
    return value.value;
  }
}
