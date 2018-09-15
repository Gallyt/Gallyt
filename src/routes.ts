import { RouteConfig } from 'react-router-config';

import AddRepo from './components/add-repo-page';
import ContributorsPage from './components/contributors-page';
import RepoWrapper from './components/repo-wrapper';

const routes: RouteConfig[] = [
  {
    component: AddRepo,
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
    path: '/contributors',
  },
];

export default routes;
