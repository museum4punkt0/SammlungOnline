/**
 * Structure of an advanced filter to apply for filtering facets.
 */
export interface IQAdvancedFacetsFilter {
  /**
   * Field by which filtering is made (location, collectionKey, etc.)
   */
  field: string;
  /**
   * Value for the specified field at filtering (ex: 'GG*')
   */
  q: string;
}

/**
 * Structure of an option  object for facets fetching
 */
export interface IFetchFacetsOptions {
  /**
   * Advanced filters to apply to facets fetching
   */
  qAdvanced: IQAdvancedFacetsFilter[];
}

/**
 * Structure of an option contained in the options field of a facet
 */
export interface IOption {
  label: string;
  value: string;
  counter?: number;
  options?: IOption[];
}

/**
 * Structure of a facet
 */
export interface IFacet {
  field: string;
  label: string;
  options: IOption[];
}

export interface ISearchFacetsApiResponse {
  facets: IFacet[];
}
