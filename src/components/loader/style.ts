import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const LoaderBall = styled.div`
  border-radius: 9999px;
  width: 30px;
  height: 30px;

  display: inline-block;

  border: 2px solid ${color('alternate')};
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

export const Absolute = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color('secondary')};
`;

export const Text = styled.div`
  color: ${color('alternate')};
`;
