import { createContext, useContext } from 'react';

import { searchFormTogglesConfig } from '../utils/configuration/index';
import ToursService from '../utils/tours/tours.service';
import { LinkBuilder } from '../utils/LinkBuilder';

import { searchFilterParsersMap } from '../parsers/index';
import { searchFilterResolversMap } from '../resolvers/index';
import {
  DEFAULT_ADVANCED_SEARCH_INFO,
  AdvancedSearchFiltersConfig,
} from '../parsers/advanced-search-info.parser';

import {
  SearchService,
  SearchFiltersService,
  SearchQueryParamsService,
} from '../services/index';

import {
  AttachmentService,
  ExhibitService,
  GraphqlService,
  IConfiguration,
  ImageUrlBuilderService,
  loadConfig,
  TopicService,
} from '@smb/smb-react-components-library';

export interface IDependencyContext {
  toursService: ToursService;
  searchService: SearchService;
  topicsService: TopicService;
  searchQueryParamsService: SearchQueryParamsService;
  imageUrlBuilder: ImageUrlBuilderService;
  linkBuilder: LinkBuilder;
  exhibitService: ExhibitService;
  attachmentService: AttachmentService;
  searchFiltersManager: SearchFiltersService;
}

const defaultConfiguration = loadConfig(null);
const defaultSearchFilterData = DEFAULT_ADVANCED_SEARCH_INFO;

export const createDependencies = (
  configuration: IConfiguration,
  searchFilterData: AdvancedSearchFiltersConfig,
): IDependencyContext => {
  const graphqlService = new GraphqlService(configuration.GRAPHQL_ENDPOINT);
  const imageUrlBuilder = new ImageUrlBuilderService(configuration);
  const exhibitService = new ExhibitService(
    configuration,
    graphqlService,
    imageUrlBuilder,
  );

  const searchToggles = searchFormTogglesConfig.filter(({ stages }) =>
    stages.includes(configuration.stage),
  );

  const searchFormFilterAccordions = searchFilterData;

  const searchFilterGroups = searchFormFilterAccordions
    ? searchFormFilterAccordions.filter(({ stages }) =>
        stages.includes(configuration.stage),
      )
    : [];

  return {
    exhibitService,
    imageUrlBuilder,
    searchFiltersManager: new SearchFiltersService(searchFilterResolversMap),
    toursService: new ToursService(configuration, imageUrlBuilder),
    searchService: new SearchService(configuration, exhibitService),
    topicsService: new TopicService(),
    searchQueryParamsService: new SearchQueryParamsService(
      configuration,
      searchToggles,
      searchFilterGroups,
      searchFilterParsersMap,
    ),
    linkBuilder: new LinkBuilder(configuration),
    attachmentService: new AttachmentService(configuration),
  };
};

const defaultDependencyContext = createDependencies(
  defaultConfiguration,
  defaultSearchFilterData,
);

export const DependencyContext = createContext<IDependencyContext>(
  defaultDependencyContext,
);

DependencyContext.displayName = 'Dependencies';
export const useDependency = (): IDependencyContext => useContext(DependencyContext);
