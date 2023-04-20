import { ESearchOperators } from '../enums/search-operators.enum';

import {
  ISearchFormData,
  IVirtualSearchFilterGroup,
  IVirtualSearchAttributeCondition,
  IVirtualSearchSwitch,
  ISearchFilterResolversMap,
  ISearchFilter,
} from '../types/index';

class SearchFiltersService {
  constructor(private readonly _searchFilterResolversMap: ISearchFilterResolversMap) {}

  public createFilters(data: ISearchFormData): ISearchFilter[] {
    const searchControlsFilter = this._createSearchControlsFilters(data.searchControls);
    const conditionFilters = this._createConditionsFilters(data.conditions);
    const advancedFilters = this._createAdvancedFilters(data.advancedFilters);

    return [...searchControlsFilter, ...conditionFilters, ...advancedFilters];
  }

  private _createAdvancedFilters(
    advancedFilters: IVirtualSearchFilterGroup[] = [],
  ): ISearchFilter[] {
    const filters: ISearchFilter[] = [];

    advancedFilters?.forEach(advancedFilter => {
      const selectedFilters = advancedFilter.filters.filter(
        filter => filter.virtualValue,
      );
      if (selectedFilters.length) {
        const field = selectedFilters[0].filterKey; // TODO cleanup, filterKey should be available in parent IVirtualSearchFilterGroup
        const operator = ESearchOperators.AND;
        const values: Array<string> = [];
        selectedFilters.forEach(filter => {
          let value = filter.value;
          const selectedOptions = filter.options.filter(option => option.virtualValue);
          if (selectedOptions.length) {
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
      if (!field) {
        return null;
      }

      const filterResolver = this._searchFilterResolversMap[field];
      const resolvedValue = filterResolver.resolve(value);

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
