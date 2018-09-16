import * as React from 'react';
import TreeNode from './node';

import { CaretDownIcon, CaretNextIcon, FolderIcon, Title, TitleContainer } from './style';

interface IProps {
  name: string;
  open?: boolean;
  tree: string;
  onSelect: (path: string, oid: string) => void;
  opened: string[];
  onToggle: (tree: string, opened: boolean) => void;
}

const Directory: React.SFC<IProps> = props => {
  const opened = props.opened.indexOf(props.tree) >= 0;
  const Icon = opened ? CaretDownIcon : CaretNextIcon;

  const onSelect = (path: string, oid: string) => props.onSelect(`${props.name}/${path}`, oid);
  return (
    <>
      <TitleContainer onClick={props.onToggle.bind(props, props.tree, opened)}>
        <FolderIcon />
        <Icon />
        <Title>{props.name}</Title>
      </TitleContainer>
      {opened && <TreeNode onSelect={onSelect} tree={props.tree} opened={props.opened} onToggle={props.onToggle} />}
    </>
  );
};

export default Directory;
