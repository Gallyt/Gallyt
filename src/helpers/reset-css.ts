import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

export default function resetCss() {
  return injectGlobal`
    background: #ff0;
    ${reset}
  `;
}
