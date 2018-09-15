import { TreeDescription } from 'isomorphic-git';
import * as React from 'react';

import GitObject from '../git-object';
import Directory from './directory';
import { DocumentIcon, NodeContainer, Title, TitleContainer } from './style';

interface IProps {
  tree: string;
  onSelect: (path: string, oid: string) => void;
}

const TreeNode: React.SFC<IProps> = props => {
  return (
    <GitObject oid={props.tree}>
      {({ result, loading, error }) => {
        if (loading) {
          return <p>Loading</p>;
        } else if (result) {
          const { entries } = result as TreeDescription;

          const directories = entries.filter(({ type }) => type === 'tree');
          const files = entries.filter(({ type }) => type === 'blob');
          return (
            <NodeContainer>
              {directories.map(({ path, oid }) => (
                <Directory key={oid} name={path} tree={oid} onSelect={props.onSelect} />
              ))}
              {files.map(({ path, oid }) => (
                <TitleContainer key={oid} onClick={props.onSelect.bind(props, path, oid)}>
                  <DocumentIcon />
                  <Title>{path}</Title>
                </TitleContainer>
              ))}
            </NodeContainer>
          );
        } else if (error) {
          return <p>Error</p>;
        } else {
          return <></>;
        }
      }}
    </GitObject>
  );
};

export default TreeNode;
