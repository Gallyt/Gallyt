import * as ErrorStackParser from 'error-stack-parser';
import * as React from 'react';
import { Title, Wrapper } from './style';

export default class BSOD extends React.PureComponent<{ error: Error }> {
  public render() {
    const stack = ErrorStackParser.parse(this.props.error);
    return (
      <Wrapper>
        <Title>Gallyt</Title>
        <div>
          <p>A fatal exception {this.props.error.name} has occured at</p>
          {stack.map(({ functionName, fileName, columnNumber, lineNumber }, i) => (
            <span key={i}>
              {functionName} ({fileName}:{columnNumber}:{lineNumber})
            </span>
          ))}
          <p>the current application will be terminated.</p>
          <br />
          <p>* Press any key to restart the current application.</p>
        </div>
      </Wrapper>
    );
  }

  public componentDidMount() {
    document.addEventListener('keypress', this.onKeyPress);
  }

  public componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeyPress);
  }

  private onKeyPress = () => {
    // Force application reload
    window.location.pathname = '/';
  };
}
