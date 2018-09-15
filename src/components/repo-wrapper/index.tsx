import * as React from 'react';

import RepoUrl from '../repo-url';
import Router from '../router';

import { Wrapper } from './style';

import RepoSideBar from '../repo-sidebar/index';

interface IProps {
  children: React.ReactNode;
}

const RepoWrapper: React.SFC<IProps> = ({ children }) => (
  <>
    <Router>
      {({ match: { params } }) => (
        <RepoUrl.Provider value={{ url: params.repoUrl }}>
          <Wrapper>
            <RepoSideBar />
            <div>{children}</div>
          </Wrapper>
        </RepoUrl.Provider>
      )}
    </Router>
  </>
);

export default RepoWrapper;
