import { FormNextLink } from 'grommet-icons';
import * as React from 'react';

import Router from '../router';

import { Button, Form, Input, Logo, Title, Wrapper } from './style';

interface IState {
  value: string;
}

export default class AddRepoPage extends React.PureComponent<{}, IState> {
  public state = {
    value: '',
  };

  public onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^https?:\/\//.test(target.value)) {
      target.setCustomValidity('Please use an http(s) URL');
    } else {
      target.setCustomValidity('');
    }
    this.setState({ value: target.value });
  };

  public onSubmit = (history: any) => () => {
    const { value } = this.state;
    history.push(`/repo/${encodeURIComponent(value)}`);
  };

  public render() {
    const { value } = this.state;

    return (
      <Router>
        {({ history }) => (
          <Wrapper>
            <div style={{ position: 'relative' }}>
              <Title>
                <Logo src="/logo.png" alt="logo" />
                Gallyt
              </Title>
              <Form onSubmit={this.onSubmit(history)}>
                <Input placeholder="Git repo url" required={true} value={value} onChange={this.onChange} />
                <Button>
                  <FormNextLink color="inherit" />
                </Button>
              </Form>
            </div>
          </Wrapper>
        )}
      </Router>
    );
  }
}
