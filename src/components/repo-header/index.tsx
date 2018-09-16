import * as React from 'react';

import { Brand, Header, Link, Links, Logo, Vote } from './style';

const RepoHeader: React.SFC<{ repoUrl: string }> = ({ repoUrl }) => (
  <Header>
    <Brand to="/">
      <Logo src="/logo.png" />
      Gallyt
    </Brand>
    <Links>
      <Link to={`/repo/${repoUrl}`}>File system</Link>
      <Link to={`/repo/${repoUrl}/commits`}>Commits</Link>
      <Link to={`/repo/${repoUrl}/commits`}>Commits</Link>
      <Vote href="https://www.reactriot.com/entries/188-es-community/vote" target="_blank">
        Vote for us
      </Vote>
    </Links>
  </Header>
);

export default RepoHeader;
