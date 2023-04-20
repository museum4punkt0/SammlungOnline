import React from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchFilterAccordion } from '../index';
import { ESearchFormFields } from '../../enums/index';
import { IVirtualSearchFilterGroup, ISearchFormData } from '../../types/index';

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
