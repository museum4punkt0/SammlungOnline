import debounce from 'debounce-promise';
import { useDependency } from '../providers';
import { IFacet, IFetchFacetsOptions } from '../types';

type FetchFacets = (options?: IFetchFacetsOptions) => Promise<IFacet[]>;

/**
 * Hook to get a debounced function to fetch 'facets' from the API.
 */
export const useFetchFacets = (): FetchFacets => {
  const { searchService } = useDependency();

  const fetchFacets = async (options?: IFetchFacetsOptions): Promise<IFacet[]> => {
    return await searchService.fetchFacets(options);
  };

  return debounce(fetchFacets, 200);
};
