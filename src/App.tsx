import * as React from 'react';
import './App.css';

import TreeView from './components/tree/treeView';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
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
      </div>
    );
  }
}

export default App;
