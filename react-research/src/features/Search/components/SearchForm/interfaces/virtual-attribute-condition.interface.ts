import { ESearchOperators } from '../../../services/search/enums/search-operators.enum';
import { ESearchConditionFields } from '../../../services/search/enums/search-condition-fields.enum';

export interface IVirtualSearchAttributeCondition {
  field: ESearchConditionFields | null;
  operator: ESearchOperators;
  value: string;
}
