import * as React from 'react';

import { Brand, Header, Link, Links, Logo } from './style';

const RepoHeader: React.SFC = props => (
  <Header>
    <Brand>
      <Logo src="/logo.svg" />
      Gallyt
    </Brand>
    <Links>
      <Link>File system</Link>
      <Link>Commits</Link>
    </Links>
  </Header>
);

export default RepoHeader;
