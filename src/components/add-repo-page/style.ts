import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Centered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

export const Background = styled.div`
  background-color: ${color('primary')};
  width: 100vw;
  height: 100vh;
`;

export const Input = styled.input`
  width: 30vw;
  border: none;
  display: block;
  background: white;
  margin: 2px;
`;

export const Button = styled.button`
  display: block;
  margin: 2px;
  border: solid 1px white;
  color: white;
  fill: white;
  stroke: white;
  background-color: inherit;

  :hover {
    border-color: ${color('secondary')};
    color: ${color('secondary')};
    fill: ${color('secondary')};
    stroke: ${color('secondary')};
  }
`;
