import 'prism-themes/themes/prism-a11y-dark.css';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import * as React from 'react';

import { Pre } from './style';

interface IProps {
  className: string;
  children: string;
}

export default class Highlight extends React.PureComponent<IProps> {
  private domNode: HTMLElement;

  public render() {
    return (
      <Pre className={'line-numbers'}>
        <code
          ref={this.handleRefMount}
          className={this.props.className}
          dangerouslySetInnerHTML={{ __html: this.props.children }}
        />
      </Pre>
    );
  }

  public componentDidMount() {
    this.hightlight();
  }

  public componentDidUpdate() {
    this.hightlight();
  }

  private handleRefMount = (node: HTMLElement) => {
    this.domNode = node;
  };

  private hightlight() {
    Prism.highlightElement(this.domNode);
  }
}
