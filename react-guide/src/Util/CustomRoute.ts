import React from 'react';

export default interface CustomRoute {
    name?: string;
    path: string;
    component: () => React.ReactElement;
    routes?: CustomRoute[];
}
