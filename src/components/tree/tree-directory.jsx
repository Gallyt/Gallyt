import * as React from 'react';

import TreeNode from './tree-node';

export default class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: !!this.props.open };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const path = this.props.path === undefined ? '/' : `${this.props.path}${this.props.name}/`;
    return (
      <div className={`treeDirectory ${this.state.open ? 'open' : 'closed'}`}>
        <span onClick={() => this.toggle()} className="icon" />
        <span onClick={() => this.props.events.emit('path', path)}>{this.props.name}</span>
        <TreeNode open={this.props.open} events={this.props.events} files={this.props.files} path={path} />
      </div>
    );
  }
}
