import { useFormContext, useWatch } from 'react-hook-form';
import { IVirtualSearchFilterGroup } from '../types/index';

export const useActiveFiltersCount = (name: string): number => {
  const { getValues, control } = useFormContext();
  const { filters } = useWatch<IVirtualSearchFilterGroup>({
    name,
    control,
    defaultValue: getValues(name),
  });

  return filters.filter(({ virtualValue }) => virtualValue).length;
};
