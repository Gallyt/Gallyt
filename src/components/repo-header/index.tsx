import * as React from 'react';

import { Brand, Header, Link, Links, Logo, Vote } from './style';

const VOTE_URL = 'https://www.reactriot.com/entries/188-es-community/vote';

const RepoHeader: React.SFC<{ repoUrl: string }> = ({ repoUrl }) => {
  const onClick = () => !window.open(VOTE_URL, 'ReactRiot', 'width=500,height=500');

  return (
    <Header>
      <Brand to="/">
        <Logo src="/logo.png" />
        Gallyt
      </Brand>
      <Links>
        <Link to={`/repo/${repoUrl}`}>File system</Link>
        <Link to={`/repo/${repoUrl}/commits`}>Commits</Link>
        <Vote href={VOTE_URL} target="_blank" onClick={onClick}>
          Vote for us
        </Vote>
      </Links>
    </Header>
  );
};

export default RepoHeader;
