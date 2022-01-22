import { CustomRoute } from '../types';
import LandingPage from '../features/LandingPage';
import Accessibility from '../features/Accessibility';
import Imprint from '../features/Imprint';
import Privacy from '../features/Privacy';

/**
 * Route configuration.
 * The order is important, LandingPage has to be the last one.
 */
const routes: Array<CustomRoute> = [
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
