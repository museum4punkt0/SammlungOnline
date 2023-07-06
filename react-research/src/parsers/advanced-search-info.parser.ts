import { IConfigurableForEnvironment } from '../types';
import { ISearchFilter, ISearchFilterGroup, ISearchOption } from '../utils/configuration';
import {
  SmbAssortments,
  SmbBuildings,
  SmbCollections,
  SmbOrgUnit,
} from '../generated/graphql';
import { AppStage } from '../enums';
import LanguageService from '../utils/LanguageService';

interface IAggregatedFilter {
  label: string;
  keys: string[];
  type: string;
}

export interface IFetchAdvancedSearchInfo {
  assortments: [];
  collections: SmbCollections[];
  compilations: SmbOrgUnit[];
  locations: SmbBuildings[];
}

/**
 * Type of collectionKey in a response from GQL
 */
export enum SublevelIndex {
  SMB_COLLECTION = 'SMB_COLLECTION',
  SMB_INSTITUTE = 'SMB_INSTITUTE',
  NATIONAL_INSTITUTE = 'NATIONAL_INSTITUTE',
}

/**
 * Mapping of collection type to sublevel index
 */
export const CollectionSublevelIndex = {
  [SublevelIndex.SMB_COLLECTION]: 0,
  [SublevelIndex.SMB_INSTITUTE]: 1,
  [SublevelIndex.NATIONAL_INSTITUTE]: 2,
};

const STAGES = [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION];

export type AdvancedSearchFiltersConfig = Array<
  ISearchFilterGroup & IConfigurableForEnvironment
>;

/**
 * Basic skeleton of the advanced filters configuration
 */
export const DEFAULT_ADVANCED_SEARCH_INFO: AdvancedSearchFiltersConfig = [
  {
    name: 'collections',
    label: 'searchForm.filters.collection',
    filtersKey: 'collectionKey',
    filters: [],
    sublevel: [
      {
        title: 'search.sublevel.title.staatlichenSammlung',
        text: '',
      },
      {
        title: 'search.sublevel.title.staatlichenInstitute',
        text: '',
      },
      {
        title: 'search.sublevel.title.musikforschung',
        text: '',
      },
    ],
    stages: STAGES,
  },
  {
    name: 'locations',
    label: 'searchForm.filters.location',
    filtersKey: 'location',
    filters: [],
    sublevel: [
      {
        title: '',
        // TODO move to translation file
        text:
          'Filtern Sie Objekte mit einem hinterlegten Ausstellungsstatus nach ihrem aktuellen Standort. Die Daten werden sukzessiv erweitert.',
      },
    ],
    stages: STAGES,
  },
  {
    name: 'assortments',
    label: 'searchForm.filters.assortments',
    filters: [],
    filtersKey: 'assortments',
    stages: STAGES,
  },
];

/**
 * Utility function to sort filters alphabetically by name
 * @param list
 */
function sortAlphabeticallyByName<T extends { name: string }>(list: T[]): T[] {
  const lang = LanguageService.getCurrentLanguage();
  return list.sort((nameA, nameB) => {
    return nameA.name.localeCompare(nameB.name, lang, { ignorePunctuation: true });
  });
}

/**
 * Parser class for mapping a GQL response to advanced search filters config
 */
export class AdvancedSearchInfoParser {
  private _compilations = new Map<string, ISearchOption[]>();
  private readonly advancedSearchInfo?: IFetchAdvancedSearchInfo;

  constructor(advancedSearchInfo?: IFetchAdvancedSearchInfo) {
    this.advancedSearchInfo = advancedSearchInfo;
    if (advancedSearchInfo?.compilations) {
      this._parseCompilations();
    }
  }

  /**
   * Get a list with advanced search filter configurations
   * @note previously this was obtained from search-form-filter-accordions.config.ts and so this response tries to mimic the structure in that file
   */
  public getSearchInfo(): AdvancedSearchFiltersConfig {
    if (!this.advancedSearchInfo) {
      return [...DEFAULT_ADVANCED_SEARCH_INFO];
    }
    const collectionFilters = this.advancedSearchInfo?.collections
      ? this._getCollectionsFilters()
      : [];
    const locationFilters = this.advancedSearchInfo?.locations
      ? this._getLocationsFilters()
      : [];
    const assortmentsFilters = this.advancedSearchInfo?.assortments
      ? this._convertAssortmentsToFilters(this.advancedSearchInfo.assortments)
      : [];
    return [
      { ...DEFAULT_ADVANCED_SEARCH_INFO[0], filters: collectionFilters },
      { ...DEFAULT_ADVANCED_SEARCH_INFO[1], filters: locationFilters },
      { ...DEFAULT_ADVANCED_SEARCH_INFO[2], filters: assortmentsFilters },
    ];
  }

