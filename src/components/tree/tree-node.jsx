import * as React from 'react';

import TreeDirectory from './tree-directory';

export default class TreeNode extends React.Component {
  render() {
    const directories = this.props.files
      .filter(file => typeof file !== 'string')
      .sort((a, b) => a.name.localeCompare(b));
    const files = this.props.files.filter(file => typeof file === 'string').sort((a, b) => a.localeCompare(b));

    return (
      <div className="treeNode">
        {directories.map(d => (
          <TreeDirectory
            events={this.props.events}
            key={d.name}
            name={d.name}
            files={d.files}
            path={`${this.props.path}`}
          />
        ))}
        {files.map(file => (
          <div key={file} className="treeFile">
            <span onClick={() => this.props.events.emit('path', `${this.props.path}${file}`)}>{file}</span>
          </div>
        ))}
      </div>
    );
  }
}
