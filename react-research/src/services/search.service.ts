import axios from 'axios';

import { EApiSearchQueryParams } from '../enums';

import {
  ISearchOptions,
  IFetchSuggestionsOptions,
  ISuggestion,
  ISearchExhibitsApiResponse,
  ISearchSuggestionsApiResponse,
  IFacet,
  IFetchFacetsOptions,
  ISearchFacetsApiResponse,
} from '../types';

import { ExhibitService, IConfiguration } from '@smb/smb-react-components-library';
import QueryParamsService from '../utils/query-params/query-params.service';
import {
  SORT_VALUES_MAP,
  SortOption,
} from '../utils/configuration/sorting-info.config';

class SearchService {
  constructor(
    private readonly _config: IConfiguration,
    private readonly _exhibitService: ExhibitService,
  ) {}

  public async search(options: ISearchOptions): Promise<ISearchExhibitsApiResponse> {
    const { question, filters = [], offset, limit = 20, language = 'de' } = options;

    const parsedFilters = filters.map(({ field, operator, q }) => ({
      field,
      operator,
      q: ((q as unknown) as ISuggestion)?.value ?? q ?? '',
    }));

    const queryParamsManager = new QueryParamsService();

    question && queryParamsManager.set(EApiSearchQueryParams.question, question);
    queryParamsManager.set(EApiSearchQueryParams.language, language);
    queryParamsManager.set(EApiSearchQueryParams.limit, limit);
    queryParamsManager.set(EApiSearchQueryParams.offset, offset);
    queryParamsManager.set(
      EApiSearchQueryParams.sort,
      SORT_VALUES_MAP[options.sort as SortOption],
    );

    const query = queryParamsManager.getQueryString();

    const url = `${this._config.ELASTIC_API_URL}/?${query}`;

    const { data } = await axios.post<ISearchExhibitsApiResponse>(url, {
      q_advanced: parsedFilters ?? [],
    });

    const exhibits = data.objects.map(this._exhibitService.mapToExhibitModel.bind(this));

    const exhibitsWithAttachmentsOnly = await this._exhibitService.findMany(
      exhibits.map(exhibit => exhibit.id),
    );
    const exhibitMap = new Map(
      exhibitsWithAttachmentsOnly.map(exhibit => [exhibit.id, exhibit.src]),
    );

    return {
      total: data.total,
      objects: exhibits.map(exhibit => {
        return { ...exhibit, src: exhibitMap.get(exhibit.id) ?? '' };
      }),
    };
  }

  public async fetchSuggestions(
    options: IFetchSuggestionsOptions,
  ): Promise<ISuggestion[]> {
    const { value, attributeField, limit = 10, language = 'de', qAdvanced } = options;

    const queryParamsManager = new QueryParamsService();

    queryParamsManager.set(
      EApiSearchQueryParams.question,
      attributeField ? `${attributeField}:${value}` : value,
    );
    queryParamsManager.set(EApiSearchQueryParams.language, language);
    queryParamsManager.set(EApiSearchQueryParams.limit, limit);

    const query = queryParamsManager.getQueryString();

    const url = `${this._config.ELASTIC_API_URL}/suggestions/?${query}`;

    const { data } = await axios.post<ISearchSuggestionsApiResponse>(url, {
      q_advanced: qAdvanced ?? [],
    });

    return data.suggestions;
  }

  public async fetchFacets(options?: IFetchFacetsOptions): Promise<IFacet[]> {
    const url = `${this._config.ELASTIC_API_URL}/facets`;
    const { data } = await axios.post<ISearchFacetsApiResponse>(url, {
      q_advanced: options?.qAdvanced ?? [],
    });

    return data.facets;
  }
}

export default SearchService;
