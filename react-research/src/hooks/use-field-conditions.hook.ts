import { useFieldArray, useFormContext } from 'react-hook-form';
import { IVirtualSearchAttributeCondition, ISearchFormData } from '../types/index';
import { ESearchOperators } from '../enums/index';

export type UseConditions = {
  readonly conditions: (IVirtualSearchAttributeCondition & { id: string })[];
  readonly appendCondition: () => void;
  readonly removeCondition: (index?: number) => void;
};

export const useFieldConditions = (name: string): UseConditions => {
  const { control } = useFormContext<ISearchFormData>();
  const {
    fields: conditionsFields,
    append: appendCondition,
    remove: removeCondition,
  } = useFieldArray({
    name,
    control,
  });

  const handleAddCondition = () => {
    appendCondition({
      value: '',
      field: null,
      operator: ESearchOperators.AND,
    });
  };

  return {
    conditions: conditionsFields as (IVirtualSearchAttributeCondition & { id: string })[],
    removeCondition,
    appendCondition: handleAddCondition,
  };
};
