import { ESearchOperators } from '../services/search/enums/search-operators.enum';

export interface IAttribute {
  id: string;
  field: string;
  value: string;
  operator: ESearchOperators;
}
