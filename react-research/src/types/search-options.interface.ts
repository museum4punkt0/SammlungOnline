import { ISearchFilter } from './index';

export interface ISearchOptions {
  question: string;
  language: string;
  limit?: number;
  offset: number;
  filters?: ISearchFilter[];
}
