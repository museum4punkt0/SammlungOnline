import { IVirtualSearchAttributeCondition } from './virtual-attribute-condition.interface';
import { IVirtualSearchFilterGroup } from './virtual-filter-group.interface';
import { IVirtualSearchSwitch } from './virtual-switch.interface';

export interface ISearchFormData {
  question: string;
  conditions?: IVirtualSearchAttributeCondition[];
  searchControls?: IVirtualSearchSwitch[];
  advancedFilters?: IVirtualSearchFilterGroup[];
}
