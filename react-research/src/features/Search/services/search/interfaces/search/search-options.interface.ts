import { ISearchFilter } from '../filters/filter.interface';

export interface ISearchOptions {
  question: string;
  language: string;
  limit?: number;
  offset: number;
  filters?: ISearchFilter[];
}
