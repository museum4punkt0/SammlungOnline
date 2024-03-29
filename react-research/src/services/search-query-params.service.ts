import { ESearchConditionFields, ESearchOperators, ESearchQueryParams } from '../enums';

import { ISearchToggle, ISearchFilterGroup } from '../utils/configuration';

import {
  ICreateSearchQueryOptions,
  ISearchQueryParamsData,
  ISearchFilterParsersMapInterface,
} from '../types';

import QueryParamsService from '../utils/query-params/query-params.service';
import isSomeEnum from '../utils/enum.assertion';

import { IConfiguration } from '@smb/smb-react-components-library';
import { SortOption } from '../utils/configuration/sorting-info.config';

class SearchQueryParamsService {
  private readonly _conditionSplitter = '+';

  constructor(
    private readonly _config: IConfiguration,
    private readonly _searchToggles: ISearchToggle[],
    private readonly _searchFilterGroups: ISearchFilterGroup[],
    private readonly _searchFilterParsersMap: ISearchFilterParsersMapInterface,
  ) {}

  public create(options: ICreateSearchQueryOptions): string {
    const {
      question,
      language,
      limit,
      offset,
      searchControls,
      conditions,
      advancedFilters,
      sort,
    } = options;
    const queryParamsManager = new QueryParamsService();

    queryParamsManager.set(ESearchQueryParams.language, language);
    question && queryParamsManager.set(ESearchQueryParams.question, question);
    limit && queryParamsManager.set(ESearchQueryParams.limit, limit);
    offset && queryParamsManager.set(ESearchQueryParams.offset, offset);
    sort && queryParamsManager.set(ESearchQueryParams.sort, sort);

    let activeControlsCount = 0;

    searchControls?.forEach(searchControl => {
      if (searchControl.value) {
        activeControlsCount += 1;
        queryParamsManager.append(ESearchQueryParams.controls, searchControl.name);
      }
    });

    if (!activeControlsCount) {
      queryParamsManager.set(ESearchQueryParams.controls, 'none');
    }

    conditions?.forEach(({ operator, field, value }) => {
      // TODO don't know why but empty string appears here when there is already
      //      one row added and a second one is in process of being added
      if (!field) {
        return null;
      }

      const queryParameterParser = this._searchFilterParsersMap[field];

      const _value = queryParameterParser.stringify(value);
      const conditionValue = [operator, field, _value].join(this._conditionSplitter);

      queryParamsManager.append(ESearchQueryParams.conditions, conditionValue);
    });

    advancedFilters?.forEach(advancedFilter => {
      advancedFilter.filters.forEach(({ virtualValue, value, filterKey, options }) => {
        if (virtualValue) {
          queryParamsManager.append(filterKey, value);

          options.forEach(option => {
            if (option.virtualValue) {
              queryParamsManager.append(option.filterKey, option.value);
            }
          });
        }
      });
    });

    return queryParamsManager.getQueryString();
  }

  public parse(url: string): ISearchQueryParamsData {
    const queryParamsManager = new QueryParamsService(url);

    const question = queryParamsManager.get(ESearchQueryParams.question) ?? '';
    const language = queryParamsManager.get(ESearchQueryParams.language) ?? 'de';
    const sort = queryParamsManager.get(ESearchQueryParams.sort) ?? SortOption.RELEVANCE;

    const rawOffset = queryParamsManager.get(ESearchQueryParams.offset);
    const rawLimit = queryParamsManager.get(ESearchQueryParams.limit);
    const offset = rawOffset ? parseInt(rawOffset, 10) : 0;
    const limit = rawLimit ? parseInt(rawLimit, 10) : 15; // TODO set the default only once, duplicated in SearchPage and SearchContainer

    const searchControlsFromQuery = queryParamsManager.getAll(
      ESearchQueryParams.controls,
    );
    const searchConditions = queryParamsManager.getAll(ESearchQueryParams.conditions);

    const searchControls = this._searchToggles.map(control => {
      const value = searchControlsFromQuery.includes(control.name);

      return { ...control, value };
    });

    const conditions = searchConditions.map(selectedCondition => {
      const [operator, field, value] = selectedCondition.split(this._conditionSplitter);

      if (
        isSomeEnum(ESearchOperators)(operator) &&
        isSomeEnum(ESearchConditionFields)(field)
      ) {
        const queryParameterParser = this._searchFilterParsersMap[field];
        const parsedValue = queryParameterParser.parse(value);

        return { operator, field, value: parsedValue };
      }
    });

    const advancedFilters = this._searchFilterGroups.map(item => {
      const selectedFilters = queryParamsManager.getAll(item.filtersKey);
      const filters = item.filters.map((filter, fIdx) => {
        const options = filter.options?.map((option, oIdx) => {
          const filterKey = filter.optionsKey || '';
          const selectedOptions = queryParamsManager.getAll(filterKey);

          return {
            filterKey,
            name: option.name,
            value: option.value,
            index: oIdx,
            virtualValue: selectedOptions.includes(option.value),
          };
        });

        return {
          name: filter.name,
          index: fIdx,
          level: filter.level || '',
          label: filter.label || '',
          filterKey: item.filtersKey || '',
          value: filter.value,
          virtualValue: filter.value ? selectedFilters.includes(filter.value) : '', // TODO virtualValue must be boolean, right?
          options: options ?? [],
        };
      });

      return {
        name: item.name,
        label: item.label,
        sublevel: item.sublevel,
        filters: filters ?? [],
      };
    });

    return <ISearchQueryParamsData>{
      question,
      language,
      limit,
      offset,
      searchControls,
      advancedFilters,
      conditions,
      sort,
    };
  }
}

export default SearchQueryParamsService;
