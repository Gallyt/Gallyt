import { CommitDescription } from 'isomorphic-git';
import * as React from 'react';

import { Center, CommitBlock, CommitText, Container, LeftBar, RightContent, Select } from './style';

import { IGitInfoRefs } from '../../git';
import BlobView from '../blob-view';
import BSOD from '../bsod';
import GitObject from '../git-object';
import Loader from '../loader';
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
            const select = (
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
            );
            if (loading) {
              return (
                <LeftBar>
                  {select}
                  <Center>
                    <Loader />
                  </Center>
                </LeftBar>
              );
            } else if (result) {
              const commit = result as CommitDescription;
              return (
                <>
                  <LeftBar>
                    {select}
                    <Tree
                      tree={commit.tree}
                      onSelect={this.selectFile}
                      opened={this.state.opened}
                      onToggle={this.toggleFolder}
                    />
                  </LeftBar>
                  <RightContent>
                    <div>
                      <CommitBlock>
                        <CommitText>{commit.message}</CommitText>
                        &nbsp; by {commit.author.name}
                      </CommitBlock>
                    </div>
                    {this.state.file && <BlobView blob={this.state.file.blob} path={this.state.file.path} />}
                  </RightContent>
                </>
              );
            } else if (error) {
              return <BSOD error={error} />;
            } else {
              return <></>;
            }
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
