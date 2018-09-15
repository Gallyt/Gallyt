import { FormNextLink } from 'grommet-icons';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

const color = (name: string) => ({ theme: { colors } }: { theme: { colors: any } }) => colors[name];

const Centered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

const Background = styled.div`
  background-color: ${color('primary')};
  width: 100vw;
  height: 100vh;
`;

const Input = styled.input`
  width: 30vw;
  border: none;
  display: block;
  background: white;
  margin: 2px;
`;

const Button = styled.button`
  display: block;
  margin: 2px;
  border: solid 1px white;
  color: white;
  fill: white;
  stroke: white;
  background-color: inherit;

  :hover {
    border-color: ${color('secondary')};
    color: ${color('secondary')};
    fill: ${color('secondary')};
    stroke: ${color('secondary')};
  }
`;

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
