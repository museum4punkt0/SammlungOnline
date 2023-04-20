import React, { useState, useEffect, ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CustomRoute } from '../types';
import LandingPage from '../features/LandingPage';

import {
  NotFoundPage,
  SiteConfigService,
  WrappedSpinner,
  StaticPages,
} from '@smb/smb-react-components-library';

const languageRoutePath = '/:locale(de-LS|de-DGS|en|en-SL|en-ASL)?';

function SwitchRoutes(): ReactElement {
  const [routes, setRoutes] = useState<CustomRoute[]>([]);
  const siteConfigService = new SiteConfigService();
  const { data, loading } = siteConfigService.getStaticPages();

  useEffect(() => {
    if (!loading && data) {
      const routes = getStaticRoutes();
      setRoutes(routes);
    }
  }, [loading]);

  const slashRoute = {
    name: 'LandingPage',
    path: '/',
    component: LandingPage,
  };

  const getStaticRoutes = () => {
    const apiRoutes = data;
    return apiRoutes
      ? apiRoutes.map((page) => {
          return {
            name: page.name,
            path: `/${page?.path}`,
          };
        })
      : [];
  };

  const getPageContent = (path: any) => {
    const page = data?.filter((page) => `/${page.path}` == path);

    if (page) return page[0];
    else return [];
  };

  return (
    <Switch>
      {!loading ? (
        data &&
        routes &&
        routes.length &&
        routes.map((route: CustomRoute, index: number) => (
          <Route
            key={index}
            path={`${languageRoutePath}${route.path}`}
            component={() => (
              <StaticPages content={getPageContent(route.path)} />
            )}
            exact={true}
          />
        ))
      ) : (
        <WrappedSpinner loading={true} platform={'intro'} />
      )}
      <Route
        path={`${languageRoutePath}${slashRoute.path}`}
        exact={true}
        component={slashRoute.component}
      />
      <Redirect from="/de" to="/" />
      {!loading && <Route component={NotFoundPage} />}
    </Switch>
  );
}

export default SwitchRoutes;
