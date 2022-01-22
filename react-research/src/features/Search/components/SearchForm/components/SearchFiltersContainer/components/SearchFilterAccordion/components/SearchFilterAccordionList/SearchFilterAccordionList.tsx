import React from 'react';
import { useFormContext } from 'react-hook-form';

import SearchFilterAccordion from '../../SearchFilterAccordion';

import { ESearchFormFields } from '../../../../../../enums/search-form-fields.enum';

import { IVirtualSearchFilterGroup } from '../../../../../../interfaces/virtual-filter-group.interface';
import { ISearchFormData } from '../../../../../../interfaces/form-data.interface';

export interface ISearchMuseumFiltersProps {
  advancedFilters?: IVirtualSearchFilterGroup[];
}

const SearchFilterAccordionList: React.FC<ISearchMuseumFiltersProps> = () => {
  const { getValues } = useFormContext<ISearchFormData>();
  const advancedFilters = getValues(
    ESearchFormFields.advancedFilters,
  ) as IVirtualSearchFilterGroup[];

  return (
    <>
      {advancedFilters?.map((advancedFilter, i: number) => {
        const formBaseName = `${ESearchFormFields.advancedFilters}[${i}]`;

        return (
          <SearchFilterAccordion
            key={formBaseName}
            formBaseName={formBaseName}
            advancedFilter={advancedFilter}
          />
        );
      })}
    </>
  );
};

export default SearchFilterAccordionList;
