import { ISearchAttributeOption } from './attribute-option.interface';
import { IAttribute, ISearchResult, ISearchQueryData } from './attribute.interface';
import { IConfiguration } from './config.interface';
import { IConfigurableForEnvironment } from './configurable-for-environment.interface';
import { ICreateSearchQueryOptions } from './create-search-query-options.interface';
import { IDateRangeFilter } from './data-range.interface';
import { IFetchSuggestionsOptions } from './fetch-suggestions-options.interface';
import { ISearchFilter } from './filter.interface';
import { ISearchFormData } from './form-data.interface';
import { IQueryParameterParser } from './parser.interface';
import { IResolver } from './resolver.interface';
import { ISearchExhibitsApiResponse } from './search-exhibits-api-response.interface';
import { ISearchFilterParsersMapInterface } from './search-filter-parsers.interface';
import { ISearchFilterResolversMap } from './search-filter-resolvers.interface';
import { ISearchOptions } from './search-options.interface';
import { ISearchQueryParamsData } from './search-query-data.interface';
import { ISearchSuggestionsApiResponse } from './search-suggestions-api-response.interface';
import { SuggestionBodyProps } from './suggestion-body-props.inteface';

import { ISuggestion } from './suggestion.interface';
import { IVirtualSearchAttributeCondition } from './virtual-attribute-condition.interface';
import { IVirtualSearchFilterGroup } from './virtual-filter-group.interface';
import { IVirtualSearchFilter } from './virtual-filter.interface';
import { IVirtualSearchOption } from './virtual-option.interface';
import { IVirtualSearchSwitch } from './virtual-switch.interface';
import { IExhibitInfoItemConfig } from './exhibit-info.config.interface';
import { IAsideContainerItem, ILink, IAsideInfoItem } from './details.interface';

export * from './search-facets.interface';

// eslint-disable-next-line prettier/prettier
export type { 
    IAttribute, 
    ISearchAttributeOption,
    ISearchResult, 
    ISearchQueryData, 
    ISearchOptions,
    ISearchQueryParamsData,
    IFetchSuggestionsOptions, 
    IDateRangeFilter, 
    IConfiguration, 
    IConfigurableForEnvironment, 
    ICreateSearchQueryOptions, 
    ISearchFilter, 
    IResolver,
    IVirtualSearchFilterGroup,
    IVirtualSearchSwitch,
    IVirtualSearchAttributeCondition,
    IVirtualSearchFilter,
    IVirtualSearchOption,
    ISearchExhibitsApiResponse,
    ISearchFilterParsersMapInterface,
    ISearchFilterResolversMap,
    ISuggestion,
    ISearchFormData,
    ISearchSuggestionsApiResponse,
    IQueryParameterParser,
    SuggestionBodyProps,
    IExhibitInfoItemConfig,
    IAsideContainerItem, 
    ILink, 
    IAsideInfoItem
 };
