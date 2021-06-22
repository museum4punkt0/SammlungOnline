import { ESearchOperators } from '../../../core/services/search/enums/search-operators.enum';

export interface IAttribute {
    id: string;
    field: string;
    value: string;
    operator: ESearchOperators;
}
