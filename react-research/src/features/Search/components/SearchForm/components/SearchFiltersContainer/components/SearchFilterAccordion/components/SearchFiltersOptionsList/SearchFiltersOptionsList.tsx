import React from 'react';
import { useTranslation } from 'react-i18next';

import SearchFilterOptions from '../SearchFilterOptions/SearchFilterOptions';

import { IVirtualSearchFilter } from '../../../../../../interfaces/virtual-filter.interface';
import { useCreateSearchFormChangeEvent } from '../../../../../../search-form.context';

interface ISearchFiltersOptionsListProps {
    filters: IVirtualSearchFilter[];
    formBaseName: string;
}

const SearchFiltersOptionsList: React.FC<ISearchFiltersOptionsListProps> = (props) => {
    const { filters, formBaseName } = props;
    const createSearchFormChangeEvent = useCreateSearchFormChangeEvent();

    const { t } = useTranslation();

    return (
        <>
            {filters?.map(({ name, label, options }, j: number) => {
                return (
                    <SearchFilterOptions
                        key={name}
                        name={name}
                        options={options}
                        baseFormName={`${formBaseName}.filters[${j}]`}
                        label={t(label)}
                        onChange={createSearchFormChangeEvent}
                    />
                );
            })}
        </>
    );
};

export default SearchFiltersOptionsList;
