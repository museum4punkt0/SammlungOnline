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
} from '../../providers';

import { QueryRoot } from '../../generated/graphql';
import LanguageService from '../../utils/LanguageService';

import useStyles from './smbLayout.jss';
import {
  AdvancedSearchInfoParser,
  IFetchAdvancedSearchInfo,
} from '../../parsers/advanced-search-info.parser';
import { ILangItem, LanguageSelector } from '../LanguageSelector/LanguageSelector';

const FetchAdvancedSearchInfo = gql`
  query FetchAdvancedSearchInfo($language: String) {
    collections: smb_collections(order_by: [{ type: asc }, { title: asc }]) {
      key
      searchValue
      title
      type
    }
    compilations: smb_org_unit(
      where: { is_compilation: { _eq: true } }
      order_by: [{ collectionKey: asc }, { title: asc }]
    ) {
      collectionKey
      name: searchValue
      title
    }
    locations: smb_buildings(order_by: [{ title: asc }]) {
      key: searchValue
      title
    }
    assortments: smb_assortments(order_by: { key: asc }) {
      key: searchValue
      preview_image
      i18n(
        where: { language: { lang: { _eq: $language } } }
        order_by: [{ title: asc }]
      ) {
        title
        subtitle
      }
    }
  }
`;

const SmbLayout: React.FC = () => {
  const { configuration } = useCoreContext();
  const [dependencyContext, setDependenciesContext] = useState<IDependencyContext>();
  const { loading, error, data: advancedSearchInfo } = useQuery<QueryRoot>(
    FetchAdvancedSearchInfo,
    {
      variables: {
        language: LanguageService.getCurrentLanguage(),
      },
    },
  );

  useEffect(() => {
    const advancedInfoParser = new AdvancedSearchInfoParser(
      (advancedSearchInfo as unknown) as IFetchAdvancedSearchInfo,
    );
    const filtersInfo = advancedInfoParser.getSearchInfo();

    if (advancedSearchInfo && configuration && !loading && !error) {
      setDependenciesContext(createDependencies(configuration, filtersInfo));
    } else if (configuration && !loading && error && !advancedSearchInfo) {
      setDependenciesContext(createDependencies(configuration, filtersInfo));
    }
  }, [configuration, loading]);

  const classes = useStyles();

  // configuration.PRODUCTION_READY may be true on STAGE
  const showLanguageSelector = configuration.stage === 'stage';

  // TODO couldn't figure out how to use useTranslation here, it triggers infinite rerender
  const languages: Array<ILangItem> = [
    {
      code: "de",
      displayName: "Deutsch",
      ariaLabel: "Auswahl: Sprache Deutsch"
    }, {
      code: "en",
      displayName: "English",
      ariaLabel: "Selection: English language"
    }
  ];

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
                >
                  <LanguageSelector show={showLanguageSelector} className={''} languages={languages} />
                </Header>
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
