import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { ISearchFormData, IVirtualSearchFilterGroup } from '../types/index';
import { ESearchFormFields } from '../enums/index';

export const useClearFilters = () => {
  const { reset, getValues } = useFormContext<ISearchFormData>();

  return useCallback(() => {
    const _advancedFilters = getValues<string, IVirtualSearchFilterGroup[]>(
      ESearchFormFields.advancedFilters,
    );

    const advancedFilters = _advancedFilters?.map(advancedFilter => {
      const filters = advancedFilter.filters.map(_filter => {
        const options = _filter.options.map(option => {
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
