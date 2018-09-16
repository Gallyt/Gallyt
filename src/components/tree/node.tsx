import { TreeDescription } from 'isomorphic-git';
import * as React from 'react';
import Loader from '../loader';

import BSOD from '../bsod';
import GitObject from '../git-object';
import Directory from './directory';
import { DocumentIcon, LoaderBlock, LoaderSacled, NodeContainer, Title, TitleContainer } from './style';

interface IProps {
  tree: string;
  onSelect: (path: string, oid: string) => void;
  opened: string[];
  onToggle: (tree: string, opened: boolean) => void;
}

const TreeNode: React.SFC<IProps> = props => {
  return (
    <GitObject oid={props.tree}>
      {({ result, loading, error }) => {
        if (loading) {
          return (
            <LoaderBlock>
              <LoaderSacled>
                <Loader />
              </LoaderSacled>{' '}
              Loading
            </LoaderBlock>
          );
        } else if (result) {
          const { entries } = result as TreeDescription;

          const directories = entries.filter(({ type }) => type === 'tree');
          const files = entries.filter(({ type }) => type === 'blob');
          return (
            <NodeContainer>
              {directories.map(({ path, oid }) => (
                <Directory
                  opened={props.opened}
                  onToggle={props.onToggle}
                  key={oid}
                  name={path}
                  tree={oid}
                  onSelect={props.onSelect}
                />
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
          return <BSOD error={error} />;
        } else {
          return <></>;
        }
      }}
    </GitObject>
  );
};

export default TreeNode;
