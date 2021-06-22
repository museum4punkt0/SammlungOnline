import CustomRoute from './Util/CustomRoute';
import LandingPage from './View/Pages/LandingPage';
import Accessibility from './View/Pages/legalNotes/Accessibility';
import Imprint from './View/Pages/legalNotes/Imprint';
import Privacy from './View/Pages/legalNotes/Privacy';

/**
 * Route configuration.
 * The order is important, LandingPage has to be the last one.
 */
const routes: CustomRoute[] = [
    {
        name: 'Imprint',
        path: '/imprint',
        component: Imprint,
    },
    {
        name: 'Privacy',
        path: '/privacy',
        component: Privacy,
    },
    {
        name: 'Accessibility',
        path: '/accessibility',
        component: Accessibility,
    },
    {
        name: 'LandingPage',
        path: '/',
        component: LandingPage,
    },
];

export default routes;
