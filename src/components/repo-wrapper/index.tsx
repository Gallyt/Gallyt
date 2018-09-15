import * as React from 'react';

import { Wrapper } from './style';

interface IProps {
  children: React.ReactNode;
}

const RepoWrapper: React.SFC<IProps> = ({ children }) => <Wrapper>{children}</Wrapper>;

export default RepoWrapper;
