import * as React from 'react'

import TreeDirectory from './treeDirectory'

export default class TreeNode extends React.Component {

  render() {
    const directories = this.props.files.filter(file => typeof file !== 'string').sort((a,b) => a.name.localeCompare(b))
    const files = this.props.files.filter(file => typeof file === 'string').sort((a,b) => a.localeCompare(b))

    return (
      <div className="treeNode">
        {
          directories.map(d => <TreeDirectory key={d.name} name={d.name} files={d.files} />)
        }
        {
          files.map(file => <div className="treeFile">{file}</div>)
        }
      </div>
    )
  }
}