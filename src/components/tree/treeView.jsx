import * as React from 'react'

import './treeView.css'

import TreeDirectory from './treeDirectory'

export default class TreeView extends React.Component {

  render() {
    return (
      <div className="treeView">
        <TreeDirectory name={this.props.root.name} files={this.props.root.files} />
      </div>
    )
  }
}