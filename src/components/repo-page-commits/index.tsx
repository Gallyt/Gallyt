import { CommitDescription } from 'isomorphic-git';
import * as React from 'react';

import { CommitAuthor, CommitBlock, CommitDate, CommitId, CommitText, Container, Select } from './style';

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

const Commit: React.SFC<{ commit: CommitDescription }> = ({ commit }) => (
  <CommitBlock>
    <CommitId>{commit.oid}</CommitId>
    <CommitAuthor>
      Commited by {commit.author.name} {`<${commit.author.email}>`}
    </CommitAuthor>
    <CommitText>{commit.message}</CommitText>
    <CommitDate>{new Date(commit.author.timestamp).toLocaleString()}</CommitDate>
  </CommitBlock>
);

const CommitData: React.SFC<{
  oid: string;
  max: number;
  commits: { [index: string]: CommitDescription };
  loadMore: () => void;
}> = ({ oid, max, commits, loadMore }) => (
  <div>
    <GitObject oid={oid}>
      {({ result, loading, error }) => {
        if (loading) {
          return (
            <div style={{ position: 'relative', height: '100px' }}>
              <CoverLoader
                scale={1}
                bgColor="transparent"
                color={theme.colors.light}
                text={`Loading ${oid.slice(0, 6)}`}
              />
            </div>
          );
        }
        if (error || result === null) {
          return <BSOD error={error} />;
        }
        const length = Object.keys(commits).length;
        const commit = result as CommitDescription;
        commits[oid] = commit;
        return (
          <>
            <Commit commit={commit} />
            {commit.parent[0] &&
              length < max && <CommitData oid={commit.parent[0]} max={max} commits={commits} loadMore={loadMore} />}
          </>
        );
      }}
    </GitObject>
  </div>
);

export default class RepoPageCommits extends React.PureComponent<IProps, IState> {
  public state: IState = {
    commits: {},
    maxDepth: 42,
    opened: [],
    ref: 'HEAD',
  };

  constructor(props: any) {
    super(props);
    this.loadMore.bind(this);
  }

  public render() {
    return (
      <Container>
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
        <CommitData
          oid={this.props.gitInfos.refs.get(this.state.ref) as string}
          max={this.state.maxDepth - 1}
          commits={this.state.commits}
          loadMore={this.loadMore}
        />
      </Container>
    );
  }

  private loadMore() {
    this.setState({ maxDepth: this.state.maxDepth + 5 });
  }

  private changeRef = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      commits: {},
      ref: e.target.value,
    });
  };
}
