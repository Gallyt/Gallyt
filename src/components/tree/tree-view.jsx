import * as React from 'react';

import './tree-view.css';

import TreeDirectory from './tree-directory';
import * as Events from 'events';

export default class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.events = new Events();
    this.events.on('path', path => {
      this.props.handleSelect(path);
      this.setState({ selected: path });
    });

    this.state = { selected: '/' };
  }

  render() {
    return (
      <div className="treeView">
        {this.state.selected}
        <TreeDirectory open={true} name={this.props.root.name} files={this.props.root.files} events={this.events} />
      </div>
    );
  }
}
