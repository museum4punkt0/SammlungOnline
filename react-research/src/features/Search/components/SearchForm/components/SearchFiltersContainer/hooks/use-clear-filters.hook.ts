import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { ISearchFormData } from '../../../interfaces/form-data.interface';
import { IVirtualSearchFilterGroup } from '../../../interfaces/virtual-filter-group.interface';

import { ESearchFormFields } from '../../../enums/search-form-fields.enum';

const useClearFilters = () => {
  const { reset, getValues } = useFormContext<ISearchFormData>();

  return useCallback(() => {
    const _advancedFilters = getValues<string, IVirtualSearchFilterGroup[]>(
      ESearchFormFields.advancedFilters,
    );

    const advancedFilters = _advancedFilters?.map((advancedFilter) => {
      const filters = advancedFilter.filters.map((_filter) => {
        const options = _filter.options.map((option) => {
          return { ...option, virtualValue: false };
        });

        return { ..._filter, options, virtualValue: false };
      });

      return { ...advancedFilter, filters };
    });

    reset({
      advancedFilters,
      searchControls: getValues(ESearchFormFields.searchControls),
    });
  }, [reset, getValues]);
};

export default useClearFilters;
