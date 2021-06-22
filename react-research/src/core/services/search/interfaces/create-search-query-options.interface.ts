import { IVirtualSearchSwitch } from '../../../../features/Search/components/SearchForm/interfaces/virtual-switch.interface';
import { IVirtualSearchFilterGroup } from '../../../../features/Search/components/SearchForm/interfaces/virtual-filter-group.interface';
import { IVirtualSearchAttributeCondition } from '../../../../features/Search/components/SearchForm/interfaces/virtual-attribute-condition.interface';

export interface ICreateSearchQueryOptions {
    question: string;
    language: string;
    limit?: number;
    offset?: number;
    searchControls?: IVirtualSearchSwitch[];
    advancedFilters?: IVirtualSearchFilterGroup[];
    conditions?: IVirtualSearchAttributeCondition[];
}
