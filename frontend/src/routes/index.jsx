import Root from '@components/layouts/root';

import { default as baseRoutes } from './base';
import { default as appRoutes } from './application';
import { default as auth } from './auth';

// default routes should always be at last
const combinedRoutes = [baseRoutes, auth, appRoutes];

const route = [{ Component: Root, children: combinedRoutes }];

export default route;
