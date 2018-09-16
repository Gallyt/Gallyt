import * as React from 'react';

import { Thanks } from '../thanks';

import { Brand, Header, Link, Links, Logo, Vote } from './style';

const VOTE_URL = 'https://www.reactriot.com/entries/188-es-community/vote';

const onClick = (showThanks: () => void) => () => {
  showThanks();
  return !window.open(VOTE_URL, 'ReactRiot', 'width=500,height=500');
};

const RepoHeader: React.SFC<{ repoUrl: string }> = ({ repoUrl }) => {
  return (
    <Thanks.Consumer>
      {({ showThanks }) => (
        <Header>
          <Brand to="/">
            <Logo src="/logo.png" />
            Gallyt
          </Brand>
          <Links>
            <Link to={`/repo/${repoUrl}`}>File system</Link>
            <Link to={`/repo/${repoUrl}/commits`}>Commits</Link>
            <Vote href={VOTE_URL} target="_blank" onClick={onClick(showThanks)}>
              Vote for us
            </Vote>
          </Links>
        </Header>
      )}
    </Thanks.Consumer>
  );
};

export default RepoHeader;
