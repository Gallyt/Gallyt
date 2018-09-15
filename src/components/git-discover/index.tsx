import * as React from 'react';

import { discover, IGitInfoRefs } from '../../git';

interface IProps {
  url: string;
  children: (state: IState) => React.ReactNode;
}

interface IState {
  error: boolean;
  loading: boolean;
  result: IGitInfoRefs | null;
}

export default class GitDiscover extends React.PureComponent<IProps, IState> {
  public state = {
    error: false,
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
    } catch (err) {
      console.error(err); // tslint:disable-line
      this.setState({ error: true, loading: false });
    }
  }
}
