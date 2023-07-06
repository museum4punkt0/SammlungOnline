import { ESearchOperators } from '../enums';

import {
  ISearchFormData,
  IVirtualSearchFilterGroup,
  IVirtualSearchAttributeCondition,
  IVirtualSearchSwitch,
  ISearchFilterResolversMap,
  ISearchFilter,
} from '../types';

class SearchFiltersService {
  constructor(private readonly _searchFilterResolversMap: ISearchFilterResolversMap) {}

  public createFilters(data: ISearchFormData): ISearchFilter[] {
    const { conditions, controls, facets } = this.buildFilters(data);
    return [...(controls ?? []), ...(conditions ?? []), ...(facets ?? [])];
  }

  public buildFilters = (
    data: ISearchFormData,
    controls = true,
    conditions = true,
    facets = true,
  ): {
    controls?: ISearchFilter[];
    conditions?: ISearchFilter[];
    facets?: ISearchFilter[];
  } => {
    const searchControlsFilter = controls
      ? this._createSearchControlsFilters(data.searchControls)
      : undefined;
    const conditionFilters = conditions
      ? this._createConditionsFilters(data.conditions)
      : undefined;
    const advancedFilters = facets
      ? this._createAdvancedFilters(data.advancedFilters)
      : undefined;
    return {
      controls: searchControlsFilter,
      conditions: conditionFilters,
      facets: advancedFilters,
    };
  };

  private _createAdvancedFilters(
    advancedFilters: IVirtualSearchFilterGroup[] = [],
  ): ISearchFilter[] {
    const filters: ISearchFilter[] = [];

    advancedFilters?.forEach(advancedFilter => {
      const selectedFilters = advancedFilter.filters.filter(
        filter => filter.virtualValue,
      );
      if (selectedFilters.length) {
        const field = selectedFilters[0].filterKey;
        const operator = ESearchOperators.AND;
        const values: Array<string> = [];
        selectedFilters.forEach(filter => {
          let value = filter.value;
          const selectedOptions = filter.options.filter(option => option.virtualValue);
          if (selectedOptions.length) {
            // TODO check if options should better be AND-combined with value instead of replacing it
            value = selectedOptions
              .map(option => option.value)
              .join(` ${ESearchOperators.OR} `);
          }
          values.push(value);
        });
        filters.push({ operator, field, q: values.join(` ${ESearchOperators.OR} `) });
      }
    });

    return filters;
  }

  private _createConditionsFilters(
    conditions: IVirtualSearchAttributeCondition[] = [],
  ): ISearchFilter[] {
    const filters = conditions.map(({ field, value, operator }) => {
      const filterResolver = field && this._searchFilterResolversMap[field];
      const resolvedValue = filterResolver && filterResolver.resolve(value);
      if (!resolvedValue) {
        return null;
      }
      return <ISearchFilter>{ operator, field, q: resolvedValue };
    });

    return filters.filter((value): value is ISearchFilter => value !== null);
  }

  private _createSearchControlsFilters(
    searchControls: IVirtualSearchSwitch[] = [],
  ): ISearchFilter[] {
    const filters = searchControls.map(({ value, name }) => {
      if (!value) {
        return null;
      }

      return <ISearchFilter>{
        operator: ESearchOperators.AND,
        field: name,
        q: value.toString(),
      };
    });

    return filters.filter((value): value is ISearchFilter => value !== null);
  }
}

export default SearchFiltersService;
