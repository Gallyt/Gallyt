import { Component } from 'react';

declare module 'grommet-icons' {
  interface Intermediate extends React.AllHTMLAttributes<HTMLElement> {
    size?: any;
  }

  interface IconProps extends Intermediate {
    colorIndex?: string;
    type?: 'control' | 'logo' | 'status';
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge';
  }

  export class FormNextLink extends Component<IconProps> {}
  export class CaretNext extends Component<IconProps> {}
  export class CaretDown extends Component<IconProps> {}
  export class Folder extends Component<IconProps> {}
  export class Document extends Component<IconProps> {}
}
