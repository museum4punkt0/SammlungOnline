import { createContext, useContext } from 'react';

import {
  searchFormTogglesConfig,
  searchFormFilterAccordionsConfig,
} from '../utils/configuration/index';
import ToursService from '../utils/tours/tours.service';
import { LinkBuilder } from '../utils/LinkBuilder';

import { searchFilterParsersMap } from '../parsers/index';
import { searchFilterResolversMap } from '../resolvers/index';

import { AppStage } from '../enums/index';
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
const defaultSearchFilterData = {
  name: 'assortments',
  filtersKey: 'assortments',
  label: 'searchForm.filters.assortments',
  sublevel: undefined,
  stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  filters: [{ name: '', value: '' }],
};

export const createDependencies = (
  configuration: IConfiguration,
  searchFilterData: any,
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

  const searchFormFilterAccordions =
    searchFormFilterAccordionsConfig.length && searchFilterData.filters.length
      ? [...searchFormFilterAccordionsConfig, searchFilterData]
      : searchFormFilterAccordionsConfig;

  const searchFilterGroups = searchFormFilterAccordions.filter(({ stages }) =>
    stages.includes(configuration.stage),
  );

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
