import {
  IVirtualSearchAttributeCondition,
  IVirtualSearchFilterGroup,
  IVirtualSearchSwitch,
} from './index';

export interface ISearchQueryParamsData {
  question: string;
  language: string;
  limit: number;
  offset: number;
  searchControls: IVirtualSearchSwitch[];
  advancedFilters: IVirtualSearchFilterGroup[];
  conditions: IVirtualSearchAttributeCondition[];
}
