import { IVirtualSearchFilter } from './index';

export interface IVirtualSearchFilterGroup<T = IVirtualSearchFilter> {
  name: string;
  label: string;
  sublevel?: Array<{
    title?: string;
    text?: string;
  }>;
  filters: T[];
}
