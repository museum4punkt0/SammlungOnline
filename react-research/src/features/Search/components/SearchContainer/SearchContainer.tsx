import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ExhibitModel } from 'smb-react-components-library';

import { useSearchQuery } from '../../../../core/hooks/use-search-query.hook';
import { useSearch } from '../../../../core/hooks/use-search.hook';
import { ISearchFormData } from '../SearchForm/interfaces/form-data.interface';
import { IVirtualSearchAttributeCondition } from '../SearchForm/interfaces/virtual-attribute-condition.interface';
import { IVirtualSearchFilterGroup } from '../SearchForm/interfaces/virtual-filter-group.interface';
import { IVirtualSearchSwitch } from '../SearchForm/interfaces/virtual-switch.interface';
import SearchForm from '../SearchForm/SearchForm';
import SearchResultsModule from '../SearchResults/SearchResults';

import useStyles from './searchContainer.jss';
import { useDependency } from '../../../../core/store/dependency.context';

export interface ISearchResult {
    items: ExhibitModel[];
    total: number;
    offset: number;
}

export interface ISearchQueryData {
    offset: number;
    limit: number;
    language: string;
    question: string;
    searchControls: IVirtualSearchSwitch[];
    conditions: IVirtualSearchAttributeCondition[];
    advancedFilters: IVirtualSearchFilterGroup[];
}

const SearchContainer: React.FC = () => {
    const history = useHistory();
    const searchQuery = useSearchQuery();
    const search = useSearch();

    const { searchQueryParamsService } = useDependency();

    const [loading, setLoading] = useState(false);

    const limit = searchQuery.limit;
    const language = searchQuery.language;

    const [offset, setOffset] = useState(searchQuery.offset);
    const [formData, setFormData] = useState<ISearchFormData>(searchQuery);

    const [searchResult, setSearchResult] = useState<ISearchResult>({ total: 0, items: [], offset });

    const handleSearch = (data: ISearchFormData) => {
        setLoading(true);

        search({ ...data, limit, offset, language })
            .then((response: any) => {
                setSearchResult({
                    items: response.objects,
                    offset: response.offset,
                    total: response.total,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (data: ISearchFormData) => {
        setFormData({ ...data });
        setOffset(0);
    };

    useEffect(() => {
        const searchQuery = searchQueryParamsService.create({
            limit,
            offset,
            language,
            question: formData.question,
            searchControls: formData.searchControls,
            conditions: formData.conditions,
            advancedFilters: formData.advancedFilters,
        });

        history.push({
            pathname: '/',
            search: searchQuery,
        });

        handleSearch({ ...formData, limit, offset, language } as any);
    }, [formData, offset]);

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <SearchForm defaultValues={searchQuery} onSubmit={handleSubmit} />
            </div>
            <div className={classes.moduleContent}>
                <SearchResultsModule
                    limit={limit}
                    offset={offset}
                    total={searchResult.total}
                    loading={loading}
                    data={searchResult.items}
                    onChange={(offset) => {
                        setOffset(offset);
                    }}
                />
            </div>
        </div>
    );
};

export default SearchContainer;
