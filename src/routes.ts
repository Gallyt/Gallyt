import AddRepo from './components/add-repo-page';
import ContributorsPage from './components/contributors-page';
import RepoWrapper from './components/repo-wrapper';

const routes: any = [
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
    page: '/contributors',
  },
];

export default routes;
