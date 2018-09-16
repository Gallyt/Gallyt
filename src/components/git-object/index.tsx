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
  serverCapabilities: string[];
}

interface IState {
  error: any;
  loading: boolean;
  result: TGitObject | null;
}

class GitObjectProvider extends React.PureComponent<IProps & IPropsContext, IState> {
  public state = {
    error: null,
    loading: false,
    result: null,
  };

  public async componentDidMount() {
    this.fetchData();
  }

  public componentDidUpdate(prevProps: IProps & IPropsContext) {
    if (prevProps.oid !== this.props.oid) {
      this.fetchData();
    }
  }

  public render() {
    return this.props.children(this.state);
  }

  private async fetchData() {
    const { url, oid, cache, serverCapabilities } = this.props;
    this.setState({ loading: true });
    try {
      const result = await getObject(url, oid, serverCapabilities, cache);
      this.setState({ result, loading: false });
    } catch (error) {
      console.error('GitObject', error); // tslint:disable-line
      this.setState({ error, loading: false });
    }
  }
}

const GitObject: React.SFC<IProps> = ({ children, oid }) => (
  <Context.Consumer>
    {value => (
      <GitObjectProvider
        url={value!.url}
        cache={value!.cache}
        serverCapabilities={value!.serverCapabilities}
        oid={oid}
        children={children}
      />
    )}
  </Context.Consumer>
);

export default GitObject;
