import React from 'react';
import { useTranslation } from 'react-i18next';

import { SearchFilterOptions } from '../index';
import { IVirtualSearchFilter } from '../../types/index';
import { useCreateSearchFormChangeEvent } from '../../providers/index';

interface ISearchFiltersOptionsListProps {
  filters: IVirtualSearchFilter[];
  formBaseName: string;
}

const SearchFiltersOptionsList: React.FC<ISearchFiltersOptionsListProps> = props => {
  const { filters, formBaseName } = props;
  const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

  const { t } = useTranslation();

  return (
    <>
      {filters?.map(({ name, label, options, index }) => {
        return (
          <SearchFilterOptions
            key={name}
            name={name}
            options={options}
            baseFormName={`${formBaseName}.filters[${index}]`}
            label={t(label)}
            onChange={createSearchFormChangeEvent}
          />
        );
      })}
    </>
  );
};

export default SearchFiltersOptionsList;
