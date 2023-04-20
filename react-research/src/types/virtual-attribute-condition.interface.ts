import { ESearchOperators, ESearchConditionFields } from '../enums/index';

export interface IVirtualSearchAttributeCondition {
  field: ESearchConditionFields | null;
  operator: ESearchOperators;
  value: string;
}