  /**
   * Extracts the filters for collectionKey from GQL response
   * @private
   */
  private _getCollectionsFilters(): ISearchFilter[] {
    const filters: ISearchFilter[] = [];
    if (!this.advancedSearchInfo || !this.advancedSearchInfo?.collections) {
      return [];
    }
    const aggregated = this._aggregateCollectionsByLabel(
      this.advancedSearchInfo.collections,
    );
    const aggregatedAsArr = Array.from(aggregated);

    for (const [, filter] of aggregatedAsArr) {
      let compilations: ISearchOption[] = [];

      for (const key of filter.keys) {
        compilations = compilations.concat(this._compilations.get(key) ?? []);
      }
      // remove duplicates (GQL might provide duplicate entries)
      compilations = compilations.filter((option, i) => {
        return (
          compilations.findIndex(findOption => findOption.name === option.name) === i
        );
      });

      const searchFilter = {
        name: filter.label,
        level: `${CollectionSublevelIndex[filter.type as SublevelIndex] ?? 0}`,
        value: filter?.keys.join('* OR ') + '*',
        optionsKey: 'collectionKey',
        label: 'searchForm.filters.compilation',
        options: sortAlphabeticallyByName(compilations),
      };
      filters.push(searchFilter);
    }

    return sortAlphabeticallyByName(filters);
  }

  /**
   * Extract filters for locations form the GQL response
   * @private
   */
  private _getLocationsFilters(): ISearchFilter[] {
    const filters: ISearchFilter[] = [];
    const visited = new Set<string>();
    if (!this.advancedSearchInfo || !this.advancedSearchInfo?.locations) {
      return [];
    }

    for (const location of this.advancedSearchInfo.locations) {
      if (!visited.has(location.title)) {
        filters.push({
          name: location.title,
          value: location.key,
          level: '0',
        });
        visited.add(location.title);
      }
    }

    return sortAlphabeticallyByName(filters);
  }

  /**
   * Parse SmbOrgUnit to a map with key representing the collection key
   * to which they are related and the value a list of ISearchOption
   * @private
   */
  private _parseCompilations() {
    for (const compilation of this.advancedSearchInfo?.compilations ?? []) {
      const key = compilation.collectionKey ?? '';
      const value = { name: compilation.title as string, value: compilation.name };
      if (!this._compilations.get(key)) {
        this._compilations.set(key, [value]);
      } else {
        this._compilations.get(key)?.push(value);
      }
    }
  }

  private _convertAssortmentsToFilters(
    assortments: Array<SmbAssortments>,
  ): { name: string; value: string }[] {
    const filters: { name: string; value: string }[] = [];
    if (!assortments) return filters;
    for (const assortment of assortments) {
      filters.push(this._convertAssortment(assortment));
    }
    return sortAlphabeticallyByName(filters);
  }

  private _convertAssortment(object: SmbAssortments): { name: string; value: string } {
    return {
      name: object?.i18n[0]?.title ?? object.key,
      value: object.key,
    };
  }

  /**
   * Get a map of all collection filters aggregated by their respective label/name
   * resulted mapping: filterLabel:string -> IAggregatedFilter containing a list
   * of all collections keys with the same label
   * @param smbCollections
   * @private
   */
  private _aggregateCollectionsByLabel(
    smbCollections: SmbCollections[],
  ): Map<string, IAggregatedFilter> {
    const aggregatedFilters = new Map<string, IAggregatedFilter>();
    for (const smbCollection of smbCollections) {
      const visitedFilter = aggregatedFilters.get(smbCollection.title);
      if (!visitedFilter) {
        const filter: IAggregatedFilter = {
          label: smbCollection.title,
          keys: [smbCollection.key],
          type: smbCollection.type,
        };
        aggregatedFilters.set(smbCollection.title, filter);
      } else {
        visitedFilter.keys.push(smbCollection.key);
      }
    }

    return aggregatedFilters;
  }
}
