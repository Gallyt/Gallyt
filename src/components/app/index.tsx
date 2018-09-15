import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from '../theme-provider';
import TreeView from '../tree/treeView';

import normalizeCss from '../../helpers/normalize-css';
import routes from '../../routes';

normalizeCss();

const App: React.SFC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <>
        {renderRoutes(routes)}
        <TreeView
          root={{
            files: [
              'package.json',
              '.gitignore',
              {
                files: [
                  'app.jsx',
                  'app.css',
                  {
                    files: [],
                    name: 'Junkrat',
                  },
                  'oneMoreFile.ts',
                  {
                    files: ['a', 'b', 'c'],
                    name: 'abc',
                  },
                ],
                name: 'src',
              },
            ],
            name: 'test',
          }}
        />
      </>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
