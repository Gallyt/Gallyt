import * as React from 'react';

import styled from 'styled-components';
import theme from '../../theme';

export const Loader: React.SFC<{ color?: string }> = ({ color = theme.colors.alternate }) => {
  const L = styled.div`
    border-radius: 9999px;
    width: 30px;
    height: 30px;

    display: inline-block;

    border: 2px solid ${color};
    border-left-color: transparent;
    border-right-color: transparent;

    animation: rotate 1.2s cubic-bezier(0.7, 0.18, 0.44, 0.87) infinite;

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(720deg);
      }
    }
  `;
  return <L />;
};
export const CoverLoader: React.SFC<{ text?: string; scale?: number; color?: string; bgColor?: string }> = ({
  text = '',
  scale = 2,
  color = theme.colors.alternate,
  bgColor = theme.colors.dark,
}) => {
  const Absolute = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    background-color: ${bgColor};

    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Text = styled.div`
    color: ${color};
  `;
  return (
    <Absolute>
      <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
        <Loader color={color} />
        <Text>{text}</Text>
      </div>
    </Absolute>
  );
};

export default Loader;
