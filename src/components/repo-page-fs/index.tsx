import { CommitDescription } from 'isomorphic-git';
import * as React from 'react';

import { Container, LeftBar, RightContent, Select } from './style';

import { IGitInfoRefs } from '../../git';
import BlobView from '../blob-view';
import GitObject from '../git-object';
import Tree from '../tree/node';

function cleanName(name: string): string {
  if (name.startsWith('refs/tags/')) {
    return name.slice(0, -'^{}'.length);
  }
  return name.replace(/^refs\/heads\//, '');
}

interface IProps {
  gitInfos: IGitInfoRefs;
}

interface IState {
  file?: {
    path: string;
    blob: string;
  };
  ref: string;
  opened: string[];
}

export default class RepoPageFS extends React.PureComponent<IProps, IState> {
  public state: IState = {
    opened: [],
    ref: 'HEAD',
  };

  public render() {
    return (
      <Container>
        <GitObject oid={this.props.gitInfos.refs.get(this.state.ref) as string}>
          {({ result, loading, error }) => {
            const commit = result as CommitDescription;
            return (
              <>
                <LeftBar>
                  <Select onChange={this.changeRef}>
                    {Array.from(this.props.gitInfos.refs.keys())
                      .filter(name => {
                        if (name.startsWith('refs/tags/')) {
                          return name.endsWith('^{}');
                        } else {
                          return true;
                        }
                      })
                      .map(name => (
                        <option key={name} value={name}>
                          {cleanName(name)}
                        </option>
                      ))}
                  </Select>
                  {commit && (
                    <Tree
                      tree={commit.tree}
                      onSelect={this.selectFile}
                      opened={this.state.opened}
                      onToggle={this.toggleFolder}
                    />
                  )}
                </LeftBar>
                <RightContent>
                  {commit && (
                    <div>
                      {commit.message} by {commit.author.name}
                    </div>
                  )}
                  {this.state.file && <BlobView blob={this.state.file.blob} path={this.state.file.path} />}
                </RightContent>
              </>
            );
          }}
        </GitObject>
      </Container>
    );
  }

  private selectFile = (path: string, blob: string) => {
    this.setState({
      file: {
        blob,
        path,
      },
    });
  };

  private changeRef = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      ref: e.target.value,
    });
  };

  private toggleFolder = (tree: string, opened: boolean) => {
    if (opened) {
      this.setState(oldState => ({
        opened: oldState.opened.filter(t => t !== tree),
      }));
    } else {
      this.setState(oldState => ({
        opened: [...oldState.opened, tree],
      }));
    }
  };
}
