import { IVirtualSearchOption } from './virtual-option.interface';

export interface IVirtualSearchFilter<T = IVirtualSearchOption> {
    name: string;
    label: string;
    value: string;
    filterKey: string;
    virtualValue: boolean;
    options: T[];
}
