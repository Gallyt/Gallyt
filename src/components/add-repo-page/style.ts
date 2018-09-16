import styled from 'styled-components';

import { color } from '../../helpers/styled';

export const Wrapper = styled.div`
  background-color: ${color('dark')};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: ${color('white')};
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
`;

export const Input = styled.input`
  width: 30vw;
  height: 30px;
  border: none;
  display: block;
  background-color: ${color('white')};
  color: ${color('primary')};
  margin: 2px;
  padding: 0 10px;
  margin-right: 0px;
  outline: none;
  border-radius: 100px 0 0 100px;
`;

export const Button = styled.button.attrs({ type: 'submit' })`
  display: flex;
  margin: 2px;
  border: solid 1px ${color('white')};
  color: ${color('white')};
  fill: ${color('white')};
  stroke: ${color('white')};
  background-color: inherit;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  border-left: 0px;
  margin-left: 0px;
  border-radius: 0 100px 100px 0;
  outline: none;

  :hover {
    color: ${color('primary')};
    fill: ${color('primary')};
    stroke: ${color('primary')};
    background-color: ${color('white')};
  }
`;

export const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 15px;
`;
