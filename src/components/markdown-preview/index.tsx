import * as MarkdownIt from 'markdown-it';
import * as Prism from 'prismjs';
import * as React from 'react';

import { Content, Wrapper } from './style';

const md = new MarkdownIt({
  highlight(str, lang) {
    return Prism.highlight(str, Prism.languages[lang]);
  },
});

interface IProps {
  content: string;
}

const MarkdownPreview: React.SFC<IProps> = ({ content }) => (
  <Wrapper>
    <Content dangerouslySetInnerHTML={{ __html: md.render(content) }} />
  </Wrapper>
);

export default MarkdownPreview;
