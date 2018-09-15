import { CommitDescription } from 'isomorphic-git';
import * as React from 'react';

import { Container, LeftBar, RightContent } from './style';

import { IGitInfoRefs } from '../../git';
import GitObject from '../git-object';
import Tree from '../tree/node';

export default class RepoPageFS extends React.PureComponent<{ gitInfos: IGitInfoRefs }, { file: string }> {
  public state = {
    file: '',
  };

  public render() {
    return (
      <Container>
        <GitObject oid={this.props.gitInfos.refs.get('HEAD') as string}>
          {({ result, loading, error }) => {
            const commit = result as CommitDescription;
            return (
              <>
                <LeftBar>
                  <select>
                    {Array.from(this.props.gitInfos.refs.keys()).map(name => (
                      <option key={name} value={name}>
                        {name.replace(/^refs\/heads\//, '')}
                      </option>
                    ))}
                  </select>
                  {commit && <Tree tree={commit.tree} onSelect={this.select} />}
                </LeftBar>
                <RightContent>
                  {commit && commit.message}
                  <pre>
                    {this.state.file ? (
                      <GitObject oid={this.state.file}>
                        {({ result: buffer }) => (buffer === null ? 'loading' : (buffer as Buffer).toString('utf-8'))}
                      </GitObject>
                    ) : (
                      'no file'
                    )}
                  </pre>
                </RightContent>
              </>
            );
          }}
        </GitObject>
      </Container>
    );
  }

  private select = (path: string, oid: string) => {
    this.setState({
      file: oid,
    });
  };
}
