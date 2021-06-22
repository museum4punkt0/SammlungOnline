import debounce from 'debounce-promise';

import { ISuggestion } from '../services/search/interfaces/search/suggestion.interface';

import { useDependency } from '../store/dependency.context';

type FetchSuggestions = (question: string, attributeField?: string) => Promise<string[]>;

export const useFetchSuggestions = (): FetchSuggestions => {
    const { searchService } = useDependency();

    const fetchSuggestions = async (question: string, attributeField?: string): Promise<string[]> => {
        const suggestions = await searchService.fetchSuggestions({
            value: question,
            attributeField,
            limit: 10,
            language: 'de',
        });

        return suggestions.map((suggestion: ISuggestion) => suggestion.value);
    };

    return debounce(fetchSuggestions, 200);
};
