import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, DisplayDataPage, ProfilePage, Assignments } from './pages';

const routes = [
  {
    path: '/display-data',
    component: DisplayDataPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/assignments',
    component: Assignments
  }

];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
