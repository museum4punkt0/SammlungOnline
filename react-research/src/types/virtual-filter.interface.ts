import { IVirtualSearchOption } from './index';

export interface IVirtualSearchFilter<T = IVirtualSearchOption> {
  name: string;
  label: string;
  value: string;
  filterKey: string;
  virtualValue: boolean;
  options: T[];
  innerFilters: T[];
  level?: string;
  index: number;
}
