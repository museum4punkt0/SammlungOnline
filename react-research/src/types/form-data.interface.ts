import {
  IVirtualSearchAttributeCondition,
  IVirtualSearchFilterGroup,
  IVirtualSearchSwitch,
} from './index';

export interface ISearchFormData {
  question: string;
  conditions?: IVirtualSearchAttributeCondition[];
  searchControls?: IVirtualSearchSwitch[];
  advancedFilters?: IVirtualSearchFilterGroup[];
}
