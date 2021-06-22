import axios from 'axios';

import { EApiSearchQueryParams } from '../enums/api-search-query-params.enum';

import { IConfiguration } from '../../../interfaces/config.interface';
import { ISearchOptions } from '../interfaces/search/search-options.interface';
import { IFetchSuggestionsOptions } from '../interfaces/search/fetch-suggestions-options.interface';
import { ISuggestion } from '../interfaces/search/suggestion.interface';
import { ISearchExhibitsApiResponse } from '../interfaces/search/search-exhibits-api-response.interface';
import { ISearchSuggestionsApiResponse } from '../interfaces/search/search-suggestions-api-response.interface';

import { ExhibitService } from 'smb-react-components-library';
import QueryParamsService from '../../query-params/query-params.service';

class SearchService {
    constructor(private readonly _config: IConfiguration, private readonly _exhibitService: ExhibitService) {}

    public async search(options: ISearchOptions): Promise<ISearchExhibitsApiResponse> {
        const { question, filters = [], offset, limit = 20, language = 'de' } = options;

        const queryParamsManager = new QueryParamsService();

        question && queryParamsManager.set(EApiSearchQueryParams.question, question);
        queryParamsManager.set(EApiSearchQueryParams.language, language);
        queryParamsManager.set(EApiSearchQueryParams.limit, limit);
        queryParamsManager.set(EApiSearchQueryParams.offset, offset);

        const query = queryParamsManager.getQueryString();

        const url = `${this._config.ELASTIC_API_URL}/?${query}`;
        const { data } = await axios.post<ISearchExhibitsApiResponse>(url, { q_advanced: filters });

        const exhibits = data.objects.map(this._exhibitService.mapToExhibitModel.bind(this));

        const exhibitsWithAttachmentsOnly = await this._exhibitService.findMany(exhibits.map((exhibit) => exhibit.id));
        const exhibitMap = new Map(exhibitsWithAttachmentsOnly.map((exhibit) => [exhibit.id, exhibit.src]));

        return {
            total: data.total,
            objects: exhibits.map((exhibit) => {
                return { ...exhibit, src: exhibitMap.get(exhibit.id) ?? '' };
            }),
        };
    }

    public async fetchSuggestions(options: IFetchSuggestionsOptions): Promise<ISuggestion[]> {
        const { value, attributeField = 'titles', limit = 10, language = 'de' } = options;

        const queryParamsManager = new QueryParamsService();

        queryParamsManager.set(EApiSearchQueryParams.question, `${attributeField}:${value}`);
        queryParamsManager.set(EApiSearchQueryParams.language, language);
        queryParamsManager.set(EApiSearchQueryParams.limit, limit);

        const query = queryParamsManager.getQueryString();

        const url = `${this._config.ELASTIC_API_URL}/suggestions/?${query}`;
        const { data } = await axios.get<ISearchSuggestionsApiResponse>(url);

        return data.suggestions;
    }
}

export default SearchService;
