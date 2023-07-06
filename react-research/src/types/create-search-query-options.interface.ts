import {
  IVirtualSearchAttributeCondition,
  IVirtualSearchFilterGroup,
  IVirtualSearchSwitch,
} from './index';
import { SortOption } from '../utils/configuration/sorting-info.config';

export interface ICreateSearchQueryOptions {
  question: string;
  language: string;
  limit?: number;
  offset?: number;
  searchControls?: IVirtualSearchSwitch[];
  advancedFilters?: IVirtualSearchFilterGroup[];
  conditions?: IVirtualSearchAttributeCondition[];
  sort?: SortOption;
}
