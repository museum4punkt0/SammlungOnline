import { ESearchOperators } from '../enums/index';
import {
  IVirtualSearchAttributeCondition,
  IVirtualSearchFilterGroup,
  IVirtualSearchSwitch,
} from './index';

import { ExhibitModel } from '@smb/smb-react-components-library';

export interface IAttribute {
  id: string;
  field: string;
  value: string;
  operator: ESearchOperators;
}

export interface ISearchResult {
  items: ExhibitModel[];
  total: number;
  offset: number;
}

export interface ISearchQueryData {
  offset: number;
  limit: number;
  language: string;
  question: string;
  searchControls: IVirtualSearchSwitch[];
  conditions: IVirtualSearchAttributeCondition[];
  advancedFilters: IVirtualSearchFilterGroup[];
}
