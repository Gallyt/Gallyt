import * as React from 'react';

import { BottomContent, SideBar, TitleBox, TopContent } from './style';

const RepoSideBar: React.SFC = props => (
  <SideBar>
    <TopContent>
      <TitleBox>'s'</TitleBox>
      TOP CONTENT
    </TopContent>
    <BottomContent>BOTTOM CONTENT</BottomContent>
  </SideBar>
);

export default RepoSideBar;
