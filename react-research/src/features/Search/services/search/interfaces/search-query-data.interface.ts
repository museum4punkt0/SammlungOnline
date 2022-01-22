import { IVirtualSearchSwitch } from '../../../components/SearchForm/interfaces/virtual-switch.interface';
import { IVirtualSearchFilterGroup } from '../../../components/SearchForm/interfaces/virtual-filter-group.interface';
import { IVirtualSearchAttributeCondition } from '../../../components/SearchForm/interfaces/virtual-attribute-condition.interface';

export interface ISearchQueryParamsData {
  question: string;
  language: string;
  limit: number;
  offset: number;
  searchControls: IVirtualSearchSwitch[];
  advancedFilters: IVirtualSearchFilterGroup[];
  conditions: IVirtualSearchAttributeCondition[];
}
