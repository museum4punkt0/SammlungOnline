import CustomRoute from './Util/CustomRoute';
import GuidePage from './View/Pages/GuidePage';
import LandingPage from './View/Pages/LandingPage';

/**
 * Route configuration.
 * The order is important, LandingPage has to be the last one.
 */
const routes: CustomRoute[] = [
    {
        // Route for speaking URL
        name: 'GuidePage',
        path: '/tour/:tourId',
        component: GuidePage,
    },
    {
        // Route for speaking URL
        name: 'GuidePage',
        path: '/tour/:tourId/:tourName',
        component: GuidePage,
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
