import { CommitDescription } from 'isomorphic-git';
import * as React from 'react';

import { Container, LeftBar, Select } from './style';

import { IGitInfoRefs } from '../../git';
import BSOD from '../bsod';
import GitObject from '../git-object';
import { CoverLoader } from '../loader';

import theme from '../../theme';

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
  commits: { [index: string]: CommitDescription };
  maxDepth: number;
}

const CommitData: React.SFC<{ oid: string; max: number; commits: { [index: string]: CommitDescription } }> = ({
  oid,
  max,
  commits,
}) => (
  <div>
    <GitObject oid={oid}>
      {({ result, loading, error }) => {
        if (loading) {
          return (
            <div style={{ position: 'relative', height: '100px' }}>
              <CoverLoader
                scale={1}
                bgColor="transparent"
                color={theme.colors.primary}
                text={`Loading ${oid.slice(0, 6)}`}
              />
            </div>
          );
        }
        if (error || result === null) {
          return (
            <div style={{ position: 'relative', height: '100px' }}>
              <CoverLoader scale={1.5} text="Error" color="red" />
            </div>
          );
        }
        const length = Object.keys(commits).length;
        const commit = result as CommitDescription;
        commits[oid] = commit;
        return (
          <>
            <div style={{ color: theme.colors.light }}>
              <div>{oid}</div>
              <div>{commit.message}</div>
            </div>
            {commit.parent[0] && length < max && <CommitData oid={commit.parent[0]} max={max} commits={commits} />}
          </>
        );
      }}
    </GitObject>
  </div>
);

export default class RepoPageCommits extends React.PureComponent<IProps, IState> {
  public state: IState = {
    commits: {},
    maxDepth: 20,
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
                <>
                  <LeftBar>
                    <CoverLoader text="Loading commits" scale={1} bgColor="transparent" color={theme.colors.light} />
                  </LeftBar>
                </>
              );
            } else if (result) {
              const commit = result as CommitDescription;
              return (
                <>
                  <LeftBar>
                    {select}
                    <CommitData oid={commit.parent[0]} max={20} commits={this.state.commits} />
                  </LeftBar>
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

  private changeRef = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      ref: e.target.value,
    });
  };
}
