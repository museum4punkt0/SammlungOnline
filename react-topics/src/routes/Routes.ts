import LandingPage from '../features/LandingPage/components/LandingPage';
import CollectionPlayerPage from '../features/CollectionPlayerPage/components/CollectionPlayerPage';
import CustomRoute from './CustomRoute';

/**
 * Route configuration.
 * The order is important, LandingPage has to be the last one.
 */
const routes: CustomRoute[] = [
  {
    // Route for Perma-URL
    name: 'CollectionPlayerPage',
    path: '/collections/:collectionId',
    component: CollectionPlayerPage,
  },
  {
    // Route for speaking URL
    name: 'CollectionPlayerPage',
    path: '/collections/:collectionId/:collectionName',
    component: CollectionPlayerPage,
  },
  {
    name: 'LandingPage',
    path: '/',
    component: LandingPage,
  },
];

export function getSubRoutes(parentName: string): CustomRoute[] {
  for (const routesKey in routes) {
    const route = routes[routesKey];
    if (route.name === parentName && route.routes !== undefined) {
      return route.routes;
    }
  }

  return [];
}

export default routes;
