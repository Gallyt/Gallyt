import * as React from 'react';

import { discover, IGitInfoRefs } from '../../git';

interface IProps {
  url: string;
  children: (state: IState) => React.ReactNode;
}

interface IState {
  error: any;
  loading: boolean;
  result: IGitInfoRefs | null;
}

export default class GitDiscover extends React.PureComponent<IProps, IState> {
  public state = {
    error: null,
    loading: false,
    result: null,
  };

  public componentDidMount() {
    this.fetchData();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }

  public render() {
    return this.props.children(this.state);
  }

  private async fetchData() {
    const { url } = this.props;
    this.setState({ loading: true });
    try {
      const result = await discover(url);
      this.setState({ result, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }
}
