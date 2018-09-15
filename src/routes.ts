import ContributorsPage from './components/contributors-page';
import HomePage from './components/home-page';
import RepoWrapper from './components/repo-wrapper';

const routes: any = [
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
  {
    component: RepoWrapper,
    path: '/repo/:repoUrl',
  },
  {
    component: ContributorsPage,
    exact: true,
    page: '/contributors',
  },
];

export default routes;
