import * as React from 'react';

import { getObject, GitObject as TGitObject } from '../../git';
import { Context } from '../repo-wrapper';

interface IProps {
  oid: string;
  children: (state: IState) => React.ReactNode;
}

interface IPropsContext {
  url: string;
  cache: Map<string, TGitObject>;
}

interface IState {
  error: boolean;
  loading: boolean;
  result: TGitObject | null;
}

class GitObjectProvider extends React.PureComponent<IProps & IPropsContext, IState> {
  public state = {
    error: false,
    loading: false,
    result: null,
  };

  public async componentDidMount() {
    this.fetchData();
  }

  public componentDidUpdate(prevProps: IProps & IPropsContext) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }

  public render() {
    return this.props.children(this.state);
  }

  private async fetchData() {
    const { url, oid, cache } = this.props;
    this.setState({ loading: true });
    try {
      const result = await getObject(url, oid, cache);
      this.setState({ result, loading: false });
    } catch (err) {
      console.error(err); // tslint:disable-line
      this.setState({ error: true, loading: false });
    }
  }
}

const GitObject: React.SFC<IProps> = ({ children, oid }) => (
  <Context.Consumer>
    {value => <GitObjectProvider url={value!.url} cache={value!.cache} oid={oid} children={children} />}
  </Context.Consumer>
);

export default GitObject;
