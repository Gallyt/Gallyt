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

  public async componentDidMount() {
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

  public render() {
    return this.props.children(this.state);
  }
}
