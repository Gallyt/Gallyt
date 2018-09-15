import ContributorsPage from './components/contributors-page';
import HomePage from './components/home-page';

const routes: any = [
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
  {
    component: ContributorsPage,
    exact: true,
    page: '/contributors',
  },
];

export default routes;
