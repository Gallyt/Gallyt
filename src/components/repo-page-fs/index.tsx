import * as React from 'react';

import { Container, LeftBar, RightContent } from './style';

import Tree from '../tree/directory';

const RepoPageFS: React.SFC = () => (
  <Container>
    <LeftBar>
      <Tree
        name="REPO:NAME"
        open={true}
        files={['a', 'b', '0', { name: 'garry', files: ['1', '2', '8', '3', '4', '6'] }]}
        onSelect={[console][0].log}
      />
    </LeftBar>
    <RightContent>RIGHT</RightContent>
  </Container>
);

export default RepoPageFS;
