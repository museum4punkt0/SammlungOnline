import { useLocation } from 'react-router-dom';
import QueryParamsService from '../utils/query-params/query-params.service';

export type queryParamsStringGetter = () => string;

/**
 * Hook to obtain a function that returns the query params as a <key=value&key=value...> string.
 * Params returned are: language, limit, sort, controls
 */
export const useQueryParamsGetter = (): queryParamsStringGetter => {
  const { search } = useLocation();
  const queryParamsManagerService = new QueryParamsService(search);

  return () => queryParamsManagerService.getSearchQueryParamsString();
};
