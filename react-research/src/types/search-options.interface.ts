import { ISearchFilter } from './index';
import { SortOption } from "../utils/configuration/sorting-info.config";

export interface ISearchOptions {
  question: string;
  language: string;
  limit?: number;
  offset: number;
  filters?: ISearchFilter[];
  sort?: SortOption;
}
