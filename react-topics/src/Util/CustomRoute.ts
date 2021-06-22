import React from 'react';

export default interface CustomRoute {
    name?: string;
    path: string;
    component: React.ComponentType<any>;
    routes?: CustomRoute[];
}
