import * as React from 'react';

import { File, IDirectory } from '.';
import Directory from './directory';
import { DocumentIcon, NodeContainer, Title, TitleContainer } from './style';

interface ITreeNodeProps {
  files: File[];
  open: boolean;
  onSelect: (path: string) => void;
}

const TreeNode: React.SFC<ITreeNodeProps> = props => {
  const directories = (props.files.filter(file => typeof file !== 'string') as IDirectory[]).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const files = (props.files.filter(file => typeof file === 'string') as string[]).sort((a, b) => a.localeCompare(b));

  return (
    <NodeContainer>
      {directories.map(d => (
        <Directory key={d.name} name={d.name} files={d.files} open={props.open} onSelect={props.onSelect} />
      ))}
      {files.map(file => (
        <TitleContainer key={file} onClick={props.onSelect.bind(props, file)}>
          <DocumentIcon />
          <Title>{file}</Title>
        </TitleContainer>
      ))}
    </NodeContainer>
  );
};

export default TreeNode;
