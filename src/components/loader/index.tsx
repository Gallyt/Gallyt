import * as React from 'react';
import { Absolute, LoaderBall, Text } from './style';

const Loader: React.SFC = props => <LoaderBall />;

export const CoverLoader: React.SFC<{ text?: string; scale?: number }> = ({ text = '', scale = 2 }) => (
  <Absolute>
    <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
      <LoaderBall />
      <Text>{text}</Text>
    </div>
  </Absolute>
);

export default Loader;
