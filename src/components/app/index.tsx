import * as React from 'react';

import ThemeProvider from '../theme-provider';
import TreeView from '../tree/treeView';

import normalizeCss from '../../helpers/normalize-css';

normalizeCss();

const App: React.SFC = () => (
  <ThemeProvider>
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
  </ThemeProvider>
);

export default App;
