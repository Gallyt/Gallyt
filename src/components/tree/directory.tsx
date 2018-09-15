import * as React from 'react';
import TreeNode from './node';

import { CaretDownIcon, CaretNextIcon, FolderIcon, Title, TitleContainer } from './style';

interface IProps {
  name: string;
  open?: boolean;
  tree: string;
  onSelect: (path: string, oid: string) => void;
}

export default class TreeView extends React.PureComponent<IProps, { open: boolean }> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: !!this.props.open };
  }

  public render() {
    const Icon = this.state.open ? CaretDownIcon : CaretNextIcon;
    return (
      <>
        <TitleContainer onClick={this.toggle}>
          <FolderIcon />
          <Icon />
          <Title>{this.props.name}</Title>
        </TitleContainer>
        {this.state.open && <TreeNode onSelect={this.select} tree={this.props.tree} />}
      </>
    );
  }

  private toggle = () => {
    this.setState({ open: !this.state.open });
  };

  private select = (path: string, oid: string) => {
    this.props.onSelect(`${this.props.name}/${path}`, oid);
  };
}
