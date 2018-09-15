import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import GitDiscover from '../git-discover';
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
      {({ match: { params } }) => {
        const url = decodeURIComponent(params.repoUrl);

        return (
          <RepoUrl.Provider value={{ url }}>
            <GitDiscover url={url}>
              {({ result, loading, error }) => (
                <Wrapper>
                  <RepoHeader />
                  {renderRoutes(route.routes)}
                </Wrapper>
              )}
            </GitDiscover>
          </RepoUrl.Provider>
        );
      }}
    </Router>
  </>
);

export default RepoWrapper;
