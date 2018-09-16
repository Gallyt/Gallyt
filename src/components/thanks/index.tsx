import * as React from 'react';

import { Emoji, Image, Message, Wrapper } from './style';

import team from './team.gif';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  showed: boolean;
}

interface IContext {
  showed: boolean;
  showThanks: () => void;
  hideThanks: () => void;
}

export const Thanks = React.createContext<IContext>({
  hideThanks: () => undefined,
  showThanks: () => undefined,
  showed: false,
});

export default class ThanksView extends React.PureComponent<IProps, IState> {
  public state = {
    showed: false,
  };

  public showThanks = () => {
    this.setState({ showed: true });
  };

  public hideThanks = () => {
    this.setState({ showed: false });
  };

  public render() {
    const { children } = this.props;
    const { showed } = this.state;
    const { showThanks, hideThanks } = this;

    // tslint:disable-next-line
    console.log(showed);
    return (
      <Thanks.Provider value={{ showed, showThanks, hideThanks }}>
        {children}
        {showed && (
          <Wrapper onClick={this.hideThanks}>
            <div>
              <Image src={team} alt="es-community team" />
              <Emoji>🤪</Emoji>
              <Message>
                Thanks for your support 🤜🤛 <br /> We spent good time to develop it
              </Message>
            </div>
          </Wrapper>
        )}
      </Thanks.Provider>
    );
  }
}
