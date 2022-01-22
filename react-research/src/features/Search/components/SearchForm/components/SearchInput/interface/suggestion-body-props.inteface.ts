import { ISuggestion } from '../../../../../services/search/interfaces/search/suggestion.interface';

export interface SuggestionBodyProps {
  suggestionList: ISuggestion[];
  value: string;
}
