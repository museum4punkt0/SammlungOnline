import { useFormContext } from 'react-hook-form';
import { ISearchFilter, ISearchFormData } from '../../types';
import { useDependency } from '../../providers';

/**
 * Hook to collect all current active conditions and active filters.
 * Mainly used for fetching filter search suggestions.
 * !IMPORTANT: Must only be used inside a FormContext.Provider child component
 * ---
 * @returns  - object containing filters, advanced filters and an aggregation
 * of both of them.
 */
export const useFilters = (): {
  qAdvancedConditions: ISearchFilter[];
  qAdvancedFilters: ISearchFilter[];
  qAdvancedControls: ISearchFilter[];
  qAdvancedAll: ISearchFilter[];
} => {
  const { searchFiltersManager } = useDependency();
  const formCtx = useFormContext();
  const { conditions, controls, facets } = searchFiltersManager.buildFilters(
    formCtx.getValues() as ISearchFormData,
  );
  return {
    qAdvancedConditions: conditions ?? [],
    qAdvancedFilters: facets ?? [],
    qAdvancedControls: controls ?? [],
    qAdvancedAll: [...(controls ?? []), ...(conditions ?? []), ...(facets ?? [])],
  };
};
