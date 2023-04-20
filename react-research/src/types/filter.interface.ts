import { ESearchOperators } from '../enums/index';

export interface ISearchFilter {
  operator: ESearchOperators;
  field: string;
  q: string;
}
