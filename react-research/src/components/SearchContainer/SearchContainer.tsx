import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ExhibitModel } from '@smb/smb-react-components-library';
import { Typography } from '@material-ui/core';

import { useDependency } from '../../providers';
import { useSearchQuery, useSearch } from '../../hooks';
import {
  ISearchFormData,
  IVirtualSearchAttributeCondition,
  IVirtualSearchFilterGroup,
  IVirtualSearchSwitch,
} from '../../types';

import { SearchResultsModule, SearchForm } from '../index';

import useStyles from './searchContainer.jss';
import { SortOption } from '../../utils/configuration/sorting-info.config';

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
  sort: SortOption;
}

const SearchContainer: React.FC = () => {
  const history = useHistory();
  const searchQuery = useSearchQuery();
  const search = useSearch();
  const { t } = useTranslation();

  const { searchQueryParamsService } = useDependency();

  const [loading, setLoading] = useState(false);

  const limit = searchQuery.limit;
  const language = searchQuery.language;

  const [offset, setOffset] = useState(searchQuery.offset);
  const [formData, setFormData] = useState<ISearchFormData>(searchQuery);

  const [searchResult, setSearchResult] = useState<ISearchResult>({
    total: 0,
    items: [],
    offset,
  });

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
      limit: 15,
      offset,
      language,
      question: formData.question,
      searchControls: formData.searchControls,
      conditions: formData.conditions,
      advancedFilters: formData.advancedFilters,
      sort: formData.sort,
    });

    history.push({
      pathname: '/',
      search: searchQuery,
    });

    handleSearch({ ...formData, limit, offset, language } as any);
  }, [formData, offset]);

  const classes = useStyles();
  const breadcrumbText = ` ${t('breadcrumb.main')} ${t('breadcrumb.research')}`;

  return (
    <div className={classes.sectionWrapper}>
      <div className={classes.sectionWrapperInner}>
        <section className={classes.container}>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.breadcrumb}
          >
            {breadcrumbText}
          </Typography>
          <SearchForm defaultValues={searchQuery} onSubmit={handleSubmit} />
        </section>
        <section className={classes.moduleContent}>
          <SearchResultsModule
            limit={limit}
            offset={offset}
            total={searchResult.total}
            loading={loading}
            data={searchResult.items}
            onChange={offset => {
              setOffset(offset);
            }}
            onSortChange={(sort: SortOption) => setFormData({ ...formData, sort: sort })}
          />
        </section>
      </div>
    </div>
  );
};

export default SearchContainer;
