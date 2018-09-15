import * as React from 'react';

import { Brand, Header, Link } from './style';

const RepoHeader: React.SFC = props => (
  <Header>
    <Brand>Gallyt</Brand>
    <Link>File system</Link>
    <Link>Commits</Link>
  </Header>
);

export default RepoHeader;
