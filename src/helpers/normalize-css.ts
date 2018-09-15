import { injectGlobal } from 'styled-components';
import normalize from 'styled-normalize';

export default function normalizeCss() {
  return injectGlobal`
    ${normalize}
  `;
}
