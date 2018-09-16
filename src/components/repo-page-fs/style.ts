import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

export const LeftBar = styled.div`
  position: relative;
  min-width: 250px;
  overflow: auto;
  background-color: ${color('primary')};
  padding: 10px 0px;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${color('dark')};
  position: relative;
  overflow: auto;
`;

export const Select = styled.select`
  margin: 0px auto 10px;
  display: block;
  border-radius: 9999px;
  outline: none;
`;

export const CommitBlock = styled.div`
  color: ${color('light')};
  position: absolute;
  right: 0px;
  top: -30px;
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

export const CommitText = styled.div`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  :hover {
    text-overflow: initial;
    overflow: auto;
  }
`;

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
