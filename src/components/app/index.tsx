import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import normalizeCss from '../../helpers/normalize-css';
import routes from '../../routes';
import ThemeProvider from '../theme-provider';

normalizeCss();

const App: React.SFC = () => (
  <BrowserRouter>
    <ThemeProvider>{renderRoutes(routes)}</ThemeProvider>
  </BrowserRouter>
);

export default App;
