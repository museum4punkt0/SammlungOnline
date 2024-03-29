import debounce from 'debounce-promise';

import { ISearchFormData } from '../types/index';
import { ExhibitModel } from '@smb/smb-react-components-library';
import { useDependency } from '../providers/index';
import { useCallback } from 'react';

type searchFunction = (
  data: ISearchFormData & { limit: number; language: string; offset: number },
) => Promise<{
  total: number;
  objects: ExhibitModel[];
}>;

export const useSearch = (): searchFunction => {
  const { searchService, searchFiltersManager } = useDependency();

  const search = (
    data: ISearchFormData & { limit: number; language: string; offset: number },
  ) => {
    const filters = searchFiltersManager.createFilters(data);

    return searchService.search({
      question: data.question,
      limit: data.limit,
      filters: filters,
      language: data.language,
      offset: data.offset,
      sort: data.sort,
    });
  };

  return useCallback(debounce(search, 500), []);
};
