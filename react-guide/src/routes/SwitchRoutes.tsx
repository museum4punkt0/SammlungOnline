import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from './CustomRoute';

import { NotFoundPage } from '@smb/smb-react-components-library';

function SwitchRoutes({ routes }: { routes: CustomRoute[] }): ReactElement {
  return (
    <Switch>
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
    </Switch>
  );
}

export default SwitchRoutes;