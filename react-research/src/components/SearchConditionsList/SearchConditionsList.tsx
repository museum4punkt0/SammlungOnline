import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  SearchAttributeConditionFilterFields,
  SearchAttributeConditionFilterOperators,
} from '../../utils/configuration/config';
import { SearchConditionalField } from '../index';
import { ESearchFormFields } from '../../enums/index';
import { IVirtualSearchAttributeCondition } from '../../types/index';

interface ISearchConditionsListProps {
  onRemove: (index: number) => void;
  conditionFields: (IVirtualSearchAttributeCondition & { id: string })[];
}

const SearchConditionsList: React.FC<ISearchConditionsListProps> = props => {
  const { onRemove, conditionFields } = props;

  const { getValues } = useFormContext();

  return (
    <>
      {conditionFields.map(({ id }, index) => {
        const baseName = `${ESearchFormFields.conditions}[${index}]`;

        const { value, field, operator } = getValues<
          string,
          IVirtualSearchAttributeCondition
        >(baseName);

        return (
          <SearchConditionalField
            key={id}
            baseName={baseName}
            value={value}
            field={field ?? ''}
            operator={operator}
            operators={SearchAttributeConditionFilterOperators}
            availableFields={SearchAttributeConditionFilterFields}
            onRemove={() => onRemove(index)}
          />
        );
      })}
    </>
  );
};

export default SearchConditionsList;
