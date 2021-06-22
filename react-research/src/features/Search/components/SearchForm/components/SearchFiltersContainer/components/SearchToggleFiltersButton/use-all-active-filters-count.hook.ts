import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ESearchFormFields } from '../../../../enums/search-form-fields.enum';

import { IVirtualSearchAttributeCondition } from '../../../../interfaces/virtual-attribute-condition.interface';
import { IVirtualSearchFilterGroup } from '../../../../interfaces/virtual-filter-group.interface';
import { IVirtualSearchFilter } from '../../../../interfaces/virtual-filter.interface';

const useAllActiveFiltersCount = (): number => {
    const { control } = useFormContext();

    const watchedConditions = useWatch<IVirtualSearchAttributeCondition[]>({
        name: ESearchFormFields.conditions,
        control,
    });

    const activeConditionsCount = watchedConditions?.length ?? 0;

    const watchedAdvancedFilters = useWatch<IVirtualSearchFilterGroup[]>({
        name: ESearchFormFields.advancedFilters,
        control,
    });

    const countActiveFilters = (previousFilterNumber: number, { virtualValue, options }: IVirtualSearchFilter) => {
        if (virtualValue) {
            const activeOptionsCount = options?.filter(({ virtualValue }) => virtualValue).length ?? 0;

            return previousFilterNumber + activeOptionsCount + 1;
        }

        return previousFilterNumber;
    };

    const activeFiltersCount = useMemo(() => {
        if (!watchedAdvancedFilters?.length) {
            return 0;
        }

        return watchedAdvancedFilters?.reduce((previousValue: number, { filters }) => {
            return filters?.reduce(countActiveFilters, previousValue);
        }, 0);
    }, [watchedAdvancedFilters]);

    return activeFiltersCount + activeConditionsCount;
};

export default useAllActiveFiltersCount;
