/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './CustomRoute';

import {
  NotFoundPage,
  NoDataPage,
  SiteConfigService,
  WrappedSpinner,
} from '@smb/smb-react-components-library';

function SwitchRoutes({ routes }: { routes: CustomRoute[] }): ReactElement {
  const siteConfigService = new SiteConfigService();
  const { loading, contextData } = siteConfigService.getGuidePage();

  return (
    <Switch>
      {!loading && !contextData && (
        <>
          {routes.map((route: CustomRoute, index: number) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              render={(): ReactElement => {
                return <route.component />;
              }}
              exact={true}
            />
          ))}
          <Route component={NotFoundPage} />
        </>
      )}
      {!loading && contextData ? (
        <Route
          component={() => (
            <NoDataPage content={{ ...contextData.attributes }} />
          )}
        />
      ) : (
        <WrappedSpinner loading={true} platform={'guide'} />
      )}
    </Switch>
  );
}

export default SwitchRoutes;
