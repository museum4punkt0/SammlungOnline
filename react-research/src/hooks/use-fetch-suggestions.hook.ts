import debounce from 'debounce-promise';
import { ISearchFilter, ISuggestion } from "../types/index";
import { useDependency } from '../providers/index';

type FetchSuggestions = (
  question: string,
  attributeField?: string,
  qAdvanced?: ISearchFilter[],
) => Promise<ISuggestion[]>;

export const useFetchSuggestions = (): FetchSuggestions => {
  const { searchService } = useDependency();

  const fetchSuggestions = async (
    question: string,
    attributeField?: string,
    qAdvanced?: ISearchFilter[],
  ): Promise<ISuggestion[]> => {
    const suggestions = await searchService.fetchSuggestions({
      value: question,
      attributeField,
      limit: 10,
      language: 'de',
      qAdvanced,
    });

    return suggestions;
  };

  return debounce(fetchSuggestions, 200);
};
