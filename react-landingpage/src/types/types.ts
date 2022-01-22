import React from 'react';

export interface CustomRoute {
  name?: string;
  path: string;
  component: () => React.ReactElement;
  routes?: CustomRoute[];
}
