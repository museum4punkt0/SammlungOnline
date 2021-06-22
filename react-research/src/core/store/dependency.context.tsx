import { createContext, useContext } from 'react';

import { loadConfig } from '../config/configuration';

import { IConfiguration } from '../interfaces/config.interface';

import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';

import searchFormTogglesConfig from '../../features/Search/configuration/search-form-toggle.config';
import searchFormFilterAccordionsConfig from '../../features/Search/configuration/search-form-filter-accordions.config';

import { searchFilterParsersMap } from '../services/search/maps/search-filter-parsers.map';
import { searchFilterResolversMap } from '../services/search/maps/search-filters-resolver.map';

import ToursRepository from '../repositories/tours/tours.repository';
import TopicsRepository from '../repositories/topics/topics.repository';

import { LinkBuilder } from '../services/LinkBuilder';
import SearchService from '../services/search/services/search.service';
import SearchFiltersService from '../services/search/services/search-filters.service';
import ToursService from '../services/tours/tours.service';
import TopicsService from '../services/topics/topics.service';
import SearchQueryParamsService from '../services/search/services/search-query-params.service';
import ImageUrlBuilderService from '../services/image-url-builder/image-url-builder.service';
import { AttachmentService, ExhibitService, GraphqlService } from 'smb-react-components-library';

export interface IDependencyContext {
    toursService: ToursService;
    searchService: SearchService;
    topicsService: TopicsService;
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
    const topicsRepository = new TopicsRepository();
    const graphqlService = new GraphqlService(configuration.GRAPHQL_ENDPOINT);

    const imageUrlBuilder = new ImageUrlBuilderService(configuration);
    const exhibitService = new ExhibitService(configuration, graphqlService, imageUrlBuilder);

    const searchToggles = searchFormTogglesConfig.filter(({ stages }) => stages.includes(configuration.stage));
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
        topicsService: new TopicsService(configuration, topicsRepository, imageUrlBuilder),
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
export const DependencyContext = createContext<IDependencyContext>(defaultDependencyContext);

export const useDependency = (): IDependencyContext => useContext(DependencyContext);
