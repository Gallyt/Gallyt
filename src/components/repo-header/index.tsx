import * as React from 'react';

import { Brand, Header, Link, Links, Logo } from './style';

const RepoHeader: React.SFC<{ repoUrl: string }> = ({ repoUrl }) => (
  <Header>
    <Brand to="/">
      <Logo src="/logo.png" />
      Gallyt
    </Brand>
    <Links>
      <Link to={`/repo/${repoUrl}`}>File system</Link>
      <Link to={`/repo/${repoUrl}/commits`}>Commits</Link>
    </Links>
  </Header>
);

export default RepoHeader;
