import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { GitObject } from '../../git';
import BSOD from '../bsod';
import GitDiscover from '../git-discover';
import RepoUrl from '../repo-url';
import Router from '../router';

import { Wrapper } from './style';

import RepoHeader from '../repo-header/index';

export interface IContext {
  url: string;
  cache: Map<string, GitObject>;
}

export const Context = React.createContext<IContext | null>(null);

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
              {({ result, loading, error }) => {
                if (loading) {
                  return <div>Loading</div>;
                } else if (result) {
                  return (
                    <Wrapper>
                      <RepoHeader />
                      <Context.Provider value={{ url, cache: new Map() }}>
                        {renderRoutes(route.routes, { gitInfos: result })}
                      </Context.Provider>
                    </Wrapper>
                  );
                } else if (error) {
                  return <BSOD error={error} />;
                } else {
                  return <></>;
                }
              }}
            </GitDiscover>
          </RepoUrl.Provider>
        );
      }}
    </Router>
  </>
);

export default RepoWrapper;
