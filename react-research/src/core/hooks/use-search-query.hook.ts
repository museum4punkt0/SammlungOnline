import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ISearchQueryData } from '../../features/Search/components/SearchContainer/SearchContainer';

import { useDependency } from '../store/dependency.context';

export const useSearchQuery = (): ISearchQueryData => {
    const { searchQueryParamsService } = useDependency();
    const { search: queryParams } = useLocation();

    const [searchQueryParamsData, setSearchQueryParamsData] = useState<ISearchQueryData>(
        searchQueryParamsService.parse(queryParams),
    );

    useEffect(() => {
        const _searchQueryParamsData = searchQueryParamsService.parse(queryParams);

        setSearchQueryParamsData(_searchQueryParamsData);
    }, []);

    return searchQueryParamsData;
};
