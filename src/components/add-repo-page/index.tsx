import { FormNextLink } from 'grommet-icons';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Background, Button, Centered, Input } from './style';

class AddRepo extends React.PureComponent<RouteComponentProps, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Background>
        <Centered>
          <Input value={this.state.value} onChange={this.onChange} />
          <Button onClick={this.submit}>
            <FormNextLink color="inherit" />
          </Button>
        </Centered>
      </Background>
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });
  };

  private submit = () => {
    this.props.history.push(`/repo/${encodeURIComponent(this.state.value)}`);
  };
}

export default withRouter(AddRepo);
