import * as React from 'react';

import { Brand, Header, Link, Links, Logo } from './style';

const RepoHeader: React.SFC = props => (
  <Header>
    <Brand>
      <Logo src="/logo.png" />
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        Gallyt
      </a>
    </Brand>
    <Links>
      <Link>File system</Link>
      <Link>Commits</Link>
    </Links>
  </Header>
);

export default RepoHeader;
