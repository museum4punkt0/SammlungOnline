import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  SearchAttributeConditionFilterFields,
  SearchAttributeConditionFilterOperators,
} from '../../utils/configuration/config';
import { SearchConditionalField } from '../index';
import { ESearchFormFields } from '../../enums';
import { IVirtualSearchAttributeCondition } from '../../types';

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
        const values = getValues<string, IVirtualSearchAttributeCondition>(baseName);

        if (!values) return;
        const { value, field, operator } = values;

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
