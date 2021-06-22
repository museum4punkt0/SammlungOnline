import { IResolver } from '../interfaces/resolver.interface';

export class SearchFilterResolver implements IResolver<string> {
    public resolve(value: string): string {
        return value;
    }
}
