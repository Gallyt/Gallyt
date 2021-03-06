import { TreeDescription } from 'isomorphic-git';
import * as React from 'react';
import Loader from '../loader';

import theme from '../../theme';
import BSOD from '../bsod';
import GitObject from '../git-object';
import Directory from './directory';
import { DocumentIcon, LoaderBlock, LoaderSacled, NodeContainer, Title, TitleContainer } from './style';
interface IProps {
  tree: string;
  onSelect: (path: string, oid: string) => void;
  opened: string[];
  onToggle: (tree: string, opened: boolean) => void;
  defaultSelects?: string[];
}

const TreeNode: React.SFC<IProps> = props => {
  return (
    <GitObject oid={props.tree}>
      {({ result, loading, error }) => {
        if (loading) {
          return (
            <LoaderBlock>
              <LoaderSacled>
                <Loader color={theme.colors.light} />
              </LoaderSacled>{' '}
              Loading tree
            </LoaderBlock>
          );
        } else if (result) {
          const { entries } = result as TreeDescription;

          const directories = entries.filter(({ type }) => type === 'tree');
          const files = entries.filter(({ type }) => type === 'blob');

          if (props.defaultSelects) {
            const selection = files.find(({ path }) => props.defaultSelects!.indexOf(path.toLowerCase()) >= 0);

            if (selection) {
              setTimeout(() => props.onSelect(selection.path, selection.oid), 0);
            }
          }

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
                  <Title title={path}>{path}</Title>
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
