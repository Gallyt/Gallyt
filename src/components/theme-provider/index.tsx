import * as React from 'react';
import { ThemeProvider as OThemeProvider } from 'styled-components';

import theme from '../../theme';

interface IProps {
  children: React.ReactNode;
}

const ThemeProvider: React.SFC<IProps> = ({ children }) => <OThemeProvider theme={theme}>{children}</OThemeProvider>;

export default ThemeProvider;
