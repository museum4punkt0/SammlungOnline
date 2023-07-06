import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { SearchInput, DataRangeInput } from '../index';
import { IDateRangeFilter, ISearchAttributeOption, ISuggestion } from '../../types/index';

import { ESearchConditionFields } from '../../enums/index';
import { useFacetsContext } from "../../providers";

interface ISearchConditionalInputFactoryProps {
  name: string;
  value: string | IDateRangeFilter;
  fields: ISearchAttributeOption<ESearchConditionFields>[];
  onChange: () => void;
}

const SearchConditionalInputFactory: React.FC<ISearchConditionalInputFactoryProps> = props => {
  const { name, value, fields, onChange } = props;
  const { t } = useTranslation();
  const { control, getValues } = useFormContext();
  const { updateFacets } = useFacetsContext();

  const field =
    useWatch<string>({
      name: `${name}.field`,
      control,
      defaultValue: getValues(`${name}.field`),
    }) ?? ESearchConditionFields.dateRange;

  const label = useMemo(() => {
    return fields.find(({ value }) => value === field)?.label ?? '';
  }, [field, fields]);

  const { field: fieldInput } = useController({
    name: `${name}.value`,
    control,
    defaultValue: value,
  });

  const handleSelect = (value: string | ISuggestion) => {
    if (typeof value === 'string') {
      fieldInput.onChange(value);
    } else {
      fieldInput.onChange(value?.value);
    }
    onChange();
  };

  switch (field) {
    case ESearchConditionFields.dateRange:
      return (
        <DataRangeInput
          value={fieldInput.value}
          defaultValue={value as IDateRangeFilter}
          onBlur={onChange}
          onChange={fieldInput.onChange}
        />
      );
    default:
      return (
        <SearchInput
          value={fieldInput.value}
          defaultValue={value as string}
          variant="standard"
          label={t(label)}
          fieldName={field}
          onBlur={onChange}
          onSelect={val => {
            handleSelect(val);
            updateFacets();
          }}
          onChange={fieldInput.onChange}
          isExtendedSearchInput={true}
        />
      );
  }
};

export default SearchConditionalInputFactory;
