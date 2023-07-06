import React from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchFilterAccordion } from '../index';
import { ESearchFormFields } from '../../enums';
import { IVirtualSearchFilterGroup, ISearchFormData } from '../../types';

export interface ISearchMuseumFiltersProps {
  advancedFilters?: IVirtualSearchFilterGroup[];
}

/**
 * Component rendering the list of SearchFilterAccordion for each group of
 * filters (location, collectionKey, assortments). Wrap filters in a
 * FacetsContextProvider for further filtering of 'disabled' state of the
 * advanced filters.
 * @constructor
 */
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
