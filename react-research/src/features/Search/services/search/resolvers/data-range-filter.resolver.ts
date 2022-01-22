import { IResolver } from '../interfaces/resolver.interface';
import { IDateRangeFilter } from '../interfaces/filters/data-range.interface';

export class DataRangeFilterResolver implements IResolver<IDateRangeFilter> {
  public resolve(value: IDateRangeFilter): string | null {
    const from = !Number.isNaN(value?.datingFrom) ? value?.datingFrom : null;
    const to = !Number.isNaN(value?.datingTo) ? value?.datingTo : null;

    if (!to && !from) {
      return null;
    }

    return `[${from ?? '*'} TO ${to ?? '*'}]`;
  }
}
