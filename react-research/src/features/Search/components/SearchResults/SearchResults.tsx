import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ESearchResultView } from '../../enums/search-result-view.enum';

import { SearchContent } from './components/SearchContent/SearchContent';
import { SearchPagination } from './components/SearchPagination/SearchPagination';

import { ExhibitModel, LoadingSpinner } from '@smb/smb-react-components-library';
import { useDependency } from '../../../../context/dependency.context';
import QueryParamsService from '../../../../utils/query-params/query-params.service';

import useStyles from './searchResults.jss';

export interface ISearchResultsModule {
  data: ExhibitModel[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
  onChange: (offset: number) => void;
}

const SearchResultsModule: React.FC<ISearchResultsModule> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  const { imageUrlBuilder } = useDependency();

  const { data, total, limit, offset, loading, onChange } = props;

  const defaultView =
    (localStorage.getItem('paginationView') as unknown as ESearchResultView) ??
    ESearchResultView.GRID;
  const [paginationView, setPaginationView] = useState<ESearchResultView>(defaultView);

  const dataWithImages = data.map((item) => {
    const src = item.src ? imageUrlBuilder.createUrlFromTemplate(item.src, 300, 300) : '';

    return { ...item, src };
  });

  const onItemSelect = (item: ExhibitModel, index: number): void => {
    const queryParamsManagerService = new QueryParamsService(location.search);

    queryParamsManagerService.set('exhibitOverviewOffset', (offset + index).toString());
    const encodedTitle = encodeURIComponent(item.title);

    history.push({
      pathname: `/detail/${item.id}/${encodedTitle}`,
      search: queryParamsManagerService.getQueryString(),
    });
  };

  const toggleViewStyle = () => {
    const newView =
      paginationView === ESearchResultView.GRID
        ? ESearchResultView.LIST
        : ESearchResultView.GRID;

    localStorage.setItem('paginationView', newView);
    setPaginationView(newView);
  };

  const classes = useStyles();

  if (loading) {
    return (
      <div data-testid={'page-loading-spinner'} className={classes.spinnerContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!data?.length) {
    return <div className={classes.noResults}>{t('search.results.empty')}</div>;
  }

  return (
    <>
      <SearchPagination
        limit={limit}
        total={total}
        offset={offset}
        view={paginationView}
        onOffsetChange={onChange}
        onViewChange={toggleViewStyle}
      />
      <div className={classes.content}>
        <SearchContent
          data={dataWithImages}
          view={paginationView}
          onClick={onItemSelect}
        />
      </div>
      <SearchPagination
        limit={limit}
        total={total}
        offset={offset}
        onOffsetChange={(offset: number) => {
          onChange(offset);
          window.scroll(0, 0);
        }}
        viewToggle={false}
      />
    </>
  );
};

export default SearchResultsModule;
