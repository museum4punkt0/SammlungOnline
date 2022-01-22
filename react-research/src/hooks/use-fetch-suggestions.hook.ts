import debounce from 'debounce-promise';

import { ISuggestion } from '../features/Search/services/search/interfaces/search/suggestion.interface';

import { useDependency } from '../context/dependency.context';

type FetchSuggestions = (
  question: string,
  attributeField?: string,
) => Promise<ISuggestion[]>;

export const useFetchSuggestions = (): FetchSuggestions => {
  const { searchService } = useDependency();

  const fetchSuggestions = async (
    question: string,
    attributeField?: string,
  ): Promise<ISuggestion[]> => {
    const suggestions = await searchService.fetchSuggestions({
      value: question,
      attributeField,
      limit: 10,
      language: 'de',
    });

    return suggestions;
  };

  return debounce(fetchSuggestions, 200);
};
