import * as MarkdownIt from 'markdown-it';
import * as React from 'react';

import { Content, Wrapper } from './style';

const md = new MarkdownIt();

interface IProps {
  content: string;
}

const MarkdownPreview: React.SFC<IProps> = ({ content }) => (
  <Wrapper>
    <Content dangerouslySetInnerHTML={{ __html: md.render(content) }} />
  </Wrapper>
);

export default MarkdownPreview;
