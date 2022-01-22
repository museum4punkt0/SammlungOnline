import { createContext, useContext } from 'react';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';

import searchFormTogglesConfig from '../features/Search/configuration/search-form-toggle.config';
import searchFormFilterAccordionsConfig from '../features/Search/configuration/search-form-filter-accordions.config';

import { searchFilterParsersMap } from '../features/Search/services/search/maps/search-filter-parsers.map';
import { searchFilterResolversMap } from '../features/Search/services/search/maps/search-filters-resolver.map';

import ToursRepository from '../graphQL/tours/tours.repository';

import SearchService from '../features/Search/services/search/services/search.service';
import SearchFiltersService from '../features/Search/services/search/services/search-filters.service';

import SearchQueryParamsService from '../features/Search/services/search/services/search-query-params.service';
import {
  AttachmentService,
  ExhibitService,
  GraphqlService,
  IConfiguration,
  ImageUrlBuilderService,
  loadConfig,
} from '@smb/smb-react-components-library';
import { LinkBuilder } from '../utils/LinkBuilder';
import ToursService from '../utils/tours/tours.service';
import { TopicService, TopicRepository } from '@smb/smb-react-components-library';

export interface IDependencyContext {
  toursService: ToursService;
  searchService: SearchService;
  topicsService: TopicService;
  searchQueryParamsService: SearchQueryParamsService;
  imageUrlBuilder: ImageUrlBuilderService;
  linkBuilder: LinkBuilder;
  exhibitService: ExhibitService;
  attachmentService: AttachmentService;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  searchFiltersManager: SearchFiltersService;
}

const defaultConfiguration = loadConfig(null);

export const createDependencies = (configuration: IConfiguration): IDependencyContext => {
  const toursRepository = new ToursRepository();
  const topicsRepository = new TopicRepository();
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
  const searchFilterGroups = searchFormFilterAccordionsConfig.filter(({ stages }) =>
    stages.includes(configuration.stage),
  );

  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: configuration.GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });

  return {
    apolloClient,
    exhibitService,
    imageUrlBuilder,
    searchFiltersManager: new SearchFiltersService(searchFilterResolversMap),
    toursService: new ToursService(configuration, toursRepository, imageUrlBuilder),
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

const defaultDependencyContext = createDependencies(defaultConfiguration);
export const DependencyContext = createContext<IDependencyContext>(
  defaultDependencyContext,
);

export const useDependency = (): IDependencyContext => useContext(DependencyContext);
