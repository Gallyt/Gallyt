import { RouteConfig } from 'react-router-config';

import AddRepo from './components/add-repo-page';
import ContributorsPage from './components/contributors-page';
import RepoPageCommits from './components/repo-page-commits';
import RepoPageFS from './components/repo-page-fs';
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
    routes: [
      {
        component: RepoPageFS,
        exact: true,
        path: '/repo/:repoUrl',
      },
      {
        component: RepoPageCommits,
        exact: true,
        path: '/repo/:repoUrl/commits',
      },
    ],
  },
  {
    component: ContributorsPage,
    exact: true,
    path: '/contributors',
  },
];

export default routes;
