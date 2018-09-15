import styled from 'styled-components';

import { color } from '../../helpers/styled';

export const Wrapper = styled.div`
  background-color: ${color('primary')};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: #fff;
`;

export const Form = styled.form`
  display: flex;
`;

export const Input = styled.input`
  width: 30vw;
  height: 30px;
  border: none;
  display: block;
  background: white;
  margin: 2px;
  padding: 0 10px;
`;

export const Button = styled.button.attrs({ type: 'submit' })`
  display: flex;
  margin: 2px;
  border: solid 1px white;
  color: white;
  fill: white;
  stroke: white;
  background-color: inherit;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    border-color: ${color('secondary')};
    color: ${color('secondary')};
    fill: ${color('secondary')};
    stroke: ${color('secondary')};
  }
`;
