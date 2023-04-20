import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

import { ExhibitModel, LoadingSpinner } from '@smb/smb-react-components-library';

import { ESearchResultView } from '../../enums/index';
import { SearchContent, SearchPagination } from '../index';
import { useDependency } from '../../providers/index';
import QueryParamsService from '../../utils/query-params/query-params.service';

import useStyles from './searchResults.jss';

export interface ISearchResultsModule {
  data: ExhibitModel[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
  onChange: (offset: number) => void;
}

const SearchResultsModule: React.FC<ISearchResultsModule> = props => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  const { imageUrlBuilder, linkBuilder } = useDependency();

  const { data, total, limit, offset, loading, onChange } = props;

  const defaultView =
    ((localStorage.getItem('paginationView') as unknown) as ESearchResultView) ??
    ESearchResultView.GRID;
  const [paginationView, setPaginationView] = useState<ESearchResultView>(defaultView);

  const dataWithImages = data.map(item => {
    const src = item.src ? imageUrlBuilder.createUrlFromTemplate(item.src, 300, 300) : '';

    return { ...item, src };
  });

  const onItemSelect = (item: ExhibitModel, index: number): void => {
    const queryParamsManagerService = new QueryParamsService(location.search);
    queryParamsManagerService.set('objIdx', (offset + index).toString());

    history.push({
      pathname: linkBuilder.getDetailsLink(item.id, item.title),
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
        <LoadingSpinner styleClasses={classes.loadingSpinner} />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className={classes.noResults}>
        <Typography variant="body2">{t('search.results.empty')}</Typography>
      </div>
    );
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
