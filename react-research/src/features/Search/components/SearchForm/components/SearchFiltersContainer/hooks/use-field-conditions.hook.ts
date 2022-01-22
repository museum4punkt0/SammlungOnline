import { useFieldArray, useFormContext } from 'react-hook-form';

import { IVirtualSearchAttributeCondition } from '../../../interfaces/virtual-attribute-condition.interface';
import { ISearchFormData } from '../../../interfaces/form-data.interface';

import { ESearchOperators } from '../../../../../services/search/enums/search-operators.enum';

export type UseConditions = {
  readonly conditions: (IVirtualSearchAttributeCondition & { id: string })[];
  readonly appendCondition: () => void;
  readonly removeCondition: (index?: number) => void;
};

const useFieldConditions = (name: string): UseConditions => {
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

export default useFieldConditions;
