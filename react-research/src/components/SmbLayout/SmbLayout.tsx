import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import {
  Header,
  Footer,
  NotFoundPage,
  LoadingSpinner,
  HeaderPlatformType,
} from '@smb/smb-react-components-library';

import { Box } from '@material-ui/core';
import SearchPage from '../../features/Search/SearchPage';
import DetailPage from '../../features/Detail/DetailPage';

import {
  createDependencies,
  DependencyContext,
  IDependencyContext,
  useCoreContext,
} from '../../providers/index';
import { AppStage } from '../../enums/index';

import { QueryRoot, SmbAssortments } from '../../generated/graphql';
import LanguageService from '../../utils/LanguageService';

import useStyles from './smbLayout.jss';

const convertAssortmentsToFilters = (
  assortments: Array<SmbAssortments>,
): { name: string; value: string }[] => {
  const filters: { name: string; value: string }[] = [];
  for (const assortment of assortments) {
    filters.push(convertAssortment(assortment));
  }
  return filters.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    return nameA > nameB ? 1 : 0;
  });
};

const convertAssortment = (object: SmbAssortments): { name: string; value: string } => {
  return {
    name: object?.i18n[0]?.title ?? object.key,
    value: object.key,
  };
};

const FetchAssortments = gql`
  query FetchAssortments($language: String) {
    smb_assortments(order_by: { key: asc }) {
      key
      preview_image
      i18n(where: { language: { lang: { _eq: $language } } }) {
        title
        description
      }
    }
  }
`;

const SmbLayout: React.FC = () => {
  const { configuration } = useCoreContext();
  const [dependencyContext, setDependenciesContext] = useState<IDependencyContext>();
  const { loading, error, data } = useQuery<QueryRoot>(FetchAssortments, {
    variables: {
      language: LanguageService.getCurrentLanguage(),
    },
  });

  useEffect(() => {
    if (data && data.smb_assortments && configuration && !loading && !error) {
      const assortmentsFilter = {
        name: 'assortments',
        filtersKey: 'assortments',
        label: 'searchForm.filters.assortments',
        sublevel: undefined,
        stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
        filters: convertAssortmentsToFilters(data.smb_assortments),
      };
      setDependenciesContext(createDependencies(configuration, assortmentsFilter));
    } else if (configuration && !loading && error && !data) {
      const assortmentsFilter = {
        name: 'assortments',
        filtersKey: 'assortments',
        label: 'searchForm.filters.assortments',
        sublevel: undefined,
        stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
        filters: [{ name: '', value: '' }],
      };
      setDependenciesContext(createDependencies(configuration, assortmentsFilter));
    }
  }, [configuration, loading]);

  const classes = useStyles();

  return (
    <>
      {!loading && dependencyContext ? (
        <DependencyContext.Provider value={dependencyContext}>
          <BrowserRouter>
            <div className={classes.root} data-testid={'smb_layout_wrapper'}>
              <Box className={classes.grow} data-testid={'root-wrapper'}>
                <Header
                  data-testid={'header-wrapper'}
                  configuration={configuration}
                  currentPortal={HeaderPlatformType.RESEARCH}
                />
                <main className={classes.wrapper} data-testid={'rooter-wrapper'}>
                  <Switch>
                    <Route path="/" component={SearchPage} exact={true} />
                    <Route
                      path="/detail/:exhibitId/:exhibitTitle?"
                      component={DetailPage}
                      exact={true}
                    />
                    <Route component={NotFoundPage} />
                  </Switch>
                </main>
                <footer className={classes.footerWrapper}>
                  <Footer configuration={configuration} showContactSection={true} />
                </footer>
              </Box>
            </div>
          </BrowserRouter>
        </DependencyContext.Provider>
      ) : (
        <div className={classes.loadingWrapper}>
          <LoadingSpinner styleClasses={classes.loadingSpinner} data-testid="spinner" />
        </div>
      )}
    </>
  );
};

export default SmbLayout;
