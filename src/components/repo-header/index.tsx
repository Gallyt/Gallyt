import * as React from 'react';

import Loader from '../loader';
import { Brand, Header, Link, Links, Logo } from './style';

const RepoHeader: React.SFC = props => (
  <Header>
    <Brand>
      <Logo src="/logo.png" />
      Gallyt
    </Brand>
    <Links>
      <Link>File system</Link>
      <Link>Commits</Link>
      <Loader />
    </Links>
  </Header>
);

export default RepoHeader;
