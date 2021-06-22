import LandingPage from './View/Pages/LandingPage';
import CollectionPlayerPage from './View/Pages/CollectionPlayerPage';
import CustomRoute from './Util/CustomRoute';

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
