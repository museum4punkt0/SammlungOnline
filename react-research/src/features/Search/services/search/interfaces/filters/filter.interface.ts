import { ESearchOperators } from '../../enums/search-operators.enum';

export interface ISearchFilter {
  operator: ESearchOperators;
  field: string;
  q: string;
}
