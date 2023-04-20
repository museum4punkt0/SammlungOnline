/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import { Typography } from '@material-ui/core';

import { useDependency } from '../../providers/index';
import { ISearchResult, ISearchFormData } from '../../types/index';
import { useSearchQuery, useSearch } from '../../hooks/index';

import { SearchForm, SearchResultsModule } from '../../components/index';

import {
  Sections,
  TextModuleType,
  TextSectionContextData,
  LandingpageService,
  WrappedSpinner,
} from '@smb/smb-react-components-library';

import useStyles from './searchPage.jss';

const SearchPage: React.FC = () => {
  const searchQuery = useSearchQuery();
  const { searchQueryParamsService } = useDependency();
  const history = useHistory();
  const search = useSearch();
  const { t } = useTranslation();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(searchQuery.offset);
  const [formData, setFormData] = useState<ISearchFormData>(searchQuery);
  const [searchResult, setSearchResult] = useState<ISearchResult>({
    total: 0,
    items: [],
    offset,
  });
  const limit = searchQuery.limit;
  const language = searchQuery.language;

  const landingpageService = new LandingpageService();
  const {
    data: sectionsData,
    loading: sectionsDataLoading,
  } = landingpageService.getLandingpageSections();

  const textSectionContext: TextSectionContextData = {
    sections: sectionsData || [],
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
    });

    history.push({
      pathname: '/',
      search: searchQuery,
    });

    handleSearch({ ...formData, limit, offset, language } as any);
  }, [formData, offset]);

  const handleSubmit = (data: ISearchFormData) => {
    setFormData({ ...data });
    setOffset(0);
  };

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

  const breadcrumbText = ` ${t('breadcrumb.main')} ${t('breadcrumb.research')}`;
  const metaTitle = 'Recherche | Staatliche Museen zu Berlin';
  const metaDescription =
    'Recherche in den Online-Sammlungen der Staatlichen Museen zu Berlin';
  const metaLink = 'https://recherche.smb.museum';

  return (
    <>
      {!sectionsDataLoading ? (
        <>
          <Helmet>
            <meta property="og:url" content={metaLink} />
            <link rel="canonical" href={metaLink} />
            <meta property="og:title" content={metaTitle} />
            <meta name="twitter:title" content={metaTitle} />
            <meta property="title" content={metaTitle} />
            <title>{metaTitle}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:description" content={metaDescription} />
          </Helmet>
          <section className={classes.sectionWrapper}>
            <div className={classes.sectionWrapperInner}>
              <div className={classes.container}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={classes.breadcrumb}
                >
                  {breadcrumbText}
                </Typography>
                <SearchForm defaultValues={searchQuery} onSubmit={handleSubmit} />
              </div>
              <div className={classes.moduleContent}>
                <SearchResultsModule
                  limit={limit}
                  offset={offset}
                  total={searchResult.total}
                  loading={loading}
                  data={searchResult.items}
                  onChange={offset => {
                    setOffset(offset);
                  }}
                />
              </div>
            </div>
          </section>
          {!sectionsDataLoading && (
            <Sections
              sections={textSectionContext.sections}
              allowedSectionTypes={[TextModuleType.TOPIC, TextModuleType.GUIDE]}
            ></Sections>
          )}
        </>
      ) : (
        <WrappedSpinner loading={true} platform={'research'} />
      )}
    </>
  );
};

export default SearchPage;
