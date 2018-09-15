import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import RepoUrl from '../repo-url';
import Router from '../router';

import { Wrapper } from './style';

import RepoHeader from '../repo-header/index';

interface IProps {
  route: RouteConfig;
}

const RepoWrapper: React.SFC<IProps> = ({ route }) => (
  <>
    <Router>
      {({ match: { params } }) => (
        <RepoUrl.Provider value={{ url: params.repoUrl }}>
          <Wrapper>
            <RepoHeader />
            {renderRoutes(route.routes)}
          </Wrapper>
        </RepoUrl.Provider>
      )}
    </Router>
  </>
);

export default RepoWrapper;
