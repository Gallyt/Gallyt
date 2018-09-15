import AddRepo from './components/add-repo-page';
import ContributorsPage from './components/contributors-page';
import RepoWrapper from './components/repo-wrapper';
// import FsPage from './components/'

const routes: any = [
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
        component: '',
        exact: true,
        path: '/fs',
      },
    ],
  },
  {
    component: ContributorsPage,
    exact: true,
    page: '/contributors',
  },
];

export default routes;
