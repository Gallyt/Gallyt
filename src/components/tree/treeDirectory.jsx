import * as React from 'react'

import TreeNode from './treeNode'

export default class TreeView extends React.Component {

  render() {
    return (
      <div className="treeDirectory">
        {this.props.name}
        <TreeNode files={this.props.files} />
      </div>
    )
  }
}