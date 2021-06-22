import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomRoute from '../Util/CustomRoute';

import { NotFoundPage } from 'smb-react-components-library';

function SwitchRoutes({ routes }: { routes: CustomRoute[] }): ReactElement {
    return (
        <Switch>
            {routes.map((route: CustomRoute, index: number) => (
                <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={true}
                />
            ))}
             <Route component={NotFoundPage} />
        </Switch>
    );
}

export default SwitchRoutes;
