import { IVirtualSearchFilter } from './virtual-filter.interface';

export interface IVirtualSearchFilterGroup<T = IVirtualSearchFilter> {
    name: string;
    label: string;
    filters: T[];
}
