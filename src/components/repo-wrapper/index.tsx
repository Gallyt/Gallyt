import * as React from 'react';

import RepoUrl from '../repo-url';
import Router from '../router';

import { Wrapper } from './style';

interface IProps {
  children: React.ReactNode;
}

const RepoWrapper: React.SFC<IProps> = ({ children }) => (
  <>
    <Router>
      {({ match: { params } }) => (
        <RepoUrl.Provider value={{ url: params.repoUrl }}>
          <Wrapper>{children}</Wrapper>
        </RepoUrl.Provider>
      )}
    </Router>
  </>
);

export default RepoWrapper;
