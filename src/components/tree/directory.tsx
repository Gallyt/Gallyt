import * as React from 'react';
import { File } from '.';
import TreeNode from './node';

import { CaretDownIcon, CaretNextIcon, FolderIcon, Title, TitleContainer } from './style';

interface ITreeViewProps {
  name: string;
  open: boolean;
  files: File[];
  onSelect: (path: string) => void;
}

export default class TreeView extends React.PureComponent<ITreeViewProps, { open: boolean }> {
  constructor(props: ITreeViewProps) {
    super(props);
    this.state = { open: !!this.props.open };
  }

  public render() {
    const Icon = this.state.open ? CaretDownIcon : CaretNextIcon;
    return (
      <>
        <TitleContainer onClick={this.toggle}>
          <Icon />
          <FolderIcon />
          <Title>{this.props.name}</Title>
        </TitleContainer>
        {this.state.open && <TreeNode open={this.props.open} onSelect={this.select} files={this.props.files} />}
      </>
    );
  }

  private toggle = () => {
    this.setState({ open: !this.state.open });
  };

  private select = (path: string) => {
    this.props.onSelect(`${this.props.name}/${path}`);
  };
}
